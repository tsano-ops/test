import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto, VerifyEmailDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ─── Register ────────────────────────────────────────────
  async register(dto: RegisterDto) {
    // Check if email already exists
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Generate 6-digit verification code
    const verificationCode = String(randomInt(100000, 999999));
    const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        verificationCode,
        verificationExpiry,
        onboardingData: dto.signupSource ? { source: dto.signupSource } : undefined,
      },
    });

    // TODO: Send verification email via SendGrid
    // For development, log the code
    console.log(`📧 Verification code for ${user.email}: ${verificationCode}`);

    return {
      message: 'Registration successful. Please check your email for the verification code.',
      email: user.email,
      // In dev mode, return code for testing
      ...(this.config.get('NODE_ENV') === 'development' && { devCode: verificationCode }),
    };
  }

  // ─── Verify Email ────────────────────────────────────────
  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or code');
    }

    if (user.emailVerified) {
      return { message: 'Email already verified' };
    }

    if (
      user.verificationCode !== dto.code ||
      !user.verificationExpiry ||
      user.verificationExpiry < new Date()
    ) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    // Mark email as verified
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationCode: null,
        verificationExpiry: null,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email);

    return {
      message: 'Email verified successfully',
      ...tokens,
    };
  }

  // ─── Login ───────────────────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check email verification
    if (!user.emailVerified) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        planType: user.planType,
        onboardingCompleted: user.onboardingCompleted,
      },
      ...tokens,
    };
  }

  // ─── Refresh Token ───────────────────────────────────────
  async refreshToken(dto: RefreshTokenDto) {
    // Find the refresh token
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: dto.refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Revoke old token (rotation)
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    // Generate new tokens
    return this.generateTokens(storedToken.user.id, storedToken.user.email);
  }

  // ─── Logout ──────────────────────────────────────────────
  async logout(userId: string) {
    // Revoke all refresh tokens for this user
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    return { message: 'Logged out successfully' };
  }

  // ─── Get Current User ────────────────────────────────────
  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) throw new UnauthorizedException();

    return {
      id: user.id,
      email: user.email,
      planType: user.planType,
      subscriptionStatus: user.subscriptionStatus,
      onboardingCompleted: user.onboardingCompleted,
      onboardingStep: user.onboardingStep,
      profile: user.profile
        ? {
            id: user.profile.id,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            photoUrl: user.profile.photoUrl,
            dateOfBirth: user.profile.dateOfBirth,
            gender: user.profile.gender,
            maritalStatus: user.profile.maritalStatus,
            nationality: user.profile.nationality,
            countryOfResidence: user.profile.countryOfResidence,
            stateRegion: user.profile.stateRegion,
          }
        : null,
    };
  }

  // ─── Resend Verification ─────────────────────────────────
  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new BadRequestException('No account found with this email');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const verificationCode = String(randomInt(100000, 999999));
    const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await this.prisma.user.update({
      where: { id: user.id },
      data: { verificationCode, verificationExpiry },
    });

    console.log(`📧 Verification code for ${user.email}: ${verificationCode}`);

    return { message: 'Verification code has been resent.' };
  }

  // ─── Request Password Reset ─────────────────────────────
  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Return success even if user not found (security best practice)
      return { message: 'If an account exists, a reset code has been sent.' };
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { verificationCode: code, verificationExpiry: expiry },
    });

    console.log(`[DEV] Password reset code for ${email}: ${code}`);

    return { message: 'If an account exists, a reset code has been sent.' };
  }

  // ─── Reset Password ────────────────────────────────────
  async resetPassword(email: string, code: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (
      !user ||
      user.verificationCode !== code ||
      !user.verificationExpiry ||
      user.verificationExpiry < new Date()
    ) {
      throw new UnauthorizedException('Invalid or expired reset code.');
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, verificationCode: null, verificationExpiry: null },
    });

    return { message: 'Password has been reset. You can now log in.' };
  }

  // ─── Register Invited User ─────────────────────────────
  async registerInvitedUser(dto: { email: string; password: string; firstName: string; lastName: string; invitationToken: string }) {
    // Check email not taken
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered. Please log in and accept the invitation.');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create user (no verification needed, email comes from invitation)
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        emailVerified: true, // Trusted from invitation link
        onboardingCompleted: true, // Skip full onboarding for invited users
        accountType: 'INVITED_USER' as any,
      },
    });

    // Create basic profile
    await this.prisma.profile.create({
      data: {
        userId: user.id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        isPlanOwner: false,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        accountType: 'INVITED_USER',
      },
    };
  }

  // ─── Helper: Generate JWT + Refresh Token ────────────────
  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN', '15m'),
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    // Store refresh token in DB
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return { accessToken, refreshToken };
  }
}

import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, VerifyEmailDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('resend-verification')
  async resendVerification(@Body() body: { email: string }) {
    return this.authService.resendVerification(body.email);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() body: { email: string }) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; code: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.code, body.newPassword);
  }

  @Post('register-invited')
  registerInvited(@Body() body: { email: string; password: string; firstName: string; lastName: string; invitationToken: string }) {
    return this.authService.registerInvitedUser(body);
  }

  @Post('refresh')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout((req as any).user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return this.authService.getMe((req as any).user.sub);
  }
}

import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me/profile')
  upsertProfile(@Req() req: Request, @Body() dto: CreateProfileDto) {
    return this.usersService.upsertProfile((req as any).user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/profile')
  getProfile(@Req() req: Request) {
    return this.usersService.getProfile((req as any).user.sub);
  }
}

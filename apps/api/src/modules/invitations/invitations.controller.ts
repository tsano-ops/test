import { Controller, Post, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvitationsService } from './invitations.service';

@Controller('invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createInvitation(@Request() req: any, @Body() body: { email: string; role: string; message?: string }) {
    return this.invitationsService.createInvitation(req.user.sub, body);
  }

  @Get('token/:token')
  async getByToken(@Param('token') token: string) {
    return this.invitationsService.getInvitationByToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':token/accept')
  async acceptInvitation(@Param('token') token: string, @Request() req: any) {
    return this.invitationsService.acceptInvitation(token, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sent')
  async getSent(@Request() req: any) {
    return this.invitationsService.getSentInvitations(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/revoke')
  async revoke(@Request() req: any, @Param('id') id: string) {
    return this.invitationsService.revokeInvitation(req.user.sub, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/resend')
  async resend(@Request() req: any, @Param('id') id: string) {
    return this.invitationsService.resendInvitation(req.user.sub, id);
  }
}

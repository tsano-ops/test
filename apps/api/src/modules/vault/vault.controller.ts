import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { VaultService } from './vault.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Get()
  getDocuments(
    @Request() req: any,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    return this.vaultService.getDocuments((req as any).user.sub, { category, search });
  }

  @Get('credentials')
  getCredentials(@Request() req: any) {
    return this.vaultService.getCredentials((req as any).user.sub);
  }

  @Get('search')
  search(@Request() req: any, @Query('q') q: string) {
    return this.vaultService.search((req as any).user.sub, q ?? '');
  }
}

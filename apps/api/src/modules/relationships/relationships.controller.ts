import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { RelationshipsService } from './relationships.service';
import { CreateRelationshipDto, UpdateRelationshipDto } from './dto/relationship.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('relationships')
export class RelationshipsController {
  constructor(private relationshipsService: RelationshipsService) {}

  @Get('tree')
  getTree(@Req() req: Request) {
    return this.relationshipsService.getTree((req as any).user.sub);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateRelationshipDto) {
    return this.relationshipsService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateRelationshipDto,
  ) {
    return this.relationshipsService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.relationshipsService.remove((req as any).user.sub, id);
  }
}

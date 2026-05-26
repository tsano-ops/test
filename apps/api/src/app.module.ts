import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { EncryptionModule } from './common/encryption.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { ProfileModule } from './modules/profile/profile.module';
import { EducationModule } from './modules/education/education.module';
import { EmploymentModule } from './modules/employment/employment.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AssetsModule } from './modules/assets/assets.module';
import { LiabilitiesModule } from './modules/liabilities/liabilities.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { CredentialsModule } from './modules/credentials/credentials.module';
import { FamilyModule } from './modules/family/family.module';
import { RelationshipsModule } from './modules/relationships/relationships.module';
import { HealthRecordsModule } from './modules/health-records/health-records.module';
import { GoalsModule } from './modules/goals/goals.module';
import { LettersModule } from './modules/letters/letters.module';
import { LegalModule } from './modules/legal/legal.module';
import { VaultModule } from './modules/vault/vault.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { PlanSharingModule } from './modules/plan-sharing/plan-sharing.module';
import { InvitationsModule } from './modules/invitations/invitations.module';
import { PostLossModule } from './modules/post-loss/post-loss.module';
import { MemorialModule } from './modules/memorial/memorial.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AiModule } from './modules/ai/ai.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    // Environment config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 },   // 3 requests/sec
      { name: 'medium', ttl: 10000, limit: 20 }, // 20 requests/10sec
      { name: 'long', ttl: 60000, limit: 100 },  // 100 requests/min
    ]),

    // Core modules
    PrismaModule,
    EncryptionModule,
    HealthModule,

    // Feature modules
    AuthModule,
    UsersModule,

    // Phase 1
    ProfileModule,
    EducationModule,
    EmploymentModule,
    DashboardModule,

    // Phase 2 — Assets & Liabilities
    AssetsModule,
    LiabilitiesModule,
    DocumentsModule,
    CredentialsModule,

    // Phase 3 — Family & Relationships
    FamilyModule,
    RelationshipsModule,

    // Phase 4 — Health
    HealthRecordsModule,

    // Phase 5 — Legacy, Goals, Legal
    GoalsModule,
    LettersModule,
    LegalModule,

    // Phase 6 — Vault & Tasks
    VaultModule,
    TasksModule,

    // Phase 7 — Plan Sharing & Invitations
    PlanSharingModule,
    InvitationsModule,

    // Phase 8 — Post-Loss
    PostLossModule,
    MemorialModule,

    // Phase 9 — Settings
    SettingsModule,

    // Phase 10 — AI Assistant
    AiModule,

    // Audit logging (global)
    AuditModule,
  ],
})
export class AppModule {}

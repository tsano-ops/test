import { PrismaClient, Gender, MaritalStatus, PlanType, SubscriptionStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Sarah Johnson (Demo Plan Owner) ────────────────────
  const sarahEmail = 'sarah@planafter.co';
  const sarahPassword = 'Sarah123!';

  const existingSarah = await prisma.user.findUnique({ where: { email: sarahEmail } });

  if (!existingSarah) {
    const passwordHash = await bcrypt.hash(sarahPassword, 12);

    const sarah = await prisma.user.create({
      data: {
        email: sarahEmail,
        passwordHash,
        emailVerified: true,
        onboardingCompleted: true,
        planType: PlanType.INDIVIDUAL,
        subscriptionStatus: SubscriptionStatus.ACTIVE,
        profile: {
          create: {
            firstName: 'Sarah',
            lastName: 'Johnson',
            dateOfBirth: new Date('1985-03-15'),
            gender: Gender.FEMALE,
            maritalStatus: MaritalStatus.MARRIED,
            nationality: 'American',
            countryOfResidence: 'USA',
            stateRegion: 'New York',
            isPlanOwner: true,
            photoUrl: '/images/profile.png',
          },
        },
      },
    });

    console.log(`✅ Created demo user: ${sarah.email}`);
    console.log(`   Password: ${sarahPassword}`);
  } else {
    console.log(`ℹ️  Demo user already exists: ${sarahEmail}`);
  }

  console.log('✅ Seed complete!');
  console.log('');
  console.log('─────────────────────────────────────────');
  console.log('  Demo credentials:');
  console.log('  Email:    sarah@planafter.co');
  console.log('  Password: Sarah123!');
  console.log('─────────────────────────────────────────');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

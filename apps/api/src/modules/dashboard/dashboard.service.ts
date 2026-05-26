import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string) {
    const [user, profile, tasksTodayCount, recentTasks, planShares] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.profile.findUnique({
        where: { userId },
        include: { contacts: true },
      }),
      this.prisma.task.count({
        where: {
          userId,
          status: { in: ['PENDING', 'IN_PROGRESS'] },
          dueDate: { lte: new Date(new Date().setHours(23, 59, 59, 999)) },
        },
      }),
      this.prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      this.prisma.planShare.findMany({
        where: { ownerId: userId },
        include: {
          sharedWith: {
            include: { profile: true },
          },
        },
        take: 5,
      }),
    ]);

    // Calculate plan score based on profile completeness
    const planScore = this.calculatePlanScore(profile, user);

    // Key people: plan shares
    const keyPeople = planShares.map((share) => ({
      id: share.sharedWith.id,
      name: share.sharedWith.profile
        ? `${share.sharedWith.profile.firstName} ${share.sharedWith.profile.lastName}`
        : share.sharedWith.email,
      email: share.sharedWith.email,
      role: share.role,
    }));

    // Recent activity from tasks
    const recentActivity = recentTasks.map((task) => ({
      id: task.id,
      title: task.title,
      category: task.category,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
    }));

    return {
      tasksToday: tasksTodayCount,
      planScore,
      keyPeople,
      recentActivity,
      profileComplete: !!profile,
      onboardingCompleted: user?.onboardingCompleted ?? false,
    };
  }

  private calculatePlanScore(profile: any, user: any): number {
    if (!profile || !user) return 0;

    const checks = [
      !!profile.firstName && !!profile.lastName,
      !!profile.dateOfBirth,
      !!profile.gender,
      !!profile.maritalStatus,
      !!profile.nationality,
      !!profile.countryOfResidence,
      profile.contacts?.length > 0,
      user.emailVerified,
      user.onboardingCompleted,
    ];

    const passed = checks.filter(Boolean).length;
    return Math.round((passed / checks.length) * 100);
  }
}

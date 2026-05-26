import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: async () => {
      const { data } = await dashboardApi.getSummary();
      return data as {
        tasksToday: number;
        planScore: number;
        keyPeople: Array<{
          id: string;
          name: string;
          email: string;
          role: string;
        }>;
        recentActivity: Array<{
          id: string;
          title: string;
          category: string | null;
          status: string;
          priority: string;
          dueDate: string | null;
          createdAt: string;
        }>;
        profileComplete: boolean;
        onboardingCompleted: boolean;
      };
    },
    staleTime: 30_000, // 30 seconds
  });
}

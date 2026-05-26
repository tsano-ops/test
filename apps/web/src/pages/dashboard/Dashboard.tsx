import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AIAssistantCard from '@/components/dashboard/AIAssistantCard';
import TodaysTasksCard from '@/components/dashboard/TodaysTasksCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import KeyPeopleCard from '@/components/dashboard/KeyPeopleCard';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard';
import ArticlesCard from '@/components/dashboard/ArticlesCard';
import { useAuthStore } from '@/stores/auth.store';
import PlatformTour, { useShouldShowTour } from '@/components/tour/PlatformTour';

export default function Dashboard() {
  const { user } = useAuthStore();
  const firstName = user?.profile?.firstName ?? user?.email?.split('@')[0] ?? 'there';
  const showTour = useShouldShowTour();
  const [tourActive, setTourActive] = useState(showTour);

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="greeting-zone">
        <h1 className="greeting-text">Welcome back, {firstName}!</h1>
      </div>

      {/* Dashboard Content */}
      <main className="dashboard-content page active">
        <div className="page-transition">
          {/* AI Assistant */}
          <AIAssistantCard />

          {/* Twin Cards: Tasks + Activity */}
          <div className="twin-cards">
            <TodaysTasksCard />
            <RecentActivityCard />
          </div>

          {/* Key People */}
          <KeyPeopleCard />

          {/* Quick Actions */}
          <QuickActionsCard />

          {/* Articles */}
          <ArticlesCard />
        </div>
      </main>
      {tourActive && <PlatformTour onComplete={() => setTourActive(false)} />}
    </DashboardLayout>
  );
}

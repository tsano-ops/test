import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import RightPanel from '@/components/dashboard/RightPanel';
import Col4AIPanel from '@/components/dashboard/Col4AIPanel';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {/* Background layer */}
      <div className="bg-layer" />

      {/* Header */}
      <Header />

      {/* Sidebar (left) */}
      <Sidebar />

      {/* Right Panel: Progress on dashboard, AI panel on all other pages */}
      {isDashboard ? (
        <RightPanel />
      ) : (
        <aside className="rightpanel-fixed" id="rightPanel">
          <Col4AIPanel />
        </aside>
      )}

      {/* Scrollable middle content */}
      <div className="scroll-container no-scrollbar" id="scroll-container">
        <div className="scroll-inner">
          {/* Left col placeholder (sidebar space) */}
          <div className="col-placeholder" />

          {/* Middle column content */}
          <div className="middle-col">{children}</div>

          {/* Right col placeholder (panel space) */}
          <div className="col-placeholder" />
        </div>
      </div>
    </>
  );
}

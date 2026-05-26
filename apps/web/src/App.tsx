import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import SignUp from '@/pages/auth/SignUp';
import VerifyEmail from '@/pages/auth/VerifyEmail';
import Login from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import InviteRegister from '@/pages/auth/InviteRegister';
import Dashboard from '@/pages/dashboard/Dashboard';
import Profile from '@/pages/profile/Profile';
import OnboardingWelcome from '@/pages/onboarding/OnboardingWelcome';
import Onboarding from '@/pages/onboarding/Onboarding';
import OnboardingQ1 from '@/pages/onboarding/OnboardingQ1';
import SetupComplete from '@/pages/onboarding/SetupComplete';
import AssetsPage from '@/pages/assets/AssetsPage';
import FamilyPage from '@/pages/family/FamilyPage';
import HealthPage from '@/pages/health/HealthPage';
import EmotionalLegacyPage from '@/pages/legacy/EmotionalLegacyPage';
import GoalsPage from '@/pages/goals/GoalsPage';
import WillPage from '@/pages/will/WillPage';
import VaultPage from '@/pages/vault/VaultPage';
import TasksPage from '@/pages/tasks/TasksPage';
import PlansSharedPage from '@/pages/shared/PlansSharedPage';
import PostLossPage from '@/pages/post-loss/PostLossPage';
import SettingsPage from '@/pages/settings/SettingsPage';

// Route guards
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Invite registration — accessible regardless of auth state */}
      <Route path="/register/invite/:token" element={<InviteRegister />} />

      {/* Auth routes */}
      <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
      <Route path="/verify-email" element={<GuestRoute><VerifyEmail /></GuestRoute>} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />

      {/* Onboarding (authenticated but before dashboard) */}
      <Route path="/onboarding/welcome" element={<OnboardingWelcome />} /> {/* TODO: add ProtectedRoute back */}
      <Route path="/onboarding/q1" element={<OnboardingQ1 />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/setup-complete" element={<ProtectedRoute><SetupComplete /></ProtectedRoute>} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/assets" element={<ProtectedRoute><AssetsPage /></ProtectedRoute>} />
      <Route path="/family" element={<ProtectedRoute><FamilyPage /></ProtectedRoute>} />
      <Route path="/health" element={<ProtectedRoute><HealthPage /></ProtectedRoute>} />
      <Route path="/legacy" element={<ProtectedRoute><EmotionalLegacyPage /></ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
      <Route path="/will" element={<ProtectedRoute><WillPage /></ProtectedRoute>} />
      <Route path="/vault" element={<ProtectedRoute><VaultPage /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
      <Route path="/shared" element={<ProtectedRoute><PlansSharedPage /></ProtectedRoute>} />
      <Route path="/post-loss" element={<ProtectedRoute><PostLossPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

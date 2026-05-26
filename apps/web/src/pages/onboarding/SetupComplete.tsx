import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import AuthLayout from '@/components/layout/AuthLayout';
import BtnBack from '@/components/ui/BtnBack';
import BtnSubmit from '@/components/ui/BtnSubmit';

export default function SetupComplete() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const firstName = user?.profile?.firstName || 'there';

  return (
    <AuthLayout showWoman>
      {/* Success checkmark */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(97, 197, 83, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#61C553" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="auth-title" style={{ marginBottom: 12 }}>
          You're all set, {firstName}.
        </h1>
        <p className="auth-subtitle" style={{ marginBottom: 32, maxWidth: 400 }}>
          Your PlanAfter account is ready. Start building your plan — your way, at your pace.
        </p>

        {/* Recommended first actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', alignItems: 'center' }}>
          <BtnSubmit
            label="Complete Your Profile"
            type="button"
            onClick={() => navigate('/profile')}
          />

          <BtnBack label="Go to Dashboard" onClick={() => navigate('/dashboard')} />
        </div>
      </div>
    </AuthLayout>
  );
}

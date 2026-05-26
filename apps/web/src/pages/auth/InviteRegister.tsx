import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { api } from '@/lib/api';
import AuthLayout from '@/components/layout/AuthLayout';
import PasswordStrength from '@/components/ui/PasswordStrength';
import BtnSubmit from '@/components/ui/BtnSubmit';

const ROLE_DESCRIPTIONS: Record<string, string> = {
  EXECUTOR: 'As an Executor, you will help carry out the plan when the time comes. You will have access to specific tasks and documents.',
  CONTRIBUTOR: 'As a Contributor, you can suggest changes and complete assigned tasks within the plan.',
  BENEFICIARY: 'As a Beneficiary, you will have view access to specific parts of the plan shared with you.',
  VIEWER: 'As a Viewer, you can see selected sections of the plan.',
};

const ROLE_COLORS: Record<string, string> = {
  EXECUTOR: '#657EEA',
  CONTRIBUTOR: '#3B82F6',
  BENEFICIARY: '#61C553',
  VIEWER: '#6B7280',
};

interface InvitationInfo {
  id: string;
  role: string;
  senderName: string;
  senderEmail: string;
  message?: string;
  recipientEmail: string;
}

export default function InviteRegister() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  const [invitation, setInvitation] = useState<InvitationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.get(`/invitations/token/${token}`)
      .then((res) => {
        setInvitation(res.data);
        setEmail(res.data.recipientEmail);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'This invitation is invalid or has expired.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');

    if (!firstName.trim() || !lastName.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }
    if (password.length < 8) {
      setSubmitError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      // Register as invited user
      const registerRes = await api.post('/auth/register-invited', {
        email: email.toLowerCase(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        invitationToken: token,
      });

      const { accessToken, refreshToken, user } = registerRes.data;

      // Store auth
      setTokens(accessToken, refreshToken);
      setUser(user);

      // Accept the invitation
      try {
        await api.post(`/invitations/${token}/accept`);
      } catch {
        // Non-critical — invitation may have been auto-accepted
      }

      // Route to shared plans page
      navigate('/shared');
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <AuthLayout>
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <p style={{ font: '400 16px/24px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>
            Loading invitation...
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(255,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="auth-title">Invitation Unavailable</h1>
          <p className="auth-subtitle" style={{ marginBottom: 24 }}>{error}</p>
          <BtnSubmit label="Go to Login" type="button" onClick={() => navigate('/login')} />
        </div>
      </AuthLayout>
    );
  }

  const bottomLink = (
    <p className="auth-bottom-link">
      Already have an account?{' '}
      <Link to="/login">Log in</Link>
    </p>
  );

  return (
    <AuthLayout bottomContent={bottomLink}>
      {/* Invitation info banner */}
      <div style={{
        background: 'rgba(101,126,234,0.06)',
        border: '1px solid rgba(101,126,234,0.15)',
        borderRadius: 12, padding: '16px 20px', marginBottom: 24,
      }}>
        <p style={{ font: '600 14px/18px Inter, sans-serif', color: '#000', margin: '0 0 6px' }}>
          {invitation?.senderName} invited you
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: `${ROLE_COLORS[invitation?.role || 'VIEWER']}18`,
          color: ROLE_COLORS[invitation?.role || 'VIEWER'],
          font: '600 12px/15px Inter, sans-serif',
          padding: '3px 10px', borderRadius: 20,
          marginBottom: 8,
        }}>
          {invitation?.role}
        </div>
        <p style={{ font: '400 13px/18px Inter, sans-serif', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
          {ROLE_DESCRIPTIONS[invitation?.role || 'VIEWER']}
        </p>
        {invitation?.message && (
          <p style={{
            font: '400 13px/18px Inter, sans-serif', color: 'rgba(0,0,0,0.5)',
            fontStyle: 'italic', margin: '8px 0 0', paddingTop: 8,
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}>
            "{invitation.message}"
          </p>
        )}
      </div>

      <h1 className="auth-title">Create your account</h1>
      <p className="auth-subtitle">Join PlanAfter to access your assigned role.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'calc(20px * var(--s))' }}>
        <div style={{ display: 'flex', gap: 'calc(12px * var(--s))' }}>
          <div className="auth-input-wrap" style={{ flex: 1, width: 'auto' }}>
            <input
              type="text"
              className="auth-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name *"
            />
            <p className="auth-input-hint">Enter your first name</p>
          </div>
          <div className="auth-input-wrap" style={{ flex: 1, width: 'auto' }}>
            <input
              type="text"
              className="auth-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name *"
            />
            <p className="auth-input-hint">Enter your last name</p>
          </div>
        </div>

        <div className="auth-input-wrap">
          <input
            type="email"
            className="auth-input"
            value={email}
            readOnly
            placeholder="E-mail *"
            style={{ opacity: 0.6, cursor: 'not-allowed' }}
          />
          <p className="auth-input-hint">Pre-filled from invitation</p>
        </div>

        <div className="auth-input-wrap">
          <input
            type={showPassword ? 'text' : 'password'}
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password *"
            style={{ paddingRight: 'calc(56px * var(--s))' }}
          />
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="auth-password-toggle"
              style={{
                backgroundImage: showPassword
                  ? "url('/icons/eye.png')"
                  : "url('/icons/eye-slash.png')",
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            />
          )}
          <p className="auth-input-hint">Create Password</p>
        </div>

        <PasswordStrength password={password} />

        {submitError && (
          <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, fontSize: 13, color: '#e74c3c' }}>
            {submitError}
          </div>
        )}

        <BtnSubmit
          label={submitting ? 'Creating account...' : 'Accept & Create Account'}
          disabled={submitting}
          loading={submitting}
        />
      </form>

    </AuthLayout>
  );
}

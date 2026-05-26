import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import PasswordStrength from '@/components/ui/PasswordStrength';
import { authApi } from '@/lib/api';
import BtnSubmit from '@/components/ui/BtnSubmit';
import BtnBack from '@/components/ui/BtnBack';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successStep2, setSuccessStep2] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1: Request reset code
  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    try {
      await authApi.requestPasswordReset(email.trim().toLowerCase());
      setSuccessStep2(`Check your inbox — we've sent a reset link to ${email.trim().toLowerCase()}`);
      setStep(2);
    } catch (err: any) {
      const status = err.response?.status;
      const msg = (err.response?.data?.message || '').toLowerCase();
      if (msg.includes('email') && (msg.includes('invalid') || msg.includes('valid'))) {
        setError('Please enter a valid email address');
      } else if (status === 404 || msg.includes('not found') || msg.includes('not exist')) {
        setError('If this email exists, you will receive a reset link');
      } else {
        setError('Something went wrong. Please try again');
      }
    } finally {
      setLoading(false);
    }
  }

  // Step 2: OTP input handlers
  function handleChange(index: number, value: string) {
    if (value.length > 1) value = value[value.length - 1];
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    pasted.split('').forEach((char, i) => { newCode[i] = char; });
    setCode(newCode);
    const nextEmpty = newCode.findIndex((c) => !c);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  }

  function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setStep(3);
  }

  // Step 3: Set new password
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await authApi.resetPassword(
        email.trim().toLowerCase(),
        code.join(''),
        password,
      );
      navigate('/login', { state: { passwordReset: true } });
    } catch {
      setError('Invalid or expired code. Please try again.');
      setStep(2);
      setCode(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      {/* Step 1: Enter email */}
      {step === 1 && (
        <form onSubmit={handleRequestCode}>
          <h2 className="auth-title">Reset your password</h2>
          <p className="auth-subtitle">
            Enter the email address associated with your account and we will send you a verification code.
          </p>

          {error && <div className="auth-error-message">{error}</div>}

          <div className="auth-input-wrap" style={{ marginBottom: 'calc(24px * var(--s))' }}>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail *"
            />
            <p className="auth-input-hint">Enter your email address</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BtnBack onClick={() => navigate('/login')} />

            <BtnSubmit
              label="Send Code"
              disabled={loading}
              loading={loading}
            />
          </div>
        </form>
      )}

      {/* Step 2: Enter verification code */}
      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <h2 className="auth-title">Enter verification code</h2>
          <p className="verify-subtitle">We sent a 6-digit code to:</p>
          <p className="verify-email">{email}</p>

          {successStep2 && !error && <div className="auth-success-message">{successStep2}</div>}
          {error && !successStep2 && <div className="auth-error-message">{error}</div>}

          <div className="verify-code-card">
            <p className="verify-code-label">Enter your 6-digit code:</p>
            <div className="verify-code-inputs" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`verify-code-box${digit ? ' filled' : ''}`}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BtnBack onClick={() => { setStep(1); setError(''); }} />

            <BtnSubmit
              label="Verify"
            />
          </div>
        </form>
      )}

      {/* Step 3: Set new password */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: 'calc(20px * var(--s))' }}>
          <h2 className="auth-title">Set new password</h2>
          <p className="auth-subtitle">Choose a strong password for your account.</p>

          {error && <div className="auth-error-message">{error}</div>}

          <div className="auth-input-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password *"
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
          </div>

          <PasswordStrength password={password} />

          <div className="auth-input-wrap">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password *"
              style={{ paddingRight: 'calc(56px * var(--s))' }}
            />
            {confirmPassword && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="auth-password-toggle"
                style={{
                  backgroundImage: showConfirmPassword
                    ? "url('/icons/eye.png')"
                    : "url('/icons/eye-slash.png')",
                }}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              />
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
            <BtnBack onClick={() => { setStep(2); setError(''); }} />

            <BtnSubmit
              label="Reset Password"
              disabled={loading}
              loading={loading}
            />
          </div>
        </form>
      )}
    </AuthLayout>
  );
}

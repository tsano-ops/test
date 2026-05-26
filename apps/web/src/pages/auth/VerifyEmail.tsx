import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';
import BtnBack from '@/components/ui/BtnBack';
import BtnSubmit from '@/components/ui/BtnSubmit';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { pendingEmail, loginSuccess } = useAuthStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!pendingEmail) navigate('/signup');
    else inputRefs.current[0]?.focus();
  }, [pendingEmail, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  async function handleResend() {
    if (countdown > 0 || !pendingEmail) return;
    try {
      await authApi.resendVerification(pendingEmail);
      setError('');
      setCountdown(60);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'We could not resend the code. Please try again in a moment.');
    }
  }

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) { setError('Please enter the complete 6-digit code.'); return; }
    try {
      setLoading(true);
      setError('');
      setResendSuccess(false);
      const { data } = await authApi.verifyEmail({ email: pendingEmail!, code: fullCode });
      loginSuccess(
        { id: '', email: pendingEmail!, planType: 'INDIVIDUAL', onboardingCompleted: false },
        data.accessToken,
        data.refreshToken,
      );
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid verification code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      {/* XD: title 50px from card top, 540px wide, centered */}
      <h2 className="auth-title">
        Verify your email address
      </h2>

      {/* XD: subtitle 30px below title, 400px, opacity 0.5 */}
      <p className="verify-subtitle">We've sent a verification code to:</p>

      {/* XD: email 4px below subtitle, 600 weight, opacity 1 */}
      <p className="verify-email">{pendingEmail}</p>

      {error && !resendSuccess && <div className="auth-error-message">{error}</div>}
      {resendSuccess && !error && <div className="auth-success-message">Code resent successfully.</div>}

      <form onSubmit={handleSubmit}>
        {/* XD: Code input card — 400×147px, radius 20px, glassmorphic */}
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

        {/* XD: Help section — two columns with divider, like SignUp step 1 */}
        <div className="verify-help-section">
          {/* Left column: question */}
          <div className="verify-help-left">
            <p className="verify-help-question">
              Didn't receive the email with verification code?
            </p>
          </div>

          {/* Vertical divider */}
          <div className="verify-help-divider" />

          {/* Right column: bullet list */}
          <div className="verify-help-right">
            <ul className="verify-help-list">
              <li>Check your spam folder</li>
              <li>Make sure your e-mail is correct</li>
              <li className="interactive">
                <div>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={countdown > 0}
                    className="verify-help-action"
                  >
                    Resend Code
                  </button>
                  <span className="verify-countdown">
                    {countdown > 0
                      ? `(Available in ${countdown} seconds)`
                      : '(Available in 60 seconds)'}
                  </span>
                </div>
              </li>
              <li className="interactive extra-gap">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="verify-help-action"
                >
                  Change E-mail Address
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* XD: "Why verify?" — bold label + explanation */}
        <p className="verify-why">
          <strong>Why verify?</strong> This ensures only you can access your account
          and keeps your legacy information secure.
        </p>

        {/* XD: Buttons — Back (left) + Verify (right) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BtnBack onClick={() => navigate('/signup')} />
          <BtnSubmit
            label="Verify"
            disabled={loading}
            loading={loading}
          />
        </div>
      </form>
    </AuthLayout>
  );
}

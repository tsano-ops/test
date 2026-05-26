import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthLayout from '@/components/layout/AuthLayout';
import PasswordStrength from '@/components/ui/PasswordStrength';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';
import BtnSubmit from '@/components/ui/BtnSubmit';
import BtnBack from '@/components/ui/BtnBack';

const schema = z
  .object({
    email: z.string().email('Enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/\d/, 'Must contain a number')
      .regex(/[@$!%*?&]/, 'Must contain a special character'),
    confirmPassword: z.string(),
    optIn: z.boolean().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

const SOURCES = [
  { id: 'website', label: 'Website' },
  { id: 'insurance', label: 'My Insurance Provider' },
  { id: 'employer', label: 'My Employer' },
  { id: 'access_code', label: 'I Have An Access Code' },
];

export default function SignUp() {
  const navigate = useNavigate();
  const { setPendingEmail } = useAuthStore();
  const [step, setStep] = useState<'source' | 'account'>('source');
  const [source, setSource] = useState(() => sessionStorage.getItem('signupSource') || 'website');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { optIn: true } });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');
  const emailValue = watch('email', '');

  useEffect(() => {
    sessionStorage.setItem('signupSource', source);
  }, [source]);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('signup-email');
    if (savedEmail) setValue('email', savedEmail);
  }, [setValue]);

  useEffect(() => {
    if (emailValue) sessionStorage.setItem('signup-email', emailValue);
  }, [emailValue]);

  async function onSubmit(data: FormData) {
    try {
      setError('');
      await authApi.register({ email: data.email, password: data.password, signupSource: source });
      sessionStorage.removeItem('signupSource');
      sessionStorage.removeItem('signup-email');
      setPendingEmail(data.email);
      setSuccess('Account created! Please check your email to verify your account');
      setTimeout(() => navigate('/verify-email'), 1500);
    } catch (err: any) {
      const status = err.response?.status;
      const msg = (err.response?.data?.message || '').toLowerCase();
      if (!err.response) {
        setError('We could not reach our servers. Please try again in a moment.');
      } else if (status === 409 || msg.includes('already exists') || msg.includes('duplicate') || msg.includes('conflict') || msg.includes('registered')) {
        setError('duplicate');
      } else if (msg.includes('email') && (msg.includes('invalid') || msg.includes('valid'))) {
        setError('Please enter a valid email address.');
      } else if (msg.includes('password')) {
        setError('Your password needs a few more details. Check the hints above.');
      } else {
        setError('We could not reach our servers. Please try again in a moment.');
      }
    }
  }

  const bottomLink = (
    <p className="auth-bottom-link">
      Already have an account?{' '}
      <Link to="/login">Log in!</Link>
    </p>
  );

  return (
    <AuthLayout bottomContent={bottomLink}>
      {step === 'source' && (
        <>
          {/* XD Screen 1: Card=400px, padding 50+50=100 → content 300px = divider height
               auth-card-inner has 50px top + 20px bottom, so add 30px margin-bottom to get 50px symmetry */}
          <div style={{
            display: 'flex',
            position: 'relative',
            height: 'calc(300px * var(--s))',
            marginBottom: 'calc(30px * var(--s))',
          }}>
            {/* Left column: 270px, text vertically centered */}
            <div style={{
              width: 'calc(270px * var(--s))',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: 'calc(30px * var(--s))',
            }}>
              <h2 style={{
                textAlign: 'right',
                font: 'normal normal 600 calc(24px * var(--s))/calc(29px * var(--s)) "Inter", sans-serif',
                letterSpacing: '0px',
                color: '#000000',
                opacity: 1,
                margin: '0 0 calc(20px * var(--s)) 0',
              }}>
                How are you signing<br />up for PlanAfter?
              </h2>
              <p style={{
                textAlign: 'right',
                font: 'normal normal normal calc(16px * var(--s))/calc(24px * var(--s)) "Inter", sans-serif',
                letterSpacing: '0px',
                color: '#000000',
                opacity: 0.5,
                margin: 0,
              }}>
                PlanAfter can be a benefit provided by employers, insurance carriers, or other partner organizations.
              </p>
            </div>

            {/* Vertical divider — XD: 1px solid #000, opacity 0.16, stretches full 300px */}
            <div style={{
              width: '0px',
              borderLeft: '1px solid #000000',
              opacity: 0.16,
              alignSelf: 'stretch',
              flexShrink: 0,
            }} />

            {/* Right column: radio options, 270px */}
            <div style={{
              width: 'calc(270px * var(--s))',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 0,
            }}>
              {SOURCES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="auth-source-option"
                  onClick={() => { setSource(s.id); setStep('account'); }}
                >
                  <span className="radio-dot" />
                  <span className="btn-label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {step === 'account' && (
        <div style={{ minHeight: 'calc(766px * var(--s))' }}>
          {/* XD: "Let's get started by creating your secure PlanAfter account" */}
          <h2 className="auth-title">
            Let's get started by creating your<br />secure PlanAfter account
          </h2>

          {success && <div className="auth-success-message">{success}</div>}
          {error && (
            <div className="auth-error-message">
              {error === 'duplicate' ? (
                <>An account with this email already exists. <Link to="/login" style={{ color: 'inherit', fontWeight: 600 }}>Log in instead</Link></>
              ) : error}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'calc(20px * var(--s))' }}>
            <div className="auth-input-wrap">
              <input
                className={`auth-input${errors.email ? ' error' : ''}`}
                type="email"
                placeholder="E-mail *"
                {...register('email')}
              />
              <p className="auth-input-hint">Enter Valid E-mail Address</p>
            </div>

            <div className="auth-input-wrap">
              <input
                className={`auth-input${errors.password ? ' error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password *"
                style={{ paddingRight: 'calc(56px * var(--s))' }}
                {...register('password')}
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

            <p className="auth-pw-hint">
              {!password
                ? 'At least 8 characters, with uppercase, lowercase, a number, and a special character.'
                : (() => {
                    const missing: string[] = [];
                    if (password.length < 8) missing.push(`${8 - password.length} more character${8 - password.length > 1 ? 's' : ''}`);
                    if (!/[a-z]/.test(password)) missing.push('a lowercase letter');
                    if (!/[A-Z]/.test(password)) missing.push('an uppercase letter');
                    if (!/\d/.test(password)) missing.push('a number');
                    if (!/[@$!%*?&]/.test(password)) missing.push('a special character');
                    return missing.length > 0
                      ? `Add ${missing.join(', ')}.`
                      : 'Your account is well protected.';
                  })()
              }
            </p>

            <div className="auth-input-wrap">
              <input
                className={`auth-input${errors.confirmPassword ? ' error' : ''}`}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Retype Password *"
                style={{ paddingRight: 'calc(56px * var(--s))' }}
                {...register('confirmPassword')}
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
              <p className="auth-input-hint">Confirm Password</p>
            </div>

            <label className="auth-checkbox-wrap">
              <input type="checkbox" {...register('optIn')} />
              <span className="auth-checkbox-box" />
              Send me helpful tips and updates (optional)
            </label>

            <p className="auth-terms">
              By submitting your information to PlanAfter you accept the<br />
              following terms: PlanAfter's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <BtnBack onClick={() => setStep('source')} />

              <BtnSubmit
                label="Continue"
                loading={isSubmitting}
              />
            </div>
          </form>

        </div>
      )}
    </AuthLayout>
  );
}

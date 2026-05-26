import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthLayout from '@/components/layout/AuthLayout';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';
import BtnSubmit from '@/components/ui/BtnSubmit';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginSuccess } = useAuthStore();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (location.state?.passwordReset) {
      setSuccessMsg('Password reset successful. Please log in with your new password.');
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const emailValue = watch('email', '');
  const passwordValue = watch('password', '');

  const { ref: passwordRHFRef, ...passwordRest } = register('password');

  async function onSubmit(data: FormData) {
    try {
      setError('');
      const { data: response } = await authApi.login(data);
      useAuthStore.getState().setTokens(response.accessToken, response.refreshToken);
      const { data: me } = await authApi.getMe();
      loginSuccess(
        { ...me, ...response.user, profile: me.profile, onboardingCompleted: me.onboardingCompleted },
        response.accessToken,
        response.refreshToken,
      );
      navigate(me.onboardingCompleted ? '/dashboard' : '/onboarding');
    } catch (err: any) {
      const status = err.response?.status;
      const msg = (err.response?.data?.message || '').toLowerCase();
      if (!err.response) {
        setError('Something went wrong. Please try again');
      } else if (status === 429 || msg.includes('too many') || msg.includes('locked') || msg.includes('rate')) {
        setError('Too many attempts. Please try again in 5 minutes');
      } else {
        setError('Incorrect email or password');
      }
    }
  }

  const bottomLink = (
    <p className="auth-bottom-link">
      Don't have an account?{' '}
      <Link to="/signup">Sign up</Link>
    </p>
  );

  return (
    <AuthLayout bottomContent={bottomLink}>
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Log in to your PlanAfter account</p>

      {successMsg && <div className="auth-success-message">{successMsg}</div>}
      {error && <div className="auth-error-message">{error}</div>}

      <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'calc(20px * var(--s))' }}>
        <div className="auth-input-wrap">
          <input
            className={`auth-input${errors.email ? ' error' : ''}`}
            type="email"
            placeholder="E-mail *"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); passwordRef.current?.focus(); } }}
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
            ref={(el) => { passwordRHFRef(el); passwordRef.current = el; }}
            {...passwordRest}
          />
          {passwordValue && (
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
          <p className="auth-input-hint">Enter your password</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="auth-forgot-link"
          >
            Forgot password?
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: 'calc(8px * var(--s))' }}>
          <BtnSubmit
            label="Log In"
            disabled={isSubmitting || !emailValue || !passwordValue}
            loading={isSubmitting}
          />
        </div>
      </form>

    </AuthLayout>
  );
}

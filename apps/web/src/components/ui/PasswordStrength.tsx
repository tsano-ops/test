import { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: 'Empty', color: '#FFFFFF' };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    if (password.length >= 12) score++;

    const levels = [
      { score: 0, label: 'Empty', color: '#FFFFFF' },
      { score: 1, label: 'Very Weak', color: '#FF2C55' },
      { score: 2, label: 'Weak', color: '#FF9500' },
      { score: 3, label: 'Medium', color: '#FF9500' },
      { score: 4, label: 'Strong', color: '#61C553' },
      { score: 5, label: 'Very Strong', color: '#61C553' },
    ];

    return levels[Math.min(score, 5)];
  }, [password]);

  /* XD: bar fills proportionally based on score (score/5 * 100%) */
  const barPercent = (strength.score / 5) * 100;

  return (
    <div className="auth-pw-strength">
      <p className="pw-title">Password Strength</p>
      <div className="pw-bar-track">
        <div
          className="pw-bar-fill"
          style={{
            width: `${barPercent}%`,
            background: strength.color,
            boxShadow: strength.score > 0
              ? `inset 0px calc(1px * var(--s)) 0px #FFFFFF47, 0px 0px calc(6px * var(--s)) ${strength.color}80`
              : 'none',
          }}
        />
      </div>
      <p className="pw-status">
        {strength.label}
      </p>
    </div>
  );
}

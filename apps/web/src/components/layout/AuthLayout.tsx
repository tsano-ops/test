import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  bottomContent?: ReactNode;
  cardHeight?: string;
  showWoman?: boolean;
}

export default function AuthLayout({ children, bottomContent, cardHeight, showWoman = false }: AuthLayoutProps) {
  return (
    <div className="auth-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Logo — pill style, top center */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'calc(20px * var(--s))',
        position: 'relative',
        zIndex: 10,
      }}>
        <div className="auth-logo-pill">
          <img
            src="/icons/planafter-logo.svg"
            alt="PlanAfter"
          />
        </div>
      </div>

      {/* Main area — 20px below logo */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'calc(20px * var(--s))',
        position: 'relative',
      }}>
        {/* Card — glassmorphic per XD specs */}
        <div className="auth-card" style={cardHeight ? { height: cardHeight } : undefined}>
          <div className="auth-card-inner">
            {children}
          </div>
        </div>

        {/* Woman — only on All Set / Success screens */}
        {showWoman && (
          <img
            src="/images/sarah-fullbody.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 'max(40px, calc(50% - 560px))',
              height: '88vh',
              maxHeight: 720,
              objectFit: 'contain',
              objectPosition: 'bottom',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />
        )}
      </div>

      {/* Content below card — 20px gap */}
      {bottomContent && (
        <div style={{ paddingTop: 'calc(20px * var(--s))' }}>
          {bottomContent}
        </div>
      )}
    </div>
  );
}

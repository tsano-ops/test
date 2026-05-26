import { useNavigate } from 'react-router-dom';
import BtnSubmit from '@/components/ui/BtnSubmit';

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-bg">
      {/* Woman — left side, full body */}
      <img
        src="/images/sarah-fullbody.png"
        alt=""
        aria-hidden="true"
        className="welcome-woman"
      />

      {/* Logo pill — 20px from viewport top, centered above card */}
      <div className="welcome-logo-wrap">
        <div className="auth-logo-pill">
          <img src="/icons/planafter-logo.svg" alt="PlanAfter" />
        </div>
      </div>

      {/* Card — 300px, right side */}
      <div className="welcome-card">
        <div className="welcome-card-gradient" />
        <div className="welcome-card-inner">
          {/* Title */}
          <h2 className="welcome-title">Welcome<br />to PlanAfter!</h2>

          {/* Subtitle */}
          <p className="welcome-subtitle">
            Your account has been<br />
            successfully created.<br />
            Let's personalize your planning<br />
            experience!
          </p>

          {/* Green checkmark */}
          <div className="welcome-checkmark">
            <img src="/icons/task-big.svg" alt="Success" />
          </div>

          {/* Info rows */}
          <div className="welcome-info-row">
            <img src="/icons/clock.svg" alt="" className="welcome-info-icon" />
            <p className="welcome-info-text">This will take about 5-7 minutes</p>
          </div>

          <div className="welcome-info-row">
            <img src="/icons/info.svg" alt="" className="welcome-info-icon" />
            <p className="welcome-info-text">You can always update this information later</p>
          </div>

          {/* Help text */}
          <p className="welcome-help">
            Need help getting started?<br />
            Check out our <strong>Quick Start Guide</strong> or<br />
            <strong>Contact Support!</strong>
          </p>

          {/* Continue button — right aligned */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <BtnSubmit
              label="Continue"
              type="button"
              onClick={() => navigate('/onboarding')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

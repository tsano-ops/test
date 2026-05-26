import { useState, useEffect, useCallback } from 'react';

interface TourStep {
  target: string; // CSS selector
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: TourStep[] = [
  {
    target: '.sidebar-nav',
    title: 'Your Navigation',
    description: 'Access all sections of your plan from the sidebar. Each section covers a different aspect of your life planning.',
    position: 'right',
  },
  {
    target: '.greeting-zone',
    title: 'Your Dashboard',
    description: 'This is your command center. See your plan progress, recent activity, and quick actions at a glance.',
    position: 'bottom',
  },
  {
    target: '[data-tour="vault"]',
    title: 'Your Vault',
    description: 'Store and organize all your important documents and credentials securely in one place.',
    position: 'right',
  },
  {
    target: '[data-tour="tasks"]',
    title: 'Tasks & Reminders',
    description: 'Track what needs to be done. PlanAfter generates smart tasks based on your plan progress.',
    position: 'right',
  },
  {
    target: '.ai-panel',
    title: 'AI Assistant',
    description: 'Get guidance anytime. Ask questions about your plan, get suggestions, or find what you need.',
    position: 'left',
  },
];

const TOUR_KEY = 'planafter-tour-completed';

interface Props {
  onComplete?: () => void;
}

export default function PlatformTour({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const step = TOUR_STEPS[currentStep];

  const positionTooltip = useCallback(() => {
    if (!step) return;
    const el = document.querySelector(step.target);
    if (!el) {
      // Skip to next step if target not found
      if (currentStep < TOUR_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
      return;
    }
    const rect = el.getBoundingClientRect();
    const style: React.CSSProperties = { position: 'fixed', zIndex: 10001 };

    switch (step.position) {
      case 'right':
        style.left = rect.right + 16;
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
      case 'bottom':
        style.left = rect.left + rect.width / 2;
        style.top = rect.bottom + 16;
        style.transform = 'translateX(-50%)';
        break;
      case 'left':
        style.right = window.innerWidth - rect.left + 16;
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
      case 'top':
        style.left = rect.left + rect.width / 2;
        style.bottom = window.innerHeight - rect.top + 16;
        style.transform = 'translateX(-50%)';
        break;
    }
    setTooltipStyle(style);
  }, [step, currentStep]);

  useEffect(() => {
    positionTooltip();
    window.addEventListener('resize', positionTooltip);
    return () => window.removeEventListener('resize', positionTooltip);
  }, [positionTooltip]);

  function handleNext() {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  }

  function handleSkip() {
    completeTour();
  }

  function completeTour() {
    localStorage.setItem(TOUR_KEY, 'true');
    setIsVisible(false);
    onComplete?.();
  }

  if (!isVisible || !step) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        zIndex: 10000, transition: 'opacity 0.3s',
      }} />

      {/* Tooltip */}
      <div style={{
        ...tooltipStyle,
        background: '#fff',
        borderRadius: 16,
        padding: '24px',
        maxWidth: 320,
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      }}>
        {/* Step indicator */}
        <div style={{
          display: 'flex', gap: 4, marginBottom: 16,
        }}>
          {TOUR_STEPS.map((_, i) => (
            <div key={i} style={{
              width: 24, height: 3, borderRadius: 2,
              background: i === currentStep ? '#020B66' : 'rgba(0,0,0,0.1)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <h3 style={{
          font: '600 16px/20px "Source Serif 4", serif',
          color: '#000', margin: '0 0 8px',
        }}>{step.title}</h3>
        <p style={{
          font: '400 14px/20px Inter, sans-serif',
          color: 'rgba(0,0,0,0.6)', margin: '0 0 20px',
        }}>{step.description}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handleSkip}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              font: '400 13px/16px Inter, sans-serif', color: 'rgba(0,0,0,0.4)',
              padding: '8px 0',
            }}
          >
            Skip tour
          </button>
          <button
            onClick={handleNext}
            style={{
              background: '#020B66', color: '#fff', border: 'none',
              borderRadius: 10, padding: '10px 24px', cursor: 'pointer',
              font: '600 14px/17px Inter, sans-serif',
            }}
          >
            {currentStep === TOUR_STEPS.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </>
  );
}

export function useShouldShowTour(): boolean {
  return !localStorage.getItem(TOUR_KEY);
}

export function resetTour(): void {
  localStorage.removeItem(TOUR_KEY);
}

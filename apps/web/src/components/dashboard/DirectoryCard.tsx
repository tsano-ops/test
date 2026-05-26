interface DirectoryCardProps {
  title: string;
  percent: number;
  color: string;
  learnBg: string;
  onBack?: () => void;
}

export default function DirectoryCard({ title, percent, color, learnBg, onBack }: DirectoryCardProps) {
  const barShadow = `inset 0px 1px 0px rgba(255,255,255,0.28), 0px 0px 6px ${color}80`;

  return (
    <div className="directory-card">
      {/* Back button */}
      {onBack && (
        <div className="dir-back-btn" onClick={onBack}>
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M8 1L1 8L8 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </div>
      )}

      {/* Top: title + progress */}
      <div className="dir-top">
        <div className="dir-title">{title}</div>
        <div className="dir-progress-row">
          <span className="dir-progress-label">Your Progress</span>
          <span className="dir-progress-value">{percent}%</span>
        </div>
        <div className="dir-bar">
          <div
            className="dir-bar-fill"
            style={{ width: `${percent}%`, background: color, boxShadow: barShadow }}
          />
        </div>
        <span className="dir-complete">Complete</span>
      </div>

      {/* Learn & Understand row */}
      <div className="dir-learn" style={{ background: learnBg }}>
        <div className="learn-bar" />
        <div className="learn-circle">
          <div className="learn-circle-bg" />
          <div className="learn-icon">
            {/* Book icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 4C3 3.44772 3.44772 3 4 3H9V17H4C3.44772 17 3 16.5523 3 16V4Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M17 4C17 3.44772 16.5523 3 16 3H11V17H16C16.5523 17 17 16.5523 17 16V4Z" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="9" y1="3" x2="11" y2="3" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="9" y1="17" x2="11" y2="17" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
        <span className="learn-text">Learn &amp; Understand</span>
      </div>
    </div>
  );
}

import { useState } from 'react';

const categories = [
  { label: 'Assets & Liabilities', color: '#BC8D53', percent: 52 },
  { label: 'Emotional Legacy', color: '#D75C5C', percent: 20 },
  { label: 'Body & Health', color: '#3E8B70', percent: 69 },
  { label: 'Goals & Aspirations', color: '#826B96', percent: 15 },
  { label: 'Will & Legal Actions', color: '#B62818', percent: 10 },
];

export default function RightPanel() {
  const [collapsed, setCollapsed] = useState(false);

  const overall = 34;

  return (
    <aside className="rightpanel-fixed" id="rightPanel">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 300 }}>
        {/* Overall Progress */}
        <div className="progress-overview sidebar-surface">
          <div className="progress-title">Your PlanAfter Progress</div>
          <div className="progress-meta">
            <span className="progress-meta-label">Overall</span>
            <span className="progress-meta-value">
              {overall}<span>%</span>
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${overall}%`,
                background: '#000',
                boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.28), 0px 0px 6px rgba(0,0,0,0.4)',
              }}
            />
          </div>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            <svg
              id="collapseChevron"
              width="8"
              height="4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 8 4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <path d="M1 0.5L4 3.5L7 0.5" />
            </svg>
          </button>
        </div>

        {/* Category Cards */}
        <div
          id="categoryCards"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            width: 300,
            maxHeight: collapsed ? 0 : 'calc(100vh - 350px)',
            overflowY: 'auto',
            transition: 'all 0.5s',
            opacity: collapsed ? 0 : 1,
          }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              className="cat-progress"
              data-color={cat.color}
            >
              <div className="cat-bg" />
              <span className="cat-label">{cat.label}</span>
              <div className="cat-dots">
                <svg width="13" height="3" viewBox="0 0 13 3" fill="none">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="black" />
                  <circle cx="6.5" cy="1.5" r="1.5" fill="black" />
                  <circle cx="11.5" cy="1.5" r="1.5" fill="black" />
                </svg>
              </div>
              <div className="cat-bar-track">
                <div
                  className="cat-bar-fill"
                  style={{
                    width: `${cat.percent}%`,
                    background: cat.color,
                    boxShadow: `inset 0px 1px 0px rgba(255,255,255,0.28), 0px 0px 6px ${cat.color}80`,
                  }}
                />
              </div>
              <span className="cat-percent" style={{ color: cat.color }}>{cat.percent}%</span>
              <span className="cat-complete">Complete Now</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

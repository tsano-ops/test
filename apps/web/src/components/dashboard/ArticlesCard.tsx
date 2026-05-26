import { Sparkles, Check } from 'lucide-react';

export default function ArticlesCard() {
  return (
    <div className="dashboard-card" style={{ width: 600, padding: '28px 24px 0' }}>
      <div className="card-gradient" style={{ height: 280 }} />
      <div className="card-content" style={{ padding: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4, padding: '0 6px' }}>
          <h3 className="card-title">Articles & Resources</h3>
          <span className="articles-new-badge">4 new</span>
        </div>
        <p className="articles-sub" style={{ padding: '0 6px' }}>
          Your <strong>Medical Info is 8% complete</strong> — this article can help
        </p>

        {/* Featured article */}
        <div className="featured-article">
          <div
            className="featured-article-img"
            style={{
              backgroundImage: "url('/images/article-1.png')",
            }}
          />
          <div className="featured-article-overlay" />
          <div className="featured-article-content">
            <div className="featured-ai-label">
              <Sparkles size={10} />
              Recommended for you
            </div>
            <div className="featured-article-title">Navigating Medical Directives with Confidence</div>
            <div className="featured-article-meta">
              <span>6 min read</span>
              <span>·</span>
              <span>Health & Medical</span>
            </div>
          </div>
          {/* Progress ring */}
          <div className="featured-progress-ring">
            <svg viewBox="0 0 42 42" width="42" height="42">
              <circle cx="21" cy="21" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <circle
                cx="21"
                cy="21"
                r="18"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeDasharray={`${0.08 * 2 * Math.PI * 18} ${2 * Math.PI * 18}`}
                strokeLinecap="round"
                transform="rotate(-90 21 21)"
              />
            </svg>
            <span className="fpr-text">8%</span>
          </div>
        </div>

        {/* Small article cards */}
        <div className="articles-small-row">
          <div className="article-small-card">
            <div className="asc-bar" style={{ background: '#657EEA' }} />
            <div
              className="asc-img"
              style={{
                backgroundImage: "url('/images/article-2.png')",
              }}
            />
            <div className="asc-body">
              <div className="asc-cat">Estate Planning</div>
              <div className="asc-title">Understanding the Basics of Estate Planning</div>
              <div className="asc-time">5 min read</div>
            </div>
          </div>
          <div className="article-small-card is-read">
            <div className="asc-bar" style={{ background: '#FF9500' }} />
            <div className="asc-read-check">
              <Check size={12} color="#fff" />
            </div>
            <div
              className="asc-img"
              style={{
                backgroundImage: "url('/images/article-3.png')",
              }}
            />
            <div className="asc-body">
              <div className="asc-cat">Emotional Legacy</div>
              <div className="asc-title">Why an Emotional Legacy Matters</div>
              <div className="asc-time">✓ Read</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="articles-footer">
          <div className="articles-handle" />
          <button className="articles-more">View All Articles</button>
        </div>
      </div>
    </div>
  );
}

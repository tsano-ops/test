import SimpleAccordion from './SimpleAccordion';

export default function EmploymentCard() {
  return (
    <SimpleAccordion
      title="Employment & Affiliations"
      subtitle="Your career history and professional memberships"
    >
      {/* Description */}
      <p className="accordion-desc">
        Your career history and income details are used across legal and financial planning.
        Keep this section updated to accurately reflect your current professional situation.
      </p>

      {/* Edit button */}
      <div className="accordion-edit-row">
        <button className="accordion-edit-btn">
              <span>Edit</span>
              <div className="accordion-edit-btn-wrap">
                <svg viewBox="0 0 20 18" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2.5l3 3L5.5 17.5H2.5v-3L14.5 2.5Z"/>
                </svg>
              </div>
            </button>
      </div>

      <div className="entry-row">
        <div className="entry-dot" style={{ background: '#3E8B70' }} />
        <div className="entry-content">
          <div className="entry-title">Senior Product Manager</div>
          <div className="entry-meta">Acme Corp • 2018–Present</div>
        </div>
        <div className="entry-tag" style={{ background: 'rgba(62,139,112,0.12)', color: '#3E8B70' }}>Current</div>
      </div>
      <div className="entry-row">
        <div className="entry-dot" style={{ background: 'rgba(0,0,0,0.2)' }} />
        <div className="entry-content">
          <div className="entry-title">Product Manager</div>
          <div className="entry-meta">TechStart Inc. • 2013–2018</div>
        </div>
        <div className="entry-tag">Past</div>
      </div>

      <div className="data-row" style={{ marginTop: 12 }}>
        <div className="data-content">
          <div className="data-value">$145,000 / year</div>
          <div className="data-label">Current Compensation</div>
        </div>
      </div>

      <div className="add-entry-btn" style={{ marginTop: 20 }}>
        <div className="add-entry-circle">
          <div className="add-entry-circle-inner">
            <div className="plus-icon" />
          </div>
        </div>
        <span style={{ font: '400 14px/17px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Add Employment Record</span>
      </div>
    </SimpleAccordion>
  );
}

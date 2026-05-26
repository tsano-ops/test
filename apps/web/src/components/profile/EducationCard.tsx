import SimpleAccordion from './SimpleAccordion';

export default function EducationCard() {
  return (
    <SimpleAccordion
      title="Education"
      subtitle="Education & qualifications"
    >
      {/* Description */}
      <p className="accordion-desc">
        Your academic history and qualifications help paint a complete picture of who you are.
        Relevant for legacy planning, professional documents, and your personal story.
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
        <div className="entry-dot" style={{ background: '#657EEA' }} />
        <div className="entry-content">
          <div className="entry-title">B.S. Computer Science</div>
          <div className="entry-meta">MIT • 2003–2007</div>
        </div>
        <div className="entry-tag">Completed</div>
      </div>
      <div className="entry-row">
        <div className="entry-dot" style={{ background: '#657EEA' }} />
        <div className="entry-content">
          <div className="entry-title">MBA, Finance</div>
          <div className="entry-meta">Harvard Business School • 2009–2011</div>
        </div>
        <div className="entry-tag">Completed</div>
      </div>

      <div className="add-entry-btn" style={{ marginTop: 20 }}>
        <div className="add-entry-circle">
          <div className="add-entry-circle-inner">
            <div className="plus-icon" />
          </div>
        </div>
        <span style={{ font: '400 14px/17px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Add Education Record</span>
      </div>
    </SimpleAccordion>
  );
}

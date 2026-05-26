import SimpleAccordion from './SimpleAccordion';

export default function BeliefsCard() {
  return (
    <SimpleAccordion
      title="Beliefs, Hobbies & Interests"
      subtitle="Religion, values, hobbies and personal interests"
    >
      {/* Description */}
      <p className="accordion-desc">
        Your spiritual beliefs and personal values guide how your plan is shaped — from funeral preferences
        to the messages and legacy you leave behind for the people you love.
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

      <div className="data-row">
        <div className="data-content">
          <div className="data-value">Christianity</div>
          <div className="data-label">Religion</div>
        </div>
      </div>
      <div className="data-row">
        <div className="data-content">
          <div className="data-value">Protestant</div>
          <div className="data-label">Denomination</div>
        </div>
      </div>

      <div className="data-group" style={{ marginTop: 16 }}>
        <div className="data-value" style={{ marginBottom: 8 }}>Personal Values</div>
        <div>
          <span className="tag-pill">Family</span>
          <span className="tag-pill">Integrity</span>
          <span className="tag-pill">Community</span>
          <span className="tag-pill">Growth</span>
        </div>
      </div>

      <div className="data-group" style={{ marginTop: 16 }}>
        <div className="data-value" style={{ marginBottom: 8 }}>Hobbies</div>
        <div>
          <span className="tag-pill">Hiking</span>
          <span className="tag-pill">Photography</span>
          <span className="tag-pill">Cooking</span>
          <span className="tag-pill">Reading</span>
        </div>
      </div>

      <div className="data-group" style={{ marginTop: 16 }}>
        <div className="data-value" style={{ marginBottom: 8 }}>Interests</div>
        <div>
          <span className="tag-pill">Sustainability</span>
          <span className="tag-pill">Education</span>
          <span className="tag-pill">Technology</span>
        </div>
      </div>

      <div className="add-entry-btn" style={{ marginTop: 20 }}>
        <div className="add-entry-circle">
          <div className="add-entry-circle-inner">
            <div className="plus-icon" />
          </div>
        </div>
        <span style={{ font: '400 14px/17px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Add Entry</span>
      </div>
    </SimpleAccordion>
  );
}

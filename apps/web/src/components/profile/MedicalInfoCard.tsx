import SimpleAccordion from './SimpleAccordion';

export default function MedicalInfoCard() {
  return (
    <SimpleAccordion
      title="Medical Info"
      subtitle="Health Information & Records"
    >
      {/* Description */}
      <p className="accordion-desc">
        Your health records and emergency information are stored securely here. This ensures your loved ones
        and medical professionals can access critical information when it matters most.
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

      {/* Emergency summary */}
      <div className="emergency-card">
        <div className="ec-title">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v4M8 10v.5M3 14h10L8 3 3 14z" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Emergency Summary
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div className="blood-type-badge">A+</div>
          <div>
            <div style={{ font: '600 14px/17px Inter, sans-serif', color: '#000' }}>Blood Type A+</div>
            <div style={{ font: '400 12px/15px Inter, sans-serif', color: 'rgba(0,0,0,0.5)', marginTop: 4 }}>No known drug allergies</div>
          </div>
        </div>
        <div style={{ font: '600 12px/15px Inter, sans-serif', color: '#000', marginBottom: 6 }}>Allergies</div>
        <div>
          <span className="allergy-tag">Penicillin</span>
          <span className="allergy-tag">Shellfish</span>
        </div>
      </div>

      {/* Conditions */}
      <div className="data-group">
        <div className="data-value" style={{ marginBottom: 10 }}>Active Conditions</div>
        <div className="condition-row">
          <div className="condition-dot" style={{ background: '#FF9500' }} />
          <span style={{ font: '400 14px/17px Inter, sans-serif' }}>Type 2 Diabetes — Controlled</span>
        </div>
        <div className="condition-row">
          <div className="condition-dot" style={{ background: '#657EEA' }} />
          <span style={{ font: '400 14px/17px Inter, sans-serif' }}>Hypertension — Monitored</span>
        </div>
      </div>

      <div className="data-row">
        <div className="data-content">
          <div className="data-value">Dr. Michael Chen</div>
          <div className="data-label">Primary Physician</div>
        </div>
      </div>

      {/* Add entry */}
      <div className="add-entry-btn" style={{ marginTop: 20 }}>
        <div className="add-entry-circle">
          <div className="add-entry-circle-inner">
            <div className="plus-icon" />
          </div>
        </div>
        <span style={{ font: '400 14px/17px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Add Medical Record</span>
      </div>
    </SimpleAccordion>
  );
}

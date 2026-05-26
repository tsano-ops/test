import SimpleAccordion from './SimpleAccordion';

export default function RolesAccessCard() {
  return (
    <SimpleAccordion
      title="Roles & Access"
      subtitle="Plan permissions and delegate access"
    >
      {/* Description */}
      <p className="accordion-desc">
        Control who can access and act on your plan. Assign roles carefully — they carry legal and
        practical weight in how your wishes are carried out.
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
        <div className="fr-avatar" style={{ width: 36, height: 36, minWidth: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.4)' }}>JJ</div>
        <div className="entry-content" style={{ marginLeft: 12 }}>
          <div className="entry-title">James Johnson</div>
          <div className="entry-meta">Executor • Full Access</div>
        </div>
        <div className="entry-tag" style={{ background: 'rgba(101,126,234,0.12)', color: '#657EEA' }}>Executor</div>
      </div>

      <div className="entry-row">
        <div className="fr-avatar" style={{ width: 36, height: 36, minWidth: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.4)' }}>HS</div>
        <div className="entry-content" style={{ marginLeft: 12 }}>
          <div className="entry-title">Helen Smith</div>
          <div className="entry-meta">Advisor • View Only</div>
        </div>
        <div className="entry-tag">Advisor</div>
      </div>

      <div className="add-entry-btn" style={{ marginTop: 20 }}>
        <div className="add-entry-circle">
          <div className="add-entry-circle-inner">
            <div className="plus-icon" />
          </div>
        </div>
        <span style={{ font: '400 14px/17px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Invite Someone</span>
      </div>
    </SimpleAccordion>
  );
}

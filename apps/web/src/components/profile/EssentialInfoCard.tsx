import { useState } from 'react';

export default function EssentialInfoCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion-section essential-info-card ${open ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <div>
          <div className="accordion-title">Essential Info</div>
          <div className="accordion-subtitle">Your core identity information - the foundation of your entire plan</div>
        </div>
        <div className="accordion-header-right">
          <svg className="accordion-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="accordion-body">
        <div className="accordion-inner">
          {/* Description */}
          <p className="accordion-desc">
            All core identity details and important documents are kept here in one organised space.
            You no longer need to search through folders or messages — everything essential about you
            is always one click away. A complete profile strengthens your entire plan and ensures your
            loved ones can quickly find the information they may one day need.
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

          {/* Avatar + name row */}
          <div className="ei-avatar-row">
            <div className="ei-avatar-container">
              <div className="ei-avatar-shadow" />
              <img className="ei-avatar-photo" src="/images/profile.png" alt="Sarah Johnson" />
              <div className="ei-life-dot" />
            </div>
            <div className="ei-name-block">
              <div className="ei-field-value">Sarah Robert Johnson</div>
              <div className="ei-field-label">Full Name</div>
              <div className="ei-field-value" style={{ marginTop: 8 }}>Robert</div>
              <div className="ei-field-label">Middle Name</div>
            </div>
          </div>

          {/* Data fields */}
          <div className="ei-fields">
            <div className="ei-field">
              <div className="ei-field-value">Female</div>
              <div className="ei-field-label">Gender</div>
            </div>
            <div className="ei-field">
              <div className="ei-field-value">July 22, 1980</div>
              <div className="ei-field-label">Date of Birth</div>
            </div>
            <div className="ei-field">
              <div className="ei-field-value">New York, United States</div>
              <div className="ei-field-label">Place of Birth</div>
            </div>
            <div className="ei-field">
              <div className="ei-field-value">United States, Canada, United Kingdom</div>
              <div className="ei-field-label">Citizenship(s)</div>
            </div>
            <div className="ei-field">
              <div className="ei-field-value">United Kingdom</div>
              <div className="ei-field-label">Primary Nationality</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

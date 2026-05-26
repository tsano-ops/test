import SimpleAccordion from './SimpleAccordion';

export default function ContactInfoCard() {
  return (
    <SimpleAccordion
      title="Contact Info"
      subtitle="Your key contact details"
    >
      {/* Description */}
      <p className="accordion-desc">
        These contact details are used by PlanAfter for identity verification, system notifications,
        and workflow execution. Accurate data is required for security controls, legal template logic,
        and post-loss activation.
      </p>

      <div className="ci-body">

        {/* ── E-mails ── */}
        <div className="ci-section" id="ci-emails">
          <div className="ci-group-title">
            <div className="ci-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.4 7"/>
              </svg>
            </div>
            <span className="ci-title-text">E-mails</span>
            <span className="ci-spacer" />
            <div className="dgt-dots">
              <svg viewBox="0 0 13 3" fill="#000">
                <circle cx="1.5" cy="1.5" r="1.5"/>
                <circle cx="6.5" cy="1.5" r="1.5"/>
                <circle cx="11.5" cy="1.5" r="1.5"/>
              </svg>
            </div>
            {/* Edit btn – shown in edit mode */}
            <div className="ci-edit-btn-wrap">
              <span className="ci-edit-text">Edit</span>
              <div className="ci-edit-icon-wrap">
                <svg viewBox="0 0 20 18" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 1.5l2 2L5 15H3v-2L14.5 1.5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Read mode */}
          <div className="ci-primary-card is-primary">
            <div className="data-value">sarah.johnson@email.com</div>
            <div className="data-label">Primary E-mail (Login)</div>
          </div>
          <div className="ci-extra-group">
            <div className="data-value">s.johnson_80@email.com</div>
            <div className="data-value" style={{ marginTop: 2 }}>sarah.j@email.com</div>
            <div className="data-label">Additional E-mail(s)</div>
          </div>
        </div>

        {/* ── Phone Numbers ── */}
        <div className="ci-section" id="ci-phones">
          <div className="ci-group-title">
            <div className="ci-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="4"/>
                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/>
              </svg>
            </div>
            <span className="ci-title-text">Phone Numbers</span>
            <span className="ci-spacer" />
            <div className="dgt-dots">
              <svg viewBox="0 0 13 3" fill="#000">
                <circle cx="1.5" cy="1.5" r="1.5"/>
                <circle cx="6.5" cy="1.5" r="1.5"/>
                <circle cx="11.5" cy="1.5" r="1.5"/>
              </svg>
            </div>
            <div className="ci-edit-btn-wrap">
              <span className="ci-edit-text">Edit</span>
              <div className="ci-edit-icon-wrap">
                <svg viewBox="0 0 20 18" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 1.5l2 2L5 15H3v-2L14.5 1.5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Read mode */}
          <div className="ci-primary-card is-primary">
            <div className="data-value">+1 555 123 4567</div>
            <div className="data-label">Primary Phone Number</div>
          </div>
          <div className="ci-extra-group">
            <div className="data-value">+1 555 345 6789</div>
            <div className="data-label">Additional Phone Number(s)</div>
          </div>
        </div>

        {/* ── Addresses ── */}
        <div className="ci-section" id="ci-addresses">
          <div className="ci-group-title">
            <div className="ci-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <span className="ci-title-text">Addresses</span>
            <span className="ci-spacer" />
            <div className="dgt-dots">
              <svg viewBox="0 0 13 3" fill="#000">
                <circle cx="1.5" cy="1.5" r="1.5"/>
                <circle cx="6.5" cy="1.5" r="1.5"/>
                <circle cx="11.5" cy="1.5" r="1.5"/>
              </svg>
            </div>
            <div className="ci-edit-btn-wrap">
              <span className="ci-edit-text">Edit</span>
              <div className="ci-edit-icon-wrap">
                <svg viewBox="0 0 20 18" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 1.5l2 2L5 15H3v-2L14.5 1.5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Read mode */}
          <div className="ci-primary-card is-primary">
            <div className="data-value">
              2 Lyndewode Road<br/>
              Cambridge<br/>
              CB2 1TN<br/>
              United Kingdom
            </div>
            <div className="data-label">Primary Address</div>
          </div>
        </div>

        {/* ── Social Media ── */}
        <div className="ci-section" id="ci-social">
          <div className="ci-group-title">
            <div className="ci-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </div>
            <span className="ci-title-text">Social Media</span>
            <span className="ci-spacer" />
            <div className="dgt-dots">
              <svg viewBox="0 0 13 3" fill="#000">
                <circle cx="1.5" cy="1.5" r="1.5"/>
                <circle cx="6.5" cy="1.5" r="1.5"/>
                <circle cx="11.5" cy="1.5" r="1.5"/>
              </svg>
            </div>
            <div className="ci-edit-btn-wrap">
              <span className="ci-edit-text">Edit</span>
              <div className="ci-edit-icon-wrap">
                <svg viewBox="0 0 20 18" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 1.5l2 2L5 15H3v-2L14.5 1.5z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="ci-extra-group">
            <div className="data-value">linkedin.com/in/sarah-johnson</div>
            <div className="data-value" style={{ marginTop: 2 }}>facebook.com/sarah.johnson</div>
            <div className="data-label">Social Profiles</div>
          </div>
        </div>

      </div>
    </SimpleAccordion>
  );
}

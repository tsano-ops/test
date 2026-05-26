import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

/**
 * ProfileHeaderCard — rebuilt from XD Screen 1 specs exactly.
 *
 * XD Layout:
 * - Card (#22): 600x308 at x:660 y:100, bg #FFFFFF, shadow 0px 10px 30px #00000029, border 1px solid #FFFFFF, radius 30px, blur(10px)
 * - Gradient (#03): 600x154, linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%), radius 30px 30px 0 0
 * - Back pad (#04): 60x60 at x:690 y:130, bg #FFFFFF, radius 30px, opacity 0 → 1 on hover, Ease Out 0.2s
 * - Back text (#05): "Back" at x:750 y:150, Inter Regular 16px/24px, #000000
 * - Verification (#83): 117x50 at x:1143 y:135, 6 states
 * - Info icon (#84): 20x20 at x:1225 y:150, border 2px solid #FF0000
 * - Avatar wrap (#11): 80x80 at x:680 y:200, bg #FFFFFF, opacity 0.33
 * - Profile img (#16): 60x60 at x:690 y:210, circular
 * - Life dot: 8x8, bg #61C553
 * - Name (#17): "Sarah Johnson" at x:770 y:216, Inter SemiBold 20px/24px, #000000
 * - Breadcrumb (#86): 140x15 at x:770 y:244, Inter Regular 12px/15px
 * - DOB label: Inter Regular 12px/15px, #000000, opacity 0.5
 * - DOB value (#24): Inter SemiBold 14px/17px, #000000
 * - Age label: Inter Regular 12px/15px, #000000, opacity 0.5
 * - Age value (#26): Inter SemiBold 14px/17px, #000000
 * - Role label (#27): Inter Regular 12px/15px, #000000, opacity 0.5
 * - Role value (#28): Inter SemiBold 14px/17px, #000000
 * - Shared To label (#31): Inter Regular 12px/15px, #000000, opacity 0.5
 * - Shared To avatars (#32-33): 40x40, overlapping
 * - Black bar (#12): 50x308, bg #000000, radius 0 30px 30px 0
 * - Bar icons: white, opacity 0.5, hover → 1, Ease Out 0.2s
 *   - Verify info (#84): 20x20, border 2px solid #FF0000
 *   - User-plus (#87): 20x20, border 2px solid #FFFFFF, opacity 0.5
 *   - Download (#30): pad 50x50, opacity 0
 *   - Share (#35): 20x16, border 2px solid #FFFFFF, opacity 0.5
 */
interface ProfileHeaderCardProps {
  onPrintClick?: () => void;
}

export default function ProfileHeaderCard({ onPrintClick }: ProfileHeaderCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const profile = user?.profile;

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : 'Sarah Johnson';

  const dob = profile?.dateOfBirth
    ? new Date(profile.dateOfBirth)
    : new Date('1980-07-22');
  const age = new Date().getFullYear() - dob.getFullYear();
  const dobFormatted = dob.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="xd-profile-card">
      {/* XD #03: Gradient top 600x154 */}
      <div className="xd-gradient-top" />

      {/* XD #04-05: Back button */}
      <div className="xd-back-btn" onClick={() => navigate('/dashboard')}>
        <div className="xd-back-pad" />
        <svg className="xd-back-arrow" width="9" height="16" viewBox="0 0 9 16" fill="none">
          <path d="M8 1L1 8L8 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="xd-back-text">Back</span>
      </div>

      {/* XD #83-84: Verification badge */}
      <div className="xd-verification" data-status="unverified">
        <span className="xd-verification-text">Unverified</span>
        <svg className="xd-verification-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#FF0000" strokeWidth="2"/>
          <line x1="12" y1="8" x2="12" y2="13" stroke="#FF0000" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="16.5" r="1" fill="#FF0000"/>
        </svg>
      </div>

      {/* XD #11: Avatar wrap 80x80, opacity 0.33 */}
      <div className="xd-avatar-wrap">
        <div className="xd-avatar-shadow" />
        {profile?.photoUrl ? (
          <img className="xd-avatar-img" src={profile.photoUrl} alt={displayName} />
        ) : (
          <img className="xd-avatar-img" src="/images/profile.png" alt={displayName} />
        )}
        {/* XD #20: Green dot 8x8 #61C553 */}
        <div className="xd-life-dot" />
      </div>

      {/* XD #17: Title group */}
      <div className="xd-profile-info">
        {/* XD: "Sarah Johnson" Inter SemiBold 20px/24px #000 */}
        <div className="xd-profile-name">{displayName}</div>
        {/* XD #86: Breadcrumb 140x15 */}
        <div className="xd-breadcrumb">
          <span className="xd-breadcrumb-item">My Profile</span>
          <span className="xd-breadcrumb-dot">•</span>
          <span className="xd-breadcrumb-item">This is You</span>
        </div>

        {/* XD #23-26: DOB + Age row */}
        <div className="xd-meta-row">
          <span className="xd-meta-bullet">•</span>
          <span className="xd-meta-label">Date of Birth:</span>
          <span className="xd-meta-value">{dobFormatted}</span>
          <span className="xd-meta-separator">•</span>
          <span className="xd-meta-label">Age:</span>
          <span className="xd-meta-value">{age}</span>
        </div>

        {/* XD #27-28: Role row */}
        <div className="xd-meta-row">
          <span className="xd-meta-bullet">•</span>
          <span className="xd-meta-label">Role in Your Plan:</span>
          <span className="xd-meta-value">Plan Owner</span>
        </div>

        {/* XD #31-33: Shared To */}
        <div className="xd-meta-row">
          <span className="xd-meta-bullet">•</span>
          <span className="xd-meta-label">Shared To:</span>
          <div className="xd-shared-avatars">
            <img src="/images/person-3.png" alt="" className="xd-shared-avatar" />
            <img src="/images/person-4.png" alt="" className="xd-shared-avatar" />
          </div>
        </div>
      </div>

      {/* XD #12: Black bar 50x308, bg #000, radius 0 30px 30px 0 */}
      <div className="xd-black-bar">
        {/* XD #84: Verify icon — red info */}
        <div className="xd-bar-icon-wrap" data-label="Verify">
          <svg className="xd-bar-icon xd-bar-icon-red" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#FF0000" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="13" stroke="#FF0000" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="16.5" r="1" fill="#FF0000"/>
          </svg>
        </div>

        {/* XD #87: Add Family — user-plus */}
        <div className="xd-bar-icon-wrap" data-label="Add Family">
          <svg className="xd-bar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
        </div>

        {/* XD #29-30: Download */}
        <div className="xd-bar-icon-wrap" data-label="Download" onClick={onPrintClick} style={{ cursor: 'pointer' }}>
          <svg className="xd-bar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </div>

        {/* XD #34-35: Share */}
        <div className="xd-bar-icon-wrap" data-label="Share">
          <svg className="xd-bar-icon" width="20" height="16" viewBox="0 0 24 20" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

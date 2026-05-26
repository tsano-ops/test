import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileHeaderCard from '@/components/profile/ProfileHeaderCard';
import ProfileTabs from '@/components/profile/ProfileTabs';
import EssentialInfoCard from '@/components/profile/EssentialInfoCard';
import ContactInfoCard from '@/components/profile/ContactInfoCard';
import FamilyRecordsCard from '@/components/profile/FamilyRecordsCard';
import MedicalInfoCard from '@/components/profile/MedicalInfoCard';
import EducationCard from '@/components/profile/EducationCard';
import EmploymentCard from '@/components/profile/EmploymentCard';
import BeliefsCard from '@/components/profile/BeliefsCard';
import RolesAccessCard from '@/components/profile/RolesAccessCard';
import TasksRemindersCard from '@/components/profile/TasksRemindersCard';
import SharedWithCard from '@/components/profile/SharedWithCard';
import ProfilePrint from '@/components/profile/ProfilePrint';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPrint, setShowPrint] = useState(false);

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="greeting-zone">
        <h1 className="greeting-text" id="greetingText">My Profile</h1>
      </div>

      {/* Profile Content */}
      <main className="page active" id="page-profile">
        <div className="page-transition" style={{ gap: '10px', alignItems: 'center' }}>
          <ProfileHeaderCard onPrintClick={() => setShowPrint(true)} />
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'overview' && (
            <div className="profile-tab-content active" data-tab-content="overview">
              <EssentialInfoCard />
              <ContactInfoCard />
              <FamilyRecordsCard />
              <MedicalInfoCard />
              <EducationCard />
              <EmploymentCard />
              <BeliefsCard />
              <RolesAccessCard />
              <TasksRemindersCard />
              <SharedWithCard />
            </div>
          )}
        </div>
      </main>

      {showPrint && <ProfilePrint onClose={() => setShowPrint(false)} />}
    </DashboardLayout>
  );
}

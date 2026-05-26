import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthLayout from '@/components/layout/AuthLayout';
import { usersApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';
import BtnBack from '@/components/ui/BtnBack';
import BtnSubmit from '@/components/ui/BtnSubmit';

const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine(
    (val) => {
      const dob = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dob >= today) return false;
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
      sixteenYearsAgo.setHours(0, 0, 0, 0);
      return dob <= sixteenYearsAgo;
    },
    { message: 'You must be at least 16 years old to use PlanAfter.' },
  ),
  gender: z.enum(['MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY']),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'DOMESTIC_PARTNERSHIP', 'SEPARATED']),
});

const step2Schema = z.object({
  nationality: z.string().min(1, 'Nationality is required'),
  countryOfResidence: z.string().min(1, 'Country of residence is required'),
  stateRegion: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

interface OnboardingDraft {
  step: number;
  step1Data: Partial<Step1Data>;
  step2Data: Partial<Step2Data>;
}

const DRAFT_KEY = 'onboarding-draft';

const selectStyle: React.CSSProperties = {
  width: '100%',
  height: 60,
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: 12,
  padding: '0 20px',
  fontSize: 16,
  fontWeight: 600,
  color: '#000',
  outline: 'none',
  boxShadow: '0 3px 6px rgba(0,0,0,0.06)',
  appearance: 'none',
  WebkitAppearance: 'none',
  cursor: 'pointer',
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [error, setError] = useState('');

  const form1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema) });
  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema) });

  // Restore draft on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft: OnboardingDraft = JSON.parse(raw);

      // Restore step 1 fields
      if (draft.step1Data) {
        if (draft.step1Data.firstName) form1.setValue('firstName', draft.step1Data.firstName);
        if (draft.step1Data.lastName) form1.setValue('lastName', draft.step1Data.lastName);
        if (draft.step1Data.dateOfBirth) form1.setValue('dateOfBirth', draft.step1Data.dateOfBirth);
        if (draft.step1Data.gender) form1.setValue('gender', draft.step1Data.gender);
        if (draft.step1Data.maritalStatus) form1.setValue('maritalStatus', draft.step1Data.maritalStatus);
      }

      // If draft was on step 2, restore step2 fields and jump ahead
      if (draft.step === 2 && draft.step1Data) {
        setStep1Data(draft.step1Data as Step1Data);
        setStep(2);
        if (draft.step2Data) {
          if (draft.step2Data.nationality) form2.setValue('nationality', draft.step2Data.nationality);
          if (draft.step2Data.countryOfResidence) form2.setValue('countryOfResidence', draft.step2Data.countryOfResidence);
          if (draft.step2Data.stateRegion) form2.setValue('stateRegion', draft.step2Data.stateRegion);
        }
      }
    } catch {
      // Ignore corrupt draft
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save draft on field changes
  const watchedStep1 = form1.watch();
  const watchedStep2 = form2.watch();

  useEffect(() => {
    const draft: OnboardingDraft = {
      step,
      step1Data: {
        firstName: watchedStep1.firstName,
        lastName: watchedStep1.lastName,
        dateOfBirth: watchedStep1.dateOfBirth,
        gender: watchedStep1.gender,
        maritalStatus: watchedStep1.maritalStatus,
      },
      step2Data: {
        nationality: watchedStep2.nationality,
        countryOfResidence: watchedStep2.countryOfResidence,
        stateRegion: watchedStep2.stateRegion,
      },
    };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [
    step,
    watchedStep1.firstName,
    watchedStep1.lastName,
    watchedStep1.dateOfBirth,
    watchedStep1.gender,
    watchedStep1.maritalStatus,
    watchedStep2.nationality,
    watchedStep2.countryOfResidence,
    watchedStep2.stateRegion,
  ]);

  function handleSaveAndExit() {
    const draft: OnboardingDraft = {
      step,
      step1Data: {
        firstName: form1.getValues('firstName'),
        lastName: form1.getValues('lastName'),
        dateOfBirth: form1.getValues('dateOfBirth'),
        gender: form1.getValues('gender'),
        maritalStatus: form1.getValues('maritalStatus'),
      },
      step2Data: {
        nationality: form2.getValues('nationality'),
        countryOfResidence: form2.getValues('countryOfResidence'),
        stateRegion: form2.getValues('stateRegion'),
      },
    };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    navigate('/login');
  }

  function handleStep1(data: Step1Data) {
    setStep1Data(data);
    setStep(2);
  }

  async function handleStep2(data: Step2Data) {
    if (!step1Data) return;
    try {
      setError('');
      await usersApi.upsertProfile({ ...step1Data, ...data });
      if (user) {
        setUser({
          ...user,
          onboardingCompleted: true,
          profile: {
            id: '',
            firstName: step1Data.firstName,
            lastName: step1Data.lastName,
            dateOfBirth: step1Data.dateOfBirth,
            gender: step1Data.gender,
            maritalStatus: step1Data.maritalStatus,
            nationality: data.nationality,
            countryOfResidence: data.countryOfResidence,
            stateRegion: data.stateRegion,
          },
        });
      }
      sessionStorage.removeItem(DRAFT_KEY);
      navigate('/setup-complete');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <AuthLayout>
      {/* Step dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {[1, 2].map((s) => (
          <div
            key={s}
            style={{
              height: 4,
              borderRadius: 2,
              background: s <= step ? '#000' : '#e0e0e0',
              width: s <= step ? 32 : 20,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {step === 1 && (
        <>
          <h2 className="auth-title">Tell us about yourself</h2>
          <p className="auth-subtitle">This creates your PlanAfter profile</p>

          {error && (
            <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, fontSize: 13, color: '#e74c3c' }}>
              {error}
            </div>
          )}

          <form onSubmit={form1.handleSubmit(handleStep1)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="auth-input-wrap">
                <label>First Name *</label>
                <input className="auth-input" placeholder="Sarah" {...form1.register('firstName')} />
                {form1.formState.errors.firstName && (
                  <p className="auth-input-error">{form1.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="auth-input-wrap">
                <label>Last Name *</label>
                <input className="auth-input" placeholder="Johnson" {...form1.register('lastName')} />
                {form1.formState.errors.lastName && (
                  <p className="auth-input-error">{form1.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="auth-input-wrap">
              <label>Date of Birth *</label>
              <input className="auth-input" type="date" {...form1.register('dateOfBirth')} />
              {form1.formState.errors.dateOfBirth && (
                <p className="auth-input-error">{form1.formState.errors.dateOfBirth.message}</p>
              )}
            </div>

            <div className="auth-input-wrap">
              <label>Gender *</label>
              <div style={{ position: 'relative' }}>
                <select style={selectStyle} {...form1.register('gender')}>
                  <option value="">Select gender</option>
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                  <option value="NON_BINARY">Non-binary</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
                <svg style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              {form1.formState.errors.gender && (
                <p className="auth-input-error">{form1.formState.errors.gender.message}</p>
              )}
            </div>

            <div className="auth-input-wrap">
              <label>Marital Status *</label>
              <div style={{ position: 'relative' }}>
                <select style={selectStyle} {...form1.register('maritalStatus')}>
                  <option value="">Select status</option>
                  <option value="SINGLE">Single</option>
                  <option value="MARRIED">Married</option>
                  <option value="DOMESTIC_PARTNERSHIP">Domestic Partnership</option>
                  <option value="DIVORCED">Divorced</option>
                  <option value="SEPARATED">Separated</option>
                  <option value="WIDOWED">Widowed</option>
                </select>
                <svg style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              {form1.formState.errors.maritalStatus && (
                <p className="auth-input-error">{form1.formState.errors.maritalStatus.message}</p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
              <BtnBack onClick={() => navigate(-1)} />

              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <BtnBack label="Save & Exit" onClick={handleSaveAndExit} />
                <BtnSubmit label="Continue" />
              </div>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="auth-title">Where are you based?</h2>
          <p className="auth-subtitle">Helps us tailor legal and planning information to your location</p>

          {error && (
            <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, fontSize: 13, color: '#e74c3c' }}>
              {error}
            </div>
          )}

          <form onSubmit={form2.handleSubmit(handleStep2)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="auth-input-wrap">
              <label>Nationality *</label>
              <input className="auth-input" placeholder="e.g. American, British" {...form2.register('nationality')} />
              {form2.formState.errors.nationality && (
                <p className="auth-input-error">{form2.formState.errors.nationality.message}</p>
              )}
            </div>

            <div className="auth-input-wrap">
              <label>Country of Residence *</label>
              <input className="auth-input" placeholder="e.g. United States" {...form2.register('countryOfResidence')} />
              {form2.formState.errors.countryOfResidence && (
                <p className="auth-input-error">{form2.formState.errors.countryOfResidence.message}</p>
              )}
            </div>

            <div className="auth-input-wrap">
              <label>State / Region</label>
              <input className="auth-input" placeholder="e.g. New York" {...form2.register('stateRegion')} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
              <BtnBack onClick={() => setStep(1)} />

              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <BtnBack label="Save & Exit" onClick={handleSaveAndExit} />
                <BtnSubmit
                  label="Go to My Plan"
                  disabled={form2.formState.isSubmitting}
                  loading={form2.formState.isSubmitting}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </AuthLayout>
  );
}

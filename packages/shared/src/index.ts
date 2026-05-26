// ═══════════════════════════════════════════════
// PlanAfter Shared Types & Constants
// ═══════════════════════════════════════════════

// ─── Plan Types ────────────────────────────────
export const PLAN_TYPES = {
  INDIVIDUAL: { name: 'Individual', priceYear: 100, priceMonth: 10, currency: 'EUR' },
  FAMILY: { name: 'Family', priceYear: 180, pricePerPerson: 90, currency: 'EUR' },
  PREMIUM: { name: 'Premium', priceYear: 220, currency: 'EUR' },
} as const;

// ─── Onboarding Steps ──────────────────────────
export const ONBOARDING_STEPS = [
  'personal_info',
  'gender',
  'marital_status',
  'children',
  'employment',
  'real_estate',
  'investments',
  'business',
  'crypto',
  'intellectual_property',
  'insurance',
  'will_testament',
  'planning_priorities',
  'review',
] as const;

export const TOTAL_ONBOARDING_STEPS = ONBOARDING_STEPS.length;

// ─── Asset Categories ──────────────────────────
export const ASSET_CATEGORIES = [
  { id: 'FINANCIAL_ACCOUNTS', label: 'Financial Accounts & Instruments', icon: 'landmark' },
  { id: 'CRYPTO_BLOCKCHAIN', label: 'Crypto & Blockchain', icon: 'bitcoin' },
  { id: 'REAL_ESTATE', label: 'Real Estate', icon: 'home' },
  { id: 'VEHICLES', label: 'Vehicles', icon: 'car' },
  { id: 'DIGITAL_ONLINE', label: 'Digital & Online', icon: 'globe' },
  { id: 'PERSONAL_PROPERTY', label: 'Personal Property', icon: 'gem' },
  { id: 'BUSINESS_INTERESTS', label: 'Business Interests', icon: 'briefcase' },
  { id: 'INTELLECTUAL_PROPERTY', label: 'Intellectual Property', icon: 'lightbulb' },
  { id: 'OTHER', label: 'Other', icon: 'package' },
] as const;

// ─── Share Roles ───────────────────────────────
export const SHARE_ROLES = {
  EXECUTOR: { label: 'Executor', description: 'Manages your plan after passing' },
  CONTRIBUTOR: { label: 'Contributor', description: 'Can edit specific sections' },
  BENEFICIARY: { label: 'Beneficiary', description: 'Designated to receive assets/info' },
  VIEWER: { label: 'Viewer', description: 'Read-only access to shared sections' },
} as const;

// ─── Progress Categories ───────────────────────
export const PROGRESS_CATEGORIES = [
  'Assets & Liabilities',
  'Emotional Legacy',
  'Body & Health',
  'Goals & Aspirations',
  'Will & Legal Actions',
] as const;

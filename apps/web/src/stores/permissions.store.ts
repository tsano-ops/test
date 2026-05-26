import { create } from 'zustand';

export type PermissionLevel = 'none' | 'view' | 'suggest' | 'edit' | 'full';

export type PlatformSection =
  | 'profile'
  | 'family'
  | 'network'
  | 'assets'
  | 'health'
  | 'legacy'
  | 'goals'
  | 'will'
  | 'vault'
  | 'tasks'
  | 'post_loss'
  | 'settings'
  | 'sharing';

const ROLE_PERMISSIONS: Record<string, Record<PlatformSection, PermissionLevel>> = {
  PLAN_OWNER: {
    profile: 'full', family: 'full', network: 'full', assets: 'full',
    health: 'full', legacy: 'full', goals: 'full', will: 'full',
    vault: 'full', tasks: 'full', post_loss: 'full', settings: 'full', sharing: 'full',
  },
  EXECUTOR: {
    profile: 'view', family: 'view', network: 'view', assets: 'view',
    health: 'view', legacy: 'view', goals: 'none', will: 'view',
    vault: 'view', tasks: 'edit', post_loss: 'edit', settings: 'none', sharing: 'none',
  },
  CONTRIBUTOR: {
    profile: 'none', family: 'suggest', network: 'suggest', assets: 'suggest',
    health: 'none', legacy: 'none', goals: 'none', will: 'none',
    vault: 'none', tasks: 'suggest', post_loss: 'none', settings: 'none', sharing: 'none',
  },
  BENEFICIARY: {
    profile: 'none', family: 'none', network: 'none', assets: 'view',
    health: 'none', legacy: 'view', goals: 'none', will: 'view',
    vault: 'view', tasks: 'none', post_loss: 'view', settings: 'none', sharing: 'none',
  },
  VIEWER: {
    profile: 'view', family: 'view', network: 'none', assets: 'none',
    health: 'none', legacy: 'none', goals: 'none', will: 'none',
    vault: 'none', tasks: 'none', post_loss: 'none', settings: 'none', sharing: 'none',
  },
};

interface PermissionsState {
  currentRole: string;
  viewingPlanOwnerId: string | null;
  setRole: (role: string) => void;
  setViewingPlan: (ownerId: string | null) => void;
  canView: (section: PlatformSection) => boolean;
  canEdit: (section: PlatformSection) => boolean;
  canSuggest: (section: PlatformSection) => boolean;
  getPermission: (section: PlatformSection) => PermissionLevel;
  isPlanOwner: () => boolean;
}

export const usePermissionsStore = create<PermissionsState>((set, get) => ({
  currentRole: 'PLAN_OWNER',
  viewingPlanOwnerId: null,

  setRole: (role: string) => set({ currentRole: role }),
  setViewingPlan: (ownerId: string | null) => set({ viewingPlanOwnerId: ownerId }),

  getPermission: (section: PlatformSection): PermissionLevel => {
    const role = get().currentRole;
    return ROLE_PERMISSIONS[role]?.[section] ?? 'none';
  },

  canView: (section: PlatformSection): boolean => {
    const level = get().getPermission(section);
    return level !== 'none';
  },

  canEdit: (section: PlatformSection): boolean => {
    const level = get().getPermission(section);
    return level === 'edit' || level === 'full';
  },

  canSuggest: (section: PlatformSection): boolean => {
    const level = get().getPermission(section);
    return level === 'suggest' || level === 'edit' || level === 'full';
  },

  isPlanOwner: (): boolean => get().currentRole === 'PLAN_OWNER',
}));

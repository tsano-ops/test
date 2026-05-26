/**
 * PlanAfter Role-Based Permission Matrix
 *
 * Defines what each role can do across platform sections.
 */

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

export type PermissionLevel = 'none' | 'view' | 'suggest' | 'edit' | 'full';

export const ROLE_PERMISSIONS: Record<string, Record<PlatformSection, PermissionLevel>> = {
  PLAN_OWNER: {
    profile: 'full',
    family: 'full',
    network: 'full',
    assets: 'full',
    health: 'full',
    legacy: 'full',
    goals: 'full',
    will: 'full',
    vault: 'full',
    tasks: 'full',
    post_loss: 'full',
    settings: 'full',
    sharing: 'full',
  },
  EXECUTOR: {
    profile: 'view',
    family: 'view',
    network: 'view',
    assets: 'view',
    health: 'view',
    legacy: 'view',
    goals: 'none',
    will: 'view',
    vault: 'view',
    tasks: 'edit',
    post_loss: 'edit',
    settings: 'none',
    sharing: 'none',
  },
  CONTRIBUTOR: {
    profile: 'none',
    family: 'suggest',
    network: 'suggest',
    assets: 'suggest',
    health: 'none',
    legacy: 'none',
    goals: 'none',
    will: 'none',
    vault: 'none',
    tasks: 'suggest',
    post_loss: 'none',
    settings: 'none',
    sharing: 'none',
  },
  BENEFICIARY: {
    profile: 'none',
    family: 'none',
    network: 'none',
    assets: 'view',
    health: 'none',
    legacy: 'view',
    goals: 'none',
    will: 'view',
    vault: 'view',
    tasks: 'none',
    post_loss: 'view',
    settings: 'none',
    sharing: 'none',
  },
  VIEWER: {
    profile: 'view',
    family: 'view',
    network: 'none',
    assets: 'none',
    health: 'none',
    legacy: 'none',
    goals: 'none',
    will: 'none',
    vault: 'none',
    tasks: 'none',
    post_loss: 'none',
    settings: 'none',
    sharing: 'none',
  },
};

export function getPermission(role: string, section: PlatformSection): PermissionLevel {
  return ROLE_PERMISSIONS[role]?.[section] ?? 'none';
}

export function canView(role: string, section: PlatformSection): boolean {
  const level = getPermission(role, section);
  return level !== 'none';
}

export function canEdit(role: string, section: PlatformSection): boolean {
  const level = getPermission(role, section);
  return level === 'edit' || level === 'full';
}

export function canSuggest(role: string, section: PlatformSection): boolean {
  const level = getPermission(role, section);
  return level === 'suggest' || level === 'edit' || level === 'full';
}

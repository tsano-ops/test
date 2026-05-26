import { usePermissionsStore, PlatformSection } from '@/stores/permissions.store';

export function usePermission(section: PlatformSection) {
  const { canView, canEdit, canSuggest, getPermission, isPlanOwner } = usePermissionsStore();

  return {
    level: getPermission(section),
    canView: canView(section),
    canEdit: canEdit(section),
    canSuggest: canSuggest(section),
    isPlanOwner: isPlanOwner(),
    isReadOnly: !canEdit(section) && canView(section),
  };
}

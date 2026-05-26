import { ReactNode } from 'react';
import { usePermissionsStore, PlatformSection } from '@/stores/permissions.store';

interface Props {
  section: PlatformSection;
  requiredLevel?: 'view' | 'suggest' | 'edit' | 'full';
  children: ReactNode;
  fallback?: ReactNode;
}

export default function PermissionGate({ section, requiredLevel = 'view', children, fallback = null }: Props) {
  const { getPermission } = usePermissionsStore();
  const level = getPermission(section);

  const LEVELS = ['none', 'view', 'suggest', 'edit', 'full'];
  const userIndex = LEVELS.indexOf(level);
  const requiredIndex = LEVELS.indexOf(requiredLevel);

  if (userIndex < requiredIndex) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

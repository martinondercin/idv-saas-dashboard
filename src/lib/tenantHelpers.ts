import type { TenantStatus } from "@/types/tenant";
import type { StatusBadgeProps } from "@/components/ui/status-badge";

export function mapTenantStatusToBadge(status: TenantStatus): StatusBadgeProps['status'] {
  const statusMap: Record<TenantStatus, StatusBadgeProps['status']> = {
    active: 'success',
    suspended: 'error',
    trial: 'warning',
    inactive: 'expired',
  };
  return statusMap[status];
}

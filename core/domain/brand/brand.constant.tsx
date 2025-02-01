import { Badge } from '@/components/ui/badge';

export const statuses = [
  {
    value: 'active',
    label: 'Active',
    badge: <Badge>Active</Badge>,
  },
  {
    value: 'inactive',
    label: 'Inactive',
    badge: <Badge variant="secondary">Inactive</Badge>,
  },
];

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  actionText,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto h-12 w-12 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {actionText && actionHref && (
        <div className="mt-6">
          <Button asChild>
            <Link href={actionHref}>
              {actionText}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
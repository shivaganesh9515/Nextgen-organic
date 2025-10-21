import { Button } from '../ui/Button';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
  onAction,
  icon,
}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-500">{description}</p>
      {(actionText && (actionHref || onAction)) && (
        <div className="mt-6">
          {actionHref ? (
            <Button>
              <Link href={actionHref} className="block w-full">
                {actionText}
              </Link>
            </Button>
          ) : (
            <Button onClick={onAction}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
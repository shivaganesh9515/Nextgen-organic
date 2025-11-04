import { Button } from '@/components/ui/button';

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  icon: React.ReactNode;
  label: string;
}

export default function IconButton({ icon, label, ...props }: IconButtonProps) {
  return (
    <Button 
      variant="ghost"
      size="icon"
      aria-label={label}
      {...props}
    >
      {icon}
    </Button>
  );
}
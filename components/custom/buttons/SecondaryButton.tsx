import { Button } from '@/components/ui/button';

interface SecondaryButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export default function SecondaryButton({ children, ...props }: SecondaryButtonProps) {
  return (
    <Button 
      variant="outline"
      className="border-green-600 text-green-600 hover:bg-green-50" 
      {...props}
    >
      {children}
    </Button>
  );
}
import { Button } from '@/components/ui/button';

interface SecondaryButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export default function SecondaryButton({ children, ...props }: SecondaryButtonProps) {
  return (
    <Button 
      variant="outline"
      className="border-2 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-700 shadow-sm transition-all duration-300" 
      {...props}
    >
      {children}
    </Button>
  );
}
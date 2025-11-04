import { Button } from '@/components/ui/button';

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <Button 
      className="bg-green-600 hover:bg-green-700 text-white" 
      {...props}
    >
      {children}
    </Button>
  );
}
import { Button } from '@/components/ui/button';

interface BuyNowButtonProps extends React.ComponentProps<typeof Button> {
  children?: React.ReactNode;
}

export default function BuyNowButton({ children = 'Buy Now', ...props }: BuyNowButtonProps) {
  return (
    <Button 
      className="bg-orange-500 hover:bg-orange-600 text-white" 
      {...props}
    >
      {children}
    </Button>
  );
}
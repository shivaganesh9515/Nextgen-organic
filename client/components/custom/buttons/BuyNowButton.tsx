import { Button } from '@/components/ui/button';

interface BuyNowButtonProps extends React.ComponentProps<typeof Button> {
  children?: React.ReactNode;
}

export default function BuyNowButton({ children = 'Buy Now', ...props }: BuyNowButtonProps) {
  return (
    <Button 
      variant="buy-now"
      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-bold" 
      {...props}
    >
      {children}
    </Button>
  );
}
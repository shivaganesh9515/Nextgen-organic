import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Rating from '@/components/shared/Rating';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function TestimonialCard({
  name,
  role,
  content,
  rating,
}: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <Rating rating={rating} />
        </div>
        <p className="text-gray-700 italic">&quot;{content}&quot;</p>
      </CardContent>
    </Card>
  );
}
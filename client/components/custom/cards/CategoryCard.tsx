import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CategoryCardProps {
  id: number;
  name: string;
  count: number;
  image: string;
}

export default function CategoryCard({
  id,
  name,
  count,
  // image is passed but not used in this component
  image: _image, // eslint-disable-line @typescript-eslint/no-unused-vars
}: CategoryCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
      </CardHeader>
      <CardContent className="pb-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{count} products</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/categories/${id}`}>Browse</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
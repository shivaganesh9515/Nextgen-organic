import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  date,
  author,
  category,
}: BlogCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{category}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <CardTitle className="text-lg mb-2">
          <Link href={`/blog/${id}`} className="hover:text-green-600">
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="text-sm text-gray-500">
          By {author}
        </div>
      </CardFooter>
    </Card>
  );
}
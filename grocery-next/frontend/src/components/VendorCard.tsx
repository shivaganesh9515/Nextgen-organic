
import { Star, Store } from 'lucide-react';

export default function VendorCard({ 
  name, 
  location, 
  rating,
  image 
}: {
  name: string;
  location: string;
  rating: number;
  image?: string;
}) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full bg-white">
      <div className="relative">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <Store className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{location}</p>
        <div className="flex items-center mb-4">
          <div className="flex">
            {renderStars()}
          </div>
          <span className="ml-2 text-gray-600 text-sm">({rating.toFixed(1)})</span>
        </div>
        <button className="mt-auto w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-all">
          View Products
        </button>
      </div>
    </div>
  );
}

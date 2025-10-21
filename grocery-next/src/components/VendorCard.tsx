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
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      {image ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
          <span className="text-gray-500">Vendor Image</span>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(rating))}
            {'☆'.repeat(5 - Math.floor(rating))}
          </div>
          <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
        </div>
        <button className="mt-auto w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          View Products
        </button>
      </div>
    </div>
  );
}
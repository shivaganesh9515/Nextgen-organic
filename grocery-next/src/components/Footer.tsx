// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="py-4 bg-gray-200 mt-12">
      <div className="container mx-auto text-center text-gray-700 text-sm">
        &copy; {new Date().getFullYear()} GroceryNext — Your Multi-Vendor Grocery Store
      </div>
    </footer>
  );
}

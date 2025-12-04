import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
            🛍️ ProductHub
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-blue-200 transition font-medium">
              Produits
            </Link>
            <Link href="/products/create" className="hover:text-blue-200 transition font-medium">
              ➕ Ajouter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

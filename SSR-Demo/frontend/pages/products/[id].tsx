import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { getProductById } from '@/lib/api';


interface ProductDetailsProps {
  product: Product;
  fetchedAt: string;
}

export default function ProductDetails({ product, fetchedAt }: ProductDetailsProps) {
  return (
    <>
      <Head>
        <title>{product.name} - ProductHub</title>
        <meta name="description" content={product.description} />
      </Head>

      <div>
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          ← Retour au catalogue
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">

            <div className="md:w-1/2 relative h-96 bg-gray-200">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-800 mt-2">
                  {product.name}
                </h1>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold text-blue-600">
                  ${product.price}
                </span>
              </div>

              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                    ✓ En stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full font-semibold">
                    ✗ Rupture de stock
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">
                  ⏰ Données chargées à : {new Date(fetchedAt).toLocaleTimeString('fr-FR')}
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>🔍 SSR avec Dynamic Routes :</strong> Cette page est générée côté serveur avec l'ID du produit extrait de l'URL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ssr avec paramètres dynamiques
export const getServerSideProps: GetServerSideProps<ProductDetailsProps> = async (context) => {
  const { id } = context.params as { id: string };
  
  try {
    console.log(`🔄 [SSR] Fetching product with ID: ${id}...`);
    
    const product = await getProductById(id);
    
    console.log(`✅ [SSR] Successfully fetched product: ${product.name}`);
    
    return {
      props: {
        product,
        fetchedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error(`[SSR] Error fetching product ${id}:`, error);
    
    // si le produit n'existe pas, rediriger vers la page d'accueil
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { getProducts } from '@/lib/api';

interface HomeProps {
  products: Product[];
  fetchedAt: string;
}

export default function Home({ products, fetchedAt }: HomeProps) {
  return (
    <>
      <Head>
        <title>ProductHub - Catalogue de Produits</title>
        <meta name="description" content="Découvrez notre catalogue de produits" />
      </Head>

      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Catalogue de Produits
          </h1>
          <p className="text-gray-600">
            ⏰ Données chargées côté serveur à : {new Date(fetchedAt).toLocaleTimeString('fr-FR')}
          </p>
          <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-500 text-sm">
            <p className="font-semibold text-blue-800">🔍 Cette page utilise le Server-Side Rendering (SSR)</p>
            <p className="text-blue-700">Les données sont récupérées à chaque requête, garantissant du contenu toujours à jour.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Aucun produit disponible</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// cette fonction s'exécute côté serveur à chaque requête
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    console.log('🔄 [SSR] Fetching products from API...');
    
    const products = await getProducts();
    
    console.log(`✅ [SSR] Successfully fetched ${products.length} products`);
    
    return {
      props: {
        products,
        fetchedAt: new Date().toISOString(), // timestamp pour voir le SSR en action
      },
    };
  } catch (error) {
    console.error('[SSR] Error fetching products:', error);
    
    // en cas d'erreur, on retourne une liste vide
    return {
      props: {
        products: [],
        fetchedAt: new Date().toISOString(),
      },
    };
  }
};

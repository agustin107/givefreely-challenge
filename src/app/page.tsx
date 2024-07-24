import { ProductsContainer } from '@/modules/home';
import { ProductProvider } from '@/modules/home/context';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductsContainer />
    </main>
  );
}

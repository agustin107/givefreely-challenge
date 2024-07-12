import { Product } from '@/schemas';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`);
  const data = await response.json();

  if (response.ok) {
    return data.data;
  }

  throw new Error(data.error);
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products/${id}`);
  const data = await response.json();

  if (response.ok) {
    return data.data;
  }

  throw new Error(data.error);
}

export async function saveProduct(product: Product): Promise<Product> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();

  if (response.ok) {
    return data.data;
  }

  throw new Error(data.error);
}
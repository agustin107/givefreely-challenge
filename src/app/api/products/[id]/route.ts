import { PRODUCTS } from '@/mocks/db';

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) => {
  const product = PRODUCTS.find((product) => product.id === params.id);

  if (!product) {
    return new Response('Not Found', { status: 404 });
  }

  return Response.json({
    data: product,
  });
};

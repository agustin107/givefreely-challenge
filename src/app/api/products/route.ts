import { ZodError } from 'zod';
import { randomUUID } from 'crypto';

import { PRODUCTS } from '@/mocks/db';
import { ProductSchema } from '@/schemas';

export const GET = async (_req: Request, _res: Response) => {
  return Response.json({
    data: PRODUCTS,
  });
};

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();

    ProductSchema.parse(body);

    if (body.id) {
      const index = PRODUCTS.findIndex((product) => product.id === body.id);

      if (index === -1) {
        return new Response('Product not found', { status: 404 });
      }

      PRODUCTS[index] = body;

      return Response.json({
        data: PRODUCTS,
      });
    } else {
      PRODUCTS.push({
        ...body,
        id: randomUUID(),
      });
    }

    return Response.json({
      data: PRODUCTS,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
};

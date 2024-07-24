'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetProducts } from '../hooks';
import { Product } from '@/schemas';
import { Loading } from '@/components/loading';
import { useProductContext } from '../context';
import { Button } from '@/components/ui/button';

interface ProductListProps {
  search?: string;
  onClickProduct: (product: string) => void;
}

export function ProductList({ search, onClickProduct }: ProductListProps) {
  const { data, isLoading } = useGetProducts();
  const { addProduct, products } = useProductContext();

  const handleClickProduct = (product: Product) => {
    return () => {
      onClickProduct(product.id!);
    };
  };

  const handleAddProductToBasket = (product: Product) => {
    return () => {
      addProduct(product);
    };
  };

  if (isLoading) {
    return <Loading />;
  }

  const filteredData =
    data?.filter((product) =>
      product.name.toLowerCase().includes(search?.toLowerCase() ?? '')
    ) ?? [];

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((product) => (
            <TableRow key={product.id} onClick={handleClickProduct(product)}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell>
                <Button onClick={handleAddProductToBasket(product)}>Add</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>A list of products.</TableCaption>
      </Table>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}

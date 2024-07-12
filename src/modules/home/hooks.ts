import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getProduct, getProducts, saveProduct } from './queries';

export const useGetProducts = () => {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return query;
};

export const useGetProduct = (id: string) => {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });

  return query;
};

export const useSaveProduct = (queryClient: QueryClient) => {
  const query = useMutation({
    mutationKey: ['saveProduct'],
    mutationFn: saveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return query;
};

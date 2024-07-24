'use client';

import { useState } from 'react';
import { AddProductDialog } from './add-product-dialog';
import { ProductList } from './product-list';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useSaveProduct } from '../hooks';
import { Product } from '@/schemas';
import { toast } from '@/components/ui/use-toast';
import { ProductSearch } from './product-search';
import { ViewProductDialog } from './view-product-dialog';
import { ProductProvider } from '../context';

export function ProductsContainer() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useSaveProduct(queryClient);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [search, setSearch] = useState('');

  const toggleAddDialog = () => {
    setOpenAddDialog((prevState) => !prevState);
  };

  const onAddOrEditProduct = async (values: Product) => {
    await mutateAsync(values);

    if (values.id) {
      handleCloseViewProduct();
    } else {
      toggleAddDialog();
    }

    toast({
      description: 'Product saved.',
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleCloseViewProduct = () => {
    setSelectedProductId(null);
  };

  return (
    <ProductProvider>
      <div className="flex flex-col w-full gap-2 max-w-[500px]">
        <header className="flex gap-6 justify-end">
          <ProductSearch onSearch={handleSearch} />
          <Button
            variant="outline"
            className="self-end"
            onClick={toggleAddDialog}
          >
            Add product
          </Button>
        </header>
        <ProductList search={search} onClickProduct={setSelectedProductId} />
        <AddProductDialog
          open={openAddDialog}
          onOpenChange={setOpenAddDialog}
          onAdd={onAddOrEditProduct}
        />
        {selectedProductId && (
          <ViewProductDialog
            onOpenChange={handleCloseViewProduct}
            id={selectedProductId}
            onEdit={onAddOrEditProduct}
          />
        )}
      </div>
    </ProductProvider>
  );
}

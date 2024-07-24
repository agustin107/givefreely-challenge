'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetProduct } from '../hooks';
import { Loading } from '@/components/loading';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Product, ProductSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ViewProductDialogProps {
  onOpenChange: (open: boolean) => void;
  id: string;
  onEdit: (values: Product) => void;
}

export function ViewProductDialog({
  onOpenChange,
  id,
  onEdit,
}: ViewProductDialogProps) {
  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
  });
  const { data, isLoading } = useGetProduct(id);

  const handleSubmit = (values: Product) => {
    console.log('values', values);
    onEdit(values);
  };

  useEffect(() => {
    form.reset(data);
  }, [data, form]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data?.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>ID</Label>
                <Input value={data?.id} disabled />
              </div>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className=''>Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

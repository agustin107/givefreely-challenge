import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AddProductForm } from './add-product-form';
import { Product } from '@/schemas';
import { DialogProps } from '@radix-ui/react-dialog';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: DialogProps['onOpenChange'];
  onAdd: (values: Product) => void;
}

export const AddProductDialog = ({
  open,
  onOpenChange,
  onAdd,
}: AddProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Complete the form below to add a new product.
          </DialogDescription>
        </DialogHeader>
        <AddProductForm onAdd={onAdd}>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </AddProductForm>
      </DialogContent>
    </Dialog>
  );
};

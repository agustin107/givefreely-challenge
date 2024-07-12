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

interface ViewProductDialogProps {
  onOpenChange: (open: boolean) => void;
  id: string;
}

export function ViewProductDialog({
  onOpenChange,
  id,
}: ViewProductDialogProps) {
  const { data, isLoading } = useGetProduct(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>ID</Label>
            <Input value={data?.id} disabled />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Name</Label>
            <Input value={data?.name} disabled />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Description</Label>
            <Input value={data?.description} disabled />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Price</Label>
            <Input value={data?.price} disabled />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

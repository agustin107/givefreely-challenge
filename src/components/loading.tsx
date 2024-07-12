import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="absolute top-4 right-4">
      <Loader2 className="h-4 w-4 animate-spin" role="alert" aria-busy="true" />
    </div>
  );
};

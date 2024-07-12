'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductSearchProps {
  onSearch: (search: string) => void;
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  const productNameInput = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearch(productNameInput.current?.value ?? '');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input placeholder="Product name" ref={productNameInput} onKeyDown={handleKeyDown} role='searchbox' />
      <Button onClick={handleSearch} variant="outline">
        🔍
      </Button>
    </div>
  );
}

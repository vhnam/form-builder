'use client';

import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { privateRoutes } from '@/constants/routes';

import { Card, CardContent } from '@repo/core-ui/components/card';

const NewItem = () => {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push(privateRoutes.forms.new);
  };

  return (
    <Card
      className="group cursor-pointer transition-shadow hover:shadow-md"
      onClick={handleCreateNew}
    >
      <CardContent className="p-6 text-center">
        <PlusIcon className="mx-auto mb-3 h-12 w-12 text-gray-400" />
        <h4 className="font-medium text-gray-900">Blank Form</h4>
        <p className="mt-1 text-sm text-gray-600">Start from scratch</p>
      </CardContent>
    </Card>
  );
};

export default NewItem;

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { BrandFormSchema } from '@/core/domain/brand/brand.schema';
import { Brand, BrandPayload } from '@/core/domain/brand/brand.type';

interface BrandFormProps {
  initialData: Brand | null;
  onSubmit: (input: BrandPayload) => Promise<void>;
  isLoading: boolean;
}

export const BrandForm = ({ initialData = null, onSubmit, isLoading }: BrandFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const form = useForm<BrandPayload>({
    resolver: zodResolver(BrandFormSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'active',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form.reset]);

  const handleSubmit = async (input: BrandPayload) => {
    await onSubmit(input);

    if (!initialData) {
      form.reset();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('image', e.target.files);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className={error && 'border-destructive'}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className={error && 'border-destructive'}
                    placeholder="Description"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/svg"
                    {...field}
                    onChange={(e) => {
                      handleImageChange(e);
                      field.onChange(e.target.files && e.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>Select an image to upload (max 5MB)</FormDescription>
                <FormMessage />
                {imagePreview && (
                  <div className="mt-4">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-2">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value === 'active' ? true : false}
                      onCheckedChange={(value) => {
                        const result = value ? 'active' : 'inactive';
                        form.setValue('status', result);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Edit Brand'
            ) : (
              'Add Brand'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

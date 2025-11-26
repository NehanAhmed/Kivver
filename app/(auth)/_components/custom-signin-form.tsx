'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types/global';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function CustomSignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSignIn = async (data: FormData) => {
    if (!isLoaded) return;
    setError(null);

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        
        // Logic to redirect based on metadata
        // Note: The publicMetadata is available in the user object after signin
        const role = result.userData.publicMetadata.role as UserRole | undefined;

        if (role === 'seller') {
          router.push('/teacher/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        // Handle MFA or other factors if needed
        console.log(result);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 border rounded-lg shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Sign in to your account</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register('password')} />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Sign In
        </Button>
      </form>
    </div>
  );
}
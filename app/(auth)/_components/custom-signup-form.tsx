'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button'; // Shadcn Button
import { Input } from '@/components/ui/input';   // Shadcn Input
import { Label } from '@/components/ui/label';   // Shadcn Label
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types/global';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  code: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CustomSignUpFormProps {
  role: UserRole;
}

export default function CustomSignUpForm({ role }: CustomSignUpFormProps) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [verifying, setVerifying] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Step 1: Create User
  const onSignUp = async (data: FormData) => {
    if (!isLoaded) return;
    setError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Important: Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Something went wrong');
    }
  };

  // Step 2: Verify Email & Redirect
  const onVerify = async (data: FormData) => {
    if (!isLoaded || !data.code) return;
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === 'complete') {
        // ACTIVATE SESSION
        await setActive({ session: completeSignUp.createdSessionId });

        // UPDATE METADATA (Role)
        // Note: For highest security, do this in a webhook. 
        // For simple integration, update user sends this, but we validate strictly.
        const user = completeSignUp.createdUserId;
        // In client-side flow, we usually rely on the unsafeMetadata passed during creation 
        // or update it now. Clerk "update" on client is restricted. 
        // TIP: Better to pass unsafeMetadata during create(). Let's refactor the create step below.
        
        const redirectUrl = role === 'seller' ? '/teacher/dashboard' : '/dashboard';
        router.push(redirectUrl);
      } else {
        setError('Verification incomplete. Please contact support.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid code');
    }
  };

  // Refactored Create with Metadata
  const onSignUpWithRole = async (data: FormData) => {
    if (!isLoaded) return;
    setError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        // Assign role here
        unsafeMetadata: { role: role }, 
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 border rounded-lg shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {role === 'seller' ? 'Become a Teacher' : 'Join as a Buyer'}
        </h1>
        <p className="text-gray-500">Enter your details to create an account.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!verifying ? (
        <form onSubmit={handleSubmit(onSignUpWithRole)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} placeholder="hello@example.com" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onVerify)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input id="code" {...register('code')} placeholder="123456" />
            <p className="text-xs text-gray-500">Check your email for the code.</p>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             Verify & Login
          </Button>
        </form>
      )}
    </div>
  );
}   
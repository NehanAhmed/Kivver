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
import { Loader2, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility, otherwise use class names directly

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
        router.push('/dashboard');
      } else {
        console.log(result);
        setError('Please complete additional verification steps');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full p-4">
      <div className="card-enhanced glass-effect animate-slide-up w-full max-w-md overflow-hidden relative border-white/20 dark:border-white/5">
        
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-1.5 gradient-green" />

        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-4 text-primary shadow-sm ring-1 ring-primary/10">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="animate-slide-up">
              <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSignIn)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  {...register('email')} 
                  className="pl-10 h-11 bg-background/50 border-input hover:border-primary/50 focus-visible:ring-primary/30 transition-all duration-300 rounded-xl"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium ml-1">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline hover:text-green-600 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="password" 
                  type="password" 
                  {...register('password')}
                  className="pl-10 h-11 bg-background/50 border-input hover:border-primary/50 focus-visible:ring-primary/30 transition-all duration-300 rounded-xl"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="btn-primary w-full h-11 text-base shadow-lg shadow-green-500/20 hover:shadow-green-500/40" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-2">
            Don&apos;t have an account?{' '}
            <button 
              onClick={() => router.push('/join')} 
              className="font-semibold text-primary hover:text-green-600 transition-colors hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
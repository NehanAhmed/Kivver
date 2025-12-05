'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, ShieldCheck, Sparkles, ArrowRight, User } from 'lucide-react';
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

  const onSignUp = async (data: FormData) => {
    if (!isLoaded) return;
    setError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        unsafeMetadata: { role },
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Something went wrong');
    }
  };

  const onVerify = async (data: FormData) => {
    if (!isLoaded) return;

    if (!data.code || data.code.trim() === '') {
      setError('Please enter the verification code');
      return;
    }

    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/dashboard');
      } else {
        setError('Verification incomplete. Please contact support.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid code');
    }
  };

  // Dynamic visual elements based on role
  const isTeacher = role === 'seller';
  const roleColor = isTeacher ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'text-primary bg-green-50 dark:bg-green-900/20';
  const RoleIcon = isTeacher ? Sparkles : User;

  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full p-4">
      <div className="card-enhanced glass-effect animate-slide-up w-full max-w-md overflow-hidden relative">
        
        {/* Dynamic Gradient Border Top */}
        <div className={`absolute top-0 left-0 w-full h-1.5 ${isTeacher ? 'gradient-purple-pink' : 'gradient-green'}`} />

        <div className="space-y-6">
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm ring-1 ring-black/5 ${roleColor}`}>
              <RoleIcon className="w-6 h-6" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {verifying ? 'Check your Inbox' : (isTeacher ? 'Become a Teacher' : 'Join as a Learner')}
            </h1>
            
            <p className="text-muted-foreground text-sm max-w-[80%] mx-auto">
              {verifying 
                ? `We've sent a 6-digit code to your email.` 
                : 'Create your account to start your journey today.'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="animate-slide-up">
              <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/10">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Form Content */}
          {!verifying ? (
            <form onSubmit={handleSubmit(onSignUp)} className="space-y-5 animate-slide-up">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    {...register('email')} 
                    placeholder="hello@example.com"
                    className="pl-10 h-11 bg-background/50 border-input hover:border-primary/50 focus-visible:ring-primary/30 transition-all duration-300 rounded-xl"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    {...register('password')} 
                    placeholder="Min 8 characters"
                    className="pl-10 h-11 bg-background/50 border-input hover:border-primary/50 focus-visible:ring-primary/30 transition-all duration-300 rounded-xl"
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                className={`w-full h-11 text-base shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${isTeacher ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'btn-primary'}`} 
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onVerify)} className="space-y-5 animate-slide-up">
              <div className="space-y-3">
                <Label htmlFor="code" className="text-sm font-medium ml-1">Verification Code</Label>
                <div className="relative group">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="code" 
                      {...register('code')} 
                      placeholder="123456" 
                      className="pl-10 h-12 text-lg tracking-widest bg-background/50 border-input hover:border-primary/50 focus-visible:ring-primary/30 transition-all duration-300 rounded-xl font-mono"
                    />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Check your spam folder if you don't see the code.
                </p>
              </div>
              
              <Button type="submit" className="btn-primary w-full h-11 text-base shadow-lg" disabled={isSubmitting}>
                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                 Verify & Login
              </Button>
              
              <button 
                type="button" 
                onClick={() => setVerifying(false)}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
              >
                Change email address
              </button>
            </form>
          )}

          {/* Footer */}
          {!verifying && (
            <div className="text-center text-sm text-muted-foreground pt-2">
              Already have an account?{' '}
              <button 
                onClick={() => router.push('/login')} 
                className="font-semibold text-primary hover:text-green-600 transition-colors hover:underline"
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
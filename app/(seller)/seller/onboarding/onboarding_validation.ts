import { z } from 'zod';

export const sellerOnboardingSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),
  
  bio: z
    .string()
    .min(50, 'Bio must be at least 50 characters to help students know you better')
    .max(500, 'Bio must not exceed 500 characters')
    .trim(),
  
  expertise: z
    .string()
    .min(3, 'Please enter at least one area of expertise')
    .max(200, 'Expertise must not exceed 200 characters')
    .refine(
      (val) => val.split(',').filter(Boolean).length >= 1,
      'Please enter at least one area of expertise'
    )
    .refine(
      (val) => val.split(',').filter(Boolean).length <= 10,
      'You can add up to 10 areas of expertise'
    )
    .transform((val) => 
      val
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .join(', ')
    ),
  
  teachingExperience: z.enum(['beginner', 'intermediate', 'experienced', 'expert'], {
    errorMap: () => ({ message: 'Please select a valid teaching experience level' }),
  }),
});

export type SellerOnboardingInput = z.infer<typeof sellerOnboardingSchema>;
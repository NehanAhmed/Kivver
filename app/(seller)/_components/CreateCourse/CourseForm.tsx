'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, Info, Send, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createCourse } from '@/lib/apiFetches/SellerCourses';
function validateCourseForm(data: CourseFormData): CourseFormErrors {
    const errors: CourseFormErrors = {};

    // Title validation
    if (!data.title.trim()) {
        errors.title = 'Course title is required';
    } else if (data.title.trim().length < 3) {
        errors.title = 'Title must be at least 3 characters';
    } else if (data.title.trim().length > 200) {
        errors.title = 'Title must not exceed 200 characters';
    }

    // Category validation
    if (!data.category) {
        errors.category = 'Please select a category';
    }

    // Price validation
    const priceNum = parseFloat(data.price);
    if (isNaN(priceNum) || priceNum < 0) {
        errors.price = 'Price must be a valid non-negative number';
    }

    // Duration validation
    if (data.totalDuration && data.totalDuration < 0) {
        errors.totalDuration = 'Duration must be a positive number';
    }

    return errors;
}
interface CourseFormProps {
    sellerId: number; // Pass this from parent component (get from auth)
}

export interface CourseFormData {
    title: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    thumbnail: string;
    price: string;
    isPremium: boolean;
    totalDuration: number;
    status: 'draft' | 'pending';
}

interface CourseFormErrors {
    title?: string;
    description?: string;
    category?: string;
    difficulty?: string;
    thumbnail?: string;
    price?: string;
    totalDuration?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    error?: string;
}


export function CourseForm({ sellerId }: CourseFormProps) {
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState<CourseFormData>({
        title: '',
        description: '',
        category: '',
        difficulty: 'beginner',
        thumbnail: '',
        price: '0',
        isPremium: false,
        totalDuration: 0,
        status: 'draft',
    });

    // UI state
    const [errors, setErrors] = useState<CourseFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : value,
        }));

        // Clear error for this field
        if (errors[name as keyof CourseFormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    // Handle thumbnail upload
    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    thumbnail: 'File size must be less than 5MB',
                }));
                return;
            }

            if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    thumbnail: 'Only PNG, JPG, and WEBP files are allowed',
                }));
                return;
            }

            // Create object URL for preview
            const url = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, thumbnail: url }));
            setErrors(prev => ({ ...prev, thumbnail: undefined }));
        }
    };

    // Remove thumbnail
    const removeThumbnail = () => {
        if (formData.thumbnail) {
            URL.revokeObjectURL(formData.thumbnail);
        }
        setFormData(prev => ({ ...prev, thumbnail: '' }));
    };

    // Handle form submission
    const handleSubmit = async (submitStatus: 'draft' | 'pending') => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            setSubmitSuccess(null);

            // Update status
            const dataToSubmit = { ...formData, status: submitStatus };

            // Validate form
            const validationErrors = validateCourseForm(dataToSubmit);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setIsSubmitting(false);
                return;
            }

            // Submit to API
            const result = await createCourse(dataToSubmit, sellerId);

            if (result.success) {
                setSubmitSuccess(
                    submitStatus === 'draft'
                        ? 'Course saved as draft successfully!'
                        : 'Course submitted for review successfully!'
                );

                // Redirect after success
                setTimeout(() => {
                    router.push('/seller/dashboard/course');
                }, 2000);
            }
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create course. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Success Alert */}
            {submitSuccess && (
                <Alert className="bg-green-50 border-green-200">
                    <AlertCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                        {submitSuccess}
                    </AlertDescription>
                </Alert>
            )}

            {/* Error Alert */}
            {submitError && (
                <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        {submitError}
                    </AlertDescription>
                </Alert>
            )}

            {/* Basic Information Card */}
            <div className="bg-card border border-border rounded-2xl p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Basic Information</h2>
                    <p className="text-muted-foreground">
                        Tell us about your course. This will be visible to students.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Course Title */}
                    <FormField
                        label="Course Title"
                        required
                        description="A clear, descriptive title that tells students what they'll learn"
                        error={errors.title}
                    >
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Complete JavaScript Bootcamp"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                            disabled={isSubmitting}
                        />
                    </FormField>

                    {/* Course Description */}
                    <FormField
                        label="Course Description"
                        description="Describe what students will learn and why they should take this course"
                        error={errors.description}
                    >
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder="Write a compelling description..."
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                            disabled={isSubmitting}
                        />
                    </FormField>

                    {/* Category and Difficulty Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Category" required error={errors.category}>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none cursor-pointer"
                                disabled={isSubmitting}
                            >
                                <option value="">Select a category</option>
                                <option value="programming">Programming</option>
                                <option value="design">Design</option>
                                <option value="business">Business</option>
                                <option value="marketing">Marketing</option>
                                <option value="language">Language</option>
                                <option value="music">Music</option>
                            </select>
                        </FormField>

                        <FormField label="Difficulty Level" required error={errors.difficulty}>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none cursor-pointer"
                                disabled={isSubmitting}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </FormField>
                    </div>

                    {/* Course Thumbnail */}
                    <FormField
                        label="Course Thumbnail"
                        description="Upload an eye-catching image (recommended: 1280x720px)"
                        error={errors.thumbnail}
                    >
                        <ThumbnailUpload
                            thumbnail={formData.thumbnail}
                            onUpload={handleThumbnailUpload}
                            onRemove={removeThumbnail}
                            disabled={isSubmitting}
                        />
                    </FormField>
                </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-card border border-border rounded-2xl p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Pricing</h2>
                    <p className="text-muted-foreground">
                        Set your course price and premium options
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            label="Course Price"
                            required
                            description="Set to 0 for free courses"
                            error={errors.price}
                        >
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                                    $
                                </span>
                                <Input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </FormField>

                        <FormField label="Premium Course">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30">
                                <div>
                                    <p className="font-semibold text-foreground">Mark as Premium</p>
                                    <p className="text-sm text-muted-foreground">Featured with special badge</p>
                                </div>
                                <Label className="relative inline-flex items-center cursor-pointer">
                                    <Input
                                        type="checkbox"
                                        name="isPremium"
                                        checked={formData.isPremium}
                                        onChange={handleInputChange}
                                        className="sr-only peer"
                                        disabled={isSubmitting}
                                    />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </Label>
                            </div>
                        </FormField>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-blue-900">Pricing Guidelines</p>
                            <p className="text-sm text-blue-700 mt-1">
                                Consider your target audience and course value. Free courses help build your audience, while premium pricing positions your course as high-value content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Settings Card */}
            <div className="bg-card border border-border rounded-2xl p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Additional Settings</h2>
                    <p className="text-muted-foreground">
                        Configure advanced course options
                    </p>
                </div>

                <div className="space-y-6">
                    <FormField
                        label="Estimated Duration"
                        description="Total course duration in minutes"
                        error={errors.totalDuration}
                    >
                        <div className="relative">
                            <Input
                                type="number"
                                name="totalDuration"
                                value={formData.totalDuration}
                                onChange={handleInputChange}
                                min="0"
                                placeholder="120"
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                disabled={isSubmitting}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                minutes
                            </span>
                        </div>
                    </FormField>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl"
                >
                    Cancel
                </Button>

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSubmit('draft')}
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-xl border-2 font-semibold"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save as Draft'
                        )}
                    </Button>

                    <Button
                        type="button"
                        onClick={() => handleSubmit('pending')}
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Submit for Review
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Reusable Form Field Component
function FormField({
    label,
    required,
    description,
    error,
    children
}: {
    label: string;
    required?: boolean;
    description?: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <Label className="block">
                <span className="text-sm font-semibold text-foreground">
                    {label}
                    {required && <span className="text-red-600 ml-1">*</span>}
                </span>
                {description && (
                    <span className="block text-sm text-muted-foreground mt-1">
                        {description}
                    </span>
                )}
            </Label>
            {children}
            {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </p>
            )}
        </div>
    );
}

// Thumbnail Upload Component
function ThumbnailUpload({
    thumbnail,
    onUpload,
    onRemove,
    disabled
}: {
    thumbnail: string;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    disabled?: boolean;
}) {
    return (
        <div>
            {!thumbnail ? (
                <label className={`block border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-green-500 hover:bg-green-50/50 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={onUpload}
                        disabled={disabled}
                        className="hidden"
                    />
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-foreground font-semibold mb-2">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                        PNG, JPG or WEBP (max. 5MB)
                    </p>
                </label>
            ) : (
                <div className="relative rounded-2xl overflow-hidden border border-border">
                    <img
                        src={thumbnail}
                        alt="Course thumbnail"
                        className="w-full h-64 object-cover"
                    />
                    {!disabled && (
                        <button
                            type="button"
                            onClick={onRemove}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
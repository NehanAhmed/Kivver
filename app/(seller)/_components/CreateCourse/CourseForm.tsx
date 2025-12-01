import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Info, Send } from 'lucide-react';
import { useState } from 'react';

export function CourseForm() {
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    return (
        <div className="space-y-8">
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
                    >
                        <Input
                            type="text"
                            placeholder="e.g., Complete JavaScript Bootcamp"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                    </FormField>

                    {/* Course Description */}
                    <FormField
                        label="Course Description"
                        description="Describe what students will learn and why they should take this course"
                    >
                        <textarea
                            rows={5}
                            placeholder="Write a compelling description..."
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                        />
                    </FormField>

                    {/* Category and Difficulty Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Category" required>
                            <select className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none cursor-pointer">
                                <option value="">Select a category</option>
                                <option value="programming">Programming</option>
                                <option value="design">Design</option>
                                <option value="business">Business</option>
                                <option value="marketing">Marketing</option>
                                <option value="language">Language</option>
                                <option value="music">Music</option>
                            </select>

                        </FormField>

                        <FormField label="Difficulty Level" required>
                            <select className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none cursor-pointer">
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
                    >
                        <ThumbnailUpload thumbnail={thumbnail} setThumbnail={setThumbnail} />
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
                    {/* Price Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            label="Course Price"
                            required
                            description="Set to 0 for free courses"
                        >
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                                    $
                                </span>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                />
                            </div>
                        </FormField>

                        {/* Premium Toggle */}
                        <FormField label="Premium Course">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30">
                                <div>
                                    <p className="font-semibold text-foreground">Mark as Premium</p>
                                    <p className="text-sm text-muted-foreground">Featured with special badge</p>
                                </div>
                                <Label className="relative inline-flex items-center cursor-pointer">
                                    <Input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </Label>
                            </div>
                        </FormField>
                    </div>

                    {/* Pricing Info Box */}
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
                    {/* Course Duration */}
                    <FormField
                        label="Estimated Duration"
                        description="Total course duration in minutes"
                    >
                        <div className="relative">
                            <Input
                                type="number"
                                min="0"
                                placeholder="120"
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                minutes
                            </span>
                        </div>
                    </FormField>

                    {/* Publishing Options */}
                    <FormField label="Publishing Options">
                        <div className="space-y-3">
                            <Label className="flex items-start gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-all">
                                <Input
                                    type="radio"
                                    name="status"
                                    value="draft"
                                    defaultChecked
                                    className="mt-1 w-4 h-4 text-green-500 focus:ring-2 focus:ring-ring"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground">Save as Draft</p>
                                    <p className="text-sm text-muted-foreground">
                                        Continue editing later. Not visible to students.
                                    </p>
                                </div>
                            </Label>

                            <Label className="flex items-start gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-all">
                                <Input
                                    type="radio"
                                    name="status"
                                    value="pending"
                                    className="mt-1 w-4 h-4 text-green-500 focus:ring-2 focus:ring-ring"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground">Submit for Review</p>
                                    <p className="text-sm text-muted-foreground">
                                        Send to admin for approval before publishing.
                                    </p>
                                </div>
                            </Label>
                        </div>
                    </FormField>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
                <button className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all font-semibold">
                    Cancel
                </button>

                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all">
                        Save as Draft
                    </button>
                    <button className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                        <Send className="w-4 h-4 inline mr-2" />
                        Submit for Review
                    </button>
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
    children
}: {
    label: string;
    required?: boolean;
    description?: string;
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
        </div>
    );
}

// Thumbnail Upload Component
function ThumbnailUpload({
    thumbnail,
    setThumbnail
}: {
    thumbnail: string | null;
    setThumbnail: (url: string | null) => void;
}) {
    return (
        <div>
            {!thumbnail ? (
                <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-green-500 hover:bg-green-50/50 transition-all cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-foreground font-semibold mb-2">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                        PNG, JPG or WEBP (max. 5MB)
                    </p>
                </div>
            ) : (
                <div className="relative rounded-2xl overflow-hidden border border-border">
                    <img
                        src={thumbnail}
                        alt="Course thumbnail"
                        className="w-full h-64 object-cover"
                    />
                    <button
                        onClick={() => setThumbnail(null)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
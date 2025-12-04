import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { courses } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

// ==================== TYPES ====================

interface CreateCourseRequest {
    title: string;
    description?: string;
    thumbnail?: string;
    category?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    price?: string;
    isPremium?: boolean;
    sellerId: number;
}

interface CreateCourseResponse {
    success: boolean;
    data?: {
        id: number;
        title: string;
        sellerId: number;
        status: string;
        createdAt: Date;
    };
    error?: string;
    message?: string;
}

interface GetCoursesResponse {
    success: boolean;
    data?: Course[];
    message: string;
    error?: string;
}

interface Course {
    id: number;
    sellerId: number;
    title: string;
    description: string | null;
    thumbnail: string | null;
    category: string | null;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
    price: string;
    isPremium: boolean;
    status: 'draft' | 'pending' | 'approved' | 'rejected';
    totalLessons: number;
    totalDuration: number;
    enrollmentCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

interface CourseValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

// ==================== VALIDATION ====================

function validateCourseData(data: Record<string, unknown>): CourseValidationResult {
    const errors: Record<string, string> = {};

    // Required: title
    if (!data.title || typeof data.title !== 'string') {
        errors.title = 'Title is required and must be a string';
    } else if (data.title.trim().length < 3) {
        errors.title = 'Title must be at least 3 characters long';
    } else if (data.title.trim().length > 200) {
        errors.title = 'Title must not exceed 200 characters';
    }

    // Required: sellerId
    if (!data.sellerId) {
        errors.sellerId = 'Seller ID is required';
    } else if (typeof data.sellerId !== 'number' || data.sellerId <= 0) {
        errors.sellerId = 'Seller ID must be a positive number';
    }

    // Optional: description
    if (data.description !== undefined && data.description !== null) {
        if (typeof data.description !== 'string') {
            errors.description = 'Description must be a string';
        } else if (data.description.length > 5000) {
            errors.description = 'Description must not exceed 5000 characters';
        }
    }

    // Optional: thumbnail
    if (data.thumbnail !== undefined && data.thumbnail !== null) {
        if (typeof data.thumbnail !== 'string') {
            errors.thumbnail = 'Thumbnail must be a string';
        } else if (data.thumbnail.length > 500) {
            errors.thumbnail = 'Thumbnail URL must not exceed 500 characters';
        }
    }

    // Optional: category
    if (data.category !== undefined && data.category !== null) {
        if (typeof data.category !== 'string') {
            errors.category = 'Category must be a string';
        } else if (data.category.length > 100) {
            errors.category = 'Category must not exceed 100 characters';
        }
    }

    // Optional: difficulty
    if (data.difficulty !== undefined && data.difficulty !== null) {
        const validDifficulties = ['beginner', 'intermediate', 'advanced'];
        if (!validDifficulties.includes(data.difficulty as string)) {
            errors.difficulty = `Difficulty must be one of: ${validDifficulties.join(', ')}`;
        }
    }

    // Optional: price
    if (data.price !== undefined && data.price !== null) {
        if (typeof data.price !== 'string' && typeof data.price !== 'number') {
            errors.price = 'Price must be a string or number';
        } else {
            const priceNum = typeof data.price === 'string' ? parseFloat(data.price) : data.price;
            if (isNaN(priceNum) || priceNum < 0) {
                errors.price = 'Price must be a valid non-negative number';
            } else if (priceNum > 99999999.99) {
                errors.price = 'Price exceeds maximum allowed value';
            }
        }
    }

    // Optional: isPremium
    if (data.isPremium !== undefined && data.isPremium !== null) {
        if (typeof data.isPremium !== 'boolean') {
            errors.isPremium = 'isPremium must be a boolean';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// ==================== DATABASE OPERATIONS ====================

async function insertCourse(data: CreateCourseRequest): Promise<Course> {
    try {
        const courseData = {
            sellerId: data.sellerId,
            title: data.title.trim(),
            description: data.description?.trim() || null,
            thumbnail: data.thumbnail?.trim() || null,
            category: data.category?.trim() || null,
            difficulty: data.difficulty || 'beginner',
            price: data.price || '0',
            isPremium: data.isPremium || false,
            status: 'draft' as const,
            totalLessons: 0,
            totalDuration: 0,
            enrollmentCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const [newCourse] = await db
            .insert(courses)
            .values(courseData)
            .returning();

        if (!newCourse) {
            throw new Error('Failed to create course - no data returned');
        }

        return newCourse as Course;
    } catch (error) {
        console.error('Database error in insertCourse:', error);
        throw error;
    }
}

async function getAllCourses(): Promise<Course[]> {
    try {
        const coursesList = await db
            .select()
            .from(courses)
            .orderBy(desc(courses.createdAt));

        return coursesList as Course[];
    } catch (error) {
        console.error('Database error in getAllCourses:', error);
        throw error;
    }
}

// ==================== API ROUTE HANDLERS ====================

export async function POST(request: NextRequest): Promise<NextResponse<CreateCourseResponse>> {
    try {
        // Parse request body
        const body = await request.json() as Partial<CreateCourseRequest>;

        // Validate request data
        const validation = validateCourseData(body);

        if (!validation.isValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    message: Object.values(validation.errors).join(', '),
                },
                { status: 400 }
            );
        }

        // Insert course into database
        const newCourse = await insertCourse(body as CreateCourseRequest);

        // Return success response
        return NextResponse.json(
            {
                success: true,
                data: {
                    id: newCourse.id,
                    title: newCourse.title,
                    sellerId: newCourse.sellerId,
                    status: newCourse.status,
                    createdAt: newCourse.createdAt,
                },
                message: 'Course created successfully',
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating course:', error);

        // Handle specific database errors
        if (error instanceof Error) {
            // Foreign key constraint violation (invalid sellerId)
            if (error.message.includes('foreign key constraint')) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Invalid seller ID',
                        message: 'The provided seller ID does not exist',
                    },
                    { status: 400 }
                );
            }

            // Unique constraint violation
            if (error.message.includes('unique constraint')) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Duplicate entry',
                        message: 'A course with this data already exists',
                    },
                    { status: 409 }
                );
            }
        }

        // Generic error response
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                message: 'Failed to create course. Please try again later.',
            },
            { status: 500 }
        );
    }
}

export async function GET(): Promise<NextResponse<GetCoursesResponse>> {
    try {
        const coursesList = await getAllCourses();

        return NextResponse.json(
            {
                success: true,
                message: 'Courses fetched successfully',
                data: coursesList,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching courses:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch courses',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
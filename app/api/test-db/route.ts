import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/db';
import { getUserByClerkId } from '@/lib/db/queries';

export async function GET() {
    try {
        // Test connection
        const isConnected = await checkDatabaseConnection();

        if (!isConnected) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Database connected successfully!'
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Database test failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
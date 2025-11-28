import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export async function GET() {
  try {
    console.log('🔍 Testing database...');
    
    const allUsers = await db.select().from(users);
    
    console.log('✅ Database works! Users:', allUsers.length);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected!',
      userCount: allUsers.length,
      users: allUsers
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    
    return NextResponse.json({ 
      error: 'Database failed', 
      details: error instanceof Error ? error.message : 'Unknown' 
    }, { status: 500 });
  }
}
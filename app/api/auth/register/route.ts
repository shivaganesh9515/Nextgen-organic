import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/types/user';

// Mock database for demonstration
// In a real application, you would use a proper database
const users: User[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      password: hashedPassword, // Store the hashed password
      role: 'user',
      isEmailVerified: false,
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock database
    users.push(newUser);

    // In a real application, you would:
    // 1. Save to database
    // 2. Send verification email
    // 3. Create session or JWT token

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user', // Default role
      },
    });
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { user: userWithoutPassword, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'An error occurred while registering the user' },
      { status: 500 }
    );
  }
}

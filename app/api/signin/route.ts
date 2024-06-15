// pages/api/signin.ts

import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const hardcodedUser = {
  email: 'priyansh2112@gmail.com',
  password: '123456', 
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    if (email !== hardcodedUser.email) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
    if (password !== hardcodedUser.password) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

   
    const token = jwt.sign(
      { email: hardcodedUser.email },
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ message: 'Error while signing in', error }, { status: 500 });
  }
}

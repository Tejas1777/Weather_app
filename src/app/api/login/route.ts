import { NextResponse } from 'next/server'; // Use NextResponse for App Router
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
export async function POST(request: Request) {
 const { email, password } = await request.json();
 await dbConnect();
 try {
   const user = await User.findOne({ email });
   if (!user) {
     return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
   }
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
     return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
   }
   return NextResponse.json({ message: 'Login successful' }, { status: 200 });
 } catch (error) {
   return NextResponse.json({ error: 'Server error' }, { status: 500 });
 }
}

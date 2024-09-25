import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User'; 
import dbConnect from '@/lib/dbConnect';
export async function POST(req: Request) {
 const { email, password } = await req.json();
 await dbConnect();
 try {
   const userExists = await User.findOne({ email });
   if (userExists) {
     return NextResponse.json({ message: 'User already exists' }, { status: 400 });
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const newUser = new User({ email, password: hashedPassword });
   await newUser.save();
   return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
 } catch (error) {
   return NextResponse.json({ error: 'Server error' }, { status: 500 });
 }
}

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css'; // Add your custom CSS for styling
const LoginPage = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [emailError, setEmailError] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const router = useRouter();
 // Email validation function
 const isValidEmail = (email: string) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
   
 };
 
 // Password validation function
 const isValidPassword = (password: string) => {
   return password.length >= 6; // Password should be at least 6 characters long
 };
 const handleLogin = async (e: React.FormEvent) => {
   e.preventDefault();
   // Reset errors
   setError('');
   setEmailError('');
   setPasswordError('');

   localStorage.setItem("email",JSON.stringify(email))
   // Validation checks
   let isValid = true;
   if (!isValidEmail(email)) {
     setEmailError('Please enter a valid email address.');
     isValid = false;
   }
   if (!isValidPassword(password)) {
     setPasswordError('Password must be at least 6 characters long.');
     isValid = false;
   }
   // If validation fails, do not proceed
   if (!isValid) {
     return;
   }

   // Proceed with login if validation passes
   const res = await fetch('/api/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password }),
   });
   if (res.ok) {
     router.push('/');
   } else {
     setError('Invalid email or password.');
   }
 };
 
 return (
<form onSubmit={handleLogin} noValidate>
<h2>Login</h2>
<input
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       required
     />
     {emailError && <p className="error">{emailError}</p>} 
<input
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
     />
     {passwordError && <p className="error">{passwordError}</p>} 
<button type="submit">Login</button>
     {error && <p className="error">{error}</p>} 
</form>
 );
};
export default LoginPage;
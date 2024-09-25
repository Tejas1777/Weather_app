'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css'
const Register = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [emailError, setEmailError] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const router = useRouter();
 const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // Password validation function
  const isValidPassword = (password: string) => {
    return password.length >= 6; // Password should be at least 6 characters long
  };
 const handleRegister = async (e: React.FormEvent) => {
   e.preventDefault();
   setError('');
   setEmailError('');
   setPasswordError('');

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

   const res = await fetch('/api/registerr', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password }),
   });
   if (res.ok) {
     router.push('/loginn');
   } else {
     const data = await res.json();
     setError(data.message);
   }
 };
 return (
<form onSubmit={handleRegister} noValidate>
<h2>Register</h2>
     {error && <p>{error}</p>}
<input
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       placeholder="Email"
       required
     />
      {emailError && <p className="error">{emailError}</p>}
<input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       placeholder="Password"
       required
     />
     {passwordError && <p className="error">{passwordError}</p>} 
<button type="submit">Register</button>
{error && <p className="error">{error}</p>}
</form>
 );
};
export default Register;
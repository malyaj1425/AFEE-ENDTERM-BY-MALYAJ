"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import './page.css'
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token); // Store the JWT token in localStorage

      router.push('/Profile'); // Redirect to the profile page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header/>
    <div className='loginform'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      <Link href="/Register"><p>don't have an account?</p></Link>
    </div></>
  );
};

export default Login;
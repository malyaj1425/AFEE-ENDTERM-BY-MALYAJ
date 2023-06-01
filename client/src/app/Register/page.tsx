"use client"
import { useState } from 'react';
import axios from 'axios';
import "./page.css"
import Link from 'next/link';
import Header from '../Header';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', {
        name,
        email,
        password
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header/>
    <div className='loginform'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Register</button>
      </form>
      <Link href="/Login"><p>already have an account?</p></Link>
    </div></>
  );
};

export default Register;

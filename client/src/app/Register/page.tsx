"use client"
import { useState } from 'react';
import { motion as m} from "framer-motion";
import axios from 'axios';
import "./page.css"
import Link from 'next/link';
import Header from '../Header';
import { useRouter } from 'next/navigation';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/register", {
        name,
        email,
        password,
      });
      alert("Registered Succesfully")
      router.push('/Login');

      console.log(response.data);
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        // Error response from the server
        alert(error.response.data);
      } else {
        // Other types of errors (network, server down, etc.)
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <>
    <Header/>
    <m.div animate={{ y: "0%" }} initial={{y:"100%"}} transition={{delay:".1"}} id="home-page" className="page">
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
    </div></m.div></>
  );
};

export default Register;

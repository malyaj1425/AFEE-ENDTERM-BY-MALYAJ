"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion as m } from "framer-motion";
import Header from '../Header';
import "./page.css"
const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [blog, setBlog] = useState('');
  const router = useRouter();
  const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if the token is not available
        // You can customize this behavior according to your app's requirements
        return window.location.replace('/Login');
      }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if the token is not available
        // You can customize this behavior according to your app's requirements
        return window.location.replace('/Login');
      }
      if (!token) {
        console.log('User is not logged in.');
        router.push('/Login'); // Redirect to the login page
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const data = {
        title,
        blog,
        token
      };

      const response = await axios.post('https://cerebrumoneserver.onrender.com/add-blog', data, config);
      alert("Blog Uploaded");
      router.push('/Profile');
      console.log(response.data); // Blog added successfully
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header/>
    <m.div animate={{ y: "0%" }} initial={{y:"100%"}} transition={{delay:.1}} id="home-page" className="page">
    <div className="ml-10 mr-10 border-4 p-4 addblog rounded-lg mt-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">
            <span className="text-lg font-medium">Title:</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-lg font-medium">Blog:</span>
            <textarea
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
            ></textarea>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div></m.div></>
  );
};

export default AddBlog;
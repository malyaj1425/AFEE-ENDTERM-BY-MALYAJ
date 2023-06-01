"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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

      const response = await axios.post('http://localhost:8080/add-blog', data, config);

      console.log(response.data); // Blog added successfully
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Blog:
            <textarea value={blog} onChange={(e) => setBlog(e.target.value)}></textarea>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;

"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import { motion as m } from "framer-motion";
import "./page.css"
const Profile = () => {
  if (!localStorage.getItem('token')) {
    return window.location.replace('/Login');
  }
  const [user, setUser] = useState({name:"",email:""});
  const [blogs,setBlogs]=useState([{_id:"",name:"",blog:"",title:""}]);
  const [expandedBlogId, setExpandedBlogId] = useState<any>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login if the token is not available
          // You can customize this behavior according to your app's requirements
          return window.location.replace('/Login');
        }
        const response = await axios.get('http://localhost:8080/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
      
    };
    
    fetchProfile();
  }, []);

  const userName = user.name;
  useEffect(() => {
    // Fetch all blogs from the server
    const fetchBlogs = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8080/blogs/user/${userName}`);
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, [userName]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout');

      // Clear the token from localStorage
      localStorage.removeItem('token');

      // Redirect to the login page
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }
  function truncateText(text:any, maxLength:any) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  }
  const handleReadMore = (blog) => {
    localStorage.setItem('blogId', blog._id);
    router.push('/BlogPage');
  };
  return (
    <div>
      <Header/>

      <div className='profilehead'>
      <h1>Hello, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <br/>
      </div>
      <m.div animate={{ y: "0%" }} initial={{ y: "100%" }} transition={{ delay: ".1" }} id="home-page" className="page">
      <div className='cards'>
      <div className='card1'>
  <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
  <div className="grid grid-cols-1 gap-4">
    {blogs.map((blog) => (
      <div key={blog._id} className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{truncateText(blog.blog,150)}</p>
        {blog.blog.length > 150 && (
          <button
            className="text-blue-600 hover:underline"
            onClick={()=>handleReadMore(blog)}
          >
            Read More
          </button>
        )}
        {expandedBlogId === blog._id && (
          <></>
        )}
        <p className="text-gray-700">Author: {blog.name}</p>
      </div>
    ))}
  </div>
</div>

      </div>
      </m.div>
    </div>
    
  );
};

export default Profile;

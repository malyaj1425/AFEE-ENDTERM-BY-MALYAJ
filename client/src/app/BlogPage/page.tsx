"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import Header from "../Header";

const BlogPage = () => {
  const router = useRouter();
  const blogId = localStorage.getItem('blogId');
  const [blog, setBlog] = useState<any>(null);
  const [likes, setLikes] = useState(0); // New state for likes

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://cerebrumoneserver.onrender.com/blogs/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleLike = () => {
    // Update the likes count
    setLikes(likes + 1);
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <m.div animate={{ y: "0%" }} initial={{ y: "100%" }} transition={{ delay: .1 }} id="home-page" className="page">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
          <p className="text-gray-700 mb-4">{blog.blog}</p>
          <p className="text-gray-500">Author: {blog.name}</p>
          <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded">
            Like ({likes})
          </button>
        </div>
      </m.div>
    </>
  );
};

export default BlogPage;

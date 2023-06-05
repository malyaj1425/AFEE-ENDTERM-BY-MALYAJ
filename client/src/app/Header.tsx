"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/blogs?q=${searchQuery}`);
      const filteredResults = response.data.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  const handleReadMore = (blog) => {
    localStorage.setItem('blogId', blog._id);
    router.push('/BlogPage');
  };
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white py-4 px-6 relative">
      <div className="space-x-4 flex items-center">
        <Link href="/" className="text-xl font-bold">
        CEREBRUM
        </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 rounded bg-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className="w-full absolute text-black top-10 bg-white rounded shadow-lg z-10">
              {searchResults.map((blog) => (
                <li key={blog.id} className="px-4 py-2 hover:bg-gray-100">
                  <button onClick={()=>handleReadMore(blog)}>{blog.title}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/AddBlogPage" className="text-gray-300 hover:text-white">
          Write
        </Link>
        <Link href="/Login" className="text-gray-300 hover:text-white">
          Profile
        </Link>
      </div>
    </div>
  );
}

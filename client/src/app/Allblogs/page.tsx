import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "./page.css"
export default function Allblogs(){
    const [expandedBlogId, setExpandedBlogId] = useState<any>(null);
    const router = useRouter();
    const [blogs,setBlogs]=useState([{_id:"",name:"",blog:"",title:""}]);
    useEffect(() => {
        // Fetch all blogs from the server
        
        const fetchBlogs = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/blogs/`);
            setBlogs(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchBlogs();
      }, []);
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
    return(
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
    )
}
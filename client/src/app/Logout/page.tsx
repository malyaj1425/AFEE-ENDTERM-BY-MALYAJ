import { useEffect } from 'react';
"use client"
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/login');
  }, []);

  return null; // This component doesn't render anything
};

export default Logout;

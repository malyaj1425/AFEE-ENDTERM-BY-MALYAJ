"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RandomQuotes = () => {
  const [quote, setQuote] = useState('');
  const [fade, setFade] = useState(false);

  useEffect(() => {
    fetchRandomQuote(); // Initial fetch when component mounts
    const interval = setInterval(fetchRandomQuote, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  useEffect(() => {
    setFade(true);
    const fadeTimeout = setTimeout(() => {
      setFade(false);
    }, 300);

    return () => {
      clearTimeout(fadeTimeout);
    };
  }, [quote]);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://type.fit/api/quotes');
      const data = response.data;
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      setQuote(`${randomQuote.text} - ${randomQuote.author}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p className={`text-white transition-opacity ${fade ? 'opacity-0' : 'opacity-100'} duration-300 italic text-4xl font-mono`}>
        "{quote}"
      </p>
    </div>
  );
};

export default RandomQuotes;

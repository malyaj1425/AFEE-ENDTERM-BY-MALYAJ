"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import Header from "./Header";
import { useRouter } from "next/navigation";
import Banner from "./Banner/page";
import Allblogs from "./Allblogs/page";
import { motion as m} from "framer-motion";


export default function Home() {
  useEffect(() => {
    const s = (localStorage.getItem("token")!==null);
    if(s==null){
      return window.location.replace("/Login");
    }
  }, [2000]);
  return (
    <>
      <Header />
      <Banner/>
      <m.div animate={{ y: "0%" }} initial={{y:"100%"}} transition={{delay:".1"}} id="home-page" className="page">
      <Allblogs/></m.div>
    </>
  );
}

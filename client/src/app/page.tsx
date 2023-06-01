"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import Header from "./Header";
import { useRouter } from "next/navigation";
import Banner from "./Banner/page";

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
      
    </>
  );
}

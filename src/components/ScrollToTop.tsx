"use client";
import {useEffect,useState} from "react";
import {ArrowUp} from "./icons";
export default function ScrollToTop(){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const onScroll=()=>setVisible(window.scrollY>500);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
 return <button aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className={"fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#0c8f3e] text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-[#05662c] "+(visible?"translate-y-0 scale-100 opacity-100":"pointer-events-none translate-y-4 scale-75 opacity-0")}><ArrowUp/></button>;
}
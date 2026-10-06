"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gql, queries } from "../lib/api";
import { DEFAULT_SITE_STATISTICS, fetchSiteStatistics, formatStatisticValue, getStatistic, type SiteStatistic } from "../lib/statistics";
import {ArrowRight,FacebookIcon,GraduationIcon,HeartIcon,HeartPulseIcon,InstagramIcon,LeafIcon,LinkedInIcon,MailIcon,MapPinIcon,PhoneIcon,PinIcon,ToolsIcon,UsersIcon,WhatsAppIcon,XSocialIcon,YouTubeIcon} from "../components/icons";
import ContentDetailModal, { type GalleryModalItem, type NewsModalItem } from "../components/ContentDetailModal";

const programs=[
 {title:"Education Support",text:"Quality education for a brighter future.",icon:GraduationIcon},
 {title:"Healthcare Access",text:"Health and wellness for stronger lives.",icon:HeartPulseIcon},
 {title:"Skills Development",text:"Practical skills for self-reliance.",icon:ToolsIcon},
 {title:"Sustainable Livelihoods",text:"Creating long-term opportunities.",icon:LeafIcon}
];
const updates=[
 {image:"/images/books.jpg",date:"12",month:"Sep",title:"School Fees Support for 100 Orphans",text:"We are grateful to our donors for helping 100 children return to school..."},
 {image:"/images/donation.jpg",date:"08",month:"Sep",title:"Widows Empowerment Program Launched",text:"Our new skills training program is helping widows build better futures..."},
 {image:"/images/health-1.jpg",date:"02",month:"Sep",title:"Medical Support Reaches Remote Communities",text:"We provided healthcare support to vulnerable families in rural areas..."},
 {image:"/images/preaching.jpg",date:"28",month:"Aug",title:"Community Outreach Brings Hope",text:"Our team visited several communities to share love, food and encouragement..."}
];

export default function Home(){
 const currentYear = new Date().getFullYear();
 const [latestNews,setLatestNews]=useState<any[]>(updates);
 const [siteStatistics,setSiteStatistics]=useState<SiteStatistic[]>(DEFAULT_SITE_STATISTICS);
 const [selectedGalleryIndex,setSelectedGalleryIndex]=useState<number | null>(null);
 const [selectedNews,setSelectedNews]=useState<NewsModalItem | null>(null);
 const [galleryItems,setGalleryItems]=useState<any[]>([
  {imageUrl:"/images/home-hero.jpg",title:"Bringing hope closer to every community.",category:"Featured Moment"},
  {imageUrl:"/images/food-4.jpg",title:"Community Care",category:"Community Care"},
  {imageUrl:"/images/donation.jpg",title:"Widow Support",category:"Widow Support"},
  {imageUrl:"/images/health-1.jpg",title:"Healthcare",category:"Healthcare"},
  {imageUrl:"/images/preaching.jpg",title:"Faith & Outreach",category:"Faith & Outreach"}
 ]);
 useEffect(()=>{
  let active=true;
  gql<any>(queries.publicNews).then(result=>{
   if(!active)return;
   const items=(result.news||[]).slice(0,4).map((item:any)=>{
    const date=new Date(item.createdAt||item.publishedAt);
    return {id:item.id,image:item.imageUrl||"/images/home-hero.jpg",date:date.toLocaleDateString("en-US",{day:"2-digit"}),month:date.toLocaleDateString("en-US",{month:"short"}),title:item.title,text:item.excerpt||item.body||"",body:item.body||"",category:item.category||"Foundation Update"};
   });
   if(items.length)setLatestNews(items);
  }).catch(()=>{});
  return()=>{active=false};
 },[]);
 useEffect(()=>{
  let active=true;
  gql<any>(queries.publicGallery).then(result=>{
   if(!active)return;
   const items=(result.gallery||[]).slice(0,5);
   if(items.length)setGalleryItems(items);
  }).catch(()=>{});
  return()=>{active=false};
 },[]);
 useEffect(()=>{
  let active=true;
  fetchSiteStatistics().then(items=>{if(active)setSiteStatistics(items);}).catch(()=>{});
  return()=>{active=false};
 },[]);
 return <main>
<section id="home" className="hero-section relative min-h-[470px] overflow-hidden bg-[#061d11] sm:min-h-[485px] lg:min-h-[500px]">
   <Image
    src="/images/food-3.jpg"
    alt="Ssemuyaba Foundation community food outreach"
    fill
    priority
    sizes="100vw"
    className="hero-image object-cover object-center sm:object-[58%_center]"
   />
   <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,20,10,.90)_0%,rgba(0,30,16,.76)_34%,rgba(0,20,10,.38)_64%,rgba(0,0,0,.12)_100%)]"/>
   <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/45 via-transparent to-transparent"/>
   <div className="section-wrap relative z-10 flex min-h-[470px] items-center py-14 sm:min-h-[485px] lg:min-h-[500px] lg:py-16">
    <div className="max-w-[560px] text-white">
     <p className="mb-2 text-[11px] font-extrabold tracking-[0.22em] sm:text-xs">SSEMUYABA FOUNDATION</p>
     <h1 className="hero-title text-5xl font-black sm:text-6xl lg:text-[64px]">Together We<br/><span className="text-[#19db50]">Bring Hope</span></h1>
     <div className="hero-red-stroke my-2 h-[8px] w-[285px] sm:w-[310px]"/>
     <h2 className="max-w-[430px] text-xl font-extrabold leading-[1.08] sm:text-[22px]">Empowering vulnerable Orphans,<br/>Children and Widows.</h2>
     <p className="mt-3 max-w-[455px] text-[13px] leading-[1.55] text-white/95 sm:text-[15px]">We provide love, support, education and sustainable opportunities to help vulnerable children and widows build a better tomorrow. We also teach and preach the good news of Jesus Christ, the soon-coming King.</p>
     <div className="mt-5 flex flex-wrap gap-3">
      <a href="#donate" className="flex items-center gap-2 rounded-full bg-[#ff1d2d] px-6 py-3 text-[13px] font-extrabold shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e91424]"><HeartIcon className="h-4 w-4"/>Donate Now</a>
      <Link href="/sponsor" className="flex items-center gap-2 rounded-full border border-white px-6 py-3 text-[13px] font-extrabold transition hover:bg-white hover:text-[#03491f]">Sponsor a child <ArrowRight className="h-4 w-4"/></Link>
     </div>
    </div>
   </div>
   <svg className="hero-curve absolute bottom-[-1px] left-0 z-20 h-[48px] w-full" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 10 C250 39 950 39 1200 10 L1200 48 L0 48 Z" fill="white"/>
    <path d="M0 10 C250 39 950 39 1200 10" fill="none" stroke="#0c8f3e" stroke-width="4"/>
   </svg>
  </section>

  <section className="bg-white/ py-6 sm:py-8"><div className="section-wrap grid grid-cols-2 divide-x divide-[#b8dfc6] md:grid-cols-4">
   {[[UsersIcon,"children_helped","With education, shelter and care"],[PinIcon,"districts_reached","Across Uganda"],[UsersIcon,"widows_supported","With empowerment programs"],[HeartIcon,"years_impact","Changing lives, building futures"]].map(([Icon,key,desc],i)=>{const C=Icon as React.ComponentType<{className?:string}>;const statistic=getStatistic(siteStatistics,key as string);return <div key={key as string} className={"flex flex-col items-center px-4 py-4 text-center "+(i>1?"border-t md:border-t-0":"")}><C className="mb-2 h-8 w-8 text-[#087a35]"/><div className="text-3xl font-black text-[#087a35] sm:text-4xl">{formatStatisticValue(statistic)}</div><div className="text-sm font-extrabold text-[#05662c] sm:text-base">{statistic.label}</div><p className="mt-1 text-[11px] text-black/75 sm:text-xs">{desc as string}</p></div>})}
  </div></section>

  <section id="about" className="bg-[#f1fbf5] py-8 sm:py-10"><div className="section-wrap grid gap-8 lg:grid-cols-[1.1fr_2fr_1fr] lg:items-center">
   <div><h2 className="border-l-2 border-[#ff1d2d] pl-3 text-3xl font-black sm:text-4xl">Our <span className="text-[#087a35]">Mission</span></h2><p className="mt-3 max-w-md text-sm leading-5 sm:text-base">To empower vulnerable orphans, children and widows through holistic support, including education, healthcare, skills development and sustainable livelihoods.</p><Link href="/about-us" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#12b941] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0ca83a]">Learn More <ArrowRight className="h-4 w-4"/></Link></div>
   <div id="programs" className="grid grid-cols-2 divide-x divide-[#cde8d6] sm:grid-cols-4">{programs.map(({title,text,icon:Icon})=><div key={title} className="px-3 text-center sm:px-4"><div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full border border-[#bde5cb] text-[#087a35]"><Icon/></div><h3 className="text-sm font-black leading-tight">{title}</h3><p className="mt-2 text-[11px] leading-4 text-black/70">{text}</p></div>)}</div>
   <div className="hidden text-right lg:block"><p className="text-3xl font-black italic leading-[1.05]">Real People<br/>Real Stories<br/><span className="text-[#0c8f3e]">Real Change</span> <span className="text-[#ff1d2d]">♡</span></p><div className="ml-auto mt-2 h-1 w-28 rotate-[-4deg] rounded-full bg-[#ff1d2d]"/></div>
  </div></section>

  <section id="donate" className="grid min-h-[340px] lg:grid-cols-2">
   <div className="relative min-h-[340px] overflow-hidden">
    <Image src="/images/books-2.jpg" alt="Books prepared for children and education support" fill className="object-cover object-center"/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/85 via-[#03160b]/20 to-transparent"/>
    <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
     <span className="inline-flex rounded-full bg-[#13d74c] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#063019]">Invest in a future</span>
     <h3 className="mt-2 max-w-md text-2xl font-black leading-tight sm:text-3xl">Every child deserves the tools to learn, grow and dream.</h3>
    </div>
   </div>
   <div className="relative overflow-hidden bg-[#006b2f] px-7 py-10 text-white sm:px-12">
    <div className="relative mx-auto max-w-xl">
     <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10"><HeartIcon className="h-7 w-7 text-[#13d74c]"/></div>
     <h2 className="text-2xl font-black sm:text-3xl">Make a Difference Today</h2>
     <p className="mt-2 max-w-lg text-sm leading-6 text-white/90">Your support can change a life. Help us provide education, healthcare, food and sustainable opportunities for vulnerable children and widows.</p>
     <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
      <p className="text-sm font-bold">Give what you can. Every contribution matters.</p>
      <p className="mt-1 text-xs leading-5 text-white/75">Your generosity helps us reach families who need practical support and hope.</p>
     </div>
     <button className="mt-6 flex w-full max-w-[250px] items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-6 py-3 text-sm font-extrabold transition hover:-translate-y-0.5 hover:bg-[#e91424]"><HeartIcon className="h-4 w-4"/>Donate Now</button>
     <p className="mt-3 text-[10px] font-semibold text-white/70">▣ Secure &amp; Trusted Payments</p>
    </div>
   </div>
  </section>



  <section id="gallery" className="relative overflow-hidden bg-[#f1fbf5] py-12 sm:py-16">
   <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#13d74c]/10 blur-3xl"/>
   <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#ff1d2d]/10 blur-3xl"/>
   <div className="section-wrap relative z-10">
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
     <div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#0c8f3e]">Moments That Matter</p>
      <h2 className="border-l-2 border-[#ff1d2d] pl-3 text-3xl font-black sm:text-4xl">Our <span className="text-[#087a35]">Gallery</span></h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-black/65">A glimpse into the people, communities and moments behind our mission to bring hope.</p>
     </div>
     <span className="inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-xs font-bold text-[#087a35] shadow-soft ring-1 ring-black/5">Together • Hope • Impact</span>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
     <button type="button" onClick={()=>setSelectedGalleryIndex(0)} className="group relative col-span-2 row-span-2 min-h-[300px] overflow-hidden rounded-[1.5rem] bg-[#063019] text-left shadow-xl sm:min-h-[420px]">
      <Image src={galleryItems[0]?.imageUrl || "/images/home-hero.jpg"} alt={galleryItems[0]?.title || "Ssemuyaba Foundation community outreach"} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/90 via-[#03160b]/15 to-transparent"/>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
       <span className="inline-flex rounded-full bg-[#13d74c] px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#063019]">{galleryItems[0]?.category || "Featured Moment"}</span>
       <h3 className="mt-2 text-xl font-black sm:text-2xl">{galleryItems[0]?.title || "Bringing hope closer to every community."}</h3>
      </div>
     </button>
     <button type="button" onClick={()=>setSelectedGalleryIndex(1)} className="group relative min-h-[190px] overflow-hidden rounded-[1.5rem] bg-white text-left shadow-lg ring-1 ring-black/5">
      <Image src={galleryItems[1]?.imageUrl || "/images/food-4.jpg"} alt={galleryItems[1]?.title || "Ssemuyaba Foundation community moment"} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/><span className="absolute bottom-3 left-3 text-xs font-extrabold text-white">{galleryItems[1]?.category || "Community"}</span>
     </button>
     <button type="button" onClick={()=>setSelectedGalleryIndex(2)} className="group relative min-h-[190px] overflow-hidden rounded-[1.5rem] bg-white text-left shadow-lg ring-1 ring-black/5">
      <Image src={galleryItems[2]?.imageUrl || "/images/donation.jpg"} alt={galleryItems[2]?.title || "Ssemuyaba Foundation community moment"} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/><span className="absolute bottom-3 left-3 text-xs font-extrabold text-white">{galleryItems[2]?.category || "Community"}</span>
     </button>
     <button type="button" onClick={()=>setSelectedGalleryIndex(3)} className="group relative min-h-[190px] overflow-hidden rounded-[1.5rem] bg-white text-left shadow-lg ring-1 ring-black/5">
      <Image src={galleryItems[3]?.imageUrl || "/images/health-1.jpg"} alt={galleryItems[3]?.title || "Ssemuyaba Foundation community moment"} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/><span className="absolute bottom-3 left-3 text-xs font-extrabold text-white">{galleryItems[3]?.category || "Community"}</span>
     </button>
     <button type="button" onClick={()=>setSelectedGalleryIndex(4)} className="group relative min-h-[190px] overflow-hidden rounded-[1.5rem] bg-white text-left shadow-lg ring-1 ring-black/5">
      <Image src={galleryItems[4]?.imageUrl || "/images/preaching.jpg"} alt={galleryItems[4]?.title || "Ssemuyaba Foundation community moment"} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/><span className="absolute bottom-3 left-3 text-xs font-extrabold text-white">{galleryItems[4]?.category || "Community"}</span>
     </button>
    </div>
   </div>
  </section>

  <section id="news" className="bg-white py-9 sm:py-11"><div className="section-wrap"><div className="mb-5 flex items-end justify-between gap-4"><div><h2 className="border-l-2 border-[#ff1d2d] pl-3 text-2xl font-black sm:text-3xl">Latest <span className="text-[#087a35]">Updates</span></h2><p className="mt-1 text-xs sm:text-sm">Stories, events and impact from our work.</p></div><Link href="/news" className="hidden items-center gap-2 rounded-full bg-[#0c8f3e] px-5 py-2 text-xs font-bold text-white sm:flex">View All News <ArrowRight className="h-4 w-4"/></Link></div>
   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{latestNews.map((item,index)=><button type="button" key={item.title} onClick={()=>setSelectedNews({id:item.id,image:item.image,date:`${item.date} ${item.month}`,title:item.title,excerpt:item.text,body:item.body,category:item.category})} className="overflow-hidden rounded-lg bg-white text-left shadow-soft ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"><div className="relative h-24 overflow-hidden"><Image src={item.image} alt="" fill className="object-cover"/><div className="absolute bottom-0 left-3 grid min-w-11 place-items-center rounded-t-md bg-[#0c8f3e] px-2 py-1 text-white"><span className="text-sm font-black leading-none">{item.date}</span><span className="text-[9px] font-bold">{item.month}</span></div></div><div className="p-4"><h3 className="text-sm font-black leading-tight">{item.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-4 text-black/65">{item.text}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[#087a35]">Read More <ArrowRight className="h-3 w-3"/></span></div></button>)}</div>
  </div></section>
  {selectedGalleryIndex !== null && galleryItems.length > 0 && <ContentDetailModal type="gallery" item={{id:galleryItems[selectedGalleryIndex]?.id,image:galleryItems[selectedGalleryIndex]?.imageUrl,title:galleryItems[selectedGalleryIndex]?.title,category:galleryItems[selectedGalleryIndex]?.category,description:galleryItems[selectedGalleryIndex]?.description}} items={galleryItems.map((x:any)=>({id:x.id,image:x.imageUrl||"/images/home-hero.jpg",title:x.title,category:x.category,description:x.description})) as GalleryModalItem[]} onClose={()=>setSelectedGalleryIndex(null)} onNavigate={setSelectedGalleryIndex}/>}
  {selectedNews && <ContentDetailModal type="news" item={selectedNews} onClose={()=>setSelectedNews(null)}/>}
 </main>;
}
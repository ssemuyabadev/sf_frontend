import Image from "next/image";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import {ArrowRight,GraduationIcon,HeartIcon,HeartPulseIcon,LeafIcon,PinIcon,ToolsIcon,UsersIcon} from "../components/icons";

const programs=[
 {title:"Education Support",text:"Quality education for a brighter future.",icon:GraduationIcon},
 {title:"Healthcare Access",text:"Health and wellness for stronger lives.",icon:HeartPulseIcon},
 {title:"Skills Development",text:"Practical skills for self-reliance.",icon:ToolsIcon},
 {title:"Sustainable Livelihoods",text:"Creating long-term opportunities.",icon:LeafIcon}
];
const updates=[
 {image:"/images/update-1.svg",date:"12",month:"Sep",title:"School Fees Support for 100 Orphans",text:"We are grateful to our donors for helping 100 children return to school..."},
 {image:"/images/update-2.svg",date:"08",month:"Sep",title:"Widows Empowerment Program Launched",text:"Our new skills training program is helping widows build better futures..."},
 {image:"/images/update-3.svg",date:"02",month:"Sep",title:"Medical Support Reaches Remote Communities",text:"We provided healthcare support to vulnerable families in rural areas..."},
 {image:"/images/update-4.svg",date:"28",month:"Aug",title:"Community Outreach Brings Hope",text:"Our team visited several communities to share love, food and encouragement..."}
];

export default function Home(){
 return <main>
  <Header/>
  <section id="home" className="hero-section relative min-h-[470px] overflow-hidden bg-[#061d11] sm:min-h-[485px] lg:min-h-[500px]">
   <Image
    src="/images/home-hero.jpg"
    alt="A mother and children smiling together"
    fill
    priority
    sizes="100vw"
    className="hero-image object-cover object-[62%_center] sm:object-[60%_center]"
   />
   <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.84)_0%,rgba(0,0,0,.66)_34%,rgba(0,0,0,.20)_67%,rgba(0,0,0,.04)_100%)]"/>
   <div className="section-wrap relative z-10 flex min-h-[470px] items-center py-14 sm:min-h-[485px] lg:min-h-[500px] lg:py-16">
    <div className="max-w-[560px] text-white">
     <p className="mb-2 text-[11px] font-extrabold tracking-[0.22em] sm:text-xs">SSEMUYABA FOUNDATION</p>
     <h1 className="hero-title text-5xl font-black sm:text-6xl lg:text-[64px]">Together We<br/><span className="text-[#19db50]">Bring Hope</span></h1>
     <div className="hero-red-stroke my-2 h-[8px] w-[285px] sm:w-[310px]"/>
     <h2 className="max-w-[430px] text-xl font-extrabold leading-[1.08] sm:text-[22px]">Empowering vulnerable Orphans,<br/>Children and Widows.</h2>
     <p className="mt-3 max-w-[455px] text-[13px] leading-[1.55] text-white/95 sm:text-[15px]">We provide love, support, education and sustainable opportunities to help vulnerable children and widows build a better tomorrow.</p>
     <div className="mt-5 flex flex-wrap gap-3">
      <a href="#donate" className="flex items-center gap-2 rounded-full bg-[#ff1d2d] px-6 py-3 text-[13px] font-extrabold shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e91424]"><HeartIcon className="h-4 w-4"/>Donate Now</a>
      <a href="#about" className="flex items-center gap-2 rounded-full border border-white px-6 py-3 text-[13px] font-extrabold transition hover:bg-white hover:text-[#03491f]">Sponsor a child <ArrowRight className="h-4 w-4"/></a>
     </div>
    </div>
   </div>
   <svg className="hero-curve absolute bottom-[-1px] left-0 z-20 h-[48px] w-full" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 10 C250 39 950 39 1200 10 L1200 48 L0 48 Z" fill="white"/>
    <path d="M0 10 C250 39 950 39 1200 10" fill="none" stroke="#0c8f3e" stroke-width="4"/>
   </svg>
  </section>

  <section className="bg-white/ py-6 sm:py-8"><div className="section-wrap grid grid-cols-2 divide-x divide-[#b8dfc6] md:grid-cols-4">
   {[[UsersIcon,"1,250+","Children Helped","With education, shelter and care"],[PinIcon,"12+","Districts Reached","Across Uganda"],[UsersIcon,"320+","Widows Supported","With empowerment programs"],[HeartIcon,"5+","Years of Impact","Changing lives, building futures"]].map(([Icon,stat,label,desc],i)=>{const C=Icon as React.ComponentType<{className?:string}>;return <div key={label as string} className={"flex flex-col items-center px-4 py-4 text-center "+(i>1?"border-t md:border-t-0":"")}><C className="mb-2 h-8 w-8 text-[#087a35]"/><div className="text-3xl font-black text-[#087a35] sm:text-4xl">{stat as string}</div><div className="text-sm font-extrabold text-[#05662c] sm:text-base">{label as string}</div><p className="mt-1 text-[11px] text-black/75 sm:text-xs">{desc as string}</p></div>})}
  </div></section>

  <section id="about" className="bg-[#f1fbf5] py-8 sm:py-10"><div className="section-wrap grid gap-8 lg:grid-cols-[1.1fr_2fr_1fr] lg:items-center">
   <div><h2 className="border-l-2 border-[#ff1d2d] pl-3 text-3xl font-black sm:text-4xl">Our <span className="text-[#087a35]">Mission</span></h2><p className="mt-3 max-w-md text-sm leading-5 sm:text-base">To empower vulnerable orphans, children and widows through holistic support, including education, healthcare, skills development and sustainable livelihoods.</p><a href="#programs" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#12b941] px-5 py-2.5 text-sm font-bold text-white">Learn More <ArrowRight className="h-4 w-4"/></a></div>
   <div id="programs" className="grid grid-cols-2 divide-x divide-[#cde8d6] sm:grid-cols-4">{programs.map(({title,text,icon:Icon})=><div key={title} className="px-3 text-center sm:px-4"><div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full border border-[#bde5cb] text-[#087a35]"><Icon/></div><h3 className="text-sm font-black leading-tight">{title}</h3><p className="mt-2 text-[11px] leading-4 text-black/70">{text}</p></div>)}</div>
   <div className="hidden text-right lg:block"><p className="text-3xl font-black italic leading-[1.05]">Real People<br/>Real Stories<br/><span className="text-[#0c8f3e]">Real Change</span> <span className="text-[#ff1d2d]">♡</span></p><div className="ml-auto mt-2 h-1 w-28 rotate-[-4deg] rounded-full bg-[#ff1d2d]"/></div>
  </div></section>

  <section id="donate" className="grid min-h-[300px] lg:grid-cols-2">
   <div className="relative min-h-[300px] overflow-hidden"><Image src="/images/testimonial-child.svg" alt="Child smiling at school" fill className="object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/75"/><div className="absolute inset-y-0 right-0 flex w-[52%] items-center p-6 text-white sm:p-10"><div><div className="mb-2 text-4xl font-black text-[#13d74c]">“</div><p className="text-xl font-bold leading-6">Because of your support,<br/>I now go to school,<br/>I have <span className="text-[#13d74c]">hope</span>, and I believe<br/>in my dreams.</p><p className="mt-3 text-xs font-semibold">— A beneficiary child</p></div></div></div>
   <div className="relative overflow-hidden bg-[#006b2f] px-7 py-10 text-white sm:px-12"><div className="relative mx-auto max-w-xl"><h2 className="flex items-center gap-3 text-2xl font-black sm:text-3xl"><HeartIcon className="h-10 w-10"/><span>Make a Difference Today</span></h2><p className="mt-2 text-sm text-white/90">Your support can change a life. Donate today and be part of the solution.</p><div className="mt-5 grid grid-cols-4 gap-2">{["$10","$25","$50","$100"].map((amount,i)=><button key={amount} className={"rounded-full border px-3 py-2 text-sm font-bold "+(i===1?"border-[#13d74c] bg-[#13d74c]":"border-white/40")}>{amount}</button>)}</div><button className="mx-auto mt-5 flex w-full max-w-[250px] items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-6 py-3 text-sm font-extrabold"><HeartIcon className="h-4 w-4"/>Donate Now</button><p className="mt-3 text-center text-[10px] font-semibold text-white/80">▣ Secure &amp; Trusted Payments</p></div></div>
  </section>

  <section id="news" className="bg-white py-9 sm:py-11"><div className="section-wrap"><div className="mb-5 flex items-end justify-between gap-4"><div><h2 className="border-l-2 border-[#ff1d2d] pl-3 text-2xl font-black sm:text-3xl">Latest <span className="text-[#087a35]">Updates</span></h2><p className="mt-1 text-xs sm:text-sm">Stories, events and impact from our work.</p></div><a href="#news" className="hidden items-center gap-2 rounded-full bg-[#0c8f3e] px-5 py-2 text-xs font-bold text-white sm:flex">View All News <ArrowRight className="h-4 w-4"/></a></div>
   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{updates.map(item=><article key={item.title} className="overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-black/5"><div className="relative h-24 overflow-hidden"><Image src={item.image} alt="" fill className="object-cover"/><div className="absolute bottom-0 left-3 grid min-w-11 place-items-center rounded-t-md bg-[#0c8f3e] px-2 py-1 text-white"><span className="text-sm font-black leading-none">{item.date}</span><span className="text-[9px] font-bold">{item.month}</span></div></div><div className="p-4"><h3 className="text-sm font-black leading-tight">{item.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-4 text-black/65">{item.text}</p><a href="#news" className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[#087a35]">Read More <ArrowRight className="h-3 w-3"/></a></div></article>)}</div>
  </div></section>

  <footer id="contact" className="bg-[#03160b] text-white"><div className="section-wrap grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr]">
   <div><Image src="/images/ssemuyaba-full-logo-transparent.png" alt="Ssemuyaba Foundation" width={718} height={307} className="h-20 w-auto max-w-full object-contain object-left sm:h-24"/></div>
   <div><h3 className="font-bold">Quick Links</h3><div className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-white/75">{["Home","About Us","Our Programs","Get Involved","Gallery","News & Updates","Contact","Donate"].map(x=><a href={"#"+(x==="Home"?"home":x==="About Us"?"about":x==="News & Updates"?"news":x==="Contact"?"contact":"programs")} key={x}>{x}</a>)}</div></div>
   <div><h3 className="font-bold">Contact Us</h3><div className="mt-3 space-y-2 text-xs text-white/80"><p>☎ +256 705 283 679 | +256 789 395 815</p><p>✉ info@ssemuyabafoundation.org</p><p>⌖ Kampala, Uganda</p></div></div>
   <div><h3 className="font-bold">Follow Us</h3><div className="mt-3 flex gap-2">{["f","𝕏","◎","▶"].map(x=><span key={x} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm">{x}</span>)}</div><p className="mt-6 text-2xl font-black italic text-[#13d74c]">Together<br/>We Can <span className="text-[#ff1d2d]">♡</span></p></div>
  </div><div className="h-1 bg-gradient-to-r from-[#0c8f3e] via-[#13d74c] to-[#ff1d2d]"/><div className="section-wrap flex flex-col gap-2 py-4 text-[10px] text-white/70 sm:flex-row sm:items-center sm:justify-between"><span>© 2025 Ssemuyaba Foundation. All rights reserved.</span><span>Empowering Vulnerable Orphans, Children and Widows. <span className="text-[#ff1d2d]">♡</span></span></div></footer>
  <ScrollToTop/>
 </main>;
}
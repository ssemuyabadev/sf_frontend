"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartIcon, UsersIcon, GraduationIcon, HeartPulseIcon, LeafIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { gql, queries } from "../../lib/api";
import ContentDetailModal, { type NewsModalItem } from "@/components/ContentDetailModal";

const stories = [
  {
    category: "Education",
    date: "Recent Update",
    title: "School Fees Support for 100 Orphans",
    excerpt: "Helping vulnerable children stay in school with practical education support, dignity and a renewed sense of possibility.",
    image: "/images/books.jpg",
  },
  {
    category: "Empowerment",
    date: "Community Update",
    title: "Widows Empowerment Program Launched",
    excerpt: "A new chapter of support is creating sustainable opportunities for widows to build stronger, more independent futures.",
    image: "/images/donation.jpg",
  },
  {
    category: "Healthcare",
    date: "Impact Story",
    title: "Medical Support Reaches Remote Communities",
    excerpt: "Care and essential support are reaching families who can face major barriers to accessing healthcare.",
    image: "/images/health-1.jpg",
  },
  {
    category: "Outreach",
    date: "Foundation Activity",
    title: "Community Outreach Brings Hope",
    excerpt: "Through community visits, practical help and the message of hope, we continue meeting people where they are.",
    image: "/images/preaching.jpg",
  },
  {
    category: "Food Support",
    date: "Foundation Activity",
    title: "Sharing Food, Restoring Dignity",
    excerpt: "Food support gives vulnerable families more than a meal — it reminds them that their community cares.",
    image: "/images/food-5.jpg",
  },
  {
    category: "Children",
    date: "Foundation Activity",
    title: "Creating Brighter Days for Children",
    excerpt: "Every child deserves love, encouragement and the opportunity to grow into a hopeful tomorrow.",
    image: "/images/food-6.jpg",
  },
];

const focusAreas = [
  { label: "Children & Orphans", icon: UsersIcon, text: "Love, education and practical support for vulnerable children." },
  { label: "Education", icon: GraduationIcon, text: "Opening doors through school support and learning opportunities." },
  { label: "Healthcare", icon: HeartPulseIcon, text: "Connecting vulnerable communities with essential care and support." },
  { label: "Sustainable Empowerment", icon: LeafIcon, text: "Helping families move from immediate need toward lasting opportunity." },
];

export default function NewsUpdatesPage() {
  const [liveStories,setLiveStories]=useState<any[]>([]);
  const [selectedStory,setSelectedStory]=useState<NewsModalItem | null>(null);
  useEffect(()=>{gql<any>(queries.publicNews).then(r=>setLiveStories(r.news.map((x:any)=>({category:x.category||"Foundation Update",date:x.publishedAt?new Date(x.publishedAt).toLocaleDateString():"Recent",title:x.title,excerpt:x.excerpt||x.body?.slice(0,150),body:x.body||"",image:x.imageUrl||"/images/home-hero.jpg",slug:x.slug,id:x.id})))).catch(()=>{});},[]);
  const storyItems=liveStories.length?liveStories:stories;
  const featuredStory=storyItems[0];
  return (
    <main className="overflow-hidden">
      <section className="relative isolate min-h-[560px] overflow-hidden bg-[#03160b] text-white">
        <Image src="/images/home-hero.jpg" alt="Ssemuyaba Foundation community activity" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(3,22,11,.96)_8%,rgba(3,22,11,.76)_50%,rgba(3,22,11,.38)_100%)]" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#13d74c]/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#ff1d2d]/10 blur-3xl" />

        <div className="section-wrap relative z-10 flex min-h-[560px] items-center py-24">
          <div className="max-w-3xl about-reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#a9ffbe] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#13d74c] shadow-[0_0_16px_#13d74c]" />
              News &amp; Updates
            </div>
            <h1 className="hero-title text-5xl font-black sm:text-6xl lg:text-7xl">
              Stories of <span className="about-gradient-text">hope in action.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              Follow the people, programs and community activities behind the mission of Ssemuyaba Foundation — from education and healthcare to empowerment, outreach and the love of Christ.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#latest" className="inline-flex items-center gap-2 rounded-full bg-[#13d74c] px-6 py-3.5 text-sm font-extrabold text-[#03160b] shadow-[0_14px_40px_rgba(19,215,76,.2)] transition hover:-translate-y-1">
                Explore our updates <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/donate" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white/15">
                <HeartIcon className="h-4 w-4" /> Support the work
              </Link>
            </div>
          </div>
        </div>

        <svg className="absolute bottom-[-1px] left-0 z-20 h-[52px] w-full" viewBox="0 0 1200 52" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 11 C250 43 950 43 1200 11 L1200 52 L0 52 Z" fill="white" />
          <path d="M0 11 C250 43 950 43 1200 11" fill="none" stroke="#13d74c" strokeWidth="4" />
        </svg>
      </section>

      <section id="latest" className="bg-white py-20 sm:py-24">
        <div className="section-wrap">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[.24em] text-[#0c8f3e]">From the field</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07110a] sm:text-5xl">Latest news &amp; updates</h2>
              <p className="mt-4 text-sm leading-7 text-black/55 sm:text-base">A closer look at the activities, stories and moments that are shaping lives through the foundation.</p>
            </div>
            <div className="hidden rounded-full bg-[#f1fbf5] px-4 py-2 text-xs font-bold text-[#087a35] sm:block">Hope • Action • Impact</div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <button type="button" onClick={()=>setSelectedStory(featuredStory)} className="group block w-full overflow-hidden rounded-[2rem] bg-[#063019] text-left text-white shadow-[0_25px_70px_rgba(3,73,31,.16)] lg:col-span-7">
              <div className="relative h-[330px] overflow-hidden sm:h-[430px]">
                <Image src={featuredStory.image} alt={featuredStory.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03160b] via-[#03160b]/15 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-[#087a35]">Featured story</div>
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-[#8cffaa]">{featuredStory.category} • Hope • Action</p>
                  <h3 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-4xl">{featuredStory.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">{featuredStory.excerpt}</p>
                </div>
              </div>
            </button>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {storyItems.slice(1, 3).map((story) => (
                <button type="button" key={story.title} onClick={()=>setSelectedStory(story)} className="group grid w-full overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#f1fbf5] text-left shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[180px_1fr] lg:grid-cols-[190px_1fr]">
                  <div className="relative min-h-[190px] overflow-hidden">
                    <Image src={story.image} alt={story.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-black uppercase tracking-[.15em] text-[#0c8f3e]">{story.category}</span>
                    <h3 className="mt-2 text-xl font-black leading-tight text-[#07110a]">{story.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-black/55">{story.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#087a35]">Read story <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f1fbf5] py-20 sm:py-24">
        <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#13d74c]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#ff1d2d]/5 blur-3xl" />
        <div className="section-wrap relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#0c8f3e]">What we are doing</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Where hope becomes action</h2>
            <p className="mt-4 text-sm leading-7 text-black/55 sm:text-base">Our updates are snapshots of a bigger mission: helping vulnerable people experience practical love, opportunity and hope.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map(({ label, icon: Icon, text: description }) => (
              <div key={label} className="group rounded-[1.6rem] border border-white bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(3,73,31,.12)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0c8f3e] text-white transition group-hover:rotate-3 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-black">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="section-wrap">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-[#0c8f3e]">More from the foundation</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">More stories from our communities</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {storyItems.slice(3).map((story, index) => (
              <button type="button" key={story.title} onClick={()=>setSelectedStory(story)} className="group block w-full overflow-hidden rounded-[1.75rem] border border-black/5 bg-white text-left shadow-[0_12px_40px_rgba(0,0,0,.06)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(3,73,31,.13)]">
                <div className="relative h-56 overflow-hidden">
                  <Image src={story.image} alt={story.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] text-[#087a35]">{story.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-black/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff1d2d]" />
                    {story.date}
                  </div>
                  <h3 className="mt-3 text-xl font-black leading-tight">{story.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/55">{story.excerpt}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#087a35]">Discover the impact <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#03160b] py-20 text-white sm:py-24">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/preaching.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#03160b_5%,rgba(3,22,11,.92)_55%,rgba(3,22,11,.65))]" />
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#13d74c]/15 blur-3xl" />
        <div className="section-wrap relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#13d74c]/30 bg-[#13d74c]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#8cffaa]">Be part of the next story</span>
            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">The next update could be a life changed because of you.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Your generosity helps us keep showing up for children, orphans and widows with education, healthcare, practical support, empowerment and the hope of Jesus Christ.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,29,45,.2)] transition hover:-translate-y-1 hover:bg-[#e91424]">
              <HeartIcon className="h-4 w-4" /> Donate &amp; change a life
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15">
              Talk to our team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>

    {selectedStory && (
      <ContentDetailModal
        type="news"
        item={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    )}
  );
}
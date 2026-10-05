"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartIcon } from "@/components/icons";

const gallery = [
  { image: "/images/home-hero.jpg", title: "A community gathered in hope", category: "Community", featured: true },
  { image: "/images/food-4.jpg", title: "Serving with compassion", category: "Outreach" },
  { image: "/images/food.jpg", title: "Caring for children", category: "Children" },
  { image: "/images/books.jpg", title: "Opening doors through education", category: "Education" },
  { image: "/images/books-2.jpg", title: "Learning for a brighter tomorrow", category: "Education" },
  { image: "/images/health-1.jpg", title: "Healthcare that reaches people", category: "Healthcare" },
  { image: "/images/health-2.jpg", title: "Supporting healthy communities", category: "Healthcare" },
  { image: "/images/donation.jpg", title: "Empowering vulnerable families", category: "Empowerment" },
  { image: "/images/food-3.jpg", title: "Sharing food and dignity", category: "Outreach" },
  { image: "/images/food-5.jpg", title: "Together around the table", category: "Community" },
  { image: "/images/food-6.jpg", title: "Moments that bring joy", category: "Children" },
  { image: "/images/preaching.jpg", title: "Sharing the good news", category: "Faith & Outreach" },
];

const moments = [
  { number: "01", title: "We show up", text: "We go where vulnerable people are and listen to the needs of each community." },
  { number: "02", title: "We serve", text: "From food and healthcare to education and practical support, love becomes action." },
  { number: "03", title: "We empower", text: "We pursue sustainable opportunities that help families build a stronger tomorrow." },
];

export default function GalleryPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative isolate min-h-[590px] overflow-hidden bg-[#03160b] text-white">
        <Image src="/images/home-hero.jpg" alt="Ssemuyaba Foundation community" fill priority className="object-cover opacity-55 gallery-hero-image" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,22,11,.96)_5%,rgba(3,22,11,.7)_52%,rgba(3,22,11,.3)_100%)]" />
        <div className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-[#13d74c]/15 blur-3xl gallery-glow" />
        <div className="absolute bottom-10 right-[12%] h-72 w-72 rounded-full bg-[#ff1d2d]/10 blur-3xl gallery-glow gallery-glow-delay" />

        <div className="section-wrap relative z-10 flex min-h-[590px] items-center py-24">
          <div className="max-w-3xl gallery-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.22em] text-[#a9ffbe] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#13d74c] shadow-[0_0_15px_#13d74c]" />
              Our Gallery
            </span>
            <h1 className="hero-title mt-6 text-5xl font-black sm:text-6xl lg:text-7xl">
              See <span className="gallery-gradient-text">hope in action.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Go behind the scenes of Ssemuyaba Foundation. These moments capture the people, communities and acts of love that make our mission real.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#moments" className="inline-flex items-center gap-2 rounded-full bg-[#13d74c] px-6 py-3.5 text-sm font-extrabold text-[#03160b] shadow-[0_15px_40px_rgba(19,215,76,.2)] transition hover:-translate-y-1">
                Explore the gallery <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/donate" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white/15">
                <HeartIcon className="h-4 w-4" /> Make an impact
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-28 right-[7%] hidden h-48 w-48 rotate-6 rounded-[2rem] border-8 border-white/15 shadow-2xl lg:block gallery-floating-frame">
            <Image src="/images/preaching.jpg" alt="" fill className="object-cover rounded-[1.4rem]" />
            <span className="absolute -bottom-5 -left-8 rounded-full bg-[#ff1d2d] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">Love • Serve • Empower</span>
          </div>
        </div>

        <svg className="absolute bottom-[-1px] left-0 z-20 h-[52px] w-full" viewBox="0 0 1200 52" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 11 C250 43 950 43 1200 11 L1200 52 L0 52 Z" fill="white" />
          <path d="M0 11 C250 43 950 43 1200 11" fill="none" stroke="#13d74c" strokeWidth="4" />
        </svg>
      </section>

      <section id="moments" className="relative bg-white py-20 sm:py-24">
        <div className="section-wrap">
          <div className="mx-auto max-w-2xl text-center gallery-reveal">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#0c8f3e]">Beyond the pictures</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Every photograph holds a story.</h2>
            <p className="mt-4 text-sm leading-7 text-black/55 sm:text-base">What you see here is more than a collection of images. It is a glimpse of people being seen, supported and reminded that they matter.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {moments.map((moment) => (
              <div key={moment.number} className="gallery-moment-card group relative overflow-hidden rounded-[1.7rem] border border-black/5 bg-[#f1fbf5] p-7">
                <span className="text-5xl font-black text-[#0c8f3e]/10 transition duration-500 group-hover:text-[#0c8f3e]/20">{moment.number}</span>
                <h3 className="mt-3 text-xl font-black">{moment.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{moment.text}</p>
                <div className="mt-5 h-1 w-12 rounded-full bg-[#13d74c] transition-all duration-500 group-hover:w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f1fbf5] py-20 sm:py-24">
        <div className="section-wrap">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[.24em] text-[#0c8f3e]">Life at Ssemuyaba Foundation</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Moments from the field</h2>
              <p className="mt-4 text-sm leading-7 text-black/55 sm:text-base">Education. Healthcare. Food support. Empowerment. Outreach. Faith. One mission, many moments.</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] text-[#087a35] shadow-sm">Love in every frame</div>
          </div>

          <div className="gallery-masonry mt-12">
            {gallery.map((item, index) => (
              <article key={item.title} className={"gallery-tile group " + (item.featured ? "gallery-tile-featured" : "")} style={{ animationDelay: index * 55 + "ms" }}>
                <div className="relative h-full min-h-[270px] overflow-hidden rounded-[1.65rem]">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/85 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.14em] text-[#087a35] shadow-sm">{item.category}</div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-xl font-black leading-tight">{item.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#13d74c]" /> Ssemuyaba Foundation
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#03160b] py-20 text-white sm:py-24">
        <div className="absolute inset-0 opacity-25">
          <Image src="/images/food-3.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#03160b_8%,rgba(3,22,11,.9)_58%,rgba(3,22,11,.55))]" />
        <div className="absolute -right-28 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#13d74c]/10 blur-3xl gallery-glow" />
        <div className="section-wrap relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#13d74c]/25 bg-[#13d74c]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#8cffaa]">Your support becomes a story</span>
            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Help us create more moments of hope.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Every meal served, child supported, widow empowered and community reached is possible because people choose to care. Stand with us and help write the next chapter.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,29,45,.2)] transition hover:-translate-y-1 hover:bg-[#e91424)">
              <HeartIcon className="h-4 w-4" /> Donate &amp; make a difference
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15">
              Connect with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

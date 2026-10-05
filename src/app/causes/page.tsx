"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationIcon, HeartIcon, HeartPulseIcon, LeafIcon, ToolsIcon, UsersIcon } from "@/components/icons";

const causes = [
  {
    title: "Children & Orphans",
    eyebrow: "Give a child a fair chance",
    text: "Help vulnerable children receive care, school support, meals, encouragement and the practical things they need to grow with dignity.",
    image: "/images/food.jpg",
    icon: UsersIcon,
    impact: "Education • Care • Nutrition",
  },
  {
    title: "Education",
    eyebrow: "Open the door to tomorrow",
    text: "Your support can help children stay in school through fees, books, learning materials and the support that keeps a dream alive.",
    image: "/images/books.jpg",
    icon: GraduationIcon,
    impact: "School fees • Books • Learning",
  },
  {
    title: "Healthcare",
    eyebrow: "Health should not depend on income",
    text: "Stand with families who struggle to access essential care by supporting medical assistance, health outreach and community wellbeing.",
    image: "/images/health-1.jpg",
    icon: HeartPulseIcon,
    impact: "Medical care • Outreach • Wellness",
  },
  {
    title: "Widows & Families",
    eyebrow: "Turn support into independence",
    text: "Help widows and vulnerable families access skills, practical assistance and opportunities that can create more sustainable livelihoods.",
    image: "/images/donation.jpg",
    icon: LeafIcon,
    impact: "Skills • Enterprise • Empowerment",
  },
  {
    title: "Community Outreach",
    eyebrow: "Go where hope is needed",
    text: "Support visits, food distribution, encouragement and community activities that remind people they are seen, valued and not forgotten.",
    image: "/images/food-4.jpg",
    icon: HeartIcon,
    impact: "Food • Visits • Community",
  },
  {
    title: "Skills & Livelihoods",
    eyebrow: "Create lasting opportunity",
    text: "Help us equip people with practical skills and tools that can move a family from dependence toward confidence and self-reliance.",
    image: "/images/food-5.jpg",
    icon: ToolsIcon,
    impact: "Training • Skills • Tools",
  },
];

const givingLevels = [
  ["UGX 20,000", "can help provide a family with essential food support."],
  ["UGX 50,000", "can help cover learning materials or practical child support."],
  ["UGX 100,000", "can help strengthen healthcare, education or empowerment activities."],
];

export default function CausesPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="causes-hero relative isolate min-h-[650px] overflow-hidden bg-[#03160b] text-white">
        <Image src="/images/food-3.jpg" alt="Ssemuyaba Foundation community outreach" fill priority className="causes-hero-image object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(3,22,11,.96)_0%,rgba(3,22,11,.78)_45%,rgba(3,22,11,.25)_100%)]" />
        <div className="causes-glow causes-glow-one" />
        <div className="causes-glow causes-glow-two" />

        <div className="section-wrap relative z-10 flex min-h-[650px] items-center py-20">
          <div className="max-w-3xl causes-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#13d74c] causes-pulse" />
              Our Causes
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[.94] tracking-[-.055em] sm:text-6xl lg:text-8xl">
              Choose a cause.
              <span className="causes-gradient-text block">Change a life.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              Every gift is an opportunity to turn compassion into something real: a child
              back in school, a family with food, a patient receiving care or a widow gaining
              a path toward independence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#causes" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-extrabold shadow-xl transition hover:-translate-y-1 hover:bg-[#e91424]">
                Explore causes <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/donate" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-extrabold backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15">
                Give where needed most
              </Link>
            </div>
          </div>

          <div className="causes-hero-note absolute bottom-20 right-[5%] hidden w-[255px] rotate-3 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl xl:block">
            <p className="text-4xl font-black text-[#13d74c]">100%</p>
            <p className="mt-1 font-black">of your compassion matters.</p>
            <p className="mt-2 text-xs leading-5 text-white/60">Choose a specific cause or help us respond to the most urgent needs in our communities.</p>
          </div>
        </div>

        <svg className="pointer-events-none absolute bottom-[-1px] left-0 z-20 h-[52px] w-full" viewBox="0 0 1200 52" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 10 C250 42 950 42 1200 10 L1200 52 L0 52 Z" fill="white" />
          <path d="M0 10 C250 42 950 42 1200 10" fill="none" stroke="#0c8f3e" strokeWidth="4" />
        </svg>
      </section>

      <section className="section-wrap py-20 sm:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.85fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#087a35]">Where your generosity goes</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-.04em] text-[#03160b] sm:text-5xl">
              Give to the story you want to help write.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600 lg:justify-self-end">
            There is no single way to change a life. Explore the areas where Ssemuyaba
            Foundation serves, then choose the cause closest to your heart.
          </p>
        </div>
      </section>

      <section id="causes" className="bg-[#f1fbf5] py-20 sm:py-28">
        <div className="section-wrap">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {causes.map((cause, index) => {
              const Icon = cause.icon;
              return (
                <article key={cause.title} className="cause-card group overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_50px_rgba(3,73,31,.08)]">
                  <div className="relative h-[270px] overflow-hidden">
                    <Image src={cause.image} alt={cause.title} fill className="cause-card-image object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/80 via-[#03160b]/5 to-transparent" />
                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#087a35] shadow-lg backdrop-blur">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#13d74c]">{cause.eyebrow}</p>
                      <h3 className="mt-1 text-2xl font-black text-white">{cause.title}</h3>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-sm leading-7 text-slate-600">{cause.text}</p>
                    <div className="mt-5 border-t border-slate-100 pt-4 text-[10px] font-black uppercase tracking-[.13em] text-[#087a35]">
                      {cause.impact}
                    </div>
                    <Link href="/donate" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#087a35] px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#006b2f]">
                      Support this cause <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap py-20 sm:py-28">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#03160b] text-white shadow-2xl">
          <div className="grid lg:grid-cols-[.95fr_1.05fr]">
            <div className="relative min-h-[420px]">
              <Image src="/images/books-2.jpg" alt="Children learning through education support" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/75 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <span className="rounded-full bg-[#13d74c] px-3 py-1 text-[10px] font-black uppercase tracking-[.15em] text-[#03160b]">Your gift becomes action</span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#13d74c]">Give with purpose</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-.04em] sm:text-5xl">
                Small acts of generosity can become big turning points.
              </h2>
              <p className="mt-5 leading-8 text-white/65">
                A donation is more than an amount. It can become a school book, a meal,
                healthcare, a skill, a safe moment or the encouragement someone needed to
                keep going.
              </p>
              <div className="mt-7 space-y-3">
                {givingLevels.map(([amount, impact]) => (
                  <div key={amount} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.05] p-4">
                    <span className="min-w-[105px] text-sm font-black text-[#13d74c]">{amount}</span>
                    <span className="text-sm leading-6 text-white/70">{impact}</span>
                  </div>
                ))}
              </div>
              <Link href="/donate" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-extrabold shadow-lg transition hover:-translate-y-1 hover:bg-[#e91424]">
                Make your gift <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <Image src="/images/donation.jpg" alt="Supporting vulnerable families" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#03160b]/82" />
        <div className="causes-cta-glow absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#13d74c]/20 blur-3xl" />
        <div className="section-wrap relative z-10 text-center text-white">
          <span className="text-xs font-black uppercase tracking-[.2em] text-[#13d74c]">Be part of the change</span>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight tracking-[-.04em] sm:text-6xl">
            The next life changed could begin with your generosity.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            Choose a cause, give what you can and help us keep reaching vulnerable children,
            orphans, widows and families with practical love and lasting hope.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-extrabold transition hover:-translate-y-1 hover:bg-[#e91424]">
              Donate & make an impact <HeartIcon className="h-4 w-4" />
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-extrabold backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

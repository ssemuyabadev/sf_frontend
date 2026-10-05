"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  GraduationIcon,
  HeartIcon,
  HeartPulseIcon,
  LeafIcon,
  ToolsIcon,
  UsersIcon,
} from "@/components/icons";

const opportunities = [
  {
    icon: UsersIcon,
    title: "Community Outreach",
    text: "Join our teams as we visit communities, listen to needs, distribute support and build relationships that restore hope.",
    image: "/images/preaching.jpg",
  },
  {
    icon: GraduationIcon,
    title: "Education Support",
    text: "Help children learn by supporting reading, school preparation, mentorship, learning activities and practical education needs.",
    image: "/images/books-2.jpg",
  },
  {
    icon: HeartPulseIcon,
    title: "Health & Wellbeing",
    text: "Support health-focused activities, community awareness and compassionate care for people who struggle to access essential services.",
    image: "/images/health-2.jpg",
  },
  {
    icon: LeafIcon,
    title: "Family Empowerment",
    text: "Help us equip widows and vulnerable families with skills, encouragement and opportunities that can grow into sustainable livelihoods.",
    image: "/images/donation.jpg",
  },
  {
    icon: ToolsIcon,
    title: "Skills & Practical Help",
    text: "Share your professional, creative or practical skills where they can strengthen our programs and make our work more effective.",
    image: "/images/food-4.jpg",
  },
  {
    icon: HeartIcon,
    title: "Events & Fundraising",
    text: "Help organise campaigns, community events and fundraising activities that connect more people to the mission.",
    image: "/images/food-5.jpg",
  },
];

const steps = [
  ["01", "Tell us about you", "Share your interests, skills, availability and the kind of service that excites you."],
  ["02", "We connect", "Our team reviews your interest and reaches out to discuss where you can contribute best."],
  ["03", "Serve with purpose", "Join a team, meet the community and turn your time into practical moments of hope."],
];

export default function GetInvolvedPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const body = [
      "Volunteer expression of interest",
      "",
      `Full name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone / WhatsApp: ${data.get("phone")}`,
      `Location: ${data.get("location")}`,
      `Area of interest: ${data.get("interest")}`,
      `Availability: ${data.get("availability")}`,
      `Preferred involvement: ${data.get("involvement")}`,
      "",
      "About me:",
      String(data.get("message") || ""),
    ].join("\\n");

    window.location.href =
      "mailto:info@ssemuyabafoundation.org?subject=" +
      encodeURIComponent("Volunteer Expression of Interest") +
      "&body=" +
      encodeURIComponent(body);
    setSubmitted(true);
  }

  return (
    <main className="overflow-hidden bg-white">
      <section className="volunteer-hero relative isolate min-h-[650px] overflow-hidden bg-[#03160b] text-white">
        <Image
          src="/images/home-hero.jpg"
          alt="Ssemuyaba Foundation volunteers serving the community"
          fill
          priority
          className="volunteer-hero-image object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(3,22,11,.94)_0%,rgba(3,22,11,.78)_45%,rgba(3,22,11,.28)_100%)]" />
        <div className="volunteer-orb volunteer-orb-one" />
        <div className="volunteer-orb volunteer-orb-two" />

        <div className="section-wrap relative z-10 flex min-h-[650px] items-center py-20">
          <div className="max-w-3xl volunteer-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[.18em] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#13d74c] volunteer-pulse" />
              Get Involved
            </span>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl lg:text-8xl">
              Your time can become
              <span className="volunteer-gradient-text block">someone&apos;s hope.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              Volunteering with Ssemuyaba Foundation means showing up with compassion,
              sharing what you can and helping vulnerable children, orphans, widows and
              communities experience dignity, opportunity and hope.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#volunteer-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-extrabold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#e91424]">
                Become a volunteer <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#opportunities" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15">
                Explore opportunities
              </a>
            </div>
          </div>

          <div className="volunteer-hero-card absolute bottom-14 right-[5%] hidden w-[245px] rotate-3 overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md xl:block">
            <div className="relative h-[270px] overflow-hidden rounded-[1.5rem]">
              <Image src="/images/food-4.jpg" alt="Community service at Ssemuyaba Foundation" fill className="object-cover" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#03160b]/80 p-4 backdrop-blur">
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#13d74c]">Love • Serve • Empower</p>
                <p className="mt-1 text-sm font-bold">There is a place for your gifts.</p>
              </div>
            </div>
          </div>
        </div>

        <svg className="pointer-events-none absolute bottom-[-1px] left-0 z-20 h-[52px] w-full" viewBox="0 0 1200 52" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 10 C250 42 950 42 1200 10 L1200 52 L0 52 Z" fill="white" />
          <path d="M0 10 C250 42 950 42 1200 10" fill="none" stroke="#0c8f3e" strokeWidth="4" />
        </svg>
      </section>

      <section className="section-wrap py-20 sm:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="volunteer-reveal">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#087a35]">More than giving time</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-.04em] text-[#03160b] sm:text-5xl">
              Bring your skills, your heart and your willingness to serve.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600 lg:justify-self-end">
            You do not need to have all the answers. We believe meaningful service begins
            with a willing heart. Whether you have a few hours, a professional skill or a
            passion for people, there is a meaningful way to contribute.
          </p>
        </div>
      </section>

      <section id="opportunities" className="bg-[#f1fbf5] py-20 sm:py-28">
        <div className="section-wrap">
          <div className="mx-auto max-w-2xl text-center volunteer-reveal">
            <span className="text-xs font-black uppercase tracking-[.2em] text-[#087a35]">Ways to serve</span>
            <h2 className="mt-3 text-4xl font-black tracking-[-.04em] text-[#03160b] sm:text-5xl">
              Find where your passion meets a real need.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Our volunteer opportunities are shaped by what communities need most. Explore
              a few of the ways you can get involved.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {opportunities.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="volunteer-opportunity-card group overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_50px_rgba(3,73,31,.08)]">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="volunteer-card-image object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/70 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#087a35] shadow-lg backdrop-blur">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="absolute bottom-4 left-5 rounded-full bg-[#13d74c] px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] text-[#03160b]">
                      Volunteer
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-black text-[#03160b]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                    <a href="#volunteer-form" className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-[#087a35]">
                      I&apos;m interested <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[.2em] text-[#087a35]">How it works</span>
            <h2 className="mt-3 text-4xl font-black tracking-[-.04em] text-[#03160b] sm:text-5xl">
              Simple steps. Meaningful service.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Tell us what you would love to do and we will help you find a practical way to
              get started.
            </p>
          </div>
          <div className="grid gap-4">
            {steps.map(([number, title, text]) => (
              <div key={number} className="volunteer-step group flex gap-5 rounded-[1.75rem] border border-[#dceee2] bg-[#f8fcf9] p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#087a35] text-sm font-black text-white transition group-hover:rotate-6">{number}</span>
                <div>
                  <h3 className="font-black text-[#03160b]">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="volunteer-form" className="bg-[#03160b] py-20 text-white sm:py-28">
        <div className="section-wrap">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-black uppercase tracking-[.2em] text-[#13d74c]">Volunteer with us</span>
              <h2 className="mt-3 text-4xl font-black tracking-[-.04em] sm:text-5xl">
                Ready to put your heart into action?
              </h2>
              <p className="mt-5 leading-8 text-white/65">
                Complete this short expression-of-interest form. Tell us a little about
                yourself and the kind of volunteering you would enjoy.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[.06] p-6 backdrop-blur">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#13d74c] text-[#03160b]">
                    <HeartIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black">Every willing hand matters.</p>
                    <p className="mt-1 text-sm leading-6 text-white/55">
                      Your expression of interest helps us understand how to connect your
                      gifts with the needs of the communities we serve.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 text-[#03160b] shadow-2xl sm:p-9">
              {submitted ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f8ed] text-[#087a35]">
                    <HeartIcon className="h-9 w-9" />
                  </div>
                  <h3 className="mt-6 text-3xl font-black">Thank you for stepping forward.</h3>
                  <p className="mt-3 max-w-md leading-7 text-slate-600">
                    Your interest has been captured. Our team can review your details and
                    connect with you about the best way to serve.
                  </p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-full bg-[#087a35] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#006b2f]">
                    Submit another interest
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black">Volunteer expression of interest</h3>
                    <p className="mt-2 text-sm text-slate-500">Tell us how you would love to contribute.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-bold">
                      Full name
                      <input required name="name" type="text" placeholder="Your full name" className="volunteer-input mt-2" />
                    </label>
                    <label className="text-sm font-bold">
                      Email address
                      <input required name="email" type="email" placeholder="you@example.com" className="volunteer-input mt-2" />
                    </label>
                    <label className="text-sm font-bold">
                      Phone / WhatsApp
                      <input required name="phone" type="tel" placeholder="+256 ..." className="volunteer-input mt-2" />
                    </label>
                    <label className="text-sm font-bold">
                      Location
                      <input required name="location" type="text" placeholder="Town / district" className="volunteer-input mt-2" />
                    </label>
                    <label className="text-sm font-bold sm:col-span-2">
                      How would you like to help?
                      <select required name="interest" defaultValue="" className="volunteer-input mt-2">
                        <option value="" disabled>Select an area</option>
                        <option>Community outreach</option>
                        <option>Education & child support</option>
                        <option>Health & wellbeing</option>
                        <option>Family empowerment</option>
                        <option>Skills / professional support</option>
                        <option>Events & fundraising</option>
                        <option>Open to opportunities</option>
                      </select>
                    </label>
                    <label className="text-sm font-bold">
                      Availability
                      <select required name="availability" defaultValue="" className="volunteer-input mt-2">
                        <option value="" disabled>Choose availability</option>
                        <option>Weekdays</option>
                        <option>Weekends</option>
                        <option>Occasionally</option>
                        <option>Project-based</option>
                      </select>
                    </label>
                    <label className="text-sm font-bold">
                      Preferred involvement
                      <select required name="involvement" defaultValue="" className="volunteer-input mt-2">
                        <option value="" disabled>Choose one</option>
                        <option>On-site volunteering</option>
                        <option>Remote / behind-the-scenes</option>
                        <option>Either</option>
                      </select>
                    </label>
                    <label className="text-sm font-bold sm:col-span-2">
                      Tell us about yourself
                      <textarea required name="message" rows={5} placeholder="What skills, experience or passion would you like to bring?" className="volunteer-input mt-2 resize-none" />
                    </label>
                  </div>

                  <button type="submit" className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#e91424]">
                    Send my volunteer interest <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                    We&apos;ll use the information you provide to follow up about volunteering opportunities.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <Image src="/images/food-3.jpg" alt="Community members together" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#03160b]/80" />
        <div className="volunteer-cta-glow absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#13d74c]/20 blur-3xl" />
        <div className="section-wrap relative z-10 text-center text-white">
          <span className="text-xs font-black uppercase tracking-[.2em] text-[#13d74c]">Stand with the mission</span>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight tracking-[-.04em] sm:text-6xl">
            You can help make the next story of hope possible.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            Volunteer your time, share your skills or support the work financially. There are
            many ways to stand with vulnerable people and help build a brighter tomorrow.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#volunteer-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-extrabold text-white transition hover:-translate-y-1 hover:bg-[#e91424]">
              Volunteer with us <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/donate" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
              Support the mission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

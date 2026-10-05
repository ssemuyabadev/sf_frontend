"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";
import { ArrowRight, FacebookIcon, HeartIcon, InstagramIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon, XSocialIcon, YouTubeIcon } from "../../components/icons";

const contactCards = [
  { title: "Call Us", value: "+256 705 283 679", second: "+256 789 395 815", href: "tel:+256705283679", icon: PhoneIcon },
  { title: "Email Us", value: "info@ssemuyabafoundation.org", second: "We reply as soon as possible.", href: "mailto:info@ssemuyabafoundation.org", icon: MailIcon },
  { title: "Visit Us", value: "Naama Village, Mityana", second: "Uganda", href: "https://www.google.com/maps/search/?api=1&query=Naama+Village+Mityana+Uganda", icon: MapPinIcon },
];

const socials = [
  [FacebookIcon, "Facebook"], [InstagramIcon, "Instagram"], [XSocialIcon, "X"],
  [LinkedInIcon, "LinkedIn"], [YouTubeIcon, "YouTube"], [WhatsAppIcon, "WhatsApp"],
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative isolate min-h-[430px] overflow-hidden bg-[#03160b] sm:min-h-[480px]">
        <Image src="/images/home-hero.jpg" alt="Ssemuyaba Foundation community" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,24,12,.95)_0%,rgba(2,43,22,.78)_42%,rgba(0,20,10,.34)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/75 via-transparent to-transparent" />
        <div className="section-wrap relative z-10 flex min-h-[430px] items-center py-16 sm:min-h-[480px]">
          <div className="max-w-2xl text-white">
            <p className="mb-3 inline-flex rounded-full border border-[#13d74c]/40 bg-[#13d74c]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#79f59b]">We would love to hear from you</p>
            <h1 className="hero-title text-5xl font-black sm:text-6xl lg:text-[72px]">Let&apos;s <span className="text-[#19db50]">Connect.</span></h1>
            <div className="hero-red-stroke my-4 h-[8px] w-[210px] sm:w-[270px]" />
            <p className="max-w-xl text-sm leading-6 text-white/90 sm:text-base">
              Whether you want to support a child, partner with our work, volunteer, make a donation, or simply learn more about our mission, our team is ready to connect with you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact-details" className="inline-flex items-center gap-2 rounded-full bg-[#ff1d2d] px-6 py-3 text-sm font-extrabold shadow-xl transition hover:-translate-y-1 hover:bg-[#e91424]">Get in Touch <ArrowRight className="h-4 w-4" /></a>
              <a href="https://wa.me/256705283679" className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-extrabold backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#03491f]"><WhatsAppIcon className="h-4 w-4" /> WhatsApp Us</a>
            </div>
          </div>
        </div>
        <svg className="absolute bottom-[-1px] left-0 z-20 h-[48px] w-full" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 10 C250 39 950 39 1200 10 L1200 48 L0 48 Z" fill="white" />
          <path d="M0 10 C250 39 950 39 1200 10" fill="none" stroke="#0c8f3e" strokeWidth="4" />
        </svg>
      </section>

      <section id="contact-details" className="relative overflow-hidden bg-white py-12 sm:py-16">
        <div className="absolute -right-28 top-0 h-72 w-72 rounded-full bg-[#13d74c]/10 blur-3xl" />
        <div className="section-wrap relative z-10">
          <div className="mb-8 max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0c8f3e]">Contact Details</p>
            <h2 className="mt-2 border-l-2 border-[#ff1d2d] pl-3 text-3xl font-black sm:text-4xl">We&apos;re <span className="text-[#087a35]">Here for You</span></h2>
            <p className="mt-3 text-sm leading-6 text-black/65">Reach us through any of the channels below. We&apos;re always glad to hear from people who share our heart for vulnerable children and widows.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contactCards.map(({ title, value, second, href, icon: Icon }) => (
              <a key={title} href={href} target={title === "Visit Us" ? "_blank" : undefined} rel={title === "Visit Us" ? "noreferrer" : undefined}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#d9eee0] bg-white p-6 shadow-[0_16px_50px_rgba(3,73,31,.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(3,73,31,.14)]">
                <div className="absolute right-[-25px] top-[-25px] h-28 w-28 rounded-full bg-[#f1fbf5] transition duration-300 group-hover:scale-125" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087a35] text-white shadow-lg transition duration-300 group-hover:rotate-3 group-hover:bg-[#13b947]"><Icon className="h-5 w-5" /></div>
                <p className="relative mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[#0c8f3e]">{title}</p>
                <p className="relative mt-2 break-words text-base font-black text-[#07110a]">{value}</p>
                <p className="relative mt-1 text-xs text-black/55">{second}</p>
                <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-[#087a35]">Connect with us <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1fbf5] py-12 sm:py-16">
        <div className="section-wrap grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#063019] p-7 text-white shadow-2xl sm:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[28px] border-[#13d74c]/10" />
            <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[#ff1d2d]/10 blur-2xl" />
            <div className="relative z-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#13d74c] text-[#063019]"><MapPinIcon className="h-7 w-7" /></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7ff2a2]">Our Location</p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Come &amp; <span className="text-[#19db50]">Visit Us</span></h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/75">Our home is in Naama Village, Mityana, Uganda. We welcome partners, volunteers, supporters and everyone who wants to learn more about the work we do.</p>
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">Address</p>
                <p className="mt-2 text-lg font-black">Naama Village</p>
                <p className="text-sm text-white/70">Mityana, Uganda</p>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Naama+Village+Mityana+Uganda" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff1d2d] px-5 py-3 text-xs font-extrabold transition hover:-translate-y-1 hover:bg-[#e91424]">Open in Google Maps <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white bg-[#dcefe3] shadow-2xl">
            <iframe
              title="Map showing Naama Village, Mityana, Uganda"
              src="https://www.google.com/maps?q=Naama+Village,+Mityana,+Uganda&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[.92]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#087a35]/20" />
            <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#087a35] shadow-lg">Ssemuyaba Foundation • Mityana</div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="section-wrap grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0c8f3e]">Send a Message</p>
            <h2 className="mt-2 border-l-2 border-[#ff1d2d] pl-3 text-3xl font-black sm:text-4xl">Tell Us <span className="text-[#087a35]">How We Can Help</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/65">Have a question, partnership idea or volunteering opportunity? Leave us a message and our team can follow up.</p>
            <form className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold">Your Name<input type="text" placeholder="Your full name" className="mt-2 w-full rounded-xl border border-[#d9e8de] bg-[#f9fcfa] px-4 py-3 text-sm outline-none transition focus:border-[#0c8f3e] focus:ring-4 focus:ring-[#13d74c]/10" /></label>
              <label className="text-xs font-bold">Email Address<input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[#d9e8de] bg-[#f9fcfa] px-4 py-3 text-sm outline-none transition focus:border-[#0c8f3e] focus:ring-4 focus:ring-[#13d74c]/10" /></label>
              <label className="text-xs font-bold sm:col-span-2">Subject<input type="text" placeholder="How can we help?" className="mt-2 w-full rounded-xl border border-[#d9e8de] bg-[#f9fcfa] px-4 py-3 text-sm outline-none transition focus:border-[#0c8f3e] focus:ring-4 focus:ring-[#13d74c]/10" /></label>
              <label className="text-xs font-bold sm:col-span-2">Message<textarea rows={5} placeholder="Write your message..." className="mt-2 w-full resize-none rounded-xl border border-[#d9e8de] bg-[#f9fcfa] px-4 py-3 text-sm outline-none transition focus:border-[#0c8f3e] focus:ring-4 focus:ring-[#13d74c]/10" /></label>
              <button type="button" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#087a35] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#006b2f]">Send Message <ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-[#f1fbf5] p-7 sm:p-9">
            <div className="absolute right-[-40px] top-[-40px] h-44 w-44 rounded-full bg-[#13d74c]/15" />
            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff1d2d] text-white shadow-lg"><HeartIcon className="h-7 w-7" /></div>
              <h3 className="mt-6 text-2xl font-black sm:text-3xl">Stay Connected</h3>
              <p className="mt-3 text-sm leading-6 text-black/65">Follow our journey and see the difference your support helps create across communities.</p>
              <div className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3">
                {socials.map(([Icon, label]) => {
                  const C = Icon as React.ComponentType<{ className?: string }>;
                  return <a key={label as string} href={label === "WhatsApp" ? "https://wa.me/256705283679" : "#"} aria-label={label as string} className="grid h-11 w-11 place-items-center rounded-full bg-[#087a35] text-white transition hover:-translate-y-1 hover:bg-[#13b947]"><C className="h-4 w-4" /></a>;
                })}
              </div>
              <div className="mt-8 rounded-2xl bg-[#063019] p-5 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#79f59b]">Prefer a quick conversation?</p>
                <p className="mt-2 text-sm font-bold">Call us or send a WhatsApp message today.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href="tel:+256705283679" className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#063019]">Call Now</a>
                  <a href="https://wa.me/256705283679" className="rounded-full bg-[#13d74c] px-4 py-2 text-xs font-extrabold text-[#063019]">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#006b2f] py-12 text-white sm:py-16">
        <div className="absolute -left-20 top-[-100px] h-72 w-72 rounded-full border-[45px] border-white/5" />
        <div className="absolute -right-20 bottom-[-130px] h-80 w-80 rounded-full border-[50px] border-[#13d74c]/10" />
        <div className="section-wrap relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.23em] text-[#79f59b]">Let&apos;s make an impact together</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Your next conversation could change a life.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">Partner with Ssemuyaba Foundation and help us reach vulnerable children and widows with practical support and lasting hope.</p>
          </div>
          <Link href="/#donate" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-3.5 text-sm font-extrabold shadow-xl transition hover:-translate-y-1 hover:bg-[#e91424]">Support Our Mission <HeartIcon className="h-4 w-4" /></Link>
        </div>
      </section>

      <footer className="bg-[#03160b] text-white">
        <div className="section-wrap flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/ssemuyaba-logo-icon-transparent.png" alt="" width={55} height={55} className="h-12 w-12 object-contain" />
            <div><p className="font-black text-[#13d74c]">SSEMUYABA FOUNDATION</p><p className="text-[10px] text-white/55">Empowering vulnerable orphans, children and widows.</p></div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/65">
            <a href="tel:+256705283679" className="hover:text-white">+256 705 283 679</a>
            <a href="mailto:info@ssemuyabafoundation.org" className="hover:text-white">info@ssemuyabafoundation.org</a>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#0c8f3e] via-[#13d74c] to-[#ff1d2d]" />
      </footer>
      <ScrollToTop />
    </main>
  );
}

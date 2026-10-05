"use client";

import Image from "next/image";
import { useState } from "react";
import { FacebookIcon, HeartIcon, InstagramIcon, LinkedInIcon, MailIcon, MapPinIcon, MenuIcon, PhoneIcon, WhatsAppIcon, XIcon, XSocialIcon, YouTubeIcon } from "./icons";

const navItems = ["Home", "About Us", "Our Causes", "Get Involved", "Gallery", "News & Updates", "Contact Us"];
const ids = ["home", "about", "programs", "involved", "gallery", "news", "contact"];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 lg:sticky lg:top-0 max-lg:contents">
      <div className="bg-[#006b2f] text-white">
        <div className="section-wrap flex flex-col gap-1.5 py-2 text-[10px] font-semibold sm:flex-row sm:min-h-[38px] sm:items-center sm:justify-between sm:gap-4 sm:py-0 sm:text-xs">
          <div className="flex w-full items-center justify-center gap-3 leading-tight sm:w-auto sm:justify-start sm:gap-4">
            <a href="tel:+256705283679" className="contact-chip group">
              <PhoneIcon className="contact-chip-icon h-4 w-4" />
              <span>+256 705 283 679</span>
            </a>
            <span className="opacity-40">|</span>
            <a href="tel:+256789395815" className="contact-chip group">
              <PhoneIcon className="contact-chip-icon h-4 w-4" />
              <span>+256 789 395 815</span>
            </a>
            <span className="hidden opacity-40 sm:inline">|</span>
            <a href="mailto:info@ssemuyabafoundation.org" className="group hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap">
              <MailIcon className="contact-chip-icon h-4 w-4" />
              <span>info@ssemuyabafoundation.org</span>
            </a>
            <span className="hidden opacity-40 sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap">
              <MapPinIcon className="contact-chip-icon h-4 w-4" />
              <span>Naama Village, Mityana, Uganda</span>
            </span>
          </div>
          <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-start">
            <span className="text-[10px] font-bold">Follow Us:</span>
            <div className="flex items-center gap-1.5" aria-label="Social media">
              <a href="#" aria-label="Facebook" className="social-brand social-brand-header"><FacebookIcon /></a>
              <a href="#" aria-label="Instagram" className="social-brand social-brand-header"><InstagramIcon /></a>
              <a href="#" aria-label="X" className="social-brand social-brand-header"><XSocialIcon /></a>
              <a href="#" aria-label="LinkedIn" className="social-brand social-brand-header"><LinkedInIcon /></a>
              <a href="#" aria-label="YouTube" className="social-brand social-brand-header"><YouTubeIcon /></a>
              <a href="https://wa.me/256705283679" aria-label="WhatsApp" className="social-brand social-brand-header"><WhatsAppIcon /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-shell sticky top-0 z-50 relative -mt-px border-b border-black/5 bg-white shadow-md">
        <div className="section-wrap relative z-10 flex min-h-[78px] items-center justify-between">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center"
            aria-label="Ssemuyaba Foundation home"
          >
            <Image
              src="/images/ssemuyaba-logo-icon-transparent.png"
              alt=""
              width={160}
              height={160}
              className="h-[56px] w-[56px] object-contain sm:h-[60px] sm:w-[60px]"
              priority
            />
            <span className="ml-2.5 flex flex-col leading-none">
              <span className="flex items-center gap-1.5">
                <span className="text-[20px] font-black tracking-[-0.04em] text-[#087a35] sm:text-[22px]">
                  SSEMUYABA
                </span>
                <span className="mt-[3px] h-[2px] w-4 bg-[#ff1d2d]" aria-hidden="true" />
              </span>
              <span className="mt-[2px] flex items-center">
                <span className="text-[10px] font-extrabold tracking-[0.48em] text-[#151515] sm:text-[11px]">
                  FOUNDATION
                </span>
                <span className="ml-1.5 h-[2px] w-5 bg-[#0c8f3e]" aria-hidden="true" />
              </span>
              <span className="mt-1 max-w-[235px] text-[7px] font-extrabold leading-[1.25] tracking-[0.01em] text-[#111111] sm:text-[8px]">
                Empowering Vulnerable Orphans, Children and Widows.
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={i === 6 ? "/contact-us" : "#" + ids[i]}
                className={
                  "flex items-center gap-1 border-b-2 py-6 text-[13px] font-bold transition " +
                  (i === 0
                    ? "border-[#0c8f3e] text-[#087a35]"
                    : "border-transparent hover:border-[#0c8f3e] hover:text-[#087a35]")
                }
              >
                {item}

              </a>
            ))}
          </nav>

          <a
            href="#donate"
            className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[#ff1d2d] px-4 py-2.5 text-[12px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e91424] lg:flex"
          >
            <HeartIcon className="h-3.5 w-3.5" />
            Donate Now
          </a>

          <button
            className="rounded-xl p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        <svg className="pointer-events-none absolute -bottom-[14px] left-0 z-30 h-[30px] w-full" viewBox="0 0 1200 30" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 C250 15 950 15 1200 0 L1200 30 L0 30 Z" fill="white"/>
          <path d="M0 0 C250 15 950 15 1200 0" fill="none" stroke="#dfe8e2" stroke-width="1.5"/>
        </svg>

        {open && (
          <nav className="border-t border-black/5 bg-white px-5 py-4 lg:hidden">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={i === 6 ? "/contact-us" : "#" + ids[i]}
                onClick={() => setOpen(false)}
                className="block border-b border-black/5 py-3 text-sm font-bold"
              >
                {item}
              </a>
            ))}
            <a href="#donate" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#ff1d2d] px-5 py-3 text-sm font-extrabold text-white">
              <HeartIcon className="h-4 w-4" />
              Donate Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

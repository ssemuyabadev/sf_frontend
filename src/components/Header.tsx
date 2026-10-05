"use client";

import Image from "next/image";
import { useState } from "react";
import { HeartIcon, MenuIcon, XIcon } from "./icons";

const navItems = ["Home", "About Us", "Our Causes", "Get Involved", "Gallery", "News & Updates", "Contact Us"];
const ids = ["home", "about", "programs", "involved", "gallery", "news", "contact"];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="bg-[#006b2f] text-white">
        <div className="section-wrap flex min-h-[34px] items-center justify-between gap-4 text-[10px] font-semibold sm:text-xs">
          <div className="hidden items-center gap-5 sm:flex">
            <span>+256 705 283 679</span>
            <span className="opacity-60">|</span>
            <span>+256 789 395 815</span>
            <span className="opacity-60">|</span>
            <span>✉ info@ssemuyabafoundation.org</span>
            <span className="opacity-60">|</span>
            <span>⌖ Kampala, Uganda</span>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <span className="hidden sm:inline">Follow Us:</span>
            {["f", "𝕏", "◎", "▶"].map((x) => (
              <span key={x} className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-[10px]">
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="nav-shell relative border-b border-black/5 bg-white">
        <div className="section-wrap relative z-10 flex min-h-[72px] items-center justify-between">
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
              className="h-[52px] w-[52px] object-contain sm:h-[56px] sm:w-[56px]"
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
              <span className="mt-1 max-w-[235px] text-[7px] font-extrabold leading-[1.25] tracking-[0.01em] text-[#087a35] sm:text-[8px]">
                Empowering Vulnerable Orphans, Children and Widows.
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={"#" + ids[i]}
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
                href={"#" + ids[i]}
                onClick={() => setOpen(false)}
                className="block border-b border-black/5 py-3 text-sm font-bold"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

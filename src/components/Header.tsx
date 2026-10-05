"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, HeartIcon, MenuIcon, XIcon } from "./icons";

const navItems = ["Home", "About Us", "Our Programs", "Get Involved", "Gallery", "News & Updates", "Contact"];
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
            <a
              href="#donate"
              className="ml-2 flex items-center gap-1.5 rounded-full bg-[#ff1d2d] px-4 py-1.5 font-bold transition hover:scale-[1.03]"
            >
              <HeartIcon className="h-3.5 w-3.5" />
              Donate Now
            </a>
          </div>
        </div>
      </div>

      <div className="nav-shell relative border-b border-black/5 bg-white">
        <div className="section-wrap relative z-10 flex min-h-[72px] items-center justify-between">
          <a href="#home" onClick={() => setOpen(false)}>
            <Image
              src="/images/ssemuyaba-logo.png"
              alt="Ssemuyaba Foundation"
              width={270}
              height={210}
              className="h-[62px] w-auto object-contain sm:h-[68px]"
              priority
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
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
                {(item === "Our Programs" || item === "Get Involved") && <ChevronDown className="h-3.5 w-3.5" />}
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

        <svg className="pointer-events-none absolute -bottom-[18px] left-0 z-0 h-[24px] w-full" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 2 C300 16 900 16 1200 2 L1200 24 L0 24 Z" fill="white"/>
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

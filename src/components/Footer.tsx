"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { subscribeNewsletter } from "../lib/api";
import { fetchSiteSettings, phoneHref, whatsappHref, DEFAULT_SITE_SETTINGS, type SiteSettings } from "../lib/siteSettings";
import { MailIcon, MapPinIcon, PhoneIcon, FacebookIcon, InstagramIcon, XSocialIcon, LinkedInIcon, YouTubeIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  const [siteContact,setSiteContact]=useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [newsletterEmail,setNewsletterEmail]=useState("");
  const [newsletterSent,setNewsletterSent]=useState(false);const [newsletterError,setNewsletterError]=useState("");const [newsletterSubmitting,setNewsletterSubmitting]=useState(false);
  useEffect(()=>{fetchSiteSettings().then(setSiteContact).catch(()=>{});},[]);
  async function handleNewsletter(e:React.FormEvent){e.preventDefault();if(!newsletterEmail||newsletterSubmitting)return;setNewsletterError("");setNewsletterSubmitting(true);try{await subscribeNewsletter(newsletterEmail);setNewsletterSent(true);setNewsletterEmail("")}catch(error){setNewsletterError(error instanceof Error?error.message:"We could not complete your subscription. Please try again.");}finally{setNewsletterSubmitting(false)}}
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-[#03160b] text-white">
      {newsletterSent&&<div className="fixed inset-0 z-[100] grid place-items-center bg-[#03160b]/70 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="newsletter-success-title"><div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white p-7 text-[#092113] shadow-[0_30px_100px_rgba(0,0,0,.3)] sm:p-9"><button type="button" onClick={()=>setNewsletterSent(false)} aria-label="Close newsletter confirmation" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#f1fbf5] text-[#526158] transition hover:bg-[#e4f5e9]">×</button><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8fff0] text-2xl text-[#087a35]">✓</div><div className="mt-5 text-center"><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#0c8f3e]">Subscription successful</p><h2 id="newsletter-success-title" className="mt-2 text-2xl font-black tracking-tight">You’re on the list!</h2><p className="mt-3 text-sm leading-6 text-[#68766e]">Thank you for joining the Ssemuyaba Foundation newsletter. A confirmation email has been sent to your inbox.</p><button type="button" onClick={()=>setNewsletterSent(false)} className="mt-7 w-full rounded-full bg-[#0c8f3e] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#087a35]">Continue</button></div></div></div>}
      <div className="section-wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_.8fr_1.15fr_1.25fr]">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3 shadow-lg">
            <Image src="/images/ssemuyaba-full-logo-transparent.png" alt="Ssemuyaba Foundation" width={718} height={307} className="h-20 w-auto max-w-full object-contain object-left sm:h-24" />
          </div>
          <p className="mt-4 max-w-xs text-xs leading-5 text-white/70">Empowering Vulnerable Orphans, Children &amp; Widows through education, healthcare, skills development and sustainable livelihoods.</p>
        </div>
        <div>
          <h3 className="font-bold">Quick Links</h3>
          <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-white/75">
            {["Home","About Us","Our Causes","Get Involved","Gallery","News & Updates","Contact Us","Donate"].map(x=><a href={x==="Home"?"/":x==="About Us"?"/about-us":x==="Our Causes"?"/causes":x==="Get Involved"?"/get-involved":x==="Gallery"?"/gallery":x==="News & Updates"?"/news-updates":x==="Contact Us"?"/contact-us":"/donate"} key={x} className="transition hover:text-[#13d74c]">{x}</a>)}
          </div>
        </div>
        <div>
          <h3 className="font-bold">Contact Us</h3>
          <div className="mt-3 space-y-3 text-xs text-white/80">
            <a href={phoneHref(siteContact.phone)} className="footer-contact group"><span className="footer-contact-icon"><PhoneIcon/></span><span>{siteContact.phone}<br/>{siteContact.secondaryPhone}</span></a>
            <a href={"mailto:"+siteContact.email} className="footer-contact group"><span className="footer-contact-icon"><MailIcon/></span><span>{siteContact.email}</span></a>
            <span className="footer-contact"><span className="footer-contact-icon"><MapPinIcon/></span><span>{siteContact.location}</span></span>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60">Follow Us</p>
            <div className="flex flex-wrap gap-2.5" aria-label="Social media">
              <a href={siteContact.facebook || "#"} aria-label="Facebook" className="social-brand social-brand-footer"><FacebookIcon/></a>
              <a href={siteContact.instagram || "#"} aria-label="Instagram" className="social-brand social-brand-footer"><InstagramIcon/></a>
              <a href={siteContact.x || "#"} aria-label="X" className="social-brand social-brand-footer"><XSocialIcon/></a>
              <a href={siteContact.linkedin || "#"} aria-label="LinkedIn" className="social-brand social-brand-footer"><LinkedInIcon/></a>
              <a href={siteContact.youtube || "#"} aria-label="YouTube" className="social-brand social-brand-footer"><YouTubeIcon/></a>
              <a href={siteContact.whatsapp || whatsappHref(siteContact.phone)} aria-label="WhatsApp" className="social-brand social-brand-footer"><WhatsAppIcon/></a>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Subscribe to Our Newsletter</h3>
          <p className="mt-2 text-xs leading-5 text-white/70">Get stories, updates and opportunities to make a difference delivered to your inbox.</p>
          <form onSubmit={handleNewsletter} className="mt-4 space-y-2">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-1.5 backdrop-blur sm:flex-row sm:items-center sm:rounded-full">
              <input id="newsletter-email" type="email" value={newsletterEmail} onChange={e=>setNewsletterEmail(e.target.value)} placeholder="Your email address" className="min-w-0 w-full flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-white/50 sm:py-1.5" required/>
              <button type="submit" disabled={newsletterSubmitting} className="w-full shrink-0 rounded-full bg-[#ff1d2d] px-4 py-2 text-xs font-extrabold transition hover:bg-[#e91424] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{newsletterSubmitting?"Sending...":"Subscribe"}</button>
            </div>
          </form>
          <p className="mt-3 text-[10px] text-white/50">{newsletterError||"No spam. Just meaningful stories and impact."}</p>
          <p className="mt-6 text-base font-black italic leading-tight text-[#13d74c] sm:text-xl">We reachout to the unreachable and provide</p>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-[#0c8f3e] via-[#13d74c] to-[#ff1d2d]"/>
      <div className="section-wrap flex flex-col gap-2 py-4 text-[10px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <span>© {currentYear} Ssemuyaba Foundation. All rights reserved.</span>
        <span>Empowering Vulnerable Orphans, Children &amp; Widows. <span className="text-[#ff1d2d]">♡</span></span>
      </div>
    </footer>
  );
}
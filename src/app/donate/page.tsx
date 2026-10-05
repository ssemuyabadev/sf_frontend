"use client";

import { useEffect, useState } from "react";
import { ArrowRight, HeartIcon, WhatsAppIcon } from "../../components/icons";
import { fetchSiteSettings, whatsappHref, DEFAULT_SITE_SETTINGS, type SiteSettings } from "../../lib/siteSettings";

type Detail = { label: string; value: string; copy?: string };
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this detail:", value);
    }
  }
  return <button type="button" onClick={copy} className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[10px] font-extrabold text-[#087a35] transition hover:border-[#087a35] hover:bg-[#087a35] hover:text-white">{copied ? "Copied ✓" : "Copy"}</button>;
}

const methods = [
  { id: "mtn", name: "MTN Mobile Money", short: "MoMo", eyebrow: "FAST & CONVENIENT", theme: "from-[#ffcf22] to-[#ffb900]", panel: "bg-[#fff9df]", logo: "MTN", logoText: "MOBILE MONEY", details: [{label:"Mobile Money number",value:secondaryPhone,copy:secondaryPhone.replace(/[^\\d]/g,"")},{label:"Account name",value:"JAMES SSEMUYABA"}] as Detail[], note: "Send your gift directly from your phone using MTN Mobile Money." },
  { id: "airtel", name: "Airtel Money", short: "Airtel", eyebrow: "GIVE IN A FEW TAPS", theme: "from-[#f52235] to-[#b90019]", panel: "bg-[#fff0f1]", logo: "airtel", logoText: "money", details: [{label:"Mobile Money number",value:primaryPhone,copy:primaryPhone.replace(/[^\\d]/g,"")},{label:"Account name",value:"JAMES SSEMUYABA"}] as Detail[], note: "Use Airtel Money to send your donation securely to the number shown." },
  { id: "bank", name: "Bank Transfer", short: "Bank", eyebrow: "DIRECT BANK GIVING", theme: "from-[#087a35] to-[#03491f]", panel: "bg-[#edf9f1]", logo: "EQUITY", logoText: "BANK", details: [{label:"Bank",value:"Equity Bank Uganda"},{label:"Account name",value:"JAMES SSEMUYABA"},{label:"Account number",value:"890494848484",copy:"890494848484"},{label:"SWIFT code",value:"793003",copy:"793003"},{label:"Country",value:"Uganda"},{label:"Branch",value:"Mityana"}] as Detail[], note: "For bank transfers, include a donation reference if your bank asks for one." },
  { id: "western", name: "Western Union", short: "Western Union", eyebrow: "INTERNATIONAL GIVING", theme: "from-[#ffcf22] to-[#f5a900]", panel: "bg-[#fff9df]", logo: "WU", logoText: "WESTERN UNION", details: [{label:"Receiver name",value:"JAMES SSEMUYABA"},{label:"Country",value:"Uganda"},{label:"City",value:"Kampala"},{label:"Telephone",value:"+256 789 395 815",copy:"+256789395815"}] as Detail[], note: "Use the receiver details exactly as displayed when arranging your transfer." },
];

export default function DonatePage() {
  return (
    <main className="overflow-hidden bg-white text-[#101b13]">
      <section className="donate-hero relative isolate overflow-hidden bg-[#03160b] text-white">
        <div className="donate-orb donate-orb-one" /><div className="donate-orb donate-orb-two" /><div className="donate-orb donate-orb-three" />
        <div className="absolute inset-0 opacity-[.09]" style={{backgroundImage:"radial-gradient(#b8f6c9 1px, transparent 1px)",backgroundSize:"24px 24px"}} />
        <div className="section-wrap relative z-10 grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
          <div className="donate-enter">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#79f59b]/30 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#9bf5b4]"><HeartIcon className="h-4 w-4" /> Your kindness changes lives</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-[76px]">Give hope.<br/><span className="donate-gradient-text">Change a future.</span></h1>
            <div className="mt-5 h-1.5 w-40 rounded-full bg-gradient-to-r from-[#13d74c] to-[#ff1d2d]" />
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">One generous act can help a child return to school, bring care to a family, or give a widow a fresh start. Your support turns compassion into real-world impact.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#donation-methods" className="inline-flex items-center gap-2 rounded-full bg-[#ff1d2d] px-6 py-3.5 text-sm font-extrabold shadow-[0_10px_35px_rgba(255,29,45,.3)] transition duration-300 hover:-translate-y-1 hover:bg-[#e91424]">Choose how to give <ArrowRight className="h-4 w-4"/></a>
              <a href={whatsappMessage("Hello Ssemuyaba Foundation, I would like to make an online donation.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-extrabold transition hover:-translate-y-1 hover:bg-white/10"><WhatsAppIcon className="h-4 w-4"/> Donate online</a>
            </div>
            <p className="mt-4 text-[11px] text-white/50">Want help arranging your gift? Message our team directly on WhatsApp.</p>
          </div>
          <div className="donate-enter donate-enter-later relative mx-auto w-full max-w-[430px]">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#13d74c]/20 via-transparent to-[#ff1d2d]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[.08] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[24px] border-[#13d74c]/10" />
              <div className="relative flex items-center justify-between">
                <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#9bf5b4]">Your impact starts here</p><h2 className="mt-2 text-2xl font-black">Every gift matters.</h2></div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#13d74c] text-[#063019] shadow-lg"><HeartIcon className="h-7 w-7"/></div>
              </div>
              <div className="my-7 h-px bg-white/15" />
              <div className="space-y-5">
                {[["01","Education","Help children learn and dream bigger."],["02","Care & wellbeing","Support health, food and essential needs."],["03","Independence","Help widows build sustainable livelihoods."]].map(([n,t,d])=><div key={n} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#79f59b]/20 bg-[#13d74c]/10 text-xs font-black text-[#9bf5b4]">{n}</span><div><h3 className="text-sm font-extrabold">{t}</h3><p className="mt-1 text-xs leading-5 text-white/60">{d}</p></div></div>)}
              </div>
              <div className="mt-7 rounded-2xl bg-gradient-to-r from-[#0c8f3e]/30 to-[#ff1d2d]/15 p-4"><p className="text-sm font-bold">“We reach out to the unreachable.”</p><p className="mt-1 text-[10px] text-white/55">Thank you for being part of the mission.</p></div>
            </div>
          </div>
        </div>
        <svg className="absolute bottom-[-1px] left-0 z-20 h-[42px] w-full" viewBox="0 0 1200 42" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8 C250 38 950 38 1200 8 L1200 42 L0 42Z" fill="white"/><path d="M0 8 C250 38 950 38 1200 8" fill="none" stroke="#13d74c" strokeWidth="3"/></svg>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="section-wrap">
          <div className="mx-auto max-w-3xl text-center"><p className="text-[10px] font-black uppercase tracking-[.25em] text-[#087a35]">Your generosity in action</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">A little kindness can <span className="text-[#087a35]">go a long way.</span></h2><p className="mt-4 text-sm leading-6 text-black/60 sm:text-base">Choose the way that works best for you. Whether near or far, your donation helps us serve vulnerable children and widows with care, dignity and hope.</p></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[["Education","Help keep a child in school.","#e5f8ec"],["Healthcare","Bring practical care closer to families.","#fff0f1"],["Empowerment","Create pathways to independence.","#fff8dc"]].map(([title,desc,bg],i)=><div key={title} className="impact-card group rounded-2xl border border-black/5 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl" style={{backgroundColor:bg}}><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-lg font-black text-[#087a35]">{["✦","♡","↗"][i]}</span><h3 className="font-black">{title}</h3></div><p className="mt-3 text-xs leading-5 text-black/60">{desc}</p></div>)}
          </div>
        </div>
      </section>

      <section id="donation-methods" className="relative overflow-hidden bg-[#f1fbf5] py-14 sm:py-20">
        <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#13d74c]/10 blur-3xl" /><div className="pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#ff1d2d]/10 blur-3xl" />
        <div className="section-wrap relative z-10">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#087a35]">Simple • Flexible • Meaningful</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Ways to <span className="text-[#087a35]">Donate</span></h2><p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">Use one of the offline methods below. Tap <strong>Copy</strong> beside a detail to make sending your gift easier.</p></div><span className="w-fit rounded-full border border-[#cce8d5] bg-white px-4 py-2 text-[10px] font-extrabold text-[#087a35]">4 trusted giving options</span></div>
          <div className="grid gap-5 lg:grid-cols-2">
            {methods.map((m,index)=><article key={m.id} className="donation-method group relative overflow-hidden rounded-[1.7rem] border border-[#d9eee0] bg-white shadow-[0_12px_40px_rgba(3,73,31,.07)] transition duration-500 hover:-translate-y-2 hover:border-[#9edab2] hover:shadow-[0_24px_60px_rgba(3,73,31,.15)]" style={{animationDelay:(index*100)+"ms"}}>
              <div className={"relative overflow-hidden bg-gradient-to-r "+m.theme+" px-6 py-5 text-white"}>
                <div className="absolute -right-7 -top-12 h-36 w-36 rounded-full border-[22px] border-white/15 transition duration-700 group-hover:scale-125 group-hover:rotate-12" />
                <div className="relative flex items-center justify-between gap-4">
                  <div><p className="text-[9px] font-black uppercase tracking-[.2em] text-white/80">{m.eyebrow}</p><h3 className="mt-1 text-xl font-black sm:text-2xl">{m.name}</h3></div>
                  <div className="grid h-[62px] min-w-[70px] place-items-center rounded-2xl bg-white px-2 text-center text-[#101b13] shadow-lg transition duration-300 group-hover:rotate-2 group-hover:scale-105">{m.id==="mtn"?<><span className="text-xl font-black tracking-tight">MTN</span><span className="text-[7px] font-black uppercase">MoMo</span></>:m.id==="airtel"?<><span className="text-xl font-black tracking-tight text-[#e31837]">airtel</span><span className="text-[8px] font-extrabold text-[#e31837]">money</span></>:m.id==="bank"?<><span className="text-sm font-black tracking-tight text-[#087a35]">EQUITY</span><span className="text-[8px] font-extrabold">BANK</span></>:<><span className="text-xl font-black tracking-tight text-[#174a8b]">WU</span><span className="text-[6px] font-black uppercase tracking-tight text-[#174a8b]">Western Union</span></>}</div>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <div className="space-y-3">
                  {m.details.map(d=><div key={d.label} className="flex items-center justify-between gap-3 rounded-xl border border-black/[.045] bg-[#f9fcfa] px-4 py-3"><div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[.12em] text-black/45">{d.label}</p>{d.copy?<a href={d.label==="Telephone"||d.label==="Mobile Money number"?"tel:"+d.copy:undefined} className="mt-1 block break-all text-sm font-black text-[#132219] sm:text-base">{d.value}</a>:<p className="mt-1 break-words text-sm font-black text-[#132219] sm:text-base">{d.value}</p>}</div>{d.copy&&<CopyButton value={d.copy}/>}</div>)}
                </div>
                <p className="mt-4 text-xs leading-5 text-black/55">{m.note}</p>
                <a href={whatsappMessage("Hello Ssemuyaba Foundation, I would like to donate via "+m.name+". Please guide me through the process.")} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#087a35]/20 bg-white px-5 py-3 text-xs font-extrabold text-[#087a35] transition hover:border-[#087a35] hover:bg-[#087a35] hover:text-white"><WhatsAppIcon className="h-4 w-4"/> Ask about this method <ArrowRight className="h-3.5 w-3.5"/></a>
              </div>
            </article>)}
          </div>
          <p className="mt-6 text-center text-[11px] leading-5 text-black/50">Please double-check the recipient details before confirming a transfer. Keep your transaction receipt for your records.</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#063019] py-14 text-white sm:py-20">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" /><div className="absolute -right-20 -bottom-28 h-80 w-80 rounded-full bg-[#13d74c]/10 blur-3xl" />
        <div className="section-wrap relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl"><p className="text-[10px] font-black uppercase tracking-[.23em] text-[#79f59b]">Every act of kindness counts</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">Be the reason someone believes in tomorrow.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">If you would like to make an online donation or need help choosing a payment method, our team is ready to assist you.</p></div>
          <a href={whatsappMessage("Hello Ssemuyaba Foundation, I would like to make an online donation.")} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-4 text-sm font-extrabold shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#e91424]"><WhatsAppIcon className="h-5 w-5"/> Start an online donation <ArrowRight className="h-4 w-4"/></a>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { submitSponsor } from "../../lib/api";
import { ArrowRight, ChevronDown, HeartIcon, HeartPulseIcon, GraduationIcon, LeafIcon, PhoneIcon, MailIcon, UsersIcon } from "../../components/icons";

const roles = [
  { icon: GraduationIcon, title: "Keep a child learning", text: "Help provide school fees, learning materials, uniforms and the encouragement children need to stay in school." },
  { icon: HeartPulseIcon, title: "Support health & wellbeing", text: "Your sponsorship helps vulnerable children access essential healthcare, nutrition and compassionate care when it matters." },
  { icon: UsersIcon, title: "Build confidence & belonging", text: "Children receive consistent support that helps them feel seen, valued and connected to a caring community." },
  { icon: LeafIcon, title: "Open doors for the future", text: "Beyond immediate needs, sponsorship contributes to skills, opportunities and a stronger foundation for adulthood." },
];

export default function SponsorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "", city: "", frequency: "Monthly", preferredContact: "WhatsApp",
    message: "", agree: false,
  });

  function update(key: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.agree) return;
    try {
      await submitSponsor({
        fullName:form.name,email:form.email,phone:form.phone,country:form.country,city:form.city,
        preferredContact:form.preferredContact,sponsorshipPreference:form.frequency,message:form.message,consent:form.agree
      });
      setSubmitted(true);
    } catch { window.alert("We could not submit your sponsorship enquiry right now. Please try again."); }
  }

  return (
    <main className="sponsor-page">
      <section className="sponsor-hero">
        <Image src="/images/home-hero.jpg" alt="Children and community supported by Ssemuyaba Foundation" fill priority sizes="100vw" className="object-cover object-center opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,22,11,.97)_0%,rgba(3,22,11,.82)_43%,rgba(3,22,11,.34)_100%)]" />
        <div className="sponsor-orb one" /><div className="sponsor-orb two" />
        <div className="section-wrap relative z-10 flex min-h-[590px] items-center py-20">
          <div className="max-w-2xl text-white">
            <div className="sponsor-reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#7bf99b] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#13d74c] shadow-[0_0_0_5px_rgba(19,215,76,.12)]" /> Sponsor a child
            </div>
            <h1 className="sponsor-reveal delay mt-5 text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[76px]">
              Give a child<br /><span className="text-[#19db50]">a reason to hope.</span>
            </h1>
            <p className="sponsor-reveal delay2 mt-6 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Child sponsorship is more than meeting a need today. It is a commitment to walk alongside a vulnerable child with education, care, encouragement and opportunities for a brighter tomorrow.
            </p>
            <div className="sponsor-reveal delay2 mt-7 flex flex-wrap gap-3">
              <a href="#sponsor-form" className="inline-flex items-center gap-2 rounded-full bg-[#ff1d2d] px-6 py-3.5 text-sm font-extrabold shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#e91424]">I want to sponsor <HeartIcon className="h-4 w-4" /></a>
              <a href="#how-it-helps" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-extrabold backdrop-blur transition hover:bg-white hover:text-[#063019]">How it helps <ChevronDown className="h-4 w-4" /></a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold text-white/55">
              <span>✓ Education</span><span>✓ Healthcare</span><span>✓ Nutrition</span><span>✓ Care &amp; mentorship</span>
            </div>
          </div>
        </div>
        <svg className="sponsor-curve absolute bottom-[-1px] left-0 z-20 h-[54px] w-full" viewBox="0 0 1200 54" preserveAspectRatio="none" aria-hidden="true"><path d="M0 13 C260 52 940 52 1200 13 L1200 54 L0 54Z" fill="white"/><path d="M0 13 C260 52 940 52 1200 13" fill="none" stroke="#0c8f3e" strokeWidth="4"/></svg>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="section-wrap">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0c8f3e]">Why sponsorship matters</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.035em] sm:text-4xl">A relationship that can change the direction of a life.</h2>
            <p className="mt-4 text-sm leading-6 text-[#66736b] sm:text-base">Vulnerable children often face barriers that no child should have to carry alone. Sponsorship helps create a circle of practical support around them.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return <article key={role.title} className="sponsor-step rounded-[1.5rem] border border-[#e4ece7] bg-[#fbfdfb] p-5 shadow-[0_10px_30px_rgba(7,54,27,.035)]">
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e9fff0] text-[#087a35]"><Icon className="h-6 w-6" /></span><span className="text-3xl font-black text-[#dcefe2]">0{i + 1}</span></div>
                <h3 className="mt-6 text-base font-black">{role.title}</h3><p className="mt-2 text-xs leading-5 text-[#718078]">{role.text}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="how-it-helps" className="overflow-hidden bg-[#f1fbf5] py-14 sm:py-20">
        <div className="section-wrap grid items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <div className="relative">
            <div className="relative aspect-[.9] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image src="/images/books-2.jpg" alt="Education materials prepared for children" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03160b]/80 via-transparent to-transparent" />
              <div className="sponsor-float-card absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9fff0] text-[#087a35]"><HeartIcon className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#0c8f3e]">Your role</p><p className="text-xs font-extrabold text-[#24332a]">Be a consistent source of care and opportunity.</p></div></div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#0c8f3e]">What your sponsorship does</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Sponsorship turns generosity into a long-term support system.</h2>
            <p className="mt-4 text-sm leading-6 text-[#66736b]">We believe children need more than a one-time intervention. Sponsorship gives the foundation a framework for responding to a child’s education, wellbeing and development over time.</p>
            <div className="mt-7 divide-y divide-[#d9e9df] rounded-2xl border border-[#dcebe1] bg-white">
              {[
                ["Education", "School-related support and learning materials help a child remain engaged in education."],
                ["Health & nutrition", "Support can help vulnerable children access essential healthcare and healthier daily living."],
                ["Personal development", "Encouragement, mentorship and practical opportunities help children grow in confidence."],
                ["Family & community", "Where appropriate, support strengthens the wider environment around the child too."],
              ].map(([title, text], i) => <div key={title} className="p-4">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 text-left">
                  <span className="text-xs font-black">{title}</span><ChevronDown className={`h-4 w-4 text-[#087a35] transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="mt-2 max-w-xl text-[11px] leading-5 text-[#77837c]">{text}</p>}
              </div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="sponsor-form" className="relative overflow-hidden bg-white py-14 sm:py-20">
        <div className="section-wrap">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#0c8f3e]">Take the next step</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Tell us how you’d like to help.</h2>
              <p className="mt-4 text-sm leading-6 text-[#66736b]">Complete this short form and our team will contact you to explain the sponsorship process, answer your questions and discuss the best way for you to participate.</p>
              <div className="mt-7 space-y-3">
                {["No commitment until you have spoken with our team.", "We will explain how sponsorship support is used.", "Your contact information will be handled responsibly."].map((x) => <div key={x} className="flex gap-3 text-xs font-semibold text-[#4f5f56]"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e9fff0] text-[10px] font-black text-[#087a35]">✓</span>{x}</div>)}
              </div>
              <div className="mt-8 rounded-2xl bg-[#03160b] p-5 text-white"><p className="text-[9px] font-black uppercase tracking-[.2em] text-[#13d74c]">Prefer to talk first?</p><p className="mt-2 text-sm font-bold">Our team is happy to answer your questions.</p><a href="https://wa.me/256705283679" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#7bf99b]">Chat with us on WhatsApp <ArrowRight className="h-3.5 w-3.5" /></a></div>
            </div>

            <div className="rounded-[2rem] border border-[#e3ebe6] bg-[#fbfdfb] p-5 shadow-[0_25px_70px_rgba(7,54,27,.07)] sm:p-8">
              {submitted ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[#e9fff0] text-[#087a35]"><HeartIcon className="h-8 w-8" /></span>
                  <p className="mt-5 text-[10px] font-black uppercase tracking-[.2em] text-[#0c8f3e]">Thank you</p>
                  <h3 className="mt-2 text-2xl font-black">Your sponsorship interest is received.</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-[#718078]">We’ll contact you using the details you provided to discuss the next steps and answer any questions.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 rounded-full border border-[#bfe3ca] px-5 py-2.5 text-xs font-extrabold text-[#087a35]">Submit another enquiry</button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="mb-7"><h3 className="text-xl font-black">Sponsorship enquiry</h3><p className="mt-1 text-xs leading-5 text-[#839088]">Your first conversation with us starts here.</p></div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label><span className="sponsor-label">Full name *</span><input required value={form.name} onChange={(e) => update("name", e.target.value)} className="sponsor-field" placeholder="Your full name" /></label>
                    <label><span className="sponsor-label">Email address *</span><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="sponsor-field" placeholder="you@example.com" /></label>
                    <label><span className="sponsor-label">Phone / WhatsApp *</span><input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="sponsor-field" placeholder="+256 ..." /></label>
                    <label><span className="sponsor-label">Country</span><input value={form.country} onChange={(e) => update("country", e.target.value)} className="sponsor-field" placeholder="Uganda" /></label>
                    <label><span className="sponsor-label">City / Town</span><input value={form.city} onChange={(e) => update("city", e.target.value)} className="sponsor-field" placeholder="Kampala" /></label>
                    <label><span className="sponsor-label">Preferred contact</span><select value={form.preferredContact} onChange={(e) => update("preferredContact", e.target.value)} className="sponsor-field"><option>WhatsApp</option><option>Phone call</option><option>Email</option></select></label>
                  </div>
                  <div className="mt-4">
                    <span className="sponsor-label">How would you like to sponsor?</span>
                    <div className="grid gap-2 sm:grid-cols-3">{["Monthly", "Quarterly", "I’d like to discuss"].map((item) => <button type="button" key={item} onClick={() => update("frequency", item)} className={`rounded-xl border px-3 py-3 text-xs font-extrabold transition ${form.frequency === item ? "border-[#0c8f3e] bg-[#eafff0] text-[#087a35]" : "border-[#dfe9e3] bg-white text-[#718078] hover:border-[#bfe3ca]"}`}>{item}</button>)}</div>
                  </div>
                  <label className="mt-4 block"><span className="sponsor-label">Message / questions</span><textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} className="sponsor-field resize-none" placeholder="Tell us anything you would like our team to know..." /></label>
                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-[#e5ece7] bg-white p-3"><input required type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} className="mt-0.5 accent-[#0c8f3e]" /><span className="text-[10px] leading-5 text-[#718078]">I agree that Ssemuyaba Foundation may contact me about child sponsorship and related opportunities. *</span></label>
                  <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0c8f3e] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#0c8f3e]/15 transition hover:-translate-y-0.5 hover:bg-[#087a35]">Send sponsorship enquiry <ArrowRight className="h-4 w-4" /></button>
                  <p className="mt-3 text-center text-[9px] leading-4 text-[#96a09a]">We’ll respond with the sponsorship options and next steps. Sponsorship availability and support arrangements are discussed with our team.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#006b2f] py-16 text-white sm:py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#13d74c]/10 blur-2xl" />
        <div className="section-wrap relative text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10"><HeartIcon className="h-7 w-7 text-[#13d74c]" /></span>
          <p className="mt-5 text-[10px] font-black uppercase tracking-[.24em] text-[#8dffa9]">A future starts with a yes</p>
          <h2 className="mx-auto mt-2 max-w-3xl text-3xl font-black tracking-[-.04em] sm:text-5xl">You may never know every moment you change—but a child can feel the difference.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75">Stand with Ssemuyaba Foundation and help vulnerable children receive the support, opportunity and hope they deserve.</p>
          <a href="#sponsor-form" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ff1d2d] px-7 py-3.5 text-sm font-extrabold shadow-xl transition hover:-translate-y-1 hover:bg-[#e91424]">Start your sponsorship journey <ArrowRight className="h-4 w-4" /></a>
          <div className="mt-7 flex flex-wrap justify-center gap-5 text-[10px] font-bold text-white/55"><span>Education</span><span>•</span><span>Healthcare</span><span>•</span><span>Nutrition</span><span>•</span><span>Opportunity</span></div>
        </div>
      </section>
    </main>
  );
}

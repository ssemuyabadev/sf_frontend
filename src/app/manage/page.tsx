"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  HeartIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  UsersIcon,
  XIcon,
} from "../../components/icons";

type Section = "dashboard" | "contact" | "messages" | "newsletter" | "volunteers" | "gallery" | "news" | "settings";

const nav = [
  { id: "dashboard" as Section, label: "Dashboard", icon: "⌂" },
  { id: "contact" as Section, label: "Contact Details", icon: "⌖" },
  { id: "messages" as Section, label: "Contact Messages", icon: "✉", badge: 7 },
  { id: "newsletter" as Section, label: "Newsletter", icon: "◉", badge: 18 },
  { id: "volunteers" as Section, label: "Volunteers", icon: "♧", badge: 4 },
  { id: "gallery" as Section, label: "Gallery", icon: "▦" },
  { id: "news" as Section, label: "News & Updates", icon: "▤" },
  { id: "settings" as Section, label: "Settings", icon: "⚙" },
];

const messages = [
  { name: "Sarah Namukasa", email: "sarah.n@example.com", subject: "Sponsoring a child", date: "Today, 10:42", status: "New" },
  { name: "Daniel Kato", email: "daniel.k@example.com", subject: "Community partnership", date: "Today, 08:15", status: "New" },
  { name: "Grace Achieng", email: "grace.a@example.com", subject: "Medical support request", date: "Yesterday", status: "Replied" },
  { name: "Peter Mugisha", email: "peter.m@example.com", subject: "Donation question", date: "Sep 30", status: "Read" },
];

const subscribers = [
  { email: "james.kato@example.com", joined: "Oct 05, 2026", source: "Website" },
  { email: "maria.n@example.com", joined: "Oct 04, 2026", source: "Website" },
  { email: "hope.foundation@example.com", joined: "Oct 03, 2026", source: "Campaign" },
  { email: "ivan.m@example.com", joined: "Oct 01, 2026", source: "Website" },
];

const volunteers = [
  { name: "Aisha Namirembe", role: "Community Outreach", date: "Oct 05, 2026", status: "New" },
  { name: "Brian Ssemanda", role: "Education Support", date: "Oct 04, 2026", status: "Reviewing" },
  { name: "Ruth Nakato", role: "Medical Outreach", date: "Oct 02, 2026", status: "Approved" },
  { name: "Samuel Waiswa", role: "Media & Events", date: "Sep 28, 2026", status: "Approved" },
];

const gallery = [
  { title: "Community Food Outreach", image: "/images/food-4.jpg", category: "Community" },
  { title: "Education Support", image: "/images/books.jpg", category: "Education" },
  { title: "Widow Empowerment", image: "/images/donation.jpg", category: "Livelihoods" },
  { title: "Healthcare Outreach", image: "/images/health-1.jpg", category: "Healthcare" },
  { title: "Faith & Community", image: "/images/preaching.jpg", category: "Outreach" },
  { title: "Hope In Action", image: "/images/home-hero.jpg", category: "Featured" },
];

const news = [
  { title: "School Fees Support for 100 Orphans", date: "Sep 12, 2026", status: "Published", image: "/images/books.jpg" },
  { title: "Widows Empowerment Program Launched", date: "Sep 08, 2026", status: "Published", image: "/images/donation.jpg" },
  { title: "Medical Support Reaches Remote Communities", date: "Sep 02, 2026", status: "Published", image: "/images/health-1.jpg" },
  { title: "Community Outreach Brings Hope", date: "Aug 28, 2026", status: "Draft", image: "/images/preaching.jpg" },
];

function Status({ children }: { children: string }) {
  const tone =
    children === "New" ? "bg-[#e8fff0] text-[#087a35]" :
    children === "Approved" || children === "Published" ? "bg-[#eaf7ef] text-[#087a35]" :
    children === "Reviewing" ? "bg-[#fff6dc] text-[#986800]" :
    children === "Draft" ? "bg-[#f0f2f4] text-[#66727b]" :
    "bg-[#eef1f4] text-[#65717a]";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold ${tone}`}>{children}</span>;
}

function SectionTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c8f3e]">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#092113] sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-[#64736a] sm:text-sm">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-extrabold text-[#26362c]">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="manage-input"
      />
    </label>
  );
}

export default function ManagePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [contact, setContact] = useState({
    phone1: "+256 705 283 679",
    phone2: "+256 789 395 815",
    email: "info@ssemuyabafoundation.org",
    location: "Naama Village, Mityana, Uganda",
    facebook: "",
    instagram: "",
    x: "",
    linkedin: "",
    youtube: "",
  });

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem("sf-admin-auth") === "1");
    setReady(true);
  }, []);

  const sectionLabel = useMemo(() => nav.find((item) => item.id === section)?.label || "Dashboard", [section]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 4) {
      setNotice("Enter a valid email and a password of at least 4 characters.");
      return;
    }
    sessionStorage.setItem("sf-admin-auth", "1");
    setAuthenticated(true);
    setNotice("");
  }

  function logout() {
    sessionStorage.removeItem("sf-admin-auth");
    setAuthenticated(false);
  }

  function saveContact(e: React.FormEvent) {
    e.preventDefault();
    setNotice("Contact details saved for this admin session.");
    window.setTimeout(() => setNotice(""), 2600);
  }

  if (!ready) return <div className="manage-loading"><div className="manage-spinner" /></div>;

  if (!authenticated) {
    return (
      <main className="manage-login min-h-screen">
        <div className="manage-login-glow manage-login-glow-one" />
        <div className="manage-login-glow manage-login-glow-two" />
        <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
          <section className="relative hidden overflow-hidden bg-[#03160b] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(19,215,76,.22),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(255,29,45,.13),transparent_28%)]" />
            <div className="relative z-10">
              <div className="inline-flex rounded-2xl bg-white p-3 shadow-xl">
                <Image src="/images/ssemuyaba-full-logo-transparent.png" alt="Ssemuyaba Foundation" width={718} height={307} className="h-16 w-auto object-contain" />
              </div>
              <div className="mt-20 max-w-xl">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#13d74c]">Foundation Management Portal</p>
                <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.05em]">One place to manage the work that brings hope.</h1>
                <p className="mt-6 max-w-lg text-sm leading-6 text-white/65">Keep your website content, enquiries, volunteers, newsletter audience, gallery and stories organized from one calm, modern workspace.</p>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-xs text-white/45">
              <span className="h-2 w-2 rounded-full bg-[#13d74c]" />
              Secure management workspace
              <span className="ml-2 h-1 w-1 rounded-full bg-white/30" />
              Ssemuyaba Foundation
            </div>
          </section>

          <section className="relative flex items-center justify-center px-5 py-10 sm:px-10">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <Image src="/images/ssemuyaba-full-logo-transparent.png" alt="Ssemuyaba Foundation" width={718} height={307} className="h-16 w-auto object-contain object-left" />
              </div>
              <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_80px_rgba(3,22,11,.12)] backdrop-blur-xl sm:p-9">
                <div className="mb-8">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9fff0] text-[#087a35]"><span className="text-xl">↗</span></span>
                  <h2 className="mt-5 text-2xl font-black text-[#092113]">Welcome back</h2>
                  <p className="mt-1 text-sm leading-6 text-[#718078]">Sign in to your foundation management dashboard.</p>
                </div>
                <form onSubmit={login} className="space-y-4">
                  <Field label="Email address" value={email} onChange={setEmail} type="email" placeholder="admin@ssemuyabafoundation.org" />
                  <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="Enter your password" />
                  {notice && <p className="rounded-xl bg-[#fff0f1] px-3 py-2 text-xs font-semibold text-[#c91525]">{notice}</p>}
                  <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0c8f3e] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#0c8f3e]/15 transition hover:-translate-y-0.5 hover:bg-[#087a35]">
                    Sign in to dashboard <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </form>
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#f5faf7] p-3 text-[10px] leading-4 text-[#718078]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-[#087a35] shadow-sm">i</span>
                  <span><strong className="text-[#26362c]">UI preview mode.</strong> Authentication and persistent content storage can be connected to your backend/database next.</span>
                </div>
              </div>
              <p className="mt-5 text-center text-[10px] font-semibold text-[#8b9890]">© {new Date().getFullYear()} Ssemuyaba Foundation • Admin Portal</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="manage-app min-h-screen">
      {sidebarOpen && <button aria-label="Close sidebar" className="manage-sidebar-backdrop lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`manage-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-5">
            <a href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white p-1.5 shadow-sm">
                <Image src="/images/ssemuyaba-logo-icon-transparent.png" alt="" width={80} height={80} className="h-full w-full object-contain" />
              </span>
              <span>
                <strong className="block text-[13px] font-black tracking-[-0.02em] text-white">SSEMUYABA</strong>
                <span className="text-[8px] font-extrabold tracking-[0.3em] text-white/50">MANAGEMENT</span>
              </span>
            </a>
            <button className="rounded-lg p-2 text-white/60 hover:bg-white/10 lg:hidden" onClick={() => setSidebarOpen(false)}><XIcon className="h-5 w-5" /></button>
          </div>

          <div className="px-4 pt-3">
            <p className="mb-2 px-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/35">Workspace</p>
            <nav className="space-y-1">
              {nav.map((item) => (
                <button key={item.id} onClick={() => { setSection(item.id); setSidebarOpen(false); }} className={`manage-nav-item ${section === item.id ? "is-active" : ""}`}>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-sm">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${section === item.id ? "bg-white/20 text-white" : "bg-[#ff1d2d] text-white"}`}>{item.badge}</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#13d74c]">Website status</p>
              <div className="mt-2 flex items-center gap-2 text-xs font-bold text-white"><span className="h-2 w-2 rounded-full bg-[#13d74c] shadow-[0_0_0_4px_rgba(19,215,76,.12)]" />Online & healthy</div>
              <a href="/" className="mt-3 flex items-center gap-1 text-[10px] font-bold text-white/45 transition hover:text-white">Open public website <ArrowRight className="h-3 w-3" /></a>
            </div>
          </div>
        </div>
      </aside>

      <div className="manage-main">
        <header className="manage-topbar">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-[#e6ece8] bg-white p-2.5 text-[#23342a] shadow-sm lg:hidden" onClick={() => setSidebarOpen(true)}><MenuIcon className="h-5 w-5" /></button>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8a9890]">Management Portal</p>
              <h2 className="text-sm font-black text-[#092113] sm:text-base">{sectionLabel}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <a href="/" className="hidden items-center gap-1.5 rounded-xl border border-[#e6ece8] bg-white px-3 py-2 text-[10px] font-extrabold text-[#46544c] shadow-sm transition hover:border-[#b8dfc6] hover:text-[#087a35] sm:flex">View website <ArrowRight className="h-3 w-3" /></a>
            <button onClick={logout} className="flex items-center gap-2 rounded-xl bg-[#f0f6f2] px-3 py-2 text-[10px] font-extrabold text-[#087a35] transition hover:bg-[#e6f4eb]">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white text-[9px] font-black shadow-sm">SF</span>
              <span className="hidden sm:block">Admin</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </header>

        <div className="manage-content">
          {notice && <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#bfe8cc] bg-[#edfff3] px-4 py-3 text-xs font-bold text-[#087a35]"><span>{notice}</span><button onClick={() => setNotice("")}><XIcon className="h-4 w-4" /></button></div>}

          {section === "dashboard" && (
            <>
              <SectionTitle eyebrow="Overview" title="Good morning, Admin." description="Here’s what is happening across the foundation website today." action={<button onClick={() => setSection("news")} className="manage-primary-btn">Create update <ArrowRight className="h-4 w-4" /></button>} />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Contact messages", "7", "3 new today", "✉"],
                  ["Newsletter subscribers", "1,284", "+18 this week", "◉"],
                  ["Volunteer applications", "4", "2 need review", "♧"],
                  ["Published stories", "24", "4 this month", "▤"],
                ].map(([label, value, note, icon]) => (
                  <div key={label} className="manage-stat-card">
                    <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf8ef] text-base text-[#087a35]">{icon}</span><span className="text-[9px] font-black uppercase tracking-wider text-[#13a744]">Live</span></div>
                    <p className="mt-5 text-[11px] font-bold text-[#748078]">{label}</p>
                    <div className="mt-0.5 flex items-end justify-between"><strong className="text-3xl font-black tracking-[-0.04em] text-[#092113]">{value}</strong><span className="text-[9px] font-bold text-[#087a35]">{note}</span></div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <div className="manage-card overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#edf1ee] px-5 py-4"><div><h3 className="text-sm font-black">Recent enquiries</h3><p className="text-[10px] text-[#829087]">Latest contact form submissions</p></div><button onClick={() => setSection("messages")} className="text-[10px] font-extrabold text-[#087a35]">View all</button></div>
                  <div className="divide-y divide-[#f0f3f1]">
                    {messages.slice(0, 3).map((item) => <div key={item.email} className="flex items-center gap-3 px-5 py-4"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf8ef] text-[11px] font-black text-[#087a35]">{item.name.split(" ").map((x) => x[0]).join("").slice(0,2)}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-[#24332a]">{item.subject}</p><p className="truncate text-[10px] text-[#8a968f]">{item.name} • {item.email}</p></div><div className="hidden text-right sm:block"><p className="text-[9px] font-semibold text-[#98a39c]">{item.date}</p><div className="mt-1"><Status>{item.status}</Status></div></div></div>)}
                  </div>
                </div>
                <div className="manage-card p-5">
                  <div className="flex items-center justify-between"><div><h3 className="text-sm font-black">Quick actions</h3><p className="text-[10px] text-[#829087]">Common admin tasks</p></div><span className="text-lg text-[#0c8f3e]">✦</span></div>
                  <div className="mt-4 grid gap-2.5">
                    {[["News & Updates","Publish a new story","news"],["Gallery","Add a new photo","gallery"],["Contact details","Update public information","contact"],["Volunteers","Review applications","volunteers"]].map(([title, desc, id]) => <button key={title} onClick={() => setSection(id as Section)} className="group flex items-center gap-3 rounded-xl border border-[#edf1ee] bg-[#fbfcfb] p-3 text-left transition hover:-translate-y-0.5 hover:border-[#bfe3ca] hover:bg-[#f5fcf7]"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-sm text-[#087a35] shadow-sm">{id === "news" ? "▤" : id === "gallery" ? "▦" : id === "contact" ? "⌖" : "♧"}</span><span className="min-w-0 flex-1"><strong className="block text-[11px] font-extrabold">{title}</strong><small className="block text-[9px] text-[#8a968f]">{desc}</small></span><ArrowRight className="h-3.5 w-3.5 text-[#a1aaa5] transition group-hover:translate-x-1 group-hover:text-[#087a35]" /></button>)}
                  </div>
                </div>
              </div>

              <div className="mt-5 manage-card overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-[#edf1ee] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-sm font-black">Content at a glance</h3><p className="text-[10px] text-[#829087]">Keep the public website fresh and active.</p></div><button onClick={() => setSection("gallery")} className="w-fit text-[10px] font-extrabold text-[#087a35]">Manage content →</button></div>
                <div className="grid grid-cols-2 divide-x divide-[#edf1ee] sm:grid-cols-4">
                  {[["Gallery photos","38","▦"],["Published stories","24","▤"],["Draft stories","3","✎"],["Active causes","6","♡"]].map(([label,value,icon]) => <div key={label} className="p-5"><span className="text-lg text-[#0c8f3e]">{icon}</span><p className="mt-2 text-xl font-black">{value}</p><p className="text-[9px] font-bold text-[#8b9790]">{label}</p></div>)}
                </div>
              </div>
            </>
          )}

          {section === "contact" && (
            <SectionTitle eyebrow="Website settings" title="Contact details" description="Update the phone numbers, email, location and social profiles shown across the public website." action={<button form="contact-form" className="manage-primary-btn">Save changes</button>} />
          )}
          {section === "contact" && (
            <form id="contact-form" onSubmit={saveContact} className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
              <div className="manage-card p-5 sm:p-7">
                <h3 className="text-sm font-black">Public contact information</h3>
                <p className="mt-1 text-[10px] text-[#829087]">These details appear in the header, footer and contact page.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Primary phone" value={contact.phone1} onChange={(v) => setContact({...contact, phone1:v})} />
                  <Field label="Secondary phone" value={contact.phone2} onChange={(v) => setContact({...contact, phone2:v})} />
                  <Field label="Email address" value={contact.email} onChange={(v) => setContact({...contact, email:v})} type="email" />
                  <Field label="Location / address" value={contact.location} onChange={(v) => setContact({...contact, location:v})} />
                </div>
              </div>
              <div className="manage-card p-5 sm:p-7">
                <h3 className="text-sm font-black">Social profiles</h3>
                <p className="mt-1 text-[10px] text-[#829087]">Add the real profile URLs when ready.</p>
                <div className="mt-6 space-y-4">
                  <Field label="Facebook" value={contact.facebook} onChange={(v) => setContact({...contact, facebook:v})} placeholder="https://facebook.com/..." />
                  <Field label="Instagram" value={contact.instagram} onChange={(v) => setContact({...contact, instagram:v})} placeholder="https://instagram.com/..." />
                  <Field label="X / Twitter" value={contact.x} onChange={(v) => setContact({...contact, x:v})} placeholder="https://x.com/..." />
                  <Field label="LinkedIn" value={contact.linkedin} onChange={(v) => setContact({...contact, linkedin:v})} placeholder="https://linkedin.com/..." />
                  <Field label="YouTube" value={contact.youtube} onChange={(v) => setContact({...contact, youtube:v})} placeholder="https://youtube.com/..." />
                </div>
              </div>
            </form>
          )}

          {section === "messages" && (
            <>
              <SectionTitle eyebrow="Inbox" title="Contact messages" description="Review enquiries submitted through the public contact form." action={<button className="manage-primary-btn">Export CSV</button>} />
              <div className="manage-card overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-[#edf1ee] p-4 sm:flex-row sm:items-center sm:justify-between"><input className="manage-input max-w-sm" placeholder="Search messages..." /><select className="manage-select"><option>All statuses</option><option>New</option><option>Read</option><option>Replied</option></select></div>
                <div className="hidden overflow-x-auto md:block"><table className="manage-table"><thead><tr><th>Sender</th><th>Subject</th><th>Received</th><th>Status</th><th /></tr></thead><tbody>{messages.map((item) => <tr key={item.email}><td><strong>{item.name}</strong><span>{item.email}</span></td><td>{item.subject}</td><td>{item.date}</td><td><Status>{item.status}</Status></td><td><button className="text-[10px] font-extrabold text-[#087a35]">Open →</button></td></tr>)}</tbody></table></div>
                <div className="divide-y divide-[#edf1ee] md:hidden">{messages.map((item) => <div key={item.email} className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold">{item.subject}</p><p className="mt-1 text-[10px] text-[#849089]">{item.name} • {item.email}</p></div><Status>{item.status}</Status></div><div className="mt-3 flex justify-between text-[9px] text-[#98a39c]"><span>{item.date}</span><button className="font-extrabold text-[#087a35]">Open →</button></div></div>)}</div>
              </div>
            </>
          )}

          {section === "newsletter" && (
            <>
              <SectionTitle eyebrow="Audience" title="Newsletter subscribers" description="Manage your growing newsletter audience and see where subscribers joined from." action={<button className="manage-primary-btn">Export subscribers</button>} />
              <div className="grid gap-4 sm:grid-cols-3"><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Total subscribers</p><strong className="mt-1 block text-3xl font-black">1,284</strong><span className="text-[10px] font-bold text-[#087a35]">+18 this week</span></div><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">New this month</p><strong className="mt-1 block text-3xl font-black">76</strong><span className="text-[10px] font-bold text-[#087a35]">Healthy growth</span></div><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Active rate</p><strong className="mt-1 block text-3xl font-black">96.8%</strong><span className="text-[10px] font-bold text-[#087a35]">Audience is engaged</span></div></div>
              <div className="manage-card mt-5 overflow-hidden"><div className="border-b border-[#edf1ee] p-4"><input className="manage-input max-w-sm" placeholder="Search subscribers..." /></div><div className="hidden overflow-x-auto md:block"><table className="manage-table"><thead><tr><th>Email</th><th>Joined</th><th>Source</th><th>Status</th></tr></thead><tbody>{subscribers.map((item) => <tr key={item.email}><td><strong>{item.email}</strong></td><td>{item.joined}</td><td>{item.source}</td><td><Status>Active</Status></td></tr>)}</tbody></table></div><div className="divide-y divide-[#edf1ee] md:hidden">{subscribers.map((item) => <div key={item.email} className="flex items-center justify-between gap-3 p-4"><div><p className="text-xs font-extrabold">{item.email}</p><p className="mt-1 text-[9px] text-[#8b9790]">{item.joined} • {item.source}</p></div><Status>Active</Status></div>)}</div></div>
            </>
          )}

          {section === "volunteers" && (
            <>
              <SectionTitle eyebrow="People" title="Volunteer applications" description="Review people who want to contribute their time, skills and energy to the foundation." action={<button className="manage-primary-btn">Export list</button>} />
              <div className="manage-card overflow-hidden"><div className="flex flex-col gap-3 border-b border-[#edf1ee] p-4 sm:flex-row sm:items-center sm:justify-between"><input className="manage-input max-w-sm" placeholder="Search volunteers..." /><select className="manage-select"><option>All applications</option><option>New</option><option>Reviewing</option><option>Approved</option></select></div><div className="hidden overflow-x-auto md:block"><table className="manage-table"><thead><tr><th>Applicant</th><th>Interest</th><th>Applied</th><th>Status</th><th /></tr></thead><tbody>{volunteers.map((item) => <tr key={item.name}><td><strong>{item.name}</strong><span>Uganda</span></td><td>{item.role}</td><td>{item.date}</td><td><Status>{item.status}</Status></td><td><button className="text-[10px] font-extrabold text-[#087a35]">Review →</button></td></tr>)}</tbody></table></div><div className="divide-y divide-[#edf1ee] md:hidden">{volunteers.map((item) => <div key={item.name} className="p-4"><div className="flex justify-between gap-3"><div><p className="text-xs font-extrabold">{item.name}</p><p className="mt-1 text-[10px] text-[#8b9790]">{item.role} • {item.date}</p></div><Status>{item.status}</Status></div><button className="mt-3 text-[10px] font-extrabold text-[#087a35]">Review application →</button></div>)}</div></div>
            </>
          )}

          {section === "gallery" && (
            <>
              <SectionTitle eyebrow="Media library" title="Gallery management" description="Keep the public gallery fresh with photos from outreach, education, healthcare and community work." action={<button className="manage-primary-btn">+ Add photo</button>} />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{gallery.map((item) => <article key={item.title} className="manage-gallery-card"><div className="relative aspect-[1.55] overflow-hidden"><Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-black text-[#087a35] backdrop-blur">{item.category}</span></div><div className="flex items-center gap-3 p-4"><div className="min-w-0 flex-1"><h3 className="truncate text-xs font-black">{item.title}</h3><p className="mt-1 text-[9px] text-[#8b9790]">Published to website</p></div><button className="rounded-lg border border-[#e5ebe7] px-2.5 py-1.5 text-[9px] font-extrabold text-[#64736a] hover:border-[#bfe3ca] hover:text-[#087a35]">Edit</button></div></article>)}</div>
            </>
          )}

          {section === "news" && (
            <>
              <SectionTitle eyebrow="Content studio" title="News & updates" description="Publish stories, announcements and impact updates directly to the public website." action={<button className="manage-primary-btn">+ New story</button>} />
              <div className="grid gap-4 xl:grid-cols-2">{news.map((item) => <article key={item.title} className="manage-card flex overflow-hidden"><div className="relative hidden w-36 shrink-0 sm:block"><Image src={item.image} alt={item.title} fill className="object-cover" /></div><div className="min-w-0 flex-1 p-5"><div className="flex items-start justify-between gap-3"><Status>{item.status}</Status><button className="text-[9px] font-extrabold text-[#087a35]">Edit</button></div><h3 className="mt-3 text-sm font-black leading-5">{item.title}</h3><p className="mt-1 text-[10px] text-[#8b9790]">{item.date} • Ssemuyaba Foundation</p><p className="mt-3 text-[10px] leading-5 text-[#68766e]">Manage the headline, story copy, featured image and publication status from the content editor.</p></div></article>)}</div>
            </>
          )}

          {section === "settings" && (
            <SectionTitle eyebrow="Account" title="Settings" description="Admin account preferences, security and future integrations will live here." />
          )}
        </div>
      </div>
    </main>
  );
}

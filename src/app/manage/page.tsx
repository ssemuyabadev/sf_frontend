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
  UserIcon,
  XIcon,
} from "../../components/icons";
import { gql, mutations, queries } from "../../lib/api";
import { DEFAULT_SITE_STATISTICS, formatStatisticValue, type SiteStatistic } from "../../lib/statistics";

type Section = "dashboard" | "contact" | "messages" | "newsletter" | "volunteers" | "sponsors" | "gallery" | "news" | "donations" | "statistics" | "settings";
type DonationDetail = { label: string; value: string; copy?: string };
type DonationMethodAdmin = { id: string; key: string; name: string; eyebrow: string; detailsJson: string; note: string; updatedAt?: string };

function getKampalaGreeting() {
  const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Kampala", hour: "numeric", hour12: false }).format(new Date()));
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  if (hour >= 18 && hour < 22) return "Good evening";
  return "Good night";
}


const nav = [
  { id: "dashboard" as Section, label: "Dashboard", icon: "⌂" },
  { id: "contact" as Section, label: "Contact Details", icon: "⌖" },
  { id: "messages" as Section, label: "Contact Messages", icon: "✉", badge: 7 },
  { id: "newsletter" as Section, label: "Newsletter", icon: "◉", badge: 18 },
  { id: "volunteers" as Section, label: "Volunteers", icon: "♧" },
  { id: "sponsors" as Section, label: "Sponsor Enquiries", icon: "♡" },
  { id: "gallery" as Section, label: "Gallery", icon: "▦" },
  { id: "news" as Section, label: "News & Updates", icon: "▤" },
  { id: "donations" as Section, label: "Donation Methods", icon: "◆" },
  { id: "statistics" as Section, label: "Statistics", icon: "▥" },
  { id: "settings" as Section, label: "Settings", icon: "⚙" },
];






const MAX_CONTENT_IMAGE_SIZE = 10 * 1024 * 1024;

function validateContentImageFile(file?: File) {
  if (!file) return true;
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_CONTENT_IMAGE_SIZE) throw new Error("Image file is too large. The maximum supported size is 10 MB.");
  return true;
}

function Status({ children }: { children: string }) {
  const tone =
    children === "New" ? "bg-[#e8fff0] text-[#087a35]" :
    children === "Approved" || children === "Published" || children === "Replied" ? "bg-[#eaf7ef] text-[#087a35]" :
    children === "Declined" || children === "Archived" ? "bg-[#fff0f1] text-[#c91525]" :
    children === "Reviewing" ? "bg-[#fff6dc] text-[#986800]" :
    children === "Draft" ? "bg-[#f0f2f4] text-[#66727b]" :
    "bg-[#eef1f4] text-[#65717a]";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold ${tone}`}>{children}</span>;
}

function SubmissionDetailModal({ title, item, onClose }: { title: string; item: any; onClose: () => void }) {
  if (!item) return null;
  const hiddenKeys = new Set(["id", "__typename"]);
  const labelFor = (key: string) => key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
  const formatValue = (key: string, value: any) => {
    if (value === null || value === undefined || value === "") return "—";
    if (key === "createdAt" || key === "updatedAt") {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
    }
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };
  const entries = Object.entries(item).filter(([key]) => !hiddenKeys.has(key));
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#03160b]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e)=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#edf1ee] bg-white px-6 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#0c8f3e]">Submission details</p>
            <h2 className="mt-1 text-xl font-black text-[#092113] sm:text-2xl">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f1f5f2] text-lg font-black text-[#536158]" aria-label="Close details">×</button>
        </div>
        <div className="grid gap-3 px-6 py-6 sm:grid-cols-2 sm:px-8">
          {entries.map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-[#edf1ee] bg-[#fbfcfb] p-4">
              <p className="text-[9px] font-black uppercase tracking-[.12em] text-[#7c8982]">{labelFor(key)}</p>
              <p className="mt-1 whitespace-pre-wrap break-words text-xs font-semibold leading-5 text-[#26362c]">{formatValue(key, value)}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end border-t border-[#edf1ee] px-6 py-4 sm:px-8">
          <button type="button" onClick={onClose} className="rounded-xl border border-[#dce5df] px-4 py-2.5 text-xs font-extrabold text-[#26362c]">Close</button>
        </div>
      </div>
    </div>
  );
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

function NewsEditor({ value, onChange, onSave, onCancel, saving, onError }: { value: any; onChange: (next:any)=>void; onSave: (file?:File)=>void; onCancel:()=>void; saving:boolean; onError:(message:string)=>void }) {
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#03160b]/70 p-4 backdrop-blur-sm"><div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
    <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#0c8f3e]">Content studio</p><h2 className="mt-1 text-2xl font-black">{value.id?"Update news":"Create news"}</h2></div><button onClick={onCancel} className="rounded-full bg-[#f1f5f2] px-3 py-2 text-xs font-black">✕</button></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Title" value={value.title} onChange={v=>onChange({...value,title:v})}/><Field label="Category" value={value.category} onChange={v=>onChange({...value,category:v})}/><Field label="Slug" value={value.slug} onChange={v=>onChange({...value,slug:v})}/><label className="block"><span className="mb-1.5 block text-xs font-extrabold text-[#26362c]">Featured image</span><input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];try{validateContentImageFile(file);onChange({...value,file});}catch(error){e.currentTarget.value="";onError(error instanceof Error?error.message:"Invalid image file.");}}} className="manage-input"/></label></div>
    <div className="mt-4"><label className="block"><span className="mb-1.5 block text-xs font-extrabold text-[#26362c]">Excerpt</span><textarea value={value.excerpt} onChange={e=>onChange({...value,excerpt:e.target.value})} className="manage-input min-h-24 resize-y"/></label></div>
    <div className="mt-4"><label className="block"><span className="mb-1.5 block text-xs font-extrabold text-[#26362c]">Story body</span><textarea value={value.body} onChange={e=>onChange({...value,body:e.target.value})} className="manage-input min-h-52 resize-y"/></label></div>
    <label className="mt-4 flex items-center gap-3 text-xs font-extrabold text-[#26362c]"><input type="checkbox" checked={value.published} onChange={e=>onChange({...value,published:e.target.checked})}/> Publish this story</label>
    <div className="mt-7 flex justify-end gap-3"><button onClick={onCancel} className="rounded-xl border border-[#dce5df] px-4 py-2.5 text-xs font-extrabold">Cancel</button><button disabled={saving} onClick={()=>onSave(value.file)} className="manage-primary-btn">{saving?"Saving...":value.id?"Update story":"Create story"}</button></div>
  </div></div>;
}

function GalleryEditor({ value, onChange, onSave, onCancel, saving, onError }: { value: any; onChange: (next:any)=>void; onSave: (file?:File)=>void; onCancel:()=>void; saving:boolean; onError:(message:string)=>void }) {
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#03160b]/70 p-4 backdrop-blur-sm">
    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
      <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#0c8f3e]">Media library</p><h2 className="mt-1 text-2xl font-black">{value.id?"Update photo":"Create photo"}</h2></div><button onClick={onCancel} className="rounded-full bg-[#f1f5f2] px-3 py-2 text-xs font-black">✕</button></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Title" value={value.title} onChange={v=>onChange({...value,title:v})}/>
        <Field label="Category" value={value.category} onChange={v=>onChange({...value,category:v})}/>
      </div>
      <div className="mt-4"><label className="block"><span className="mb-1.5 block text-xs font-extrabold text-[#26362c]">Image file</span><input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];try{validateContentImageFile(file);onChange({...value,file});}catch(error){e.currentTarget.value="";onError(error instanceof Error?error.message:"Invalid image file.");}}} className="manage-input"/></label><div className="mt-3"><Field label="Or image URL" value={value.imageUrl||""} placeholder="https://..." onChange={v=>onChange({...value,imageUrl:v})}/><p className="mt-1 text-[9px] text-[#829087]">Maximum image size: 10 MB. Use a URL if server-side image upload is not configured.</p></div>{value.imageUrl&&<div className="relative mt-3 aspect-[1.8] overflow-hidden rounded-2xl bg-[#f1fbf5]"><img src={value.imageUrl} alt={value.title||"Gallery preview"} className="absolute inset-0 h-full w-full object-cover"/></div>}</div>
      <div className="mt-4"><label className="block"><span className="mb-1.5 block text-xs font-extrabold text-[#26362c]">Description</span><textarea value={value.description||""} onChange={e=>onChange({...value,description:e.target.value})} className="manage-input min-h-28 resize-y"/></label></div>
      <label className="mt-4 flex items-center gap-3 text-xs font-extrabold text-[#26362c]"><input type="checkbox" checked={value.published} onChange={e=>onChange({...value,published:e.target.checked})}/> Show this photo on the public gallery</label>
      <div className="mt-7 flex justify-end gap-3"><button onClick={onCancel} className="rounded-xl border border-[#dce5df] px-4 py-2.5 text-xs font-extrabold">Cancel</button><button disabled={saving} onClick={()=>onSave(value.file)} className="manage-primary-btn">{saving?"Saving...":value.id?"Update photo":"Create photo"}</button></div>
    </div>
  </div>;
}

function DonationMethodEditor({ method, details, onSave, onChange }: { method: DonationMethodAdmin; details: DonationDetail[]; onSave: (details: DonationDetail[]) => void; onChange: (next: Partial<DonationMethodAdmin>) => void }) {
  const [draftDetails,setDraftDetails]=useState<DonationDetail[]>(details);
  useEffect(()=>setDraftDetails(details),[method.id,method.detailsJson]);
  return <div className="manage-card p-5 sm:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#0c8f3e]">{method.key}</p><h3 className="mt-1 text-lg font-black">{method.name}</h3><p className="mt-1 text-[10px] text-[#829087]">Update only the content shown inside this payment card. Its existing public design stays unchanged.</p></div><button type="button" onClick={()=>onSave(draftDetails)} className="manage-primary-btn">Save method</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Method name" value={method.name} onChange={(v)=>onChange({name:v})}/><Field label="Eyebrow label" value={method.eyebrow} onChange={(v)=>onChange({eyebrow:v})}/></div><div className="mt-5"><div className="flex items-center justify-between"><div><h4 className="text-xs font-black">Payment details</h4><p className="mt-1 text-[10px] text-[#829087]">Labels, values and optional copy-to-clipboard values.</p></div><button type="button" onClick={()=>setDraftDetails([...draftDetails,{label:"New detail",value:""}])} className="rounded-xl border border-[#bfe3ca] px-3 py-2 text-[10px] font-extrabold text-[#087a35]">+ Add detail</button></div><div className="mt-4 space-y-3">{draftDetails.map((detail,index)=><div key={index} className="grid gap-3 rounded-2xl border border-[#edf1ee] bg-[#fbfcfb] p-4 sm:grid-cols-[.8fr_1.2fr_.9fr_auto] sm:items-end"><Field label="Label" value={detail.label} onChange={(v)=>setDraftDetails(items=>items.map((x,i)=>i===index?{...x,label:v}:x))}/><Field label="Value" value={detail.value} onChange={(v)=>setDraftDetails(items=>items.map((x,i)=>i===index?{...x,value:v}:x))}/><Field label="Copy value (optional)" value={detail.copy||""} onChange={(v)=>setDraftDetails(items=>items.map((x,i)=>i===index?{...x,copy:v||undefined}:x))}/><button type="button" onClick={()=>setDraftDetails(items=>items.filter((_,i)=>i!==index))} className="rounded-xl border border-[#f0c8cc] px-3 py-2.5 text-[10px] font-extrabold text-[#c91525]">Remove</button></div>)}</div></div><div className="mt-5"><Field label="Card note" value={method.note} onChange={(v)=>onChange({note:v})}/></div></div>;
}

export default function ManagePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [section, setSection] = useState<Section>("dashboard");
  const [greeting, setGreeting] = useState(getKampalaGreeting());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [messageFilter, setMessageFilter] = useState("ALL");
  const [selectedMessage, setSelectedMessage] = useState<any|null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any|null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<any|null>(null);
  const [volunteerSearch, setVolunteerSearch] = useState("");
  const [volunteerFilter, setVolunteerFilter] = useState("ALL");
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
    whatsapp: "",
  });

  const [stats, setStats] = useState({ messages: 0, newMessages: 0, newsletter: 0, pendingNewsletter: 0, volunteers: 0, pendingVolunteers: 0, sponsors: 0, pendingSponsors: 0, gallery: 0, news: 0 });
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [donationMethods, setDonationMethods] = useState<DonationMethodAdmin[]>([]);
  const [siteStatistics, setSiteStatistics] = useState<SiteStatistic[]>(DEFAULT_SITE_STATISTICS);
  const [newsEditor, setNewsEditor] = useState<any|null>(null);
  const [newsSaving, setNewsSaving] = useState(false);
  const [galleryEditor, setGalleryEditor] = useState<any|null>(null);
  const [gallerySaving, setGallerySaving] = useState(false);

  async function loadAdmin() {
    const [s,settingsResult,m,n,v,sp,g,nu,d,st] = await Promise.all([gql<any>(queries.stats),gql<any>(queries.settings),gql<any>(queries.messages),gql<any>(queries.subscribers),gql<any>(queries.volunteers),gql<any>(queries.sponsors),gql<any>(queries.gallery),gql<any>(queries.news),gql<any>(queries.adminDonationMethods),gql<any>(queries.adminStatistics)]);
    setStats(s.dashboardStats);
    const settingsData=settingsResult.siteSettings; setContact({phone1:settingsData.phone,phone2:settingsData.secondaryPhone||"",email:settingsData.email,location:settingsData.location,facebook:settingsData.facebook||"",instagram:settingsData.instagram||"",x:settingsData.x||"",linkedin:settingsData.linkedin||"",youtube:settingsData.youtube||"",whatsapp:settingsData.whatsapp||""});
    setMessages(m.contactMessages.map((x:any)=>({...x,date:new Date(x.createdAt).toLocaleString()})));
    setSubscribers(n.newsletterSubscribers.map((x:any)=>({...x,status:x.status||"NEW",joined:new Date(x.createdAt).toLocaleDateString(),source:"Website"})));
    setVolunteers(v.volunteerApplications.map((x:any)=>({...x,role:x.interest,date:new Date(x.createdAt).toLocaleDateString()})));
    setSponsors(sp.sponsorEnquiries);
    setGallery(g.adminGallery.map((x:any)=>({...x,image:x.imageUrl})));
    setNews(nu.adminNews.map((x:any)=>({...x,date:new Date(x.publishedAt||x.createdAt).toLocaleDateString(),status:x.published?"Published":"Draft",image:x.imageUrl||"/images/home-hero.jpg"})));
    setDonationMethods(d.adminDonationMethods);
    setSiteStatistics(st.adminStatistics?.length ? st.adminStatistics : DEFAULT_SITE_STATISTICS);
  }

  useEffect(() => {
    gql(queries.me).then(() => { setAuthenticated(true); return loadAdmin(); }).catch(() => {}).finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const updateGreeting = () => setGreeting(getKampalaGreeting());
    updateGreeting();
    const interval = window.setInterval(updateGreeting, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const sectionLabel = useMemo(() => nav.find((item) => item.id === section)?.label || "Dashboard", [section]);
  const navBadge = (id: Section) => id === "messages" ? stats.newMessages : id === "newsletter" ? stats.pendingNewsletter : id === "volunteers" ? stats.pendingVolunteers : id === "sponsors" ? stats.pendingSponsors : 0;
  const filteredMessages = messages.filter((item) => { const haystack=[item.name,item.email||"",item.subject||"",item.message||""].join(" ").toLowerCase(); return (!messageSearch || haystack.includes(messageSearch.toLowerCase())) && (messageFilter==="ALL" || item.status===messageFilter); });
  const filteredVolunteers = volunteers.filter((item) => { const haystack=[item.name,item.email||"",item.phone,item.interest,item.availability||"",item.message||""].join(" ").toLowerCase(); return (!volunteerSearch || haystack.includes(volunteerSearch.toLowerCase())) && (volunteerFilter==="ALL" || item.status===volunteerFilter); });

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 4) { setNotice("Enter a valid email and password."); return; }
    try { await gql(mutations.login,{email,password}); setAuthenticated(true); setPassword(""); setNotice(""); await loadAdmin(); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Unable to sign in."); }
  }

  async function logout() { try { await gql(mutations.logout); } finally { setAuthenticated(false); } }

  async function saveContact(e: React.FormEvent) {
    e.preventDefault();
    try {
      const r=await gql<any>(mutations.updateSettings,{input:{phone:contact.phone1,secondaryPhone:contact.phone2||null,email:contact.email,location:contact.location,facebook:contact.facebook||null,instagram:contact.instagram||null,x:contact.x||null,linkedin:contact.linkedin||null,youtube:contact.youtube||null,whatsapp:contact.whatsapp||null}});
      const saved=r.updateSiteSettings;
      const fresh=await gql<any>(queries.settings);
      const s=fresh.siteSettings;
      setContact({phone1:s.phone,phone2:s.secondaryPhone||"",email:s.email,location:s.location,facebook:s.facebook||"",instagram:s.instagram||"",x:s.x||"",linkedin:s.linkedin||"",youtube:s.youtube||"",whatsapp:s.whatsapp||""});
      setNotice(saved?.id ? "Contact details saved to the live database." : "Contact details saved.");
    } catch(error) { setNotice(error instanceof Error ? error.message : "Could not save contact details."); }
  }

  async function markMessage(id:string) {
    const item=messages.find(x=>x.id===id); if(!item || item.status==="READ")return;
    try { await gql(mutations.updateMessageStatus,{id:item.id,status:"READ"}); setMessages(items=>items.map(x=>x.id===item.id?{...x,status:"READ"}:x)); setStats(current=>({...current,newMessages:Math.max(0,current.newMessages-1)})); if(selectedMessage?.id===item.id)setSelectedMessage({...item,status:"READ"}); }
    catch(error) { setNotice(error instanceof Error ? error.message : "Could not update message."); }
  }

  async function reviewVolunteer(id:string,status:"REPLIED"|"ARCHIVED") {
    try {
      const r=await gql<any>(mutations.updateVolunteerStatus,{id,status});
      setVolunteers(items=>items.map(x=>x.id===id?{...x,status:r.updateVolunteerStatus.status}:x));
      setStats(current=>({...current,pendingVolunteers:Math.max(0,current.pendingVolunteers-1)}));
      setNotice(status==="REPLIED"?"Volunteer application marked replied.":"Volunteer application archived.");
    } catch(error) { setNotice(error instanceof Error ? error.message : "Could not update volunteer application."); }
  }
  async function reviewSponsor(id:string,status:"REPLIED"|"ARCHIVED") {
    try {
      const r=await gql<any>(mutations.updateSponsorStatus,{id,status});
      setSponsors(items=>items.map(x=>x.id===id?{...x,status:r.updateSponsorStatus.status}:x));
      if(status==="REPLIED") setStats(current=>({...current,pendingSponsors:Math.max(0,current.pendingSponsors-1)}));
      if(status==="ARCHIVED") setStats(current=>({...current,pendingSponsors:Math.max(0,current.pendingSponsors-1)}));
      setNotice(status==="REPLIED"?"Sponsor enquiry marked replied.":"Sponsor enquiry archived.");
    } catch(error) { setNotice(error instanceof Error ? error.message : "Could not update sponsor enquiry."); }
  }

  async function reviewNewsletter(id:string,status:"APPROVED"|"DECLINED") {
    try {
      const r=await gql<any>(mutations.updateNewsletterStatus,{id,status});
      setSubscribers(items=>items.map(x=>x.id===id?{...x,status:r.updateNewsletterStatus.status}:x));
      setStats(current=>({...current,pendingNewsletter:Math.max(0,current.pendingNewsletter-1)}));
      setNotice(status==="APPROVED"?"Subscriber approved.":"Subscriber declined.");
    } catch(error) { setNotice(error instanceof Error ? error.message : "Could not update subscriber."); }
  }

  function parseDonationDetails(value:string): DonationDetail[] { try { const parsed=JSON.parse(value); return Array.isArray(parsed)?parsed.map((x:any)=>({label:String(x?.label||""),value:String(x?.value||""),copy:x?.copy?String(x.copy):undefined})):[]; } catch { return []; } }
  async function saveDonationMethod(method:DonationMethodAdmin, details:DonationDetail[]) { try { const detailsJson=JSON.stringify(details.map(x=>({label:x.label,value:x.value,...(x.copy?{copy:x.copy}:{})}))); const r=await gql<any>(mutations.updateDonationMethod,{id:method.id,input:{name:method.name,eyebrow:method.eyebrow,detailsJson,note:method.note}}); setDonationMethods(items=>items.map(x=>x.id===method.id?{...x,...r.updateDonationMethod}:x)); setNotice(method.name+" payment details saved."); } catch(error) { setNotice(error instanceof Error ? error.message : "Could not save donation details."); } }
  async function saveStatistic(statistic:SiteStatistic) {
    try {
      const r=await gql<any>(mutations.updateStatistic,{key:statistic.key,input:{label:statistic.label,value:Math.max(0,Math.round(Number(statistic.value)||0)),suffix:statistic.suffix}});
      setSiteStatistics(items=>items.map(x=>x.key===statistic.key?r.updateStatistic:x));
      setNotice(statistic.label+" updated on the live website.");
    } catch(error) {
      setNotice(error instanceof Error ? error.message : "Could not save statistic.");
    }
  }
  async function saveGalleryEditor(file?:File) {
    if(!galleryEditor?.title?.trim()){setNotice("Photo title is required.");return;}
    if(!galleryEditor.id && !file && !galleryEditor.imageUrl){setNotice("Please choose an image.");return;}
    try { validateContentImageFile(file); } catch(error) { setNotice(error instanceof Error ? error.message : "Invalid image file."); return; }
    setGallerySaving(true);
    try {
      let imageUrl=galleryEditor.imageUrl||"";
      if(file){const base64=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]||"");reader.onerror=reject;reader.readAsDataURL(file);}); imageUrl=(await gql<any>(mutations.uploadGalleryImage,{filename:file.name,contentBase64:base64})).uploadGalleryImage;}
      const input={title:galleryEditor.title.trim(),imageUrl,description:galleryEditor.description?.trim()||undefined,category:galleryEditor.category?.trim()||"Community",published:!!galleryEditor.published};
      const r=galleryEditor.id?await gql<any>(mutations.updateGallery,{id:galleryEditor.id,input}):await gql<any>(mutations.createGallery,{input});
      const item=galleryEditor.id?r.updateGallery:r.createGallery;
      setGallery(items=>galleryEditor.id?items.map(x=>x.id===item.id?{...item,image:item.imageUrl}:x):[{...item,image:item.imageUrl},...items]);
      setGalleryEditor(null);setNotice(galleryEditor.id?"Gallery photo updated.":"Gallery photo created.");await loadAdmin();
    } catch(error){setNotice(error instanceof Error?error.message:"Could not save gallery photo.");} finally{setGallerySaving(false);}
  }
  function addGalleryItem(){setGalleryEditor({title:"",category:"Community",description:"",imageUrl:"",published:true});}
  function editGalleryItem(item:any){setGalleryEditor({id:item.id,title:item.title,category:item.category||"Community",description:item.description||"",imageUrl:item.imageUrl||item.image||"",published:item.published!==false});}

  async function deleteGalleryItem(id:string) {
    const item=gallery.find(x=>x.id===id); if(!item||!window.confirm("Delete this gallery item?"))return;
    try { await gql(mutations.deleteGallery,{id}); setGallery(items=>items.filter(x=>x.id!==id)); setNotice("Gallery item deleted."); }
    catch(error) { setNotice(error instanceof Error ? error.message : "Could not delete photo."); }
  }

  async function saveNewsEditor(file?:File) {
    if(!newsEditor?.title?.trim()||!newsEditor?.body?.trim()){setNotice("Title and story body are required.");return;}
    try { validateContentImageFile(file); } catch(error) { setNotice(error instanceof Error ? error.message : "Invalid image file."); return; }
    setNewsSaving(true);
    try {
      let imageUrl=newsEditor.imageUrl||undefined;
      if(file){const base64=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]||"");reader.onerror=reject;reader.readAsDataURL(file);}); imageUrl=(await gql<any>(mutations.uploadNewsImage,{filename:file.name,contentBase64:base64})).uploadNewsImage;}
      const input={title:newsEditor.title.trim(),slug:newsEditor.slug?.trim()||"",category:newsEditor.category?.trim()||"Foundation Update",excerpt:newsEditor.excerpt?.trim()||undefined,body:newsEditor.body.trim(),imageUrl,published:!!newsEditor.published};
      const r=newsEditor.id?await gql<any>(mutations.updateNews,{id:newsEditor.id,input}):await gql<any>(mutations.createNews,{input});
      const item=newsEditor.id?r.updateNews:r.createNews;
      setNews(items=>newsEditor.id ? items.map(x=>x.id===item.id ? {...x,date:new Date(item.publishedAt||item.createdAt).toLocaleDateString(),status:item.published?"Published":"Draft",image:item.imageUrl||"/images/home-hero.jpg"} : x) : [{...item,date:new Date(item.publishedAt||item.createdAt).toLocaleDateString(),status:item.published?"Published":"Draft",image:item.imageUrl||"/images/home-hero.jpg"},...items]);
      setNewsEditor(null);setNotice(newsEditor.id?"Story updated.":"Story created.");await loadAdmin();
    } catch(error){setNotice(error instanceof Error?error.message:"Could not save story.");} finally{setNewsSaving(false);}
  }
  function addNewsItem(){setNewsEditor({title:"",slug:"",category:"Foundation Update",excerpt:"",body:"",imageUrl:"",published:true});}
  function editNewsItem(item:any){setNewsEditor({id:item.id,title:item.title,slug:item.slug,category:item.category||"Foundation Update",excerpt:item.excerpt||"",body:item.body||"",imageUrl:item.imageUrl||"",published:item.published});}
  async function deleteNewsItem(id:string) {
    const item=news.find(x=>x.id===id);
    if(!item || !window.confirm("Delete this news story?")) return;
    try {
      await gql(mutations.deleteNews,{id});
      setNews(items=>items.filter(x=>x.id!==id));
      setStats(current=>({...current,news:Math.max(0,current.news-1)}));
      setNotice("News story deleted.");
    } catch(error) {
      setNotice(error instanceof Error ? error.message : "Could not delete news story.");
    }
  }

  function exportRows(filename:string,rows:string[][]) {
    const csv=rows.map(row=>row.map(value=>'"'+String(value??"").replace(/"/g,'""')+'"').join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv"}),url=URL.createObjectURL(blob),a=document.createElement("a"); a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
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
                  <label className="block"><span className="mb-1.5 block text-xs font-extrabold text-[#26362c]">Password</span><div className="relative"><input type={showLoginPassword ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="manage-input pr-11"/><button type="button" onClick={()=>setShowLoginPassword(v=>!v)} aria-label={showLoginPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-[#7b8981] hover:text-[#087a35]">{showLoginPassword ? "◉" : "◌"}</button></div></label>
                  {notice && <p className="rounded-xl bg-[#fff0f1] px-3 py-2 text-xs font-semibold text-[#c91525]">{notice}</p>}
                  <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0c8f3e] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#0c8f3e]/15 transition hover:-translate-y-0.5 hover:bg-[#087a35]">
                    Sign in to dashboard <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </form>
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#f5faf7] p-3 text-[10px] leading-4 text-[#718078]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-[#087a35] shadow-sm">i</span>
                  <span><strong className="text-[#26362c]">Secure admin access.</strong> Sign in to manage foundation content and submissions.</span>
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
      <aside className={`manage-sidebar overflow-y-auto ${sidebarOpen ? "is-open" : ""}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-5">
            <button type="button" onClick={()=>{setSection("dashboard");setSidebarOpen(false)}} className="flex items-center gap-2.5 text-left">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white p-1.5 shadow-sm">
                <Image src="/images/ssemuyaba-logo-icon-transparent.png" alt="" width={80} height={80} className="h-full w-full object-contain" />
              </span>
              <span>
                <strong className="block text-[13px] font-black tracking-[-0.02em] text-white">SSEMUYABA</strong>
                <span className="text-[8px] font-extrabold tracking-[0.3em] text-white/50">MANAGEMENT</span>
              </span>
            </button>
            <button className="rounded-lg p-2 text-white/60 hover:bg-white/10 lg:hidden" onClick={() => setSidebarOpen(false)}><XIcon className="h-5 w-5" /></button>
          </div>

          <div className="px-4 pt-3">
            <p className="mb-2 px-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/35">Workspace</p>
            <nav className="space-y-1">
              {nav.map((item) => (
                <button key={item.id} onClick={() => { setSection(item.id); setSidebarOpen(false); }} className={`manage-nav-item ${section === item.id ? "is-active" : ""}`}>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-sm">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {navBadge(item.id)>0 && <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${section === item.id ? "bg-white/20 text-white" : "bg-[#ff1d2d] text-white"}`}>{navBadge(item.id)}</span>}
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
            <div className="relative"><button type="button" onClick={()=>setProfileOpen(v=>!v)} aria-expanded={profileOpen} className="flex items-center gap-2 rounded-xl bg-[#f0f6f2] px-3 py-2 text-[10px] font-extrabold text-[#087a35] transition hover:bg-[#e6f4eb]"><span className="grid h-6 w-6 place-items-center rounded-lg bg-white text-[#087a35] shadow-sm"><UserIcon className="h-3.5 w-3.5" /></span><span className="hidden sm:block">Admin</span><ChevronDown className="h-3 w-3" /></button>{profileOpen&&<div className="absolute right-0 top-[calc(100%+8px)] z-[70] w-48 overflow-hidden rounded-2xl border border-[#e4ebe6] bg-white p-1.5 shadow-xl"><button type="button" onClick={()=>{setChangePasswordOpen(true);setProfileOpen(false)}} className="w-full rounded-xl px-3 py-2.5 text-left text-[10px] font-extrabold text-[#26362c] hover:bg-[#f1fbf5] hover:text-[#087a35]">Change password</button><button type="button" onClick={()=>{setProfileOpen(false);logout()}} className="w-full rounded-xl px-3 py-2.5 text-left text-[10px] font-extrabold text-[#c91525] hover:bg-[#fff2f3]">Logout</button></div>}</div>
          </div>
        </header>

        <div className="manage-content">
          {notice && <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#bfe8cc] bg-[#edfff3] px-4 py-3 text-xs font-bold text-[#087a35]"><span>{notice}</span><button onClick={() => setNotice("")}><XIcon className="h-4 w-4" /></button></div>}

          {section === "dashboard" && (
            <>
              <SectionTitle eyebrow="Overview" title={`${greeting}, Admin.`} description="Here’s what is happening across the foundation website today." action={<button onClick={() => setSection("news")} className="manage-primary-btn">Create update <ArrowRight className="h-4 w-4" /></button>} />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {[
                  ["Contact messages", String(stats.messages), `${stats.newMessages} new`, "✉"],
                  ["Newsletter subscribers", String(stats.newsletter), `${stats.pendingNewsletter} pending review`, "◉"],
                  ["Volunteer applications", String(stats.volunteers), `${stats.pendingVolunteers} new`, "♧"],
                  ["Sponsor enquiries", String(stats.sponsors), `${stats.pendingSponsors} new`, "♡"],
                  ["Published stories", String(stats.news), "Published", "▤"],
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
                    {messages.slice(0, 3).map((item) => <div key={item.email} className="flex items-center gap-3 px-5 py-4"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf8ef] text-[11px] font-black text-[#087a35]">{item.name.split(" ").map((x: string) => x[0]).join("").slice(0,2)}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-[#24332a]">{item.subject}</p><p className="truncate text-[10px] text-[#8a968f]">{item.name} • {item.email}</p></div><div className="hidden text-right sm:block"><p className="text-[9px] font-semibold text-[#98a39c]">{item.date}</p><div className="mt-1"><Status>{item.status}</Status></div></div></div>)}
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
                  {[["Gallery photos",String(gallery.length),"▦"],["Published stories",String(news.filter(x=>x.published).length),"▤"],["Draft stories",String(news.filter(x=>!x.published).length),"✎"],["Active causes",String(siteStatistics.find(x=>x.key==="active_causes")?.value ?? 6),"♡"]].map(([label,value,icon]) => <div key={label} className="p-5"><span className="text-lg text-[#0c8f3e]">{icon}</span><p className="mt-2 text-xl font-black">{value}</p><p className="text-[9px] font-bold text-[#8b9790]">{label}</p></div>)}
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
                  <Field label="WhatsApp" value={contact.whatsapp} onChange={(v) => setContact({...contact, whatsapp:v})} placeholder="https://wa.me/256..." />
                </div>
              </div>
            </form>
          )}

          {section === "messages" && (
            <>
              <SectionTitle eyebrow="Inbox" title="Contact messages" description="Review enquiries submitted through the public contact form." action={<button className="manage-primary-btn" onClick={()=>exportRows("contact-messages.csv",[["Name","Email","Subject","Message","Status","Date"],...messages.map(x=>[x.name,x.email,x.subject||"",x.message,x.status,x.date])])}>Export CSV</button>} />
              <div className="manage-card overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-[#edf1ee] p-4 sm:flex-row sm:items-center sm:justify-between"><input value={messageSearch} onChange={e=>setMessageSearch(e.target.value)} className="manage-input max-w-sm" placeholder="Search name, email, subject..." /><select value={messageFilter} onChange={e=>setMessageFilter(e.target.value)} className="manage-select"><option value="ALL">All statuses</option><option value="NEW">New</option><option value="READ">Read</option><option value="REPLIED">Replied</option></select></div>
                <div className="hidden overflow-x-auto md:block"><table className="manage-table"><thead><tr><th>Sender</th><th>Subject</th><th>Received</th><th>Status</th><th /></tr></thead><tbody>{filteredMessages.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><span>{item.email||"No email provided"}{item.phone&&<><br />{item.phone}</>}</span></td><td>{item.subject||"General enquiry"}<span>{item.message}</span></td><td>{item.date}</td><td><Status>{item.status==="NEW"?"New":item.status==="READ"?"Read":"Replied"}</Status></td><td><div className="flex gap-3"><button onClick={()=>setSelectedMessage(item)} className="text-[10px] font-extrabold text-[#087a35]">Open →</button>{item.status==="NEW"&&<button onClick={()=>markMessage(item.id)} className="text-[10px] font-extrabold text-[#087a35]">Mark read</button>}</div></td></tr>)}</tbody></table></div>
                <div className="divide-y divide-[#edf1ee] md:hidden">{filteredMessages.map((item) => <div key={item.id} className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold">{item.subject||"General enquiry"}</p><p className="mt-1 text-[10px] text-[#849089]">{item.name} • {item.email||"No email provided"}</p></div><Status>{item.status==="NEW"?"New":item.status==="READ"?"Read":"Replied"}</Status></div><div className="mt-3 flex justify-between text-[9px] text-[#98a39c]"><span>{item.date}</span><button onClick={()=>setSelectedMessage(item)} className="font-extrabold text-[#087a35]">Open →</button></div></div>)}</div>
              </div>
              {selectedMessage&&<div className="fixed inset-0 z-[90] grid place-items-center bg-[#03160b]/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#0c8f3e]">Contact enquiry</p><h3 className="mt-2 text-2xl font-black">{selectedMessage.subject||"General enquiry"}</h3></div><button onClick={()=>setSelectedMessage(null)} className="grid h-9 w-9 place-items-center rounded-full bg-[#f1fbf5] text-xl">×</button></div><div className="mt-6 grid gap-4 rounded-2xl bg-[#f7faf8] p-5 sm:grid-cols-2"><div><p className="text-[9px] font-black uppercase text-[#89958e]">From</p><p className="mt-1 text-sm font-bold">{selectedMessage.name}</p></div><div><p className="text-[9px] font-black uppercase text-[#89958e]">Email</p><p className="mt-1 text-sm font-bold">{selectedMessage.email||"Not provided"}</p></div><div><p className="text-[9px] font-black uppercase text-[#89958e]">Phone</p><p className="mt-1 text-sm font-bold">{selectedMessage.phone||"Not provided"}</p></div><div><p className="text-[9px] font-black uppercase text-[#89958e]">Received</p><p className="mt-1 text-sm font-bold">{selectedMessage.date}</p></div></div><div className="mt-6 whitespace-pre-wrap rounded-2xl border border-[#e5ebe7] p-5 text-sm leading-7 text-[#405049]">{selectedMessage.message}</div><div className="mt-6 flex justify-end gap-3"><button onClick={()=>setSelectedMessage(null)} className="rounded-full border border-[#dfe8e2] px-5 py-2.5 text-xs font-extrabold">Close</button>{selectedMessage.status==="NEW"&&<button onClick={()=>markMessage(selectedMessage.id)} className="rounded-full bg-[#087a35] px-5 py-2.5 text-xs font-extrabold text-white">Mark as read</button>}</div></div></div>}
            </>
          )}

          {section === "newsletter" && (
            <>
              <SectionTitle eyebrow="Audience" title="Newsletter subscribers" description="Manage your growing newsletter audience and see where subscribers joined from." action={<button className="manage-primary-btn" onClick={()=>exportRows("newsletter-subscribers.csv",[["Email","Joined","Status"],...subscribers.map(x=>[x.email,x.joined,x.status])])}>Export subscribers</button>} />
              <div className="grid gap-4 sm:grid-cols-3"><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Total subscribers</p><strong className="mt-1 block text-3xl font-black">{stats.newsletter}</strong><span className="text-[10px] font-bold text-[#087a35]">Live audience</span></div><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Pending review</p><strong className="mt-1 block text-3xl font-black">{stats.pendingNewsletter}</strong><span className="text-[10px] font-bold text-[#087a35]">Needs a decision</span></div><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Approved rate</p><strong className="mt-1 block text-3xl font-black">{stats.newsletter?Math.round((subscribers.filter(x=>x.status==="APPROVED").length/stats.newsletter)*100):0}%</strong><span className="text-[10px] font-bold text-[#087a35]">Based on current records</span></div></div>
              <div className="manage-card mt-5 overflow-hidden"><div className="border-b border-[#edf1ee] p-4"><input className="manage-input max-w-sm" placeholder="Search subscribers..." /></div><div className="hidden overflow-x-auto md:block"><table className="manage-table"><thead><tr><th>Email</th><th>Joined</th><th>Source</th><th>Status</th><th>Actions</th></tr></thead><tbody>{subscribers.map((item) => <tr key={item.id}><td><strong>{item.email}</strong></td><td>{item.joined}</td><td>{item.source}</td><td><Status>{item.status==="APPROVED"?"Approved":item.status==="DECLINED"?"Declined":"New"}</Status></td><td><div className="flex gap-2"><button onClick={()=>reviewNewsletter(item.id,"APPROVED")} disabled={item.status==="APPROVED"} className="rounded-lg bg-[#e8fff0] px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35] disabled:cursor-not-allowed disabled:opacity-40">Approve</button><button onClick={()=>reviewNewsletter(item.id,"DECLINED")} disabled={item.status==="DECLINED"} className="rounded-lg bg-[#fff0f1] px-2.5 py-1.5 text-[9px] font-extrabold text-[#c91525] disabled:cursor-not-allowed disabled:opacity-40">Decline</button></div></td></tr>)}</tbody></table></div><div className="divide-y divide-[#edf1ee] md:hidden">{subscribers.map((item) => <div key={item.id} className="p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-extrabold">{item.email}</p><p className="mt-1 text-[9px] text-[#8b9790]">{item.joined} • {item.source}</p></div><Status>{item.status==="APPROVED"?"Approved":item.status==="DECLINED"?"Declined":"New"}</Status></div><div className="mt-3 flex gap-2"><button onClick={()=>reviewNewsletter(item.id,"APPROVED")} disabled={item.status==="APPROVED"} className="rounded-lg bg-[#e8fff0] px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35] disabled:opacity-40">Approve</button><button onClick={()=>reviewNewsletter(item.id,"DECLINED")} disabled={item.status==="DECLINED"} className="rounded-lg bg-[#fff0f1] px-2.5 py-1.5 text-[9px] font-extrabold text-[#c91525] disabled:opacity-40">Decline</button></div></div>)}</div></div>
            </>
          )}

          {section === "volunteers" && (
            <>
              <SectionTitle eyebrow="People" title="Volunteer applications" description="Review volunteer expressions of interest, follow up with applicants and archive completed records." action={<button className="manage-primary-btn" onClick={()=>exportRows("volunteer-applications.csv",[["Name","Email","Phone","Interest","Availability","Message","Status","Applied"],...volunteers.map(x=>[x.name,x.email||"",x.phone,x.interest,x.availability||"",x.message||"",x.status,new Date(x.createdAt).toLocaleString()])])}>Export CSV</button>} />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Total applications</p><strong className="mt-1 block text-3xl font-black">{stats.volunteers}</strong><span className="text-[10px] font-bold text-[#087a35]">Live from database</span></div>
                <div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">New applications</p><strong className="mt-1 block text-3xl font-black">{stats.pendingVolunteers}</strong><span className="text-[10px] font-bold text-[#087a35]">Need follow-up</span></div>
                <div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Replied</p><strong className="mt-1 block text-3xl font-black">{volunteers.filter(x=>x.status==="REPLIED").length}</strong><span className="text-[10px] font-bold text-[#087a35]">Follow-up completed</span></div>
              </div>
              <div className="manage-card mt-5 overflow-hidden">
                <div className="hidden overflow-x-auto md:block"><table className="manage-table"><thead><tr><th>Applicant</th><th>Interest</th><th>Availability</th><th>Contact</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredVolunteers.map((item)=><tr key={item.id}><td><strong>{item.name}</strong><span>{item.email||"No email provided"}</span></td><td>{item.interest}</td><td>{item.availability||"—"}</td><td>{item.phone}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><Status>{item.status==="NEW"?"New":item.status==="REPLIED"?"Replied":item.status==="ARCHIVED"?"Archived":item.status==="REVIEWING"?"Reviewing":"Approved"}</Status></td><td><div className="flex gap-2"><button onClick={()=>setSelectedVolunteer(item)} className="rounded-lg border border-[#cfe3d5] bg-white px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Open</button>{item.status!=="REPLIED"&&item.status!=="ARCHIVED"&&<button onClick={()=>reviewVolunteer(item.id,"REPLIED")} className="rounded-lg bg-[#e8fff0] px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Replied</button>}{item.status!=="ARCHIVED"&&<button onClick={()=>reviewVolunteer(item.id,"ARCHIVED")} className="rounded-lg bg-[#fff0f1] px-2.5 py-1.5 text-[9px] font-extrabold text-[#c91525]">Archive</button>}</div></td></tr>)}</tbody></table></div>
                <div className="divide-y divide-[#edf1ee] md:hidden">{filteredVolunteers.map((item)=><div key={item.id} className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold">{item.name}</p><p className="mt-1 text-[10px] text-[#8b9790]">{item.email||"No email provided"} • {item.phone}</p></div><Status>{item.status==="NEW"?"New":item.status==="REPLIED"?"Replied":item.status==="ARCHIVED"?"Archived":item.status==="REVIEWING"?"Reviewing":"Approved"}</Status></div><p className="mt-2 text-[10px]">{item.interest} • {item.availability||"Availability not supplied"}</p><div className="mt-3 flex gap-2"><button onClick={()=>setSelectedVolunteer(item)} className="rounded-lg border border-[#cfe3d5] bg-white px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Open</button>{item.status!=="REPLIED"&&item.status!=="ARCHIVED"&&<button onClick={()=>reviewVolunteer(item.id,"REPLIED")} className="rounded-lg bg-[#e8fff0] px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Replied</button>}{item.status!=="ARCHIVED"&&<button onClick={()=>reviewVolunteer(item.id,"ARCHIVED")} className="rounded-lg bg-[#fff0f1] px-2.5 py-1.5 text-[9px] font-extrabold text-[#c91525]">Archive</button>}</div></div>)}</div>
              </div>
            </>
          )}

          {section === "sponsors" && (
            <>
              <SectionTitle eyebrow="Child sponsorship" title="Sponsor enquiries" description="Track new sponsorship interest, follow up with enquiries and archive completed records." action={<button className="manage-primary-btn" onClick={()=>exportRows("sponsor-enquiries.csv",[["Name","Email","Phone","Location","Preference","Contact","Status","Received"],...sponsors.map(x=>[x.fullName,x.email||"",x.phone,[x.city,x.country].filter(Boolean).join(", "),x.sponsorshipPreference||"Discuss",x.preferredContact||"",x.status,new Date(x.createdAt).toLocaleString()])])}>Export CSV</button>} />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Total enquiries</p><strong className="mt-1 block text-3xl font-black">{stats.sponsors}</strong><span className="text-[10px] font-bold text-[#087a35]">Live from database</span></div>
                <div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">New enquiries</p><strong className="mt-1 block text-3xl font-black">{stats.pendingSponsors}</strong><span className="text-[10px] font-bold text-[#087a35]">Need follow-up</span></div>
                <div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Replied</p><strong className="mt-1 block text-3xl font-black">{sponsors.filter(x=>x.status==="REPLIED").length}</strong><span className="text-[10px] font-bold text-[#087a35]">Follow-up completed</span></div>
              </div>
              <div className="manage-card mt-5 overflow-hidden">
                <div className="hidden overflow-x-auto md:block"><table className="manage-table"><thead><tr><th>Person</th><th>Location</th><th>Preference</th><th>Contact</th><th>Received</th><th>Status</th><th>Actions</th></tr></thead><tbody>{sponsors.map((item)=><tr key={item.id}><td><strong>{item.fullName}</strong><span>{item.email||"No email provided"}<br />{item.phone}</span></td><td>{[item.city,item.country].filter(Boolean).join(", ")||"—"}</td><td>{item.sponsorshipPreference||"Discuss"}</td><td>{item.preferredContact||"—"}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><Status>{item.status==="NEW"?"New":item.status==="REPLIED"?"Replied":item.status==="ARCHIVED"?"Archived":item.status==="REVIEWING"?"Reviewing":"Approved"}</Status></td><td><div className="flex gap-2"><button onClick={()=>setSelectedSponsor(item)} className="rounded-lg border border-[#cfe3d5] bg-white px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Open</button>{item.status!=="REPLIED"&&item.status!=="ARCHIVED"&&<button onClick={()=>reviewSponsor(item.id,"REPLIED")} className="rounded-lg bg-[#e8fff0] px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Replied</button>}{item.status!=="ARCHIVED"&&<button onClick={()=>reviewSponsor(item.id,"ARCHIVED")} className="rounded-lg bg-[#fff0f1] px-2.5 py-1.5 text-[9px] font-extrabold text-[#c91525]">Archive</button>}</div></td></tr>)}</tbody></table></div>
                <div className="divide-y divide-[#edf1ee] md:hidden">{sponsors.map((item)=><div key={item.id} className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold">{item.fullName}</p><p className="mt-1 text-[10px] text-[#849089]">{item.email||"No email provided"} • {item.phone}</p></div><Status>{item.status==="NEW"?"New":item.status==="REPLIED"?"Replied":item.status==="ARCHIVED"?"Archived":item.status==="REVIEWING"?"Reviewing":"Approved"}</Status></div><p className="mt-2 text-[10px]">{item.sponsorshipPreference||"Discuss"} • {[item.city,item.country].filter(Boolean).join(", ")||"Location not supplied"}</p><div className="mt-3 flex gap-2"><button onClick={()=>setSelectedSponsor(item)} className="rounded-lg border border-[#cfe3d5] bg-white px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Open</button>{item.status!=="REPLIED"&&item.status!=="ARCHIVED"&&<button onClick={()=>reviewSponsor(item.id,"REPLIED")} className="rounded-lg bg-[#e8fff0] px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Replied</button>}{item.status!=="ARCHIVED"&&<button onClick={()=>reviewSponsor(item.id,"ARCHIVED")} className="rounded-lg bg-[#fff0f1] px-2.5 py-1.5 text-[9px] font-extrabold text-[#c91525]">Archive</button>}</div></div>)}</div>
              </div>
            </>
          )}

          {section === "gallery" && (
            <>
              <SectionTitle eyebrow="Media library" title="Gallery management" description="Keep the public gallery fresh with photos from outreach, education, healthcare and community work." action={<button onClick={addGalleryItem} className="manage-primary-btn">+ Add photo</button>} />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{gallery.map((item) => <article key={item.title} className="manage-gallery-card"><div className="relative aspect-[1.55] overflow-hidden"><img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-black text-[#087a35] backdrop-blur">{item.category}</span></div><div className="flex items-center gap-3 p-4"><div className="min-w-0 flex-1"><h3 className="truncate text-xs font-black">{item.title}</h3><p className="mt-1 text-[9px] text-[#8b9790]">Published to website</p></div><div className="flex items-center gap-2"><button onClick={()=>editGalleryItem(item)} className="rounded-lg border border-[#dce8df] px-2.5 py-1.5 text-[9px] font-extrabold text-[#087a35]">Update</button><button onClick={()=>deleteGalleryItem(item.id)} className="rounded-lg border border-[#e5ebe7] px-2.5 py-1.5 text-[9px] font-extrabold text-[#c91525]">Delete</button></div></div></article>)}</div>
            </>
          )}

          {section === "news" && (
            <>
              <SectionTitle eyebrow="Content studio" title="News & updates" description="Publish stories, announcements and impact updates directly to the public website." action={<button onClick={addNewsItem} className="manage-primary-btn">+ New story</button>} />
              <div className="mb-5 grid gap-4 sm:grid-cols-3"><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Total stories</p><strong className="mt-1 block text-3xl font-black">{stats.news}</strong><span className="text-[10px] font-bold text-[#087a35]">Live from database</span></div><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Published</p><strong className="mt-1 block text-3xl font-black">{news.filter(x=>x.published).length}</strong><span className="text-[10px] font-bold text-[#087a35]">Visible on website</span></div><div className="manage-stat-card"><p className="text-[10px] font-bold text-[#7c8982]">Drafts</p><strong className="mt-1 block text-3xl font-black">{news.filter(x=>!x.published).length}</strong><span className="text-[10px] font-bold text-[#087a35]">Not yet public</span></div></div>
              <div className="grid gap-4 xl:grid-cols-2">{news.map((item) => <article key={item.title} className="manage-card flex overflow-hidden"><div className="relative hidden w-36 shrink-0 sm:block"><img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" /></div><div className="min-w-0 flex-1 p-5"><div className="flex items-start justify-between gap-3"><Status>{item.status}</Status><div className="flex items-center gap-3"><button onClick={()=>editNewsItem(item)} className="text-[9px] font-extrabold text-[#087a35]">Update</button><button onClick={()=>deleteNewsItem(item.id)} className="text-[9px] font-extrabold text-[#c91525]">Delete</button></div></div><h3 className="mt-3 text-sm font-black leading-5">{item.title}</h3><p className="mt-1 text-[10px] text-[#8b9790]">{item.date} • Ssemuyaba Foundation</p><p className="mt-3 text-[10px] leading-5 text-[#68766e]">Manage the headline, story copy, featured image and publication status from the content editor.</p></div></article>)}</div>
            </>
          )}

          {section === "donations" && (<><SectionTitle eyebrow="Giving" title="Donation methods" description="Update the payment details shown on the public Donate page. The existing card design and branding are not changed."/><div className="space-y-5">{donationMethods.map(method=><DonationMethodEditor key={method.id} method={method} details={parseDonationDetails(method.detailsJson)} onSave={(details)=>saveDonationMethod(method,details)} onChange={(next)=>setDonationMethods(items=>items.map(x=>x.id===method.id?{...x,...next}:x))}/>)}</div></>)}
          {section === "statistics" && (
            <>
              <SectionTitle eyebrow="Website figures" title="Statistics" description="Update the figures used across the public website. The existing typography, commas, plus signs and percentage formatting remain controlled by the website UI." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {siteStatistics.map((statistic) => (
                  <div key={statistic.key} className="manage-card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#0c8f3e]">{statistic.key.replace(/_/g," ")}</p>
                        <h3 className="mt-1 text-sm font-black text-[#092113]">{statistic.label}</h3>
                      </div>
                      <span className="rounded-full bg-[#eaf8ef] px-2.5 py-1 text-[9px] font-black text-[#087a35]">Live</span>
                    </div>
                    <label className="mt-5 block">
                      <span className="mb-1.5 block text-[10px] font-extrabold text-[#718078]">Figure</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={statistic.value.toLocaleString("en-US")}
                          onChange={(e)=>setSiteStatistics(items=>items.map(x=>x.key===statistic.key?{...x,value:Math.max(0,Number(e.target.value.replace(/[^0-9]/g,""))||0)}:x))}
                          className="manage-input text-lg font-black"
                          aria-label={statistic.label}
                        />
                        <span className="min-w-8 text-center text-lg font-black text-[#087a35]">{statistic.suffix}</span>
                      </div>
                    </label>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-[9px] font-semibold text-[#8b9790]">Public display: <strong className="text-[#087a35]">{formatStatisticValue(statistic)}</strong></p>
                      <button type="button" onClick={()=>saveStatistic(statistic)} className="manage-primary-btn">Save</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}


          <>{changePasswordOpen&&<div className="fixed inset-0 z-[100] grid place-items-center bg-[#03160b]/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#0c8f3e]">Account security</p><h3 className="mt-1 text-2xl font-black">Change password</h3></div><button type="button" onClick={()=>setChangePasswordOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-[#f1fbf5] text-xl">×</button></div><form className="mt-6 space-y-4" onSubmit={async e=>{e.preventDefault();if(newPassword.length<8){setNotice("New password must be at least 8 characters.");return}if(newPassword!==confirmPassword){setNotice("New password and confirmation do not match.");return}setPasswordSaving(true);try{await gql(mutations.changePassword,{currentPassword,newPassword});setNotice("Password changed successfully.");setCurrentPassword("");setNewPassword("");setConfirmPassword("");setChangePasswordOpen(false)}catch(error){setNotice(error instanceof Error?error.message:"Could not change password.")}finally{setPasswordSaving(false)}}}><label className="block"><span className="mb-1.5 block text-xs font-extrabold">Current password</span><div className="relative"><input type={showCurrentPassword?"text":"password"} value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="manage-input pr-11"/><button type="button" onClick={()=>setShowCurrentPassword(v=>!v)} className="absolute inset-y-0 right-0 w-11">{showCurrentPassword?"◉":"◌"}</button></div></label><label className="block"><span className="mb-1.5 block text-xs font-extrabold">New password</span><div className="relative"><input type={showNewPassword?"text":"password"} value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="manage-input pr-11"/><button type="button" onClick={()=>setShowNewPassword(v=>!v)} className="absolute inset-y-0 right-0 w-11">{showNewPassword?"◉":"◌"}</button></div></label><label className="block"><span className="mb-1.5 block text-xs font-extrabold">Confirm new password</span><div className="relative"><input type={showConfirmPassword?"text":"password"} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="manage-input pr-11"/><button type="button" onClick={()=>setShowConfirmPassword(v=>!v)} className="absolute inset-y-0 right-0 w-11">{showConfirmPassword?"◉":"◌"}</button></div></label><div className="flex justify-end gap-3 pt-2"><button type="button" onClick={()=>setChangePasswordOpen(false)} className="rounded-xl border border-[#dce5df] px-4 py-2.5 text-xs font-extrabold">Cancel</button><button type="submit" disabled={passwordSaving} className="manage-primary-btn">{passwordSaving?"Changing...":"Change password"}</button></div></form></div></div>}</>
          {newsEditor && <NewsEditor value={newsEditor} onChange={setNewsEditor} onSave={saveNewsEditor} onCancel={()=>setNewsEditor(null)} saving={newsSaving} onError={setNotice} />}
          {selectedVolunteer && <SubmissionDetailModal title="Volunteer application" item={selectedVolunteer} onClose={()=>setSelectedVolunteer(null)} />}
          {selectedSponsor && <SubmissionDetailModal title="Sponsor enquiry" item={selectedSponsor} onClose={()=>setSelectedSponsor(null)} />}
          {galleryEditor && <GalleryEditor value={galleryEditor} onChange={setGalleryEditor} onSave={saveGalleryEditor} onCancel={()=>setGalleryEditor(null)} saving={gallerySaving} onError={setNotice} />}

          {section === "settings" && (
            <SectionTitle eyebrow="Account" title="Settings" description="Admin account preferences, security and future integrations will live here." />
          )}
        </div>
      </div>
    </main>
  );
}

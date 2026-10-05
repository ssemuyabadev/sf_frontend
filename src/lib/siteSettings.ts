import { gql, queries } from "./api";

export type SiteSettings = {
  phone: string;
  secondaryPhone: string;
  email: string;
  location: string;
  facebook: string;
  instagram: string;
  x: string;
  linkedin: string;
  youtube: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: "+256 705 283 679",
  secondaryPhone: "+256 789 395 815",
  email: "info@ssemuyabafoundation.org",
  location: "Naama Village, Mityana, Uganda",
  facebook: "",
  instagram: "",
  x: "",
  linkedin: "",
  youtube: "",
};

export function normalizeSiteSettings(value: any): SiteSettings {
  return {
    phone: value?.phone || DEFAULT_SITE_SETTINGS.phone,
    secondaryPhone: value?.secondaryPhone || "",
    email: value?.email || DEFAULT_SITE_SETTINGS.email,
    location: value?.location || DEFAULT_SITE_SETTINGS.location,
    facebook: value?.facebook || "",
    instagram: value?.instagram || "",
    x: value?.x || "",
    linkedin: value?.linkedin || "",
    youtube: value?.youtube || "",
  };
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const result = await gql<{ siteSettings: any }>(queries.settings);
  return normalizeSiteSettings(result.siteSettings);
}

export function phoneHref(phone: string) {
  return "tel:" + phone.replace(/[^+\\d]/g, "");
}

export function whatsappHref(phone: string, message?: string) {
  const digits = phone.replace(/\\D/g, "");
  const base = "https://wa.me/" + digits;
  return message ? base + "?text=" + encodeURIComponent(message) : base;
}

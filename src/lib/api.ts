const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql";

export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ query, variables }) });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) throw new Error(payload.errors?.[0]?.message || "Request failed");
  return payload.data as T;
}

export const queries = {
  me: `query { me { id email name } }`,
  stats: `query { dashboardStats { messages newMessages newsletter pendingNewsletter volunteers pendingVolunteers sponsors pendingSponsors gallery news } }`,
  settings: `query { siteSettings { id phone secondaryPhone email location facebook instagram x linkedin youtube whatsapp } }`,
  donationMethods: `query { donationMethods { id key name eyebrow detailsJson note updatedAt } }`,
  adminDonationMethods: `query { adminDonationMethods { id key name eyebrow detailsJson note updatedAt } }`,
  donationMethods: `query { donationMethods { id key name eyebrow detailsJson note updatedAt } }`,
  adminDonationMethods: `query { adminDonationMethods { id key name eyebrow detailsJson note updatedAt } }`,
  messages: `query { contactMessages { id name email phone subject message status createdAt } }`,
  subscribers: `query { newsletterSubscribers { id email status createdAt updatedAt } }`,
  volunteers: `query { volunteerApplications { id name email phone interest availability message status createdAt updatedAt } }`,
  sponsors: `query { sponsorEnquiries { id fullName email phone country city preferredContact sponsorshipPreference message consent status createdAt updatedAt } }`,
  gallery: `query { adminGallery { id title imageUrl description category published createdAt } }`,
  news: `query { adminNews { id title slug category excerpt body imageUrl published publishedAt createdAt updatedAt } }`,
  publicGallery: `query { gallery(publishedOnly: true) { id title imageUrl description category } }`,
  publicNews: `query { news(publishedOnly: true) { id title slug category excerpt body imageUrl publishedAt } }`,
};

export const mutations = {
  login: `mutation($email:String!,$password:String!){ login(email:$email,password:$password){ admin { id email name } } }`,
  logout: `mutation { logout }`,
  updateSettings: `mutation($input:SettingsInput!){ updateSiteSettings(input:$input){ id phone secondaryPhone email location facebook instagram x linkedin youtube whatsapp } }`,
  updateDonationMethod: `mutation($id:String!,$input:DonationMethodInput!){ updateDonationMethod(id:$id,input:$input){ id key name eyebrow detailsJson note updatedAt } }`,
  updateDonationMethod: `mutation($id:String!,$input:DonationMethodInput!){ updateDonationMethod(id:$id,input:$input){ id key name eyebrow detailsJson note updatedAt } }`,
  updateMessageStatus: `mutation($id:String!,$status:String!){ updateContactStatus(id:$id,status:$status){ id status } }`,
  updateVolunteerStatus: `mutation($id:String!,$status:String!){ updateVolunteerStatus(id:$id,status:$status){ id status } }`,
  updateNewsletterStatus: `mutation($id:String!,$status:String!){ updateNewsletterStatus(id:$id,status:$status){ id email status updatedAt } }`,
  updateSponsorStatus: `mutation($id:String!,$status:String!){ updateSponsorStatus(id:$id,status:$status){ id status updatedAt } }`,
  createGallery: `mutation($input:GalleryInput!){ createGallery(input:$input){ id title imageUrl description category published createdAt } }`,
  updateGallery: `mutation($id:String!,$input:GalleryInput!){ updateGallery(id:$id,input:$input){ id title imageUrl description category published createdAt } }`,
  deleteGallery: `mutation($id:String!){ deleteGallery(id:$id) }`,
  createNews: `mutation($input:NewsInput!){ createNews(input:$input){ id title slug category excerpt body imageUrl published publishedAt createdAt updatedAt } }`,
  updateNews: `mutation($id:String!,$input:NewsInput!){ updateNews(id:$id,input:$input){ id title slug category excerpt body imageUrl published publishedAt createdAt updatedAt } }`,
  deleteNews: `mutation($id:String!){ deleteNews(id:$id) }`,
  contact: `mutation($input:ContactInput!){ submitContact(input:$input){ id } }`,
  volunteer: `mutation($input:VolunteerInput!){ submitVolunteer(input:$input){ id } }`,
  sponsor: `mutation($input:SponsorInput!){ submitSponsor(input:$input){ id } }`,
  newsletter: `mutation($email:String!){ subscribeNewsletter(email:$email){ id email } }`,
};

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

type VolunteerPayload = {
  name: string;
  email?: string;
  phone: string;
  interest: string;
  availability?: string;
  message?: string;
};

type SponsorPayload = {
  fullName: string;
  email?: string;
  phone: string;
  country?: string;
  city?: string;
  preferredContact?: string;
  sponsorshipPreference?: string;
  message?: string;
  consent: boolean;
};

export async function submitContact(input: ContactPayload) {
  return gql<{ submitContact: { id: string } }>(mutations.contact, { input });
}

export async function submitVolunteer(input: VolunteerPayload) {
  return gql<{ submitVolunteer: { id: string } }>(mutations.volunteer, { input });
}

export async function submitSponsor(input: SponsorPayload) {
  return gql<{ submitSponsor: { id: string } }>(mutations.sponsor, { input });
}

export async function subscribeNewsletter(email: string) {
  return gql<{ subscribeNewsletter: { id: string; email: string } }>(mutations.newsletter, { email });
}

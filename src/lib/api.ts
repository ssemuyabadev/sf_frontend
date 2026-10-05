const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql";

export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ query, variables }) });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) throw new Error(payload.errors?.[0]?.message || "Request failed");
  return payload.data as T;
}

export const queries = {
  me: `query { me { id email name } }`,
  stats: `query { dashboardStats { messages newsletter volunteers sponsors gallery news } }`,
  settings: `query { siteSettings { id phone secondaryPhone email location facebook instagram x linkedin youtube } }`,
  messages: `query { contactMessages { id name email phone subject message status createdAt } }`,
  subscribers: `query { newsletterSubscribers { id email createdAt } }`,
  volunteers: `query { volunteerApplications { id name email phone interest availability message status createdAt } }`,
  sponsors: `query { sponsorEnquiries { id fullName email phone country city preferredContact sponsorshipPreference message consent createdAt } }`,
  gallery: `query { adminGallery { id title imageUrl description category published createdAt } }`,
  news: `query { adminNews { id title slug excerpt body imageUrl published publishedAt createdAt } }`,
  publicGallery: `query { gallery(publishedOnly: true) { id title imageUrl description category } }`,
  publicNews: `query { news(publishedOnly: true) { id title slug excerpt body imageUrl publishedAt } }`,
};

export const mutations = {
  login: `mutation($email:String!,$password:String!){ login(email:$email,password:$password){ admin { id email name } } }`,
  logout: `mutation { logout }`,
  updateSettings: `mutation($input:SettingsInput!){ updateSiteSettings(input:$input){ id phone secondaryPhone email location facebook instagram x linkedin youtube } }`,
  updateMessageStatus: `mutation($id:String!,$status:String!){ updateContactStatus(id:$id,status:$status){ id status } }`,
  updateVolunteerStatus: `mutation($id:String!,$status:String!){ updateVolunteerStatus(id:$id,status:$status){ id status } }`,
  createGallery: `mutation($input:GalleryInput!){ createGallery(input:$input){ id title imageUrl description category published createdAt } }`,
  updateGallery: `mutation($id:String!,$input:GalleryInput!){ updateGallery(id:$id,input:$input){ id title imageUrl description category published createdAt } }`,
  deleteGallery: `mutation($id:String!){ deleteGallery(id:$id) }`,
  createNews: `mutation($input:NewsInput!){ createNews(input:$input){ id title slug excerpt body imageUrl published publishedAt createdAt } }`,
  updateNews: `mutation($id:String!,$input:NewsInput!){ updateNews(id:$id,input:$input){ id title slug excerpt body imageUrl published publishedAt createdAt } }`,
  deleteNews: `mutation($id:String!){ deleteNews(id:$id) }`,
  contact: `mutation($input:ContactInput!){ submitContact(input:$input){ id } }`,
  volunteer: `mutation($input:VolunteerInput!){ submitVolunteer(input:$input){ id } }`,
  sponsor: `mutation($input:SponsorInput!){ submitSponsor(input:$input){ id } }`,
  newsletter: `mutation($email:String!){ subscribeNewsletter(email:$email){ id email } }`,
};
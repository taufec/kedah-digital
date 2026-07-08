// Central manifest of images extracted from the official Kedah Tech Valley Gamma deck.
// Each entry references a CDN asset uploaded via lovable-assets.

import logoAsset from "@/assets/gamma/logo.png.asset.json";
import pptdkAsset from "@/assets/gamma/pptdk.png.asset.json";
import membersAsset from "@/assets/gamma/members.jpg.asset.json";
import e1 from "@/assets/gamma/event1.jpg.asset.json";
import e2 from "@/assets/gamma/event2.jpg.asset.json";
import e3 from "@/assets/gamma/event3.jpg.asset.json";
import e4 from "@/assets/gamma/event4.jpg.asset.json";
import e5 from "@/assets/gamma/event5.jpg.asset.json";
import e6 from "@/assets/gamma/event6.jpg.asset.json";
import e7 from "@/assets/gamma/event7.jpg.asset.json";
import e8 from "@/assets/gamma/event8.jpg.asset.json";
import e9 from "@/assets/gamma/event9.jpg.asset.json";
import e10 from "@/assets/gamma/event10.jpg.asset.json";
import e11 from "@/assets/gamma/event11.jpg.asset.json";
import e12 from "@/assets/gamma/event12.jpg.asset.json";

export const gamma = {
  logo: logoAsset.url,
  pptdk: pptdkAsset.url,
  members: membersAsset.url,
  events: [e1.url, e2.url, e3.url, e4.url, e5.url, e6.url, e7.url, e8.url, e9.url, e10.url, e11.url, e12.url],
};

export const storyImages = [gamma.members, gamma.events[0], gamma.events[2], gamma.events[7]];

export const galleryFeatured = gamma.members;
export const gallerySecondary = [
  { src: gamma.events[0], caption: "Komuniti Teknologi Digital Kedah" },
  { src: gamma.events[2], caption: "Industri × Akademia × Kerajaan" },
  { src: gamma.events[7], caption: "Driving Kedah's Digital Future" },
  { src: gamma.events[4], caption: "Sokongan Jaringan Komuniti & Agensi" },
];

export const marqueeImages = gamma.events.slice(0, 10);

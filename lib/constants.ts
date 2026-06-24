export type Event = {
  title: string;
  slug: string;
  image: string; // path under public/, e.g. /images/event1.png
  location: string;
  date: string; // human-readable or ISO date
  time: string; // displayable time range
  description?: string;
};

export const events: Event[] = [
  {
    title: "React Summit 2026",
    slug: "react-summit-2026",
    image: "/images/event1.png",
    location: "Amsterdam, Netherlands",
    date: "2026-10-14",
    time: "09:00 - 17:00",
    description: "A large community conference covering the React ecosystem, performance, and best practices."
  },
  {
    title: "JSConf EU 2026",
    slug: "jsconf-eu-2026",
    image: "/images/event2.png",
    location: "Berlin, Germany",
    date: "2026-11-03",
    time: "10:00 - 18:00",
    description: "Independent JavaScript conference with talks from core contributors and community leaders."
  },
  {
    title: "Google I/O Extended — Local Meetup",
    slug: "google-io-extended-2026",
    image: "/images/event3.png",
    location: "San Francisco, CA, USA",
    date: "2026-05-20",
    time: "18:00 - 21:00",
    description: "Local meetup aligned with Google I/O — demos, lightning talks, and networking."
  },
  {
    title: "Hack the North 2026",
    slug: "hack-the-north-2026",
    image: "/images/event4.png",
    location: "Waterloo, ON, Canada",
    date: "2026-09-25",
    time: "18:00 (Fri) - 18:00 (Sun)",
    description: "One of Canada's largest student hackathons — teams build projects over a weekend."
  },
  {
    title: "AWS re:Inforce 2026",
    slug: "aws-reinforce-2026",
    image: "/images/event5.png",
    location: "Las Vegas, NV, USA",
    date: "2026-06-02",
    time: "09:00 - 17:30",
    description: "Cloud security conference from AWS covering best practices and new services."
  },
  {
    title: "KubeCon + CloudNativeCon 2026",
    slug: "kubecon-2026",
    image: "/images/event6.png",
    location: "Barcelona, Spain",
    date: "2026-12-01",
    time: "09:00 - 18:00",
    description: "The flagship Cloud Native Computing Foundation event — Kubernetes, observability, and more."
  },
  {
    title: "Local Dev Meetup — City Hacks",
    slug: "city-hacks-meetup",
    image: "/images/event-full.png",
    location: "Remote / Various Cities",
    date: "2026-07-08",
    time: "19:00 - 21:00",
    description: "Monthly meetup for developers to share projects, lightning talks, and community help."
  }
];

export default events;

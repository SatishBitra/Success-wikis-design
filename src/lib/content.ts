import heroFounder from "@/assets/hero-founder.jpg";
import storyFeatured from "@/assets/story-featured.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";
import videoFeatured from "@/assets/video-featured.jpg";

export const images = {
  heroFounder,
  storyFeatured,
  story1,
  story2,
  founder1,
  founder2,
  videoFeatured,
};

export type Story = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
  pullQuote: string;
};

export const categories = [
  "All",
  "Founders",
  "Innovation",
  "Tech",
  "Culture",
  "Startups",
  "Creators",
  "Education",
  "Sustainability",
];

export const stories: Story[] = [
  {
    slug: "five-thousand-and-a-table",
    category: "Founders",
    title: "She started with ₹5,000 and a table.",
    dek: "Meera Raghavan turned a single rented table into a studio employing fourteen women. This is what the first two years actually looked like.",
    author: "Meera Raghavan",
    role: "Founder, Kala Textiles",
    date: "Sep 2026",
    readTime: "8 min read",
    image: storyFeatured,
    pullQuote:
      "I didn't have a plan for year three. I had a plan for Friday, and then the Friday after that.",
    body: [
      "The first order was for eleven metres of block-printed cotton. Meera took it on a phone call, standing in a corridor, writing the measurements on the back of an electricity bill because she had nothing else to write on.",
      "What followed was not a growth curve. It was a sequence of very small decisions made under pressure: whether to buy fabric or pay rent, whether to take the order she could not fulfil, whether to tell a customer the truth about a delay.",
      "By the end of the first year she had three machines, two of them borrowed. By the end of the second she had a workshop, a waiting list, and a payroll she lay awake worrying about.",
      "The part nobody asks about, she says, is the boredom. The repetition. The thousands of identical parcels taped shut at eleven at night, long after the inspiration has worn off and only the commitment is left.",
      "Today Kala ships to four countries. Meera still writes her weekly numbers by hand, in the same kind of notebook she used in that corridor.",
    ],
  },
  {
    slug: "the-argument-that-saved-the-company",
    category: "Startups",
    title: "The argument that saved the company.",
    dek: "Two co-founders spent six months avoiding one conversation. The night they finally had it, the product changed completely.",
    author: "Dev Khanna",
    role: "Co-founder, Loophole",
    date: "Sep 2026",
    readTime: "6 min read",
    image: story1,
    pullQuote: "We were polite for six months. Polite nearly killed it.",
    body: [
      "They had built the wrong thing carefully. Every sprint shipped, every meeting ended on time, and nobody said the obvious thing out loud.",
      "The argument started over a retention chart and ended at two in the morning with half the roadmap erased from the whiteboard.",
      "What they kept was small: one feature, used by nineteen customers, that people complained about when it broke. They rebuilt the company around the complaints.",
      "Eighteen months later the thing that survived that night is the only product they sell.",
    ],
  },
  {
    slug: "eleven-parcels-a-day",
    category: "Innovation",
    title: "Eleven parcels a day, for four hundred days.",
    dek: "Before the warehouse, before the funding, there was one man, one tape gun, and a number he refused to miss.",
    author: "Arun Pillai",
    role: "Founder, Shipshape",
    date: "Aug 2026",
    readTime: "5 min read",
    image: story2,
    pullQuote: "Nobody is coming to rescue the unglamorous part. You just do it.",
    body: [
      "Arun's first metric was not revenue. It was eleven: the number of parcels he could pack, label and hand over before the last pickup of the day.",
      "He hit it on most days and missed it on about sixty. He kept a tally on the wall and did not allow himself to round up.",
      "The business that grew out of that discipline now moves several thousand parcels a day, and the wall tally is still there, framed.",
    ],
  },
  {
    slug: "quitting-the-safe-job",
    category: "Culture",
    title: "What quitting the safe job actually cost.",
    dek: "An honest accounting of the eighteen months between a resignation letter and a first paying customer.",
    author: "Lina Costa",
    role: "Founder, Field Studio",
    date: "Aug 2026",
    readTime: "7 min read",
    image: founder2,
    pullQuote: "The romance lasted about three weeks. Then it was just work.",
    body: [
      "Lina left a job she was good at to build something nobody had asked for. The first six months were research. The next six were a product she threw away.",
      "She documented the whole stretch in a public newsletter, including the months where the only number worth reporting was how much savings were left.",
      "Her first customer came from that newsletter.",
    ],
  },
  {
    slug: "building-in-a-small-town",
    category: "Tech",
    title: "Building a software company far from any tech hub.",
    dek: "No investors nearby, no talent pipeline, no meetups. He treated all three as an advantage.",
    author: "Samir Oza",
    role: "Founder, Northline",
    date: "Jul 2026",
    readTime: "9 min read",
    image: founder1,
    pullQuote: "Distance meant nobody told us what was supposed to be impossible.",
    body: [
      "Samir hired his first four engineers from a local engineering college that had never placed anyone in a product company.",
      "Being far from the noise meant slower funding and far slower hype, but also a team that stayed for years instead of months.",
      "The company is profitable and still headquartered two hundred kilometres from the nearest startup district.",
    ],
  },
  {
    slug: "the-failure-nobody-posts-about",
    category: "Founders",
    title: "The failure nobody posts about.",
    dek: "Shutting down a company with customers, staff and good intentions — and what she'd do differently.",
    author: "Priya Nair",
    role: "Former founder, Hearth",
    date: "Jul 2026",
    readTime: "10 min read",
    image: heroFounder,
    pullQuote: "Winding it down well was the hardest thing I have ever built.",
    body: [
      "There is a lot written about starting. Almost nothing about telling nine people that the thing they moved cities for is ending.",
      "Priya spent her final four months not on a pivot, but on landing everyone somewhere safe and closing accounts honestly.",
      "She calls it the best work of her career.",
    ],
  },
];

export const storyBySlug = (slug: string) => stories.find((s) => s.slug === slug);

export const behindTheStory = [
  {
    no: "01",
    stage: "The Beginning",
    note: "Where the idea actually came from — usually a frustration, rarely a flash of genius.",
    image: story1,
  },
  {
    no: "02",
    stage: "The Problem",
    note: "The thing that was broken enough for someone to risk their stability on it.",
    image: storyFeatured,
  },
  {
    no: "03",
    stage: "The Risk",
    note: "The resignation, the savings, the conversation at home that made it real.",
    image: founder2,
  },
  {
    no: "04",
    stage: "The Breakthrough",
    note: "Rarely a launch. Usually one customer who refused to leave.",
    image: story2,
  },
  {
    no: "05",
    stage: "What Happened Next",
    note: "The unglamorous years that turn a story into a business.",
    image: founder1,
  },
];

export const videos = [
  {
    id: "ep-24",
    episode: "EP. 024",
    title: "How founders actually make difficult decisions",
    guest: "Meera Raghavan",
    duration: "42:10",
    image: videoFeatured,
  },
  {
    id: "ep-23",
    episode: "EP. 023",
    title: "The first ten customers, one by one",
    guest: "Arun Pillai",
    duration: "28:04",
    image: story2,
  },
  {
    id: "ep-22",
    episode: "EP. 022",
    title: "Hiring when you can't pay market rate",
    guest: "Samir Oza",
    duration: "35:51",
    image: founder1,
  },
  {
    id: "ep-21",
    episode: "EP. 021",
    title: "What a shutdown teaches you",
    guest: "Priya Nair",
    duration: "47:33",
    image: heroFounder,
  },
];

export const founders = [
  {
    name: "Meera Raghavan",
    company: "Kala Textiles",
    category: "Founders",
    location: "Jaipur, IN",
    image: storyFeatured,
  },
  {
    name: "Samir Oza",
    company: "Northline",
    category: "Tech",
    location: "Nashik, IN",
    image: founder1,
  },
  {
    name: "Lina Costa",
    company: "Field Studio",
    category: "Creators",
    location: "Lisbon, PT",
    image: founder2,
  },
  {
    name: "Arun Pillai",
    company: "Shipshape",
    category: "Innovation",
    location: "Kochi, IN",
    image: story2,
  },
  {
    name: "Priya Nair",
    company: "Hearth",
    category: "Culture",
    location: "Bengaluru, IN",
    image: heroFounder,
  },
];

export const heroSlides = [
  {
    eyebrow: "FOUNDERS · 08 MIN",
    title: "She started with ₹5,000 and a table.",
    name: "Meera Raghavan",
    company: "Kala Textiles",
    slug: "five-thousand-and-a-table",
    image: heroFounder,
  },
  {
    eyebrow: "STARTUPS · 06 MIN",
    title: "The argument that saved the company.",
    name: "Dev Khanna",
    company: "Loophole",
    slug: "the-argument-that-saved-the-company",
    image: story1,
  },
  {
    eyebrow: "INNOVATION · 05 MIN",
    title: "Eleven parcels a day, for four hundred days.",
    name: "Arun Pillai",
    company: "Shipshape",
    slug: "eleven-parcels-a-day",
    image: story2,
  },
  {
    eyebrow: "CULTURE · 07 MIN",
    title: "What quitting the safe job actually cost.",
    name: "Lina Costa",
    company: "Field Studio",
    slug: "quitting-the-safe-job",
    image: founder2,
  },
];

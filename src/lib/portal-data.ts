import {
  Coffee,
  PenLine,
  ShoppingBag,
  Newspaper,
  Store,
  MapPin,
  Lightbulb,
  PanelsTopLeft,
  BookOpen,
  Tv,
  Music,
  Languages,
  BookA,
  ChartNoAxesCombined,
  Trophy,
  CloudSun,
  House,
} from "lucide-react";
import city from "@/assets/dhaka-skyline.jpg";
import headphones from "@/assets/headphones.jpg";
import essentials from "@/assets/essentials.jpg";
import living from "@/assets/living.jpg";
import { translate } from "@/lib/translations";
export const images = { city, headphones, essentials, living };
const names = [
  "Cafe",
  "Blog",
  "Shopping",
  "News",
  "Smart Store",
  "Map",
  "Knowledge",
  "Webtoon",
  "Series",
  "TV / Videos",
  "Music",
  "Translator",
  "Dictionary",
  "Finance",
  "Sports",
  "Weather",
  "Real Estate",
];
const slugs = [
  "cafe",
  "blog",
  "shopping",
  "news",
  "smartstore",
  "map",
  "knowledge",
  "webtoon",
  "series",
  "tv",
  "music",
  "translate",
  "dictionary",
  "finance",
  "sports",
  "weather",
  "realestate",
];
const descriptions = [
  "Community and Discussions",
  "Personal and Professional Blogging",
  "Online Shopping Marketplace",
  "News and Current Affairs",
  "Seller Marketplace and Public Stores",
  "Maps and Location Discovery",
  "Questions and Answers",
  "Digital Comics and Webtoons",
  "Novels, Books and Comics",
  "Video Streaming and Entertainment",
  "Music Discovery and Listening",
  "Language Translation",
  "Word Meanings and Definitions",
  "Financial Information and Market Insights",
  "Sports News and Updates",
  "Weather Information",
  "Property and Real Estate Listings",
];
const icons = [
  Coffee,
  PenLine,
  ShoppingBag,
  Newspaper,
  Store,
  MapPin,
  Lightbulb,
  PanelsTopLeft,
  BookOpen,
  Tv,
  Music,
  Languages,
  BookA,
  ChartNoAxesCombined,
  Trophy,
  CloudSun,
  House,
];
const groups = [
  "Community & Publishing",
  "Community & Publishing",
  "Shopping & Marketplace",
  "Information & Knowledge",
  "Shopping & Marketplace",
  "Utilities",
  "Information & Knowledge",
  "Entertainment",
  "Entertainment",
  "Entertainment",
  "Entertainment",
  "Utilities",
  "Information & Knowledge",
  "Finance & Lifestyle",
  "Finance & Lifestyle",
  "Utilities",
  "Finance & Lifestyle",
];
export const services = names.map((name, i) => ({
  name,
  slug: slugs[i] ?? "",
  description: descriptions[i] ?? "",
  icon: icons[i] ?? Coffee,
  category: groups[i] ?? "",
  url: `https://${slugs[i]}.sholok.com`,
}));
export const products = [
  {
    id: 1,
    name: "Studio Wireless Headphones",
    image: headphones,
    price: 3490,
    original: 4990,
    category: "Electronics",
    rating: 4.8,
    reviews: 128,
    discount: 30,
  },
  {
    id: 2,
    name: "Everyday Canvas Tote",
    image: essentials,
    price: 890,
    original: 1290,
    category: "Fashion",
    rating: 4.9,
    reviews: 86,
    discount: 31,
  },
  {
    id: 3,
    name: "Minimal Ceramic Mug",
    image: essentials,
    price: 650,
    original: 850,
    category: "Home & Living",
    rating: 4.7,
    reviews: 204,
    discount: 24,
  },
  {
    id: 4,
    name: "Nordic Lounge Collection",
    image: living,
    price: 12990,
    original: 16990,
    category: "Home & Living",
    rating: 4.9,
    reviews: 42,
    discount: 24,
  },
  {
    id: 5,
    name: "Comfort Sound Pro",
    image: headphones,
    price: 4290,
    original: 5990,
    category: "Electronics",
    rating: 4.8,
    reviews: 72,
    discount: 28,
  },
  {
    id: 6,
    name: "Green Living Essentials",
    image: essentials,
    price: 1490,
    original: 1990,
    category: "Home & Living",
    rating: 4.6,
    reviews: 54,
    discount: 25,
  },
];
export type Product = (typeof products)[number];
export function getProductPage(items: Product[], page: number) {
  if (!items.length) return [];
  const start = (page * 4) % items.length;
  return [...items.slice(start), ...items.slice(0, start)].slice(0, 4);
}
export const stories = [
  {
    id: 1,
    title: "A greener skyline: Dhaka’s next chapter",
    description: "New ideas, thoughtful spaces, and the people shaping a more connected city.",
    image: city,
    category: "News",
    source: "The Daily Perspective",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Small changes. A more beautiful everyday.",
    description: "Find inspiration in simple routines and thoughtfully designed essentials.",
    image: essentials,
    category: "Living",
    source: "Everyday Journal",
    time: "3 hours ago",
  },
  {
    id: 3,
    title: "The art of a home that feels like you",
    description: "Natural light, a little greenery, and space for the things that matter.",
    image: living,
    category: "Home & Lifestyle",
    source: "Living Edit",
    time: "4 hours ago",
  },
  {
    id: 4,
    title: "A quieter world, one playlist at a time",
    description: "The next generation of sound is built around your everyday moments.",
    image: headphones,
    category: "Technology",
    source: "Future Wire",
    time: "1 hour ago",
  },
  {
    id: 5,
    title: "Your weekend guide to the city",
    description: "Explore lakeside walks and a fresh perspective on familiar places.",
    image: city,
    category: "Food",
    source: "City Compass",
    time: "5 hours ago",
  },
  {
    id: 6,
    title: "Designing a slower, happier morning",
    description: "Rediscover the little rituals that make a big difference.",
    image: essentials,
    category: "Health",
    source: "Well & Good Daily",
    time: "6 hours ago",
  },
  {
    id: 7,
    title: "Stories worth making time for",
    description: "Our editors share their favorite reads for the weekend.",
    image: living,
    category: "Books",
    source: "The Reading Room",
    time: "Today",
  },
  {
    id: 8,
    title: "Creators bringing new worlds to life",
    description: "Meet the independent voices behind a new wave of visual storytelling.",
    image: city,
    category: "Webtoon",
    source: "Creative Collective",
    time: "Today",
  },
  {
    id: 9,
    title: "A thoughtful approach to everyday style",
    description: "Comfortable essentials and a lighter wardrobe.",
    image: essentials,
    category: "Fashion & Beauty",
    source: "Style Notes",
    time: "Today",
  },
  {
    id: 10,
    title: "Why green spaces make cities better",
    description: "A closer look at the science behind urban nature.",
    image: city,
    category: "Knowledge",
    source: "Open Mind",
    time: "Today",
  },
];
export const publications = [
  "THE DAILY",
  "Perspective",
  "CITY POST",
  "FutureWire",
  "the journal",
  "MORNING EDIT",
  "Open Mind",
  "The Chronicle",
  "LIVING EDIT",
  "WEEKENDER",
  "The Bulletin",
  "NEXT",
];
export const money = (value: number) => `৳${value.toLocaleString("en-US")}`;
export function searchContent(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return [
    ...services.map((s) => ({
      title: s.name,
      description: s.description,
      type: "Service",
      slug: s.slug,
    })),
    ...products.map((p) => ({
      title: p.name,
      description: p.category,
      type: "Product",
      slug: "shopping",
    })),
    ...stories.map((s) => ({
      title: s.title,
      description: s.category,
      type: "Article",
      slug: s.category === "Technology" ? "knowledge" : "blog",
    })),
  ].filter((v) =>
    `${v.title} ${v.description} ${translate(v.title, "bn")} ${translate(v.description, "bn")}`
      .toLowerCase()
      .includes(q),
  );
}

export const newsCategories = [
  "National",
  "Politics",
  "Business",
  "World",
  "Health",
  "Sports",
  "Entertainment",
  "Lifestyle",
] as const;
export type NewsCategory = (typeof newsCategories)[number];
const newsTopics: Record<NewsCategory, [string, string, string, string][]> = {
  National: [
    [
      "Preparing for floods in Bangladesh",
      "বাংলাদেশে বন্যার প্রস্তুতি",
      "Keep drinking water, essential medicines and important documents ready. Follow local evacuation instructions and avoid walking or driving through floodwater.",
      "বিশুদ্ধ পানি, জরুরি ওষুধ ও গুরুত্বপূর্ণ নথি প্রস্তুত রাখুন। স্থানীয় সরিয়ে নেওয়ার নির্দেশ মানুন এবং বন্যার পানিতে হাঁটা বা গাড়ি চালানো এড়িয়ে চলুন।",
    ],
    [
      "Checking public-service information",
      "সরকারি সেবার তথ্য যাচাই",
      "Check the issuing authority, publication date and eligibility requirements before applying for a public service. Never share a one-time password with an intermediary.",
      "আবেদনের আগে কর্তৃপক্ষ, প্রকাশের তারিখ ও যোগ্যতা যাচাই করুন। মধ্যস্থতাকারীকে একবার ব্যবহারযোগ্য পাসওয়ার্ড দেবেন না।",
    ],
    [
      "Protecting urban green spaces",
      "শহরের সবুজ স্থান রক্ষা",
      "Trees provide shade and support biodiversity. Local residents can help by protecting existing trees, keeping public spaces clean and choosing suitable native plants.",
      "গাছ ছায়া দেয় ও জীববৈচিত্র্য রক্ষা করে। বিদ্যমান গাছ রক্ষা, পরিচ্ছন্নতা ও স্থানীয় প্রজাতি রোপণ করে বাসিন্দারা অবদান রাখতে পারেন।",
    ],
    [
      "Safer journeys on busy roads",
      "ব্যস্ত সড়কে নিরাপদ যাত্রা",
      "Use designated crossings, wear a seat belt and allow extra travel time. Drivers should avoid mobile-phone use and give pedestrians space at crossings.",
      "নির্ধারিত পথ দিয়ে রাস্তা পার হন, সিটবেল্ট পরুন এবং বাড়তি সময় রাখুন। চালকদের ফোন ব্যবহার এড়িয়ে পথচারীদের জায়গা দিতে হবে।",
    ],
    [
      "Digital literacy for everyday tasks",
      "প্রতিদিনের কাজে ডিজিটাল দক্ষতা",
      "Recognising suspicious links, using unique passwords and checking information sources are essential digital skills. Keep your devices updated and back up important files.",
      "সন্দেহজনক লিংক চেনা, পৃথক পাসওয়ার্ড ব্যবহার ও তথ্যের উৎস যাচাই জরুরি দক্ষতা। ডিভাইস হালনাগাদ রাখুন ও নথির ব্যাকআপ নিন।",
    ],
  ],
  Politics: [
    [
      "Understanding how Parliament works",
      "সংসদের কাজ বোঝা",
      "Parliament debates proposed laws, approves public spending and scrutinises government activity. Reading the full text of a proposal provides more context than a headline.",
      "সংসদ প্রস্তাবিত আইন আলোচনা, ব্যয় অনুমোদন ও সরকারের কার্যক্রম পর্যালোচনা করে। শিরোনামের চেয়ে পূর্ণ প্রস্তাব বেশি তথ্য দেয়।",
    ],
    [
      "Finding reliable election information",
      "নির্ভরযোগ্য নির্বাচনী তথ্য",
      "Check election dates, registration rules and voting procedures with the responsible election authority. Recheck forwarded messages before sharing them.",
      "নির্বাচনের তারিখ, নিবন্ধন ও ভোটের নিয়ম সংশ্লিষ্ট কর্তৃপক্ষ থেকে যাচাই করুন। বার্তা শেয়ার করার আগে যাচাই করুন।",
    ],
    [
      "Reading a public budget",
      "সরকারি বাজেট পড়া",
      "A budget describes planned income and spending. Compare allocations with previous years and distinguish proposed spending from money already disbursed.",
      "বাজেটে আয় ও ব্যয়ের পরিকল্পনা থাকে। পূর্ববর্তী বছরের বরাদ্দ তুলনা করুন এবং প্রস্তাবিত ও বাস্তবে ব্যয় হওয়া অর্থ আলাদা করুন।",
    ],
    [
      "Local government and daily services",
      "স্থানীয় সরকার ও দৈনন্দিন সেবা",
      "Local authorities handle services such as waste management and neighbourhood infrastructure. Use official channels to confirm the office responsible for a request.",
      "স্থানীয় কর্তৃপক্ষ বর্জ্য ব্যবস্থাপনা ও এলাকার অবকাঠামোর কাজ করে। অনুরোধের দায়িত্বপ্রাপ্ত অফিস সরকারি মাধ্যমে যাচাই করুন।",
    ],
    [
      "Separating reporting from opinion",
      "সংবাদ ও মতামতের পার্থক্য",
      "Reporting should identify sources and distinguish verified facts from allegations. Opinion explains a viewpoint; it should not be treated as independent evidence.",
      "সংবাদে উৎস ও যাচাইকৃত তথ্যের সঙ্গে অভিযোগের পার্থক্য থাকা উচিত। মতামত একটি দৃষ্টিভঙ্গি, স্বাধীন প্রমাণ নয়।",
    ],
  ],
  Business: [
    [
      "Planning a household budget",
      "পরিবারের বাজেট পরিকল্পনা",
      "List essential expenses, compare them with income and reserve money for unexpected costs. Review recurring subscriptions and avoid borrowing for expenses you cannot sustain.",
      "জরুরি ব্যয় তালিকাভুক্ত করুন, আয়ের সঙ্গে তুলনা করুন এবং অপ্রত্যাশিত খরচের জন্য অর্থ রাখুন। নিয়মিত খরচ পর্যালোচনা করুন।",
    ],
    [
      "Comparing prices before you buy",
      "কেনার আগে দাম তুলনা",
      "Compare the total cost, including delivery and any fees. Read return conditions and check that the product specifications match what you need.",
      "ডেলিভারি ও ফিসহ মোট খরচ তুলনা করুন। ফেরতের শর্ত পড়ুন এবং পণ্যের বিবরণ যাচাই করুন।",
    ],
    [
      "What inflation means for shoppers",
      "ক্রেতাদের জন্য মূল্যস্ফীতির অর্থ",
      "Inflation measures how prices change over time across a basket of goods and services. Your household may experience different price changes depending on what you buy.",
      "মূল্যস্ফীতি পণ্য ও সেবার দাম সময়ের সঙ্গে কতটা বদলায় তা মাপে। কেনাকাটার ধরন অনুযায়ী পরিবারের অভিজ্ঞতা ভিন্ন হতে পারে।",
    ],
    [
      "Keeping records for a small business",
      "ছোট ব্যবসার হিসাব রাখা",
      "Separate business and personal spending. Keep invoices, record sales regularly and reconcile payments so cash flow and outstanding balances remain clear.",
      "ব্যবসা ও ব্যক্তিগত খরচ আলাদা রাখুন। রসিদ সংরক্ষণ, বিক্রয় নথিবদ্ধ ও লেনদেন মিলিয়ে নগদ প্রবাহ বুঝুন।",
    ],
    [
      "Understanding investment risk",
      "বিনিয়োগের ঝুঁকি বোঝা",
      "Returns are not guaranteed. Understand fees, liquidity and the possibility of loss before investing, and seek advice from a suitably qualified professional when needed.",
      "লাভ নিশ্চিত নয়। ফি, অর্থ তুলে নেওয়ার সুযোগ ও ক্ষতির সম্ভাবনা বুঝুন এবং প্রয়োজনে যোগ্য পেশাদারের পরামর্শ নিন।",
    ],
  ],
  World: [
    [
      "Reading international news with context",
      "প্রেক্ষাপটসহ আন্তর্জাতিক সংবাদ",
      "Check where an event happened, when it occurred and which sources are reporting it. Distinguish new developments from older photographs or recycled video.",
      "ঘটনার স্থান, সময় ও প্রতিবেদনের উৎস যাচাই করুন। নতুন ঘটনার সঙ্গে পুরোনো ছবি বা ভিডিও গুলিয়ে ফেলবেন না।",
    ],
    [
      "How climate change crosses borders",
      "জলবায়ু পরিবর্তনের বৈশ্বিক প্রভাব",
      "Climate change affects weather patterns, ecosystems and livelihoods. Adaptation reduces vulnerability, while reducing greenhouse-gas emissions addresses its long-term causes.",
      "জলবায়ু পরিবর্তন আবহাওয়া, বাস্তুতন্ত্র ও জীবিকায় প্রভাব ফেলে। অভিযোজন দুর্বলতা কমায় এবং নির্গমন কমানো দীর্ঘমেয়াদি কারণ মোকাবিলা করে।",
    ],
    [
      "Understanding global trade",
      "বিশ্ব বাণিজ্য বোঝা",
      "Countries exchange goods and services through international trade. Shipping costs, exchange rates and supply-chain disruptions can influence the prices paid by consumers.",
      "আন্তর্জাতিক বাণিজ্যে দেশগুলো পণ্য ও সেবা বিনিময় করে। পরিবহন ব্যয়, মুদ্রার হার ও সরবরাহের বাধা দামে প্রভাব ফেলে।",
    ],
    [
      "Travel documents worth checking",
      "ভ্রমণের নথি যাচাই",
      "Check passport validity, visa requirements and entry conditions with official authorities before booking. Requirements vary by destination and can change.",
      "বুকিংয়ের আগে পাসপোর্টের মেয়াদ, ভিসা ও প্রবেশের শর্ত সরকারি উৎসে যাচাই করুন। গন্তব্যভেদে নিয়ম আলাদা ও পরিবর্তনশীল।",
    ],
    [
      "Why source verification matters",
      "উৎস যাচাই কেন জরুরি",
      "Look for original documents, named sources and independent confirmation. A widely shared claim is not automatically accurate.",
      "মূল নথি, পরিচিত উৎস ও স্বাধীন সমর্থন খুঁজুন। বেশি শেয়ার হওয়া দাবি সবসময় সঠিক নয়।",
    ],
  ],
  Health: [
    [
      "Staying safe in hot weather",
      "গরমে সুস্থ থাকা",
      "Drink water regularly, reduce strenuous activity during the hottest hours and seek shade. Confusion or collapse in the heat requires urgent medical attention.",
      "নিয়মিত পানি পান করুন, প্রচণ্ড গরমে পরিশ্রম কমান ও ছায়ায় থাকুন। বিভ্রান্তি বা অজ্ঞান হলে জরুরি চিকিৎসা নিন।",
    ],
    [
      "Building a consistent sleep routine",
      "নিয়মিত ঘুমের অভ্যাস",
      "A regular bedtime, a quiet sleeping environment and reduced late-evening caffeine can support better sleep. Persistent sleep problems should be discussed with a clinician.",
      "নির্দিষ্ট সময়ে ঘুম, শান্ত পরিবেশ ও রাতে ক্যাফেইন কমানো ভালো ঘুমে সহায়ক। দীর্ঘস্থায়ী সমস্যা হলে চিকিৎসকের পরামর্শ নিন।",
    ],
    [
      "Food hygiene at home",
      "বাড়িতে খাদ্যের নিরাপত্তা",
      "Wash hands before handling food, separate raw and cooked ingredients and refrigerate perishable food promptly. Use safe water for preparation.",
      "খাবার ধরার আগে হাত ধুয়ে নিন, কাঁচা ও রান্না করা উপাদান আলাদা রাখুন এবং পচনশীল খাবার দ্রুত ঠান্ডায় রাখুন।",
    ],
    [
      "Making time for movement",
      "শরীরচর্চার জন্য সময়",
      "Regular physical activity supports health. Start with manageable activities and increase gradually; seek medical advice if an existing condition affects what is safe for you.",
      "নিয়মিত শারীরিক কার্যক্রম স্বাস্থ্যে সহায়ক। সহজ কাজ দিয়ে শুরু করে ধীরে বাড়ান। অসুস্থতা থাকলে চিকিৎসকের পরামর্শ নিন।",
    ],
    [
      "Checking online health advice",
      "অনলাইনের স্বাস্থ্য পরামর্শ যাচাই",
      "Check whether advice comes from a qualified source and whether it applies to your circumstances. Online information is not a substitute for individual medical care.",
      "পরামর্শ যোগ্য উৎস থেকে এসেছে কি না এবং আপনার জন্য প্রযোজ্য কি না যাচাই করুন। অনলাইন তথ্য ব্যক্তিগত চিকিৎসার বিকল্প নয়।",
    ],
  ],
  Sports: [
    [
      "Cricket formats explained",
      "ক্রিকেটের ধরন বোঝা",
      "Test, one-day and Twenty20 cricket differ in duration and innings limits. Match conditions and competition rules determine how a result is reached.",
      "টেস্ট, একদিনের ও টি-টোয়েন্টি ক্রিকেটের সময় ও ইনিংসের সীমা আলাদা। ম্যাচের শর্ত ও নিয়মে ফল নির্ধারিত হয়।",
    ],
    [
      "Reading a football league table",
      "ফুটবল পয়েন্ট তালিকা পড়া",
      "League tables show matches played, points and goal statistics. Tie-breaking rules differ by competition, so check the rules before comparing equal-point teams.",
      "তালিকায় ম্যাচ, পয়েন্ট ও গোলের পরিসংখ্যান থাকে। সমান পয়েন্টের ক্ষেত্রে প্রতিযোগিতার নিয়ম যাচাই করুন।",
    ],
    [
      "Warming up before exercise",
      "ব্যায়ামের আগে প্রস্তুতি",
      "Begin with gentle movement suited to the activity. Increase intensity gradually and stop if you experience sharp pain, dizziness or unusual discomfort.",
      "সহজ নড়াচড়া দিয়ে শুরু করুন। ধীরে তীব্রতা বাড়ান এবং তীব্র ব্যথা, মাথা ঘোরা বা অস্বস্তি হলে থামুন।",
    ],
    [
      "Supporting community sport",
      "স্থানীয় খেলাধুলায় সহায়তা",
      "Accessible playing spaces and inclusive clubs help people participate. Respect volunteers, follow safety rules and encourage fair play.",
      "সহজলভ্য মাঠ ও অন্তর্ভুক্তিমূলক ক্লাব অংশগ্রহণ বাড়ায়। স্বেচ্ছাসেবীদের সম্মান, নিরাপত্তা ও ন্যায্য খেলা বজায় রাখুন।",
    ],
    [
      "Checking fixtures and results",
      "সূচি ও ফল যাচাই",
      "Use the organiser or governing body to confirm schedules and results. Pay attention to time zones and changes caused by weather or venue conditions.",
      "আয়োজক বা নিয়ন্ত্রক সংস্থা থেকে সূচি ও ফল যাচাই করুন। সময় অঞ্চল ও আবহাওয়াজনিত পরিবর্তন খেয়াল রাখুন।",
    ],
  ],
  Entertainment: [
    [
      "Finding your next book",
      "পরবর্তী বই বাছাই",
      "Explore a genre you enjoy, read a short excerpt and compare reviews from different readers. Libraries can help you discover new authors without buying every title.",
      "পছন্দের ধরন খুঁজুন, অংশবিশেষ পড়ুন ও বিভিন্ন পাঠকের মত তুলনা করুন। গ্রন্থাগারে নতুন লেখক আবিষ্কার করতে পারেন।",
    ],
    [
      "Understanding digital comics",
      "ডিজিটাল কমিকস বোঝা",
      "Digital comics combine sequential images and text for screen reading. Support creators by reading through authorised publishers and platforms.",
      "ডিজিটাল কমিকসে ছবির ধারাবাহিকতা ও লেখা থাকে। অনুমোদিত প্রকাশক ও মাধ্যমে পড়ে স্রষ্টাদের সহায়তা করুন।",
    ],
    [
      "Listening at safer volumes",
      "নিরাপদ মাত্রায় সংগীত শোনা",
      "Keep headphone volume comfortable and take listening breaks. If your ears ring or sounds seem muffled, reduce exposure and seek professional advice if symptoms persist.",
      "হেডফোনের শব্দ আরামদায়ক রাখুন ও বিরতি নিন। কানে শব্দ বা কম শোনা হলে ব্যবহার কমিয়ে প্রয়োজনে পরামর্শ নিন।",
    ],
    [
      "Checking age ratings",
      "বয়সভিত্তিক রেটিং যাচাই",
      "Ratings and content notes help viewers make informed choices. Review both the rating and its explanation when selecting content for children.",
      "রেটিং ও বিষয়বস্তুর তথ্য সিদ্ধান্ত নিতে সহায়তা করে। শিশুদের জন্য বাছাইয়ের সময় ব্যাখ্যাসহ রেটিং দেখুন।",
    ],
    [
      "Supporting independent creators",
      "স্বাধীন স্রষ্টাদের সহায়তা",
      "Credit original creators, use authorised sources and avoid sharing pirated work. Thoughtful feedback can help artists improve and reach new audiences.",
      "মূল স্রষ্টাকে স্বীকৃতি দিন, অনুমোদিত উৎস ব্যবহার করুন ও পাইরেসি এড়িয়ে চলুন। গঠনমূলক মতামত শিল্পীদের সহায়তা করে।",
    ],
  ],
  Lifestyle: [
    [
      "Creating a calmer morning",
      "শান্ত সকালের অভ্যাস",
      "Prepare essentials the night before and leave time for breakfast and travel. A simple routine can reduce avoidable stress.",
      "আগের রাতে প্রয়োজনীয় জিনিস প্রস্তুত করুন ও নাশতা-যাত্রার সময় রাখুন। সহজ অভ্যাস অপ্রয়োজনীয় চাপ কমায়।",
    ],
    [
      "Caring for indoor plants",
      "ঘরের গাছের যত্ন",
      "Choose plants suited to available light and check soil moisture before watering. Overwatering can damage roots; containers need adequate drainage.",
      "আলো অনুযায়ী গাছ বাছুন ও পানি দেওয়ার আগে মাটি দেখুন। অতিরিক্ত পানি শিকড়ের ক্ষতি করে; পানি নিষ্কাশন জরুরি।",
    ],
    [
      "Making a small space work",
      "ছোট ঘর গোছানো",
      "Prioritise frequently used items and keep walkways clear. Flexible storage and regular decluttering can improve comfort without a major renovation.",
      "নিয়মিত ব্যবহৃত জিনিসকে অগ্রাধিকার দিন ও চলার পথ খালি রাখুন। সংরক্ষণ ও অপ্রয়োজনীয় জিনিস সরানো আরাম বাড়ায়।",
    ],
    [
      "Reducing household waste",
      "ঘরের বর্জ্য কমানো",
      "Plan purchases, use what you already have and repair usable items. Separate waste according to local collection rules where facilities are available.",
      "কেনাকাটা পরিকল্পনা, বিদ্যমান জিনিস ব্যবহার ও মেরামত করুন। স্থানীয় সংগ্রহের নিয়ম অনুযায়ী বর্জ্য আলাদা করুন।",
    ],
    [
      "Building a practical wardrobe",
      "প্রয়োজনমাফিক পোশাক",
      "Choose comfortable pieces that work together and suit your daily activities. Follow care labels so clothing lasts longer.",
      "আরামদায়ক ও দৈনন্দিন কাজের উপযোগী পোশাক বাছুন। পোশাক দীর্ঘদিন ভালো রাখতে যত্নের নির্দেশ মানুন।",
    ],
  ],
};
export const newsArticles = newsCategories.flatMap((category, categoryIndex) =>
  newsTopics[category].map(([title, titleBn, description, descriptionBn], index) => ({
    id: `${category.toLowerCase()}-${index + 1}`,
    category,
    title,
    titleBn,
    description,
    descriptionBn,
    image:
      category === "Lifestyle"
        ? index % 2
          ? living
          : essentials
        : category === "Entertainment"
          ? index % 2
            ? living
            : headphones
          : city,
    source: "SHOLOK Editorial",
  })),
);
export function getNewsArticles(category: NewsCategory) {
  return newsArticles.filter((article) => article.category === category).slice(0, 5);
}

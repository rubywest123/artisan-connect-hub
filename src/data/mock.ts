import basketAfter from "@/assets/basket-after.jpg";
import basketBefore from "@/assets/basket-before.jpg";
import pottery from "@/assets/product-pottery.jpg";
import handloom from "@/assets/product-handloom.jpg";
import wood from "@/assets/product-wood.jpg";
import hero from "@/assets/hero-artisan.jpg";

export const IMAGES = { basketAfter, basketBefore, pottery, handloom, wood, hero };

export const CRAFTS = [
  "Pottery",
  "Handloom",
  "Bamboo",
  "Woodcraft",
  "Jewellery",
  "Embroidery",
  "Paintings",
  "Metalcraft",
  "Tribal Art",
  "Home Décor",
  "Other",
] as const;

export type Craft = (typeof CRAFTS)[number];

export const LANGUAGES = [
  { code: "hi", label: "हिन्दी", english: "Hindi" },
  { code: "mr", label: "मराठी", english: "Marathi" },
  { code: "bn", label: "বাংলা", english: "Bengali" },
  { code: "ta", label: "தமிழ்", english: "Tamil" },
  { code: "te", label: "తెలుగు", english: "Telugu" },
  { code: "gu", label: "ગુજરાતી", english: "Gujarati" },
  { code: "pa", label: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { code: "en", label: "English", english: "English" },
];

export const EXPERIENCE_OPTIONS = ["0–2 years", "3–5 years", "6–10 years", "10–20 years", "20+ years"];

export const STATES = [
  "Maharashtra",
  "Rajasthan",
  "West Bengal",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "Odisha",
  "Assam",
  "Madhya Pradesh",
  "Kerala",
  "Punjab",
  "Bihar",
];

function imgFor(craft: string) {
  if (craft === "Bamboo" || craft === "Home Décor") return basketAfter;
  if (craft === "Pottery" || craft === "Metalcraft" || craft === "Jewellery") return pottery;
  if (craft === "Handloom" || craft === "Embroidery") return handloom;
  return wood;
}

export type Artisan = {
  id: string;
  name: string;
  craft: Craft;
  village: string;
  state: string;
  experience: string;
  languages: string[];
  rating: number;
  verified: boolean;
  story: string;
  products: number;
};

const artisanSeed: Array<[string, Craft, string, string, string, string]> = [
  ["Sunita Gaikwad", "Bamboo", "Wada", "Maharashtra", "14 years", "Marathi, Hindi"],
  ["Ramesh Prajapati", "Pottery", "Khurja", "Uttar Pradesh", "22 years", "Hindi"],
  ["Meera Devi", "Handloom", "Bhagalpur", "Bihar", "18 years", "Hindi, Bengali"],
  ["Anil Sahu", "Woodcraft", "Saharanpur", "Uttar Pradesh", "11 years", "Hindi"],
  ["Lakshmi Narayanan", "Metalcraft", "Thanjavur", "Tamil Nadu", "26 years", "Tamil, English"],
  ["Parvati Munda", "Tribal Art", "Khunti", "Odisha", "9 years", "Hindi, Odia"],
  ["Imran Khatri", "Embroidery", "Bhuj", "Gujarat", "16 years", "Gujarati, Hindi"],
  ["Bishnu Das", "Bamboo", "Barpeta", "Assam", "12 years", "Assamese, Hindi"],
  ["Kavita Chitrakar", "Paintings", "Pingla", "West Bengal", "20 years", "Bengali"],
  ["Harjeet Singh", "Jewellery", "Amritsar", "Punjab", "8 years", "Punjabi, Hindi"],
  ["Ravi Bhil", "Tribal Art", "Jhabua", "Madhya Pradesh", "13 years", "Hindi"],
  ["Sarita Meena", "Pottery", "Alwar", "Rajasthan", "7 years", "Hindi"],
  ["Thomas Varghese", "Woodcraft", "Aranmula", "Kerala", "24 years", "Malayalam, English"],
  ["Nirmala Patra", "Handloom", "Sambalpur", "Odisha", "19 years", "Odia, Hindi"],
  ["Farida Begum", "Embroidery", "Lucknow", "Uttar Pradesh", "15 years", "Hindi, Urdu"],
];

export const ARTISANS: Artisan[] = artisanSeed.map(([name, craft, village, state, experience, langs], i) => ({
  id: `a${i + 1}`,
  name,
  craft,
  village,
  state,
  experience,
  languages: langs.split(", "),
  rating: Number((4.3 + ((i * 7) % 6) / 10).toFixed(1)),
  verified: i % 4 !== 3,
  story: `${name.split(" ")[0]} learnt ${craft.toLowerCase()} from family elders in ${village}. Every piece is finished by hand using techniques passed down for generations, and the workshop now supports ${3 + (i % 7)} families in the village.`,
  products: 3 + (i % 9),
}));

export type Product = {
  id: string;
  title: string;
  craft: Craft;
  artisanId: string;
  price: number;
  wholesale: number;
  rating: number;
  reviews: number;
  materials: string;
  image: string;
  location: string;
  wholesaleAvailable: boolean;
  customizable: boolean;
  views: number;
  orders: number;
  trending?: boolean;
};

const productSeed: Array<[string, Craft, number, string]> = [
  ["Handwoven Bamboo Fruit Basket", "Bamboo", 899, "Bamboo cane, natural finish"],
  ["Bamboo Storage Basket Set of 3", "Bamboo", 1650, "Bamboo cane"],
  ["Bamboo Table Lamp Shade", "Bamboo", 1250, "Bamboo strips, cotton lining"],
  ["Blue Pottery Flower Vase", "Pottery", 1450, "Quartz clay, glaze"],
  ["Terracotta Water Jug", "Pottery", 640, "River clay"],
  ["Khurja Ceramic Dinner Set", "Pottery", 3200, "Ceramic"],
  ["Sambalpuri Ikat Cotton Saree", "Handloom", 4200, "Handspun cotton"],
  ["Bhagalpuri Silk Stole", "Handloom", 1850, "Tussar silk"],
  ["Handloom Cotton Cushion Covers", "Handloom", 950, "Cotton"],
  ["Carved Rosewood Elephant", "Woodcraft", 2100, "Rosewood"],
  ["Sheesham Wood Serving Tray", "Woodcraft", 1350, "Sheesham wood"],
  ["Wooden Spice Box (Masala Dabba)", "Woodcraft", 1100, "Mango wood"],
  ["Silver Filigree Jhumka", "Jewellery", 2400, "925 silver"],
  ["Tribal Brass Neckpiece", "Jewellery", 1750, "Dhokra brass"],
  ["Meenakari Bangle Pair", "Jewellery", 1980, "Brass, enamel"],
  ["Kutch Mirror Work Wall Hanging", "Embroidery", 1550, "Cotton, mirror, thread"],
  ["Chikankari Kurta Fabric", "Embroidery", 2650, "Mulmul cotton"],
  ["Phulkari Dupatta", "Embroidery", 2250, "Chinon, silk floss"],
  ["Madhubani Fish Painting", "Paintings", 1900, "Handmade paper, natural dye"],
  ["Pattachitra Krishna Scroll", "Paintings", 3400, "Cloth canvas, natural colours"],
  ["Warli Village Canvas", "Paintings", 1450, "Canvas, rice paste"],
  ["Dhokra Brass Tribal Horse", "Metalcraft", 2850, "Bell metal"],
  ["Thanjavur Brass Plate", "Metalcraft", 3600, "Brass, copper"],
  ["Hammered Copper Bottle", "Metalcraft", 1290, "Copper"],
  ["Gond Art Tree of Life", "Tribal Art", 2100, "Canvas, acrylic"],
  ["Bhil Dot Art Panel", "Tribal Art", 1680, "Wood panel"],
  ["Jute Floor Runner", "Home Décor", 1420, "Natural jute"],
  ["Terracotta Wall Plates Set", "Home Décor", 1750, "Terracotta"],
  ["Cane Planter Basket", "Home Décor", 990, "Cane"],
  ["Banana Fibre Table Mat Set", "Home Décor", 780, "Banana fibre"],
];

export const PRODUCTS: Product[] = productSeed.map(([title, craft, price, materials], i) => {
  const artisan = ARTISANS[i % ARTISANS.length]!;
  return {
    id: `p${i + 1}`,
    title,
    craft,
    artisanId: artisan.id,
    price,
    wholesale: Math.round(price * 0.72),
    rating: Number((4.1 + ((i * 3) % 9) / 10).toFixed(1)),
    reviews: 8 + ((i * 13) % 120),
    materials,
    image: imgFor(craft),
    location: `${artisan.village}, ${artisan.state}`,
    wholesaleAvailable: i % 3 !== 2,
    customizable: i % 2 === 0,
    views: 120 + ((i * 97) % 1800),
    orders: 2 + ((i * 7) % 34),
    trending: i % 7 === 0,
  };
});

export function artisanOf(product: Product) {
  return ARTISANS.find((a) => a.id === product.artisanId) ?? ARTISANS[0]!;
}

export type Buyer = {
  id: string;
  name: string;
  type: string;
  location: string;
  demand: string;
  quantity: string;
  budget: string;
  match: number;
  reasons: string[];
  note: string;
};

export const BUYERS: Buyer[] = [
  {
    id: "b1",
    name: "Heritage Home Stores",
    type: "Retailer",
    location: "Pune, Maharashtra",
    demand: "Bamboo baskets & storage",
    quantity: "500 units",
    budget: "₹600–₹800 / unit",
    match: 94,
    reasons: ["Craft category: Bamboo", "Price range fits ₹640–₹899", "Quantity within your capacity", "Located 82 km away", "Product type: home storage"],
    note: "Growing chain of 14 lifestyle stores sourcing handmade home storage for their festive collection.",
  },
  {
    id: "b2",
    name: "Taj Leaf Resorts",
    type: "Hotel",
    location: "Lonavala, Maharashtra",
    demand: "Room décor baskets, planters",
    quantity: "320 units",
    budget: "₹700–₹1,100 / unit",
    match: 89,
    reasons: ["Craft category: Bamboo & Home Décor", "Premium price band", "Repeat annual order", "Same state — low freight"],
    note: "Refurbishing 160 rooms with sustainable Indian handmade décor.",
  },
  {
    id: "b3",
    name: "Anaha Interiors LLP",
    type: "Interior Designer",
    location: "Bengaluru, Karnataka",
    demand: "Custom cane & jute pieces",
    quantity: "80–150 units",
    budget: "₹900–₹2,400 / unit",
    match: 86,
    reasons: ["Customisation offered", "High margin project work", "Craft category matches", "Flexible timeline"],
    note: "Boutique studio doing villa projects; values artisan stories in client decks.",
  },
  {
    id: "b4",
    name: "GiftKarma Corporate",
    type: "Corporate Gifting",
    location: "Gurugram, Haryana",
    demand: "Diwali gift hampers",
    quantity: "1,200 units",
    budget: "₹450–₹700 / unit",
    match: 83,
    reasons: ["Bulk pricing available", "Handmade certification preferred", "Delivery window 8 weeks"],
    note: "Assembling 1,200 employee hampers with 3 handmade items each.",
  },
  {
    id: "b5",
    name: "Sattva Wholesale Mart",
    type: "Wholesaler",
    location: "Nagpur, Maharashtra",
    demand: "Mixed craft assortment",
    quantity: "2,000+ units",
    budget: "₹300–₹550 / unit",
    match: 78,
    reasons: ["Very high volume", "Same state logistics", "Lower price band than your retail"],
    note: "Supplies 200+ small retailers across Vidarbha.",
  },
  {
    id: "b6",
    name: "Namaste Exports Pvt Ltd",
    type: "Exporter",
    location: "Mumbai, Maharashtra",
    demand: "Eco storage for EU buyers",
    quantity: "1,500 units / quarter",
    budget: "₹550–₹900 / unit",
    match: 81,
    reasons: ["Sustainable material required", "Consistent quarterly demand", "Export documentation supported"],
    note: "Ships to Germany and Netherlands; needs consistent sizing.",
  },
  {
    id: "b7",
    name: "Spice Route Restaurants",
    type: "Restaurant",
    location: "Hyderabad, Telangana",
    demand: "Serving baskets & trays",
    quantity: "260 units",
    budget: "₹380–₹620 / unit",
    match: 74,
    reasons: ["Food-safe finish needed", "Repeat quarterly replacement", "Craft category matches"],
    note: "12 outlets moving away from plastic serveware.",
  },
  {
    id: "b8",
    name: "GeM — Handicrafts Tender",
    type: "Government e-Marketplace",
    location: "Pan India",
    demand: "Office décor & gifting",
    quantity: "3,000 units",
    budget: "₹400–₹750 / unit",
    match: 76,
    reasons: ["Artisan ID verification available", "Reserved category for artisans", "Bulk supply over 6 months"],
    note: "Demo listing of a public procurement style opportunity.",
  },
  {
    id: "b9",
    name: "Kalaa Bazaar Online",
    type: "Retailer",
    location: "Delhi NCR",
    demand: "Curated handmade catalogue",
    quantity: "150 units / month",
    budget: "₹700–₹1,600 / unit",
    match: 88,
    reasons: ["Needs professional catalogue photos", "Story-driven listings", "Craft category matches", "Monthly recurring"],
    note: "Marketplace that pays 20% premium for storytelling-rich listings.",
  },
  {
    id: "b10",
    name: "EcoStay Homestays Network",
    type: "Hotel",
    location: "Panaji, Goa",
    demand: "Bamboo lamps & baskets",
    quantity: "400 units",
    budget: "₹650–₹1,250 / unit",
    match: 85,
    reasons: ["Eco-material mandate", "Premium price band", "Multi-property rollout"],
    note: "Network of 38 boutique homestays standardising décor.",
  },
];

export type Opportunity = {
  id: string;
  title: string;
  org: string;
  type: string;
  closes: string;
  value: string;
  location: string;
  detail: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  { id: "o1", title: "Diwali Handmade Décor Sourcing", org: "Heritage Home Stores", type: "Retail order", closes: "12 Sep", value: "₹3.6 L", location: "Pune", detail: "500 bamboo baskets in three sizes with brand tag." },
  { id: "o2", title: "Hotel Room Décor Refresh", org: "Taj Leaf Resorts", type: "Hospitality", closes: "28 Sep", value: "₹2.8 L", location: "Lonavala", detail: "320 units of baskets and planters across 160 rooms." },
  { id: "o3", title: "Handicrafts Bulk Tender (Demo)", org: "Government e-Marketplace", type: "Public procurement", closes: "05 Oct", value: "₹18 L", location: "Pan India", detail: "Simulated GeM-style tender for artisan-made office décor." },
  { id: "o4", title: "Craft Bazaar Stall — Dilli Haat", org: "Craft Council (Demo)", type: "Exhibition", closes: "20 Sep", value: "Stall + travel", location: "New Delhi", detail: "14-day stall allotment for verified artisan clusters." },
  { id: "o5", title: "EU Eco-Storage Export Line", org: "Namaste Exports", type: "Export", closes: "30 Sep", value: "₹9 L / quarter", location: "Mumbai", detail: "Quarterly supply with standard sizing and FSC-style documentation." },
  { id: "o6", title: "Corporate Diwali Hampers", org: "GiftKarma", type: "Corporate gifting", closes: "15 Sep", value: "₹6.4 L", location: "Gurugram", detail: "1,200 hampers, three handmade items each." },
  { id: "o7", title: "Villa Project — Cane Collection", org: "Anaha Interiors", type: "Interior project", closes: "08 Oct", value: "₹2.1 L", location: "Bengaluru", detail: "Custom sizes with designer sign-off on samples." },
  { id: "o8", title: "Plastic-Free Serveware Switch", org: "Spice Route Restaurants", type: "Restaurant", closes: "22 Sep", value: "₹1.3 L", location: "Hyderabad", detail: "260 food-safe serving baskets and trays." },
  { id: "o9", title: "Monthly Curated Catalogue", org: "Kalaa Bazaar Online", type: "Marketplace", closes: "Rolling", value: "₹1.5 L / month", location: "Delhi NCR", detail: "Story-led listings refreshed monthly with new photography." },
  { id: "o10", title: "Homestay Décor Standardisation", org: "EcoStay Network", type: "Hospitality", closes: "18 Oct", value: "₹3.2 L", location: "Goa", detail: "400 units across 38 properties in two phases." },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "Heritage Home Stores viewed your catalog", time: "12 min ago", kind: "buyer" },
  { id: "n2", title: "AI found 3 new buyer matches for Bamboo", time: "1 hour ago", kind: "ai" },
  { id: "n3", title: "Your Bamboo Fruit Basket crossed 500 views", time: "3 hours ago", kind: "growth" },
  { id: "n4", title: "New bulk enquiry: 320 units from Taj Leaf Resorts", time: "5 hours ago", kind: "buyer" },
  { id: "n5", title: "Price alert: bamboo décor demand up 18% this month", time: "Yesterday", kind: "market" },
  { id: "n6", title: "Scheme deadline near: Handicraft Toolkit (Demo)", time: "Yesterday", kind: "scheme" },
  { id: "n7", title: "Order #KS-2291 marked shipped", time: "2 days ago", kind: "order" },
  { id: "n8", title: "Anaha Interiors requested a custom sample", time: "2 days ago", kind: "buyer" },
  { id: "n9", title: "AI improved 4 product photos in your catalog", time: "3 days ago", kind: "ai" },
  { id: "n10", title: "You received a 5★ review from Kalaa Bazaar", time: "4 days ago", kind: "review" },
];

export const SCHEMES = [
  { id: "s1", name: "Artisan Credit Support (Demo)", benefit: "Collateral-free working capital up to ₹2,00,000", eligibility: "Registered artisan, 2+ years of craft work", deadline: "31 Oct 2026", status: "Eligible" },
  { id: "s2", name: "Handicraft Toolkit Grant (Demo)", benefit: "Free modern toolkit worth ₹15,000", eligibility: "Artisan ID holder in notified craft cluster", deadline: "18 Sep 2026", status: "Eligible" },
  { id: "s3", name: "Craft Marketing Assistance (Demo)", benefit: "Stall + travel support for national craft bazaars", eligibility: "Minimum 3 years experience, verified profile", deadline: "05 Oct 2026", status: "Documents needed" },
  { id: "s4", name: "Design Upgradation Workshop (Demo)", benefit: "7-day design training with stipend ₹4,500", eligibility: "Artisans aged 18–55", deadline: "26 Sep 2026", status: "Eligible" },
  { id: "s5", name: "Cluster Infrastructure Support (Demo)", benefit: "Shared workshed and raw material bank", eligibility: "Group of 20+ artisans", deadline: "12 Nov 2026", status: "Apply as group" },
  { id: "s6", name: "Export Readiness Programme (Demo)", benefit: "Free export documentation guidance + buyer meets", eligibility: "Annual turnover above ₹3,00,000", deadline: "30 Nov 2026", status: "Not eligible yet" },
];

export const REVENUE_SERIES = [
  { month: "Mar", revenue: 18400, orders: 14, views: 820 },
  { month: "Apr", revenue: 22600, orders: 19, views: 1140 },
  { month: "May", revenue: 21100, orders: 17, views: 1020 },
  { month: "Jun", revenue: 28900, orders: 24, views: 1560 },
  { month: "Jul", revenue: 34200, orders: 29, views: 1980 },
  { month: "Aug", revenue: 41800, orders: 36, views: 2640 },
];

export const CATEGORY_SPLIT = [
  { name: "Bamboo", value: 42 },
  { name: "Home Décor", value: 24 },
  { name: "Pottery", value: 18 },
  { name: "Handloom", value: 16 },
];

export const BUYER_INTEREST = [
  { type: "Retailers", leads: 12 },
  { type: "Hotels", leads: 8 },
  { type: "Gifting", leads: 6 },
  { type: "Exporters", leads: 4 },
  { type: "Designers", leads: 5 },
];

export const PRICE_TREND = [
  { week: "W1", you: 780, market: 820 },
  { week: "W2", you: 800, market: 845 },
  { week: "W3", you: 830, market: 870 },
  { week: "W4", you: 899, market: 905 },
  { week: "W5", you: 899, market: 930 },
];

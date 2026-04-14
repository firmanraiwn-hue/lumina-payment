export interface Cottage {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: { id: string; en: string };
  facilities: { id: string; en: string }[];
  maxGuests: number;
  rating: number;
  reviews: number;
  location: string;
}

export const cottages: Cottage[] = [
  {
    id: "villa-aurora",
    name: "Villa Aurora",
    price: 2500000,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
    ],
    description: {
      id: "Villa modern yang menakjubkan dengan infinity pool pribadi yang menghadap ke hutan tropis yang rimbun. Sempurna untuk liburan romantis atau retret yang damai.",
      en: "A stunning modern villa with a private infinity pool overlooking the lush jungle. Perfect for a romantic getaway or a peaceful retreat."
    },
    facilities: [
      { id: "Kolam Renang Pribadi", en: "Private Pool" },
      { id: "WiFi Cepat", en: "Fast WiFi" },
      { id: "Dapur", en: "Kitchen" },
      { id: "AC", en: "Air Conditioning" },
      { id: "Smart TV", en: "Smart TV" },
      { id: "Bathtub", en: "Bathtub" }
    ],
    maxGuests: 2,
    rating: 4.9,
    reviews: 128,
    location: "Ubud, Bali"
  },
  {
    id: "sunset-cottage",
    name: "Sunset Ridge Cottage",
    price: 1800000,
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070&auto=format&fit=crop"
    ],
    description: {
      id: "Cottage kayu yang nyaman bertengger di atas bukit, menawarkan pemandangan matahari terbenam yang spektakuler di atas lautan. Rasakan alam tanpa mengorbankan kenyamanan.",
      en: "Cozy wooden cottage perched on a hill, offering spectacular sunset views over the ocean. Experience nature without sacrificing comfort."
    },
    facilities: [
      { id: "Pemandangan Laut", en: "Ocean View" },
      { id: "WiFi", en: "WiFi" },
      { id: "Dapur Mini", en: "Kitchenette" },
      { id: "AC", en: "Air Conditioning" },
      { id: "Balkon", en: "Balcony" }
    ],
    maxGuests: 4,
    rating: 4.7,
    reviews: 85,
    location: "Uluwatu, Bali"
  },
  {
    id: "bamboo-sanctuary",
    name: "Bamboo Sanctuary",
    price: 3200000,
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
    ],
    description: {
      id: "Karya arsitektur yang terbuat seluruhnya dari bambu. Benamkan diri Anda dalam kemewahan berkelanjutan dengan desain terbuka dan akses sungai pribadi.",
      en: "An architectural masterpiece made entirely of bamboo. Immerse yourself in sustainable luxury with an open-air design and private river access."
    },
    facilities: [
      { id: "Akses Sungai", en: "River Access" },
      { id: "Koki Pribadi", en: "Private Chef" },
      { id: "WiFi", en: "WiFi" },
      { id: "Ramah Lingkungan", en: "Eco-friendly" },
      { id: "Layanan Spa", en: "Spa Services" }
    ],
    maxGuests: 6,
    rating: 5.0,
    reviews: 42,
    location: "Sidemen, Bali"
  },
  {
    id: "modern-loft",
    name: "Urban Oasis Loft",
    price: 1500000,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1e5250ce07?q=80&w=1980&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
    ],
    description: {
      id: "Loft bergaya industrial-chic yang ramping di jantung distrik kreatif kota. Berjalan kaki ke kafe, galeri, dan butik terbaik.",
      en: "A sleek, industrial-chic loft in the heart of the city's creative district. Walk to the best cafes, galleries, and boutiques."
    },
    facilities: [
      { id: "Pemandangan Kota", en: "City View" },
      { id: "WiFi Cepat", en: "Fast WiFi" },
      { id: "Dapur Lengkap", en: "Full Kitchen" },
      { id: "AC", en: "Air Conditioning" },
      { id: "Ruang Kerja", en: "Workspace" }
    ],
    maxGuests: 2,
    rating: 4.8,
    reviews: 210,
    location: "Canggu, Bali"
  }
];

import {
  Cookie,
  Handbag,
  HeartHandshake,
  Icon,
  LaptopMinimal,
  ScanFace,
  Search,
  WandSparkles,
  GraduationCap,
  TvMinimal,
} from "lucide-react";

export const categories = [
  {
    name: "Fashion",
    Icon: Handbag,
  },
  {
    name: "Beauty",
    Icon: ScanFace,
  },
  {
    name: "Food",
    Icon: Cookie,
  },
  {
    name: "Creative",
    Icon: WandSparkles,
  },
  {
    name: "Tech",
    Icon: LaptopMinimal,
  },
  {
    name: "Services",
    Icon: HeartHandshake,
  },
  // {
  //   name: "Education",
  //   Icon: GraduationCap,
  // },
];

export const products = [
  {
    id: 1,
    name: "UrbanFlex dark-blue Cargo Pants",
    price: 14500,
    category: "Fashion",
    // image:
    //   "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "/mainImg.jpg",
    avgRating: 4.7,
    noOfRatings: 1058,
    noOfReview: 400,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "David John",
        actualReview:
          "Super comfortable for long studio hours and the pockets are actually useful.",
        rating: 5,
        ratingUpvotes: 19,
        ratingDownvotes: 1,
        timeAgo: 20,
      },
      {
        id: 2,
        nameOfReviewer: "Sarah Emeka",
        actualReview: "Material is thick and durable. Fits true to size.",
        rating: 4,
        ratingUpvotes: 5,
        ratingDownvotes: 0,
        timeAgo: 45,
      },
    ],
    // productDetails:
    //   "Premium cotton-blend cargo pants designed for both style and utility. Features reinforced stitching and 6 functional pockets.",
    productDetails:
      "Comfort-fit, multi-purpose cargo pants designed for students who want durability, flexibility, and style in one.",
    keyFeatures:
      "Breathable fabric, Adjustable waist straps, Water-resistant coating.",
    size: ["S", "M", "L", "XL"],
    sellerName: "TrendHUB NG",
    sellerVerified: true,
    sellerSold: 289,
    sellerRating: 4.3,
  },
  {
    id: 2,
    name: "Noise-Cancelling Study Headphones",
    price: 32000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    avgRating: 4.5,
    noOfRatings: 240,
    noOfReview: 85,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Alex T.",
        actualReview:
          "Perfect for blocking out noisy roommates during finals week.",
        rating: 5,
        ratingUpvotes: 42,
        ratingDownvotes: 2,
        timeAgo: 10,
      },
      {
        id: 2,
        nameOfReviewer: "David Dam",
        actualReview:
          "Perfect for blocking out noisy roommates during finals week.",
        rating: 5,
        ratingUpvotes: 33,
        ratingDownvotes: 5,
        timeAgo: 45,
      },
    ],
    productDetails:
      "Over-ear wireless headphones with active noise cancellation and 30-hour battery life.",
    keyFeatures: "Bluetooth 5.0, Deep Bass, Quick Charge (10 min for 3 hours).",
    size: ["One Size"],
    sellerName: "TrendHUB NG",
    sellerVerified: true,
    sellerSold: 289,
    sellerRating: 4.3,
  },
  {
    id: 3,
    name: "Compact Dorm Mini-Fridge",
    price: 85000,
    category: "Home & Appliances",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZyaWRnZXxlbnwwfHwwfHx8MA%3D%3D",
    avgRating: 4.2,
    noOfRatings: 56,
    noOfReview: 12,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Blessing W.",
        actualReview:
          "Fits perfectly under my loft bed. Keeps drinks ice cold.",
        rating: 4,
        ratingUpvotes: 8,
        ratingDownvotes: 0,
        timeAgo: 60,
      },
      {
        id: 2,
        nameOfReviewer: "David Dam",
        actualReview:
          "Perfect for blocking out noisy roommates during finals week.",
        rating: 5,
        ratingUpvotes: 33,
        ratingDownvotes: 5,
        timeAgo: 45,
      },
    ],
    productDetails:
      "45L energy-efficient mini-refrigerator with a small freezer compartment, ideal for hostel rooms.",
    keyFeatures:
      "Low noise level, Adjustable thermostat, Removable glass shelf.",
    size: ["45L", "90L"],
  },
  {
    id: 4,
    name: "Scientific Graphing Calculator",
    price: 18000,
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1648201637025-1c77b9be3013?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avgRating: 4.9,
    noOfRatings: 89,
    noOfReview: 30,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Kevin C.",
        actualReview:
          "Exactly what I needed for Engineering Math. Battery lasts forever.",
        rating: 5,
        ratingUpvotes: 12,
        ratingDownvotes: 0,
        timeAgo: 5,
      },
      {
        id: 2,
        nameOfReviewer: "David Dam",
        actualReview:
          "Perfect for blocking out noisy roommates during finals week.",
        rating: 5,
        ratingUpvotes: 33,
        ratingDownvotes: 5,
        timeAgo: 45,
      },
    ],
    productDetails:
      "Advanced graphing calculator with a high-resolution color display and rechargeable battery.",
    keyFeatures:
      "Pre-loaded Apps, USB connectivity, Python programming support.",
    size: ["Standard"],
    sellerName: "TrendHUB NG",
    sellerVerified: true,
    sellerSold: 289,
    sellerRating: 4.3,
  },
];

/**
 * Featured display data for the home page banner
 * Includes promotional banners and featured product highlights
 */
export const featuredDisplays = [
  {
    id: 1,
    title: "Campus Essentials",
    subtitle: "Everything you need for dorm life",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    backgroundColor: "from-blue-500 to-blue-600",
    textColor: "text-white",
    ctaText: "Shop Now",
    ctaLink: "/search?category=Education",
    featured: true,
  },
  {
    id: 2,
    title: "Fashion Week",
    subtitle: "Trending styles for students",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    backgroundColor: "from-purple-500 to-pink-500",
    textColor: "text-white",
    ctaText: "Explore",
    ctaLink: "/search?category=Fashion",
    featured: true,
  },
  {
    id: 3,
    title: "Tech Deals",
    subtitle: "Save on electronics this week",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    backgroundColor: "from-gray-900 to-gray-700",
    textColor: "text-white",
    ctaText: "View Deals",
    ctaLink: "/search?category=Electronics",
    featured: true,
  },
];

/**
 * Featured products - highlighted items on the home page
 * Can be used for "Staff Picks" or special promotions
 */
export const featuredProducts = [
  {
    productId: 1,
    badge: "Best Seller",
    badgeColor: "bg-orange-500",
    discount: null,
    reason: "Top rated by students",
  },
  {
    productId: 2,
    badge: "New",
    badgeColor: "bg-green-500",
    discount: null,
    reason: "Just added to Campusmart",
  },
  {
    productId: 4,
    badge: "5 Stars",
    badgeColor: "bg-yellow-500",
    discount: null,
    reason: "Highly recommended",
  },
];

/**
 * Promotional data for display sections
 */
export const promotions = [
  {
    id: 1,
    title: "Welcome Back!",
    description: "Get 10% off your first order",
    code: "WELCOME10",
    expiresAt: "2026-02-15",
    image:
      "https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    isActive: true,
  },
  {
    id: 2,
    title: "Student Verified",
    description: "Extra 5% off with student ID",
    code: "STUDENT5",
    expiresAt: "2026-03-31",
    image:
      "https://images.unsplash.com/photo-1577720643272-265f434b5c5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    isActive: true,
  },
  {
    id: 3,
    title: "Bundle Deals",
    description: "Save more when you buy together",
    code: "BUNDLE20",
    expiresAt: "2026-02-28",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    isActive: true,
  },
];

export const featuredStores = [
  {
    name: "Business Name",
    category: "Category of business",
    image: "/api/placeholder/48/48",
  },
  {
    name: "Business Name",
    category: "Category of business",
    image: "/api/placeholder/48/48",
  },
];

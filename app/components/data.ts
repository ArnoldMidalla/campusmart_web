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
    category: "Tech",
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
        nameOfReviewer: "Kemi Ade",
        actualReview:
          "Quiet enough to sleep beside. Exactly what I needed for hostel.",
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
    sellerName: "DormEssentials",
    sellerVerified: false,
    sellerSold: 41,
    sellerRating: 4.1,
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
        nameOfReviewer: "Tola Babs",
        actualReview: "Handles every formula my professor throws at us. 10/10.",
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
  {
    id: 5,
    name: "Unisex Oversized Campus Hoodie",
    price: 12000,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.6,
    noOfRatings: 312,
    noOfReview: 140,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Chidi N.",
        actualReview:
          "So soft inside. Wear it to every lecture and it still looks fresh.",
        rating: 5,
        ratingUpvotes: 28,
        ratingDownvotes: 0,
        timeAgo: 12,
      },
      {
        id: 2,
        nameOfReviewer: "Ngozi E.",
        actualReview: "True to size. The colour hasn't faded after many washes.",
        rating: 4,
        ratingUpvotes: 15,
        ratingDownvotes: 2,
        timeAgo: 30,
      },
    ],
    productDetails:
      "Heavyweight 100% cotton oversized hoodie — the go-to layer for early morning classes and late-night study sessions.",
    keyFeatures:
      "500gsm cotton, Kangaroo pocket, Ribbed cuffs and hem.",
    size: ["S", "M", "L", "XL"],
    sellerName: "Campus Threads",
    sellerVerified: true,
    sellerSold: 530,
    sellerRating: 4.7,
  },
  {
    id: 6,
    name: "Vitamin C Brightening Face Serum",
    price: 9800,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.4,
    noOfRatings: 178,
    noOfReview: 72,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Amaka O.",
        actualReview:
          "My skin glows after just two weeks. Doesn't irritate my sensitive skin.",
        rating: 5,
        ratingUpvotes: 22,
        ratingDownvotes: 1,
        timeAgo: 8,
      },
      {
        id: 2,
        nameOfReviewer: "Funmi A.",
        actualReview:
          "Lightweight and absorbs fast. Works well under sunscreen.",
        rating: 4,
        ratingUpvotes: 10,
        ratingDownvotes: 0,
        timeAgo: 20,
      },
    ],
    productDetails:
      "15% Vitamin C serum with hyaluronic acid and niacinamide for a radiant, even complexion.",
    keyFeatures:
      "Fragrance-free, Dermatologist tested, Suitable for all skin types.",
    size: ["30ml"],
    sellerName: "GlowBar NG",
    sellerVerified: true,
    sellerSold: 201,
    sellerRating: 4.5,
  },
  {
    id: 7,
    name: "Jollof Rice & Chicken Meal Pack",
    price: 2500,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.8,
    noOfRatings: 620,
    noOfReview: 310,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Emeka B.",
        actualReview:
          "Best jollof on campus — no debate. Always delivered hot.",
        rating: 5,
        ratingUpvotes: 88,
        ratingDownvotes: 2,
        timeAgo: 2,
      },
      {
        id: 2,
        nameOfReviewer: "Sade K.",
        actualReview: "Generous portion. My go-to when the cafeteria is packed.",
        rating: 5,
        ratingUpvotes: 54,
        ratingDownvotes: 0,
        timeAgo: 6,
      },
    ],
    productDetails:
      "Party-style jollof rice with a full chicken piece, coleslaw, and a chilled zobo drink. Made fresh daily on campus.",
    keyFeatures:
      "Freshly cooked, Pickup available at Ireti Bakare Complex, Contactless packaging.",
    size: ["Standard"],
    sellerName: "Mama's Kitchen",
    sellerVerified: true,
    sellerSold: 1840,
    sellerRating: 4.9,
  },
  {
    id: 8,
    name: "Custom Printed Tote Bag",
    price: 3500,
    category: "Creative",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.3,
    noOfRatings: 95,
    noOfReview: 38,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Zara M.",
        actualReview:
          "Ordered a custom design and it came out better than expected. Print is crisp.",
        rating: 5,
        ratingUpvotes: 14,
        ratingDownvotes: 0,
        timeAgo: 18,
      },
      {
        id: 2,
        nameOfReviewer: "Dami F.",
        actualReview:
          "Sturdy canvas. Fits my laptop, textbooks, and water bottle without straining.",
        rating: 4,
        ratingUpvotes: 9,
        ratingDownvotes: 1,
        timeAgo: 35,
      },
    ],
    productDetails:
      "Heavy-duty canvas tote bag with your custom design. Minimum order of 1. Ready within 48 hours on campus.",
    keyFeatures:
      "350gsm canvas, Heat-transfer print, Reinforced handles.",
    size: ["Standard"],
    sellerName: "PrintHaus",
    sellerVerified: false,
    sellerSold: 113,
    sellerRating: 4.2,
  },
  {
    id: 9,
    name: "Wireless Bluetooth Earbuds",
    price: 15500,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.4,
    noOfRatings: 430,
    noOfReview: 195,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Tobi A.",
        actualReview:
          "Fits snugly during runs. Crystal-clear call quality on both sides.",
        rating: 4,
        ratingUpvotes: 35,
        ratingDownvotes: 3,
        timeAgo: 14,
      },
      {
        id: 2,
        nameOfReviewer: "Halima S.",
        actualReview:
          "Great battery — 6 hours per charge, 24 total with the case.",
        rating: 5,
        ratingUpvotes: 41,
        ratingDownvotes: 2,
        timeAgo: 28,
      },
    ],
    productDetails:
      "True-wireless earbuds with IPX5 water resistance and Bluetooth 5.2 for a stable connection across campus.",
    keyFeatures:
      "6h + 18h battery, Touch controls, USB-C charging case.",
    size: ["One Size"],
    sellerName: "TechGadgets NG",
    sellerVerified: true,
    sellerSold: 360,
    sellerRating: 4.4,
  },
  {
    id: 10,
    name: "Hydrating Shea Butter Lip Balm Set",
    price: 2200,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1586495777744-4e6232bf0037?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.7,
    noOfRatings: 510,
    noOfReview: 240,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Precious O.",
        actualReview:
          "My lips stopped cracking within three days. These are amazing.",
        rating: 5,
        ratingUpvotes: 60,
        ratingDownvotes: 0,
        timeAgo: 4,
      },
      {
        id: 2,
        nameOfReviewer: "Chisom U.",
        actualReview:
          "Nice scents — strawberry is my favourite. Long-lasting moisture.",
        rating: 5,
        ratingUpvotes: 38,
        ratingDownvotes: 1,
        timeAgo: 16,
      },
    ],
    productDetails:
      "Set of 4 tinted shea butter lip balms in strawberry, vanilla, mango, and coconut. Handmade on campus.",
    keyFeatures:
      "100% natural ingredients, SPF 15, Handmade in small batches.",
    size: ["4-pack"],
    sellerName: "GlowBar NG",
    sellerVerified: true,
    sellerSold: 880,
    sellerRating: 4.8,
  },
  {
    id: 11,
    name: "Snack Box — Small Chops Party Pack",
    price: 6500,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.6,
    noOfRatings: 190,
    noOfReview: 88,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Bolu A.",
        actualReview:
          "Ordered for my birthday hangout — everyone kept asking where I got it from.",
        rating: 5,
        ratingUpvotes: 29,
        ratingDownvotes: 0,
        timeAgo: 10,
      },
      {
        id: 2,
        nameOfReviewer: "Rex M.",
        actualReview:
          "Crispy spring rolls, puff-puff, and samosas all in one box. Value for money.",
        rating: 4,
        ratingUpvotes: 18,
        ratingDownvotes: 1,
        timeAgo: 22,
      },
    ],
    productDetails:
      "50-piece assorted small chops: spring rolls, samosas, puff-puff, and chicken skewers. Perfect for events or study-group breaks.",
    keyFeatures:
      "Made to order, Available for same-day pickup, Halal-friendly options.",
    size: ["50 pcs"],
    sellerName: "Chops & Co.",
    sellerVerified: true,
    sellerSold: 405,
    sellerRating: 4.6,
  },
  {
    id: 12,
    name: "Laptop Stand — Foldable Aluminium",
    price: 8700,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.5,
    noOfRatings: 142,
    noOfReview: 55,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Uche P.",
        actualReview:
          "Solved my neck-pain problem during long coding sessions. Sturdy build.",
        rating: 5,
        ratingUpvotes: 22,
        ratingDownvotes: 0,
        timeAgo: 7,
      },
      {
        id: 2,
        nameOfReviewer: "Lola K.",
        actualReview:
          "Folds flat into my backpack. Adjustable angles are a bonus.",
        rating: 4,
        ratingUpvotes: 11,
        ratingDownvotes: 1,
        timeAgo: 25,
      },
    ],
    productDetails:
      "Foldable aluminium laptop stand compatible with 10–16-inch devices. Raises screen to eye-level for healthier posture.",
    keyFeatures:
      "6 height settings, Non-slip pads, Supports up to 8 kg.",
    size: ["Standard"],
    sellerName: "TechGadgets NG",
    sellerVerified: true,
    sellerSold: 178,
    sellerRating: 4.4,
  },
  {
    id: 13,
    name: "Hand-Painted Denim Jacket",
    price: 22000,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.8,
    noOfRatings: 74,
    noOfReview: 29,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Ife B.",
        actualReview:
          "One-of-a-kind piece. I get compliments every time I wear it.",
        rating: 5,
        ratingUpvotes: 31,
        ratingDownvotes: 0,
        timeAgo: 9,
      },
      {
        id: 2,
        nameOfReviewer: "Temi O.",
        actualReview:
          "The artist did a custom design for me — came out exactly as requested.",
        rating: 5,
        ratingUpvotes: 20,
        ratingDownvotes: 0,
        timeAgo: 21,
      },
    ],
    productDetails:
      "Vintage-style denim jacket hand-painted by a student artist with custom motifs. Every jacket is unique.",
    keyFeatures:
      "Custom designs available, Fabric-safe acrylic paint, Washed and sealed finish.",
    size: ["S", "M", "L", "XL"],
    sellerName: "ArtWear Studio",
    sellerVerified: false,
    sellerSold: 52,
    sellerRating: 4.8,
  },
  {
    id: 14,
    name: "Campus Laundry & Ironing Service",
    price: 3000,
    category: "Services",
    image:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.6,
    noOfRatings: 285,
    noOfReview: 130,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Yemi S.",
        actualReview:
          "Ready in 24 hours and my clothes came back neatly folded. Reliable!",
        rating: 5,
        ratingUpvotes: 44,
        ratingDownvotes: 1,
        timeAgo: 3,
      },
      {
        id: 2,
        nameOfReviewer: "Ada K.",
        actualReview:
          "Affordable. They handle delicates carefully — no shrinkage.",
        rating: 4,
        ratingUpvotes: 28,
        ratingDownvotes: 2,
        timeAgo: 11,
      },
    ],
    productDetails:
      "Drop-off laundry and ironing service for students. Wash, dry, fold, and iron — returned within 24 hours at your pickup point.",
    keyFeatures:
      "24-hr turnaround, Delicate-friendly, Scent-free option available.",
    size: ["Per bag"],
    sellerName: "CampusFresh",
    sellerVerified: true,
    sellerSold: 920,
    sellerRating: 4.7,
  },
  {
    id: 15,
    name: "Illustrated Study Planner Notebook",
    price: 4200,
    category: "Creative",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.7,
    noOfRatings: 330,
    noOfReview: 148,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Ibukun A.",
        actualReview:
          "The layout makes planning so much easier. Love the motivational quotes inside.",
        rating: 5,
        ratingUpvotes: 50,
        ratingDownvotes: 0,
        timeAgo: 6,
      },
      {
        id: 2,
        nameOfReviewer: "Folake R.",
        actualReview:
          "Great paper quality — no bleed-through even with my fountain pen.",
        rating: 5,
        ratingUpvotes: 32,
        ratingDownvotes: 1,
        timeAgo: 18,
      },
    ],
    productDetails:
      "A5 weekly study planner with habit trackers, goal sheets, and hand-drawn campus-themed illustrations. Designed by a student, for students.",
    keyFeatures:
      "120gsm cream paper, 52 weekly spreads, Lay-flat binding.",
    size: ["A5"],
    sellerName: "InkDrop Creatives",
    sellerVerified: false,
    sellerSold: 415,
    sellerRating: 4.7,
  },
  {
    id: 16,
    name: "Portable Phone Power Bank 20000mAh",
    price: 13500,
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.5,
    noOfRatings: 508,
    noOfReview: 220,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Femi O.",
        actualReview:
          "Charged my phone four times on a full-day excursion. Worth every naira.",
        rating: 5,
        ratingUpvotes: 67,
        ratingDownvotes: 2,
        timeAgo: 5,
      },
      {
        id: 2,
        nameOfReviewer: "Nkechi U.",
        actualReview:
          "Slim enough to slip into my bag. Fast charging on both input and output.",
        rating: 4,
        ratingUpvotes: 38,
        ratingDownvotes: 3,
        timeAgo: 19,
      },
    ],
    productDetails:
      "20000mAh slim power bank with dual USB-A and one USB-C port. Charges two devices simultaneously at 22.5W.",
    keyFeatures:
      "22.5W fast charge, LED indicator, Airline-safe capacity.",
    size: ["Standard"],
    sellerName: "TechGadgets NG",
    sellerVerified: true,
    sellerSold: 630,
    sellerRating: 4.4,
  },
  {
    id: 17,
    name: "Braided Protective Hairstyle Service",
    price: 8000,
    category: "Services",
    image:
      "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.9,
    noOfRatings: 162,
    noOfReview: 80,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Chiamaka O.",
        actualReview:
          "My knotless braids lasted eight weeks. Painless and neatly done.",
        rating: 5,
        ratingUpvotes: 55,
        ratingDownvotes: 0,
        timeAgo: 4,
      },
      {
        id: 2,
        nameOfReviewer: "Teni L.",
        actualReview:
          "She works in the hostel so no transport stress. Highly recommend.",
        rating: 5,
        ratingUpvotes: 40,
        ratingDownvotes: 0,
        timeAgo: 12,
      },
    ],
    productDetails:
      "On-campus braiding service — knotless braids, box braids, and feed-in cornrows. Sessions held at student accommodation.",
    keyFeatures:
      "In-hostel service, Extensions included, Wash & condition before styling.",
    size: ["Standard"],
    sellerName: "BraidsByTeni",
    sellerVerified: false,
    sellerSold: 224,
    sellerRating: 4.9,
  },
  {
    id: 18,
    name: "Resin Art Phone Case (Custom)",
    price: 5500,
    category: "Creative",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.6,
    noOfRatings: 210,
    noOfReview: 95,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Joy A.",
        actualReview:
          "So unique — no one else has the same case. Flowers are perfectly preserved.",
        rating: 5,
        ratingUpvotes: 36,
        ratingDownvotes: 1,
        timeAgo: 8,
      },
      {
        id: 2,
        nameOfReviewer: "Mirabel T.",
        actualReview:
          "Ordered a galaxy theme and it's absolutely stunning. Good drop protection too.",
        rating: 4,
        ratingUpvotes: 20,
        ratingDownvotes: 0,
        timeAgo: 30,
      },
    ],
    productDetails:
      "Handmade resin phone case with preserved dried flowers, glitter, or custom designs. Compatible with most iPhone and Samsung models.",
    keyFeatures:
      "3–5 day turnaround, Shockproof TPU base, Custom colour options.",
    size: ["iPhone 13", "iPhone 14", "Samsung S22", "Samsung S23"],
    sellerName: "ResinRoyals",
    sellerVerified: false,
    sellerSold: 175,
    sellerRating: 4.6,
  },
  {
    id: 19,
    name: "Matcha Green Tea Skincare Kit",
    price: 7200,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.3,
    noOfRatings: 98,
    noOfReview: 44,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Adaeze N.",
        actualReview:
          "The face mask cleared my stress-breakouts in one week. Love this kit.",
        rating: 5,
        ratingUpvotes: 18,
        ratingDownvotes: 1,
        timeAgo: 15,
      },
      {
        id: 2,
        nameOfReviewer: "Sandra C.",
        actualReview:
          "Travel-size packaging is perfect for hostel life. Smells amazing too.",
        rating: 4,
        ratingUpvotes: 11,
        ratingDownvotes: 0,
        timeAgo: 38,
      },
    ],
    productDetails:
      "3-piece matcha-infused skincare set: cleanser, face mask, and moisturiser. Formulated for oily and combination skin common in humid climates.",
    keyFeatures:
      "Anti-oxidant rich, Oil-control formula, Cruelty-free.",
    size: ["Travel set"],
    sellerName: "GlowBar NG",
    sellerVerified: true,
    sellerSold: 155,
    sellerRating: 4.5,
  },
  {
    id: 20,
    name: "Graphic Design Tutoring (1-on-1)",
    price: 5000,
    category: "Services",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&auto=format&fit=crop&q=60",
    avgRating: 4.8,
    noOfRatings: 88,
    noOfReview: 42,
    reviews: [
      {
        id: 1,
        nameOfReviewer: "Gbenga L.",
        actualReview:
          "Went from zero Figma knowledge to designing my own portfolio in a month.",
        rating: 5,
        ratingUpvotes: 30,
        ratingDownvotes: 0,
        timeAgo: 7,
      },
      {
        id: 2,
        nameOfReviewer: "Ijeoma W.",
        actualReview:
          "Patient teacher, clear explanations. Already got a freelance gig after 3 sessions.",
        rating: 5,
        ratingUpvotes: 22,
        ratingDownvotes: 0,
        timeAgo: 20,
      },
    ],
    productDetails:
      "1-on-1 graphic design tutoring covering Figma, Canva, Adobe Illustrator, and branding fundamentals. Sessions held on campus or via video call.",
    keyFeatures:
      "Flexible scheduling, Beginner to advanced, Project-based learning.",
    size: ["Per session"],
    sellerName: "DesignMentor",
    sellerVerified: true,
    sellerSold: 110,
    sellerRating: 4.8,
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
    productId: 7,
    badge: "Hot Pick",
    badgeColor: "bg-red-500",
    discount: null,
    reason: "Most ordered on campus",
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
    expiresAt: "2026-06-15",
    image:
      "https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    isActive: true,
  },
  {
    id: 2,
    title: "Student Verified",
    description: "Extra 5% off with student ID",
    code: "STUDENT5",
    expiresAt: "2026-07-31",
    image:
      "https://images.unsplash.com/photo-1577720643272-265f434b5c5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    isActive: true,
  },
  {
    id: 3,
    title: "Bundle Deals",
    description: "Save more when you buy together",
    code: "BUNDLE20",
    expiresAt: "2026-06-28",
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
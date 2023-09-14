

export const categoryData = [
  {
    id: 1,
    name: "politic",
    url: "/politic",
    subcategory: [
      { name: "national", url: "/politic/national" },
      { name: "international", url: "/politic/international" },
    ],
  },
  {
    id: 2,
    name: "economic",
    url: "/economic",
    subcategory: [
      { name: "national", url: "/economic/national" },
      { name: "international", url: "/economic/international" },
    ],
  },
  {
    id: 3,
    name: "culture",
    url: "/culture",
    subcategory: [
      { name: "videogame", url: "/culture/videogame" },
      { name: "music", url: "/culture/music" },
      { name: "series", url: "/culture/series" },
    ],
  },
  {
    id: 4,
    name: "sport",
    url: "/sport",
    subcategory: [
      { name: "football", url: "/sport/football" },
      { name: "basketball", url: "/sport/basketball" },
      { name: "tennis", url: "/sport/tennis" },
      { name: "combat", url: "/sport/combat" },
      { name: "rugby", url: "/sport/rugby" },
    ],
  },
  {
    id: 5,
    name: "ecologie",
    url: "/ecologie",
    subcategory: [
      { name: "national", url: "/ecologie/national" },
      { name: "international", url: "/ecologie/international" },
    ],
  },
];


export const subscriptionData = [
  {
    id: 0,
    title: "1 month subscription",
    price: 1,
    pricePerMonth: 1,
    bgColor: "bg-blue-50"
  },
  {
    id: 1,
    title: "6 month subscription",
    price: 4,
    pricePerMonth: 0.66,
    bgColor: "bg-blue-100"
  },
  {
    id: 2,
    title: "1 year subscription",
    price: 6,
    pricePerMonth: 0.5,
    bgColor: "bg-blue-200"
  },
]
/**
 * Brand & Navigation Constants for Zuccano Ecosystem
 */

export const BRAND_NAME = "Zuccano";

export const PORTALS = {
  PARENT: {
    id: "parent",
    name: "Zuccano Group",
    tagline: "Corporate & Ecosystem",
    path: "/",
    color: "#6366f1"
  },
  CUSTOMERS: {
    id: "customers",
    name: "Zuccano for Customers",
    tagline: "Lifestyle, App & Rewards",
    path: "/customers",
    color: "#06b6d4"
  },
  BUSINESS: {
    id: "business",
    name: "Zuccano for Business",
    tagline: "Enterprise & Commerce Infrastructure",
    path: "/business",
    color: "#f59e0b"
  }
};

export const NAV_LINKS = {
  parent: [
    { label: "About Group", path: "/#about" },
    { label: "Ecosystem", path: "/#ecosystem" },
    { label: "Vision", path: "/#vision" },
    { label: "Leadership", path: "/#leadership" },
    { label: "Careers", path: "/#careers" }
  ],
  customers: [
    { label: "Features", path: "/customers#features" },
    { label: "Benefits", path: "/customers#benefits" },
    { label: "App Experience", path: "/customers#app" },
    { label: "Testimonials", path: "/customers#reviews" },
    { label: "FAQ", path: "/customers#faq" }
  ],
  business: [
    { label: "Solutions", path: "/business#solutions" },
    { label: "Enterprise Scale", path: "/business#metrics" },
    { label: "Integrations", path: "/business#integrations" },
    { label: "Case Studies", path: "/business#case-studies" },
    { label: "Partner Portal", path: "/business#partner-form" }
  ]
};

export const SOCIAL_LINKS = [
  { platform: "Twitter / X", url: "https://twitter.com/zuccano" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/zuccano" },
  { platform: "GitHub", url: "https://github.com/zuccano" },
  { platform: "Instagram", url: "https://instagram.com/zuccano" }
];

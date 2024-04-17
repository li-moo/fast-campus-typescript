type PageOptions = "home" | "about" | "contact" | "faq";

const pageDesc: Record<PageOptions, string> = {
  home: "home",
  about: "about",
  contact: "contact",
  faq: "faq",
};

type User = "guest" | "user" | "admin";
const role: Record<User, number> = {
  admin: 0,
  user: 1,
  guest: 2,
};

import { atom } from "recoil";

export const view = atom({
  key: "view",
  default: "login",
});

export const jwt = atom({
  key: "jwt",
  default: "",
});

export const events = atom({
  key: "events",
  default: [],
});

export const loading = atom({
  key: "loading",
  default: false,
});

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de", "fr", "it", "es", "nl", "se"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export interface Lang {
  help: string;
  clogin: string;
  login: string;
  email: string;
  password: string;
  forgot: string;
  stay: string;
  sign: string;
  strato: string;
  terms: string;
  priv: string;
  imprint: string;
  lang: string;
}

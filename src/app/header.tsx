import Image from "next/image";
import logo from "../../public/stratoLogoWeiss.svg";
import { Lang } from "../../i18n.config";
import { type Dispatch, SetStateAction } from "react";
import { i18n } from "../../i18n.config";

const langOptions = [
  { de: "Deutsch" },
  { en: "English (UK)" },
  { us: "English (US)" },
  { es: "Español" },
  { it: "Italiano" },
  { fr: "Français" },
  { nl: "Nederlands" },
  { se: "Svenska" },
];

interface Props {
  lang: Lang;
  setLangChange: Dispatch<SetStateAction<(typeof i18n.locales)[number]>>;
}

export default function Header({ lang, setLangChange }: Props) {
  const langChange = (e: any) => {
    window &&
      sessionStorage.setItem(
        "lang",
        e.target.value == "us" ? i18n.defaultLocale : e.target.value
      );
    setLangChange(e.target.value);
  };
  return (
    <header className="h-[10vh] bg-[#f80] flex text-white justify-end md:justify-between px-10 text-xs sm:text-sm">
      <Image src={logo} alt="Logo" height={27} className="hidden md:block" />

      <nav className="flex space-x-3 items-center">
        <div className="flex space-x-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#f80"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>

          <p>{lang.help}</p>
        </div>

        <div className="flex space-x-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
            />
          </svg>

          <select
            onChange={langChange}
            name=""
            id=""
            className="bg-transparent outline-none"
          >
            {langOptions.map((item, index) => {
              const val = Object.keys(item)[0];
              const text = Object.values(item)[0];

              return val == lang.lang ? (
                <option
                  key={index}
                  value={val}
                  className="text-black p-10"
                  selected
                >
                  {text}
                </option>
              ) : (
                <option key={index} value={val} className="text-black p-10">
                  {text}
                </option>
              );
            })}
          </select>
        </div>

        <button className="h-3/5 px-3 border-white border whitespace-nowrap">
          {lang.clogin}
        </button>
      </nav>
    </header>
  );
}

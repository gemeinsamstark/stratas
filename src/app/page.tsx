"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Veggies() {
  const redirect = useRouter();
  useEffect(() => {
    let clear = setTimeout(() => {
      redirect.push("/bfdvyuvbcgfdfyvdybgdfyvydsfv");
    }, 1700);

    return () => {
      clearTimeout(clear);
    };
  }, []);
  return <div className="bg-white h-screen"></div>;
}

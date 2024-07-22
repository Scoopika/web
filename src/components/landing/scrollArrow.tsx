"use client";

import { FaChevronDown } from "react-icons/fa6";

export default function ScrollArrow() {
  return (
    <FaChevronDown
      className="animate-pulse cursor-pointer"
      onClick={() => {
        const elm = document.getElementById("pricing")!;
        elm.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
}

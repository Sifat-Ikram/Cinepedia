import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="py-4 md:py-5 px-4 md:px-10 flex justify-between items-center sticky w-full text-center bg-[#04734C] top-0 left-0 z-10">
      <Link href={"/"} className="text-2xl md:text-5xl font-bold text-white">Cinepedia</Link>
      <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8">
        <Link href="/" className="text-white text-base md:text-xl font-semibold">
          Home
        </Link>
        <Link
          href="/watchlist"
          className="text-white text-base md:text-xl font-semibold"
        >
          Watchlist
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

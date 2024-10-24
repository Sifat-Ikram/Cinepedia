import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="py-5 md:px-10 flex justify-between items-center sticky w-full text-center bg-[#04734C] top-0 left-0 z-10">
      <h1 className="text-5xl font-bold text-white gap-3">Cinepedia</h1>
      <div className="flex justify-center items-center gap-3 sm:gap-8">
      <Link href="/" className="text-white text-xl font-semibold">Home</Link>
      <Link href="/watchlist" className="text-white text-xl font-semibold">Watchlist</Link>
      </div>
    </div>
  );
};

export default Navbar;

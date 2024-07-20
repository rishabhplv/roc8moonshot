"use-client";
import React from "react";
import Image from "next/image";
import cart from "../../public/cart.png";
import search from "../../public/search.png";

const Header: React.FC = () => {
  return (
    <header className="">
      <div className="flex justify-end gap-5 pl-5 pr-5 pt-3 text-xs font-normal md:pl-10 md:pr-10">
        <div>Help</div>
        <div>Orders & Returns</div>
        <div>Hi, John</div>
      </div>

      <div className="flex flex-col items-center justify-between pb-3 pl-5 pr-5 pt-3 md:flex-row md:pl-10 md:pr-10">
        <div className="text-2xl font-bold md:text-3xl">ECOMMERCE</div>
        <div className="flex gap-3 text-lg font-semibold md:gap-6">
          <div>Categories</div>
          <div>Sale</div>
          <div>Clearance</div>
          <div>New Stock</div>
          <div>Trending</div>
        </div>
        <div className="flex gap-4">
          <div>
            <Image height={19.5} width={19.5} alt="search" src={search} />
          </div>
          <div>
            <Image height={19.5} width={19.5} alt="cart" src={cart} />
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center pb-2 pt-2 text-xs font-medium"
        style={{ background: "#F4F4F4" }}
      >
        &lt; Get 10% off on business signup &gt;
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import Image from "next/image";
function Navbar() {
  return (
    <div
      style={{ zIndex: 100000 }}
      className="fixed flex items-center justify-between w-full py-4 bg-white px-14 "
    >
      <div>
        <img
          src="/assets/logo-nav.png"
          alt="Logo Karya Nusantara"
          width={150}
          height={50}
          className="z-30"
        />
      </div>
      <div>
        <ul className="flex ">
          <li className="ml-4 cursor-pointer hover:text-blue-100 ">
            Tentang Karya Nusantara
          </li>
          <li className="ml-4 cursor-pointer hover:text-blue-100 ">
            Katalog Produk
          </li>
          <li className="ml-4 cursor-pointer hover:text-blue-100">
            Request For Quotation
          </li>
          <li className="ml-4 cursor-pointer hover:text-blue-100 ">
            Klien Kami
          </li>
          <li className="ml-4 cursor-pointer hover:text-blue-100 ">
            UKM Mitra
          </li>
        </ul>
      </div>
      <div>
        <button className="ml-4 ">Masuk</button>
        <button className="p-2 ml-4 text-white bg-blue-100 ">Daftar </button>
      </div>
    </div>
  );
}

export default Navbar;

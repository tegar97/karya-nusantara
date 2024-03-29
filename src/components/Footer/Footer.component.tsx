import Link from "next/link";
import React from "react";
import { Footer } from "./Footer.styled";

function FooterComponent() {
  return (
    <footer className="w-full px-1 py-10 bg-grey-300 border-2 border-t border-b border-gray-200 lg:p-20 ">
      <div className="grid items-center grid-cols-2 justify-items-center lg:grid-cols-4 container-box">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/">
            <img
              src="/assets/logo-putih.png"
              alt="Logo Karya Nusantara"
              width={200}
              height={200}
              className="z-30 cursor-pointer"
            />
          </Link>
          <div className="flex flex-col p-0">
            <h2 className="font-bold lg:text-md text-white">
              PT. Solusi Karya Nusantara
            </h2>
            <p className="text-white mt-2">
              Head Office Gedung office 18 park lt.10
            </p>
            <span className="text-white mt-2">
              {" "}
              Jl Tb simatupang no 18 Rt 002/Rw 001
            </span>
            <span className="text-white mt-2">0812 1115 9207</span>
          </div>
        </div>
        <div>
          <span className="text-xl font-bold text-white">Fitur </span>
          <ul className="mt-3 text-white">
            <Link href="/feature">
              <li className="text-lg cursor-pointer">Cara Belanja</li>
            </Link>
            <Link href="/feature">
              <li className="text-lg cursor-pointer">Pembayaran</li>
            </Link>
          </ul>
        </div>
        <div>
          <span className="text-xl font-bold text-white">Kerja Sama </span>
          <ul className="mt-3 text-white">
            <Link href="/cooperation">
              <li className="text-lg cursor-pointer">Mitra</li>
            </Link>
            <Link href="/cooperation">
              <li className="text-lg cursor-pointer">Menjadi Klien</li>
            </Link>
          </ul>
        </div>
        <div className=" md:5 lg:mt-0 text-center  lg:text-left ">
          <span className="text-xl font-bold text-white">Kontak Kami </span>
          <ul className="mt-3 text-white">
            <li className="text-lg">Email : info@karyanusantara.co.id</li>
            <li className="text-lg">Telepon : 0812 1115 9207</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;

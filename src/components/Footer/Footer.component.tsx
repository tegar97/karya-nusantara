import Link from "next/link";
import React from "react";
import { Footer } from "./Footer.styled";

function FooterComponent() {
  return (
    <footer className="w-full px-1 py-10 border-2 border-t border-b border-gray-200 lg:p-20">
      <div className="grid items-center grid-cols-2 justify-items-center lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/">
            <img
              src="/assets/logo-nav.png"
              alt="Logo Karya Nusantara"
              width={200}
              height={300}
              className="z-30 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <span className="text-xl font-bold text-blue-100">Fitur </span>
          <ul className="mt-3">
            <Link href="/feature">
              <li className="text-lg cursor-pointer">Cara Belanja</li>
            </Link>
            <Link href="/feature">
              <li className="text-lg cursor-pointer">Pembayaran</li>
            </Link>
          </ul>
        </div>
        <div>
          <span className="text-xl font-bold text-blue-100">Kerja Sama </span>
          <ul className="mt-3">
            <Link href="/cooperation">
              <li className="text-lg cursor-pointer">Mitra</li>
            </Link>
            <Link href="/cooperation">
              <li className="text-lg cursor-pointer">Menjadi Klien</li>
            </Link>
          </ul>
        </div>
        <div className="col-span-2 mt-5 text-center lg:col-span-1 lg:text-left lg:mt-0">
          <span className="text-xl font-bold text-blue-100">Kontak Kami </span>
          <ul className="mt-3">
            <li className="text-lg">Telpon : 0812 8171 2428 (Nisa)</li>
            <li className="text-lg">Email : info@karyanusantara.co.id</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;

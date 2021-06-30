import Link from "next/link";
import React from "react";
import { Footer } from "./Footer.styled";

function FooterComponent() {
  return (
    <footer className="w-full px-1 py-10 bg-blue-100 border-2 border-t border-b border-gray-200 lg:p-20">
      <div className="grid items-center grid-cols-2 justify-items-center lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/">
            <img
              src="/assets/logo-putih.png"
              alt="Logo Karya Nusantara"
              width={200}
              height={300}
              className="z-30 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <span
            className="text-xl font-bold text-black"
            style={{ color: "rgba(167, 207, 84, 1)" }}
          >
            Fitur{" "}
          </span>
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
          <span
            className="text-xl font-bold text-black"
            style={{ color: "rgba(167, 207, 84, 1)" }}
          >
            Kerja Sama{" "}
          </span>
          <ul className="mt-3 text-white">
            <Link href="/cooperation">
              <li className="text-lg cursor-pointer">Mitra</li>
            </Link>
            <Link href="/cooperation">
              <li className="text-lg cursor-pointer">Menjadi Klien</li>
            </Link>
          </ul>
        </div>
        <div className="col-span-2 mt-5 text-center lg:col-span-1 lg:text-left lg:mt-5">
          <span
            className="text-xl font-bold text-black "
            style={{ color: "rgba(167, 207, 84, 1)" }}
          >
            Kontak Kami{" "}
          </span>
          <ul className="mt-3 text-white">
            <li className="text-lg">Telpon : 0812 8171 2428 (Nisa)</li>
            <li className="text-lg">Email : info@karyanusantara.co.id</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;

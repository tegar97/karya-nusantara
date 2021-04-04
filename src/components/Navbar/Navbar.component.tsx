import React, { useRef } from "react";
import LoginModal from "./../Login-Modal/Login-Modal.component";
import NavbarToggle from "./Navbar-toggle";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { Navigation } from "./Navbar-hamburger";
import Link from "next/link";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

function Navbar() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  return (
    <div
      style={{ zIndex: 20 }}
      className="fixed flex items-center justify-between w-full py-4 bg-white shadow-md px-14 "
    >
      <div>
        <Link href="/">
          <img
            src="/assets/logo-nav.png"
            alt="Logo Karya Nusantara"
            width={150}
            height={50}
            className="z-30"
          />
        </Link>
      </div>
      <div className="hidden lg:block">
        <ul className="flex ">
          <li className="ml-4 cursor-pointer hover:text-blue-100 ">
            Tentang Karya Nusantara
          </li>
          <li className="ml-4 cursor-pointer hover:text-blue-100 ">
            <Link href="/product">Katalog Produk</Link>
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
      <div className="hidden lg:block">
        <LoginModal />
        <button className="p-2 ml-4 text-white bg-blue-100 ">
          <Link href="/register">Daftar</Link>
        </button>
      </div>
      <div className="block lg:hidden">
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          className="nav-mobile"
        >
          <motion.div className="background" variants={sidebar} />
          <Navigation />
          <NavbarToggle toggle={() => toggleOpen()} />
        </motion.nav>
      </div>
    </div>
  );
}

export default Navbar;

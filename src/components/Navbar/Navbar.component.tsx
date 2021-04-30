import React, { useRef, useState } from "react";
import LoginModal from "./../Login-Modal/Login-Modal.component";
import NavbarToggle from "./Navbar-toggle";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import Link from "next/link";
import { useAuthState, useAuthDispatch } from "../../context/auth";
import axios from "axios";
import NavProfile from "../nav-profile/nav-profile.component";
import NavbarProfile from "../nav-profile/nav-profile.component";
import { Link as SmoothScroll, animateScroll as scroll } from "react-scroll";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
function Navbar({ menuDrop, setMenuDrop }) {
  const { authenticated, loading, user } = useAuthState();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);

  return (
    <>
      <div
        style={{ zIndex: 20 }}
        className="fixed flex items-center justify-between w-full px-5 py-4 bg-white shadow-md NavbarMenu lg:px-14"
      >
        <div>
          <Link href="/">
            <img
              src="/assets/logo-nav.png"
              alt="Logo Karya Nusantara"
              width={150}
              height={50}
              className="z-30 cursor-pointer "
            />
          </Link>
        </div>
        <div
          className="absolute flex w-full bg-white border-t border-b border-gray-300 lg:hidden"
          style={{
            left: 0,
            zIndex: 999999,
            height: "600px",

            top: active ? "80px" : "-800px",
            transition: "all .5s",
          }}
        >
          <ul className="flex flex-col items-center w-full p-5 text-left ">
            <li
              onClick={() => setActive(!active)}
              className="w-full p-3 ml-4 cursor-pointer hover:bg-blue-100 hover:text-white "
            >
              <SmoothScroll
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="about"
              >
                Tentang Karya Nusantara
              </SmoothScroll>
            </li>
            <li
              onClick={() => setActive(!active)}
              className="w-full p-3 ml-4 cursor-pointer mt-7 hover:bg-blue-100 hover:text-white "
            >
              <Link href="/product">Katalog Produk</Link>
            </li>
            <Link href="/request">
              <li
                onClick={() => setActive(!active)}
                className="w-full p-3 ml-4 cursor-pointer mt-7 hover:bg-blue-100 hover:text-white "
              >
                Request For Quotation
              </li>
            </Link>
            <li
              onClick={() => setActive(!active)}
              className="w-full p-3 ml-4 cursor-pointer mt-7 hover:bg-blue-100 hover:text-white "
            >
              <Link href="/klien"> Klien Kami</Link>
            </li>
            <li
              onClick={() => setActive(!active)}
              className="w-full p-3 ml-4 cursor-pointer mt-7 hover:bg-blue-100 hover:text-white "
            >
              <Link href="/mitra"> UKM Mitra</Link>
            </li>

            {!loading && authenticated ? (
              <div className=" lg:block">
                <NavbarProfile />
                {/* <button className="p-2 ml-4 text-white bg-blue-100 " onClick={logout}>
            Logout
          </button>
          <span>{user.Name}</span> */}
              </div>
            ) : (
              <>
                <li
                  onClick={() => setActive(!active)}
                  className="w-full p-3 ml-4 cursor-pointer mt-7 hover:bg-blue-100 hover:text-white "
                >
                  <LoginModal />
                </li>
                <Link href="/register">
                  <li
                    onClick={() => setActive(!active)}
                    className="w-full p-3 cursor-pointer mt-7 "
                  >
                    <button className="p-3 text-white bg-blue-100 ">
                      Daftar
                    </button>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
        <div className="hidden lg:block">
          <ul className="flex flex-row">
            <li className="ml-4 cursor-pointer hover:text-blue-100 ">
              <SmoothScroll
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="about"
              >
                Tentang Karya Nusantara
              </SmoothScroll>
            </li>
            <li className="ml-4 cursor-pointer hover:text-blue-100 ">
              <Link href="/product">Katalog Produk</Link>
            </li>
            <li className="ml-4 cursor-pointer hover:text-blue-100">
              <Link href="/request">Request For Quotation</Link>
            </li>
            <li className="ml-4 cursor-pointer hover:text-blue-100 ">
              <Link href="/klien"> Klien Kami</Link>
            </li>
            <li className="ml-4 cursor-pointer hover:text-blue-100 ">
              <Link href="/mitra"> UKM Mitra</Link>
            </li>
          </ul>
        </div>
        {!loading && authenticated ? (
          <div className="hidden lg:block">
            <NavbarProfile />
            {/* <button className="p-2 ml-4 text-white bg-blue-100 " onClick={logout}>
            Logout
          </button>
          <span>{user.Name}</span> */}
          </div>
        ) : (
          <div className="hidden lg:block">
            <LoginModal />
            <button className="p-2 ml-4 text-white bg-blue-100 ">
              <Link href="/register">Daftar</Link>
            </button>
          </div>
        )}
        <div className="block lg:hidden">
          <button onClick={() => setActive(!active)}>
            {active ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;

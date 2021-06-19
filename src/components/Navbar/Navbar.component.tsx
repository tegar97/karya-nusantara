import React, { useRef, useState, useEffect } from "react";
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
import { useRouter } from "next/router";
function Navbar({ menuDrop, setMenuDrop }) {
  const { authenticated, loading, user } = useAuthState();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [bgActive, setBgActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);
  const homeRouter = router.pathname === "/";

  const changeBackground = () => {
    if (window.scrollY > 80) {
      setBgActive(true);
    } else {
      setBgActive(false);
    }
  };
  return (
    <>
      <div
        style={{
          zIndex: 20,
        }}
        className={`fixed flex items-center justify-between w-full  px-5 py-4  NavbarMenu lg:px-14  ${
          !bgActive && homeRouter
            ? "lg:ransparent lg:text-white"
            : "lg:bg-white  lg:shadow-md "
        }`}
      >
        <div>
          <Link href="/">
            {bgActive ? (
              <img
                src="/assets/logo-nav-min.png"
                alt="Logo Karya Nusantara"
                width={150}
                height={50}
                className="z-30 cursor-pointer "
              />
            ) : (
              <img
                src="/assets/logo-putih.png"
                alt="Logo Karya Nusantara"
                width={150}
                height={50}
                className="z-30 cursor-pointer "
              />
            )}
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
            <Link href="/about">
              <li
                onClick={() => setActive(!active)}
                className="w-full p-3 ml-4 cursor-pointer hover:bg-blue-100 hover:text-white "
              >
                Tentang Karya Nusantara
              </li>
            </Link>
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
                  <LoginModal bgActive={bgActive} />
                </li>
                <li
                  onClick={() => setActive(!active)}
                  className="w-full p-3 ml-4 cursor-pointer mt-7 hover:bg-blue-100 hover:text-white "
                >
                  <div className="inline-block">
                    <div
                      className={`px-5 py-1  border-2 border-blue-100  text-white   bg-blue-100 `}
                    >
                      <button>Daftar</button>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="hidden lg:block">
          <ul className="flex flex-row">
            <Link href="/about">
              <li className="ml-4 cursor-pointer hover:text-blue-100 ">
                Tentang Karya Nusantara
              </li>
            </Link>
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
          <div className="hidden lg:block ">
            <LoginModal bgActive={bgActive} />
            <div
              className={`   px-5 py-1 ml-4 inline-block ${
                bgActive ? "text-white bg-blue-100 " : "text-blue-100 bg-white "
              } `}
            >
              <button>Daftar</button>
            </div>
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

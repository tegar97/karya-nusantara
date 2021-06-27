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
import { NavbarSupport } from "../../navbar/navbar.styled";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
function Navbar({ menuDrop, setMenuDrop }) {
  const { authenticated, loading, user } = useAuthState();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [bgActive, setBgActive] = useState(false);
  const [registerSelection, setRegisterSelection] = useState(false);
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);

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
    <NavbarSupport
      style={{
        zIndex: 20,
      }}
      className={`top-0 left-0 fixed flex items-center justify-between w-full  px-5 py-4   lg:px-14  ${
        !bgActive && homeRouter
          ? "transparent text-white"
          : "bg-white  shadow-md "
      }`}
    >
      <div>
        <Link href="/">
          {!bgActive && homeRouter ? (
            <img
              src="/assets/logo-putih.png"
              alt="Logo Karya Nusantara"
              width={150}
              height={50}
              className="z-30 cursor-pointer "
            />
          ) : (
            <img
              src="/assets/logo-nav-min.png"
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
          top: active ? "80px" : "-800px",
          transition: "all .5s",
        }}
      >
        <ul className="flex flex-col items-center w-full px-2 py-1 text-left ">
          <Link href="/about">
            <li
              onClick={() => setActive(!active)}
              className="w-full p-1 ml-4 cursor-pointer text-grey-100 hover:text-blue-100"
            >
              Tentang Karya Nusantara
            </li>
          </Link>
          <li
            onClick={() => setActive(!active)}
            className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
          >
            <Link href="/product">Katalog Produk</Link>
          </li>
          <Link href="/request">
            <li
              onClick={() => setActive(!active)}
              className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
            >
              Request For Quotation
            </li>
          </Link>
          <li
            onClick={() => setActive(!active)}
            className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
          >
            <Link href="/klien"> Klien Kami</Link>
          </li>
          <li
            onClick={() => setActive(!active)}
            className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
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
              <li className="w-full p-1 ml-4 cursor-pointer mt-7 ">
                <button
                  className="mr-0 text-grey-100 hover:text-blue-100"
                  onClick={() => setDropDown(!dropDown)}
                >
                  Daftar
                </button>

                {dropDown && (
                  <div className="flex px-5">
                    <div
                      className="w-full p-5 mt-5"
                      style={{ border: "1px solid rgba(0,0,0,0.2)" }}
                    >
                      <ul>
                        <Link href="/register-konsumen">
                          <li
                            onClick={() => setActive(!active)}
                            className="p-2 mb-2 text-white bg-blue-100"
                          >
                            Daftar Sebagai Pembeli
                          </li>
                        </Link>
                        <Link href="/register-mitra">
                          <li
                            onClick={() => setActive(!active)}
                            className="p-2 mb-2 text-white bg-blue-100"
                          >
                            Daftar Sebagai Mitra
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li
                onClick={() => setActive(false)}
                className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
              >
                <LoginModal bgActive={bgActive} homeRouter={homeRouter} />
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
        <div className="relative hidden lg:block ">
          <LoginModal bgActive={bgActive} homeRouter={homeRouter} />
          <div
            className={`   px-5 py-1 ml-4 inline-block ${
              !bgActive && homeRouter
                ? "text-blue-100 bg-white "
                : "text-white bg-blue-100 "
            } `}
          >
            <button
              onClick={() => setRegisterSelection(!registerSelection)}
              className=""
            >
              Daftar
            </button>
          </div>
          {registerSelection && (
            <div
              className="absolute flex flex-col items-start justify-start w-full p-2 text-black bg-white shadow-lg"
              style={{
                bottom: "-90px",
                border: "2px solid #5996ab",
                borderRadius: "3px",
              }}
            >
              <Link href="/register-konsumen">
                <button
                  onClick={() => setRegisterSelection(false)}
                  className="w-full p-1 text-sm text-left text-white bg-blue-100 outline-none "
                >
                  Daftar Sebagai Pembeli
                </button>
              </Link>
              <Link href="/register-mitra">
                <button
                  onClick={() => setRegisterSelection(false)}
                  className="w-full p-1 mt-2 text-sm text-left text-white bg-blue-100 "
                >
                  Daftar Sebagai Mitra
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      <div className="block lg:hidden">
        <button onClick={() => setActive(!active)}>
          {active ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </NavbarSupport>
  );
}

export default Navbar;

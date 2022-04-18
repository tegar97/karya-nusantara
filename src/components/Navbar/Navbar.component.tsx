import React, { useRef, useState, useEffect } from "react";
import LoginModal from "./../Login-Modal/Login-Modal.component";
import { motion, useCycle } from "framer-motion";

import Link from "next/link";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";
import { NavbarSupport } from "../../navbar/navbar.styled";

import Cookie from 'js-cookie'
import { getProfile, refresh } from "../../constant/api/auth";
import { Button, Menu, MenuItem } from "@material-ui/core";
import profileDropdown from "./profileDropdown";
import ProfileDropdown from "./profileDropdown";
import useSWR from "swr";
import fetcher from "../../util/useSwrFetcher";
import { getMyCart } from "../../constant/api/cart";
function Navbar({ menuDrop, setMenuDrop }) {
  const [userDataState, setUserData] = useState()
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [bgActive, setBgActive] = useState(false);
  const [cart, setCart] :any= useState([]);
  const [registerSelection, setRegisterSelection] = useState(false);
  const router = useRouter();

  /// Material ui dropdown
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
  };
  
    const handleClose = () => {
      setAnchorEl(null);
  };
  //---------------------------------------
  const [user, setUser] = useState({
    name: '',
    email: '',
    id: '',

  });
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  
  // const { data, error } = useSWR([`${process.env.API_V2}/api/cart`, bearerToken], fetcher);
  
  // console.log(data)

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    // if (token) {
    //   const userData = Cookie.get('userData');
    //     setUserData(userData); 
    // }

    // console.log(userDataState);
  }, []);

  useEffect(() => {
    const token = Cookie.get('token');
    const bearerToken = `Bearer ${token}`
    if (token) {
      const load = async () => {
        setLoading(true)

        try {
         
          const response = await getProfile(bearerToken);
          const getCart = await  getMyCart(bearerToken)
          setUser(response.data.data);
          setCart(getCart.data);
          console.log(getCart)

        } catch (error) { 
          const newToken = await refresh(bearerToken)
          Cookie.set("token", newToken.data.access_token,{expires: 1});
          console.log(error)
          
        }
        
        setLoading(false);

      }
      load()
    } else {
      setUser(null)
    }
  },[])
  console.log(cart);
  const homeRouter = router.pathname === "/";

  const changeBackground = () => {
    if (window.scrollY > 80) {
      setBgActive(true);
    } else {
      setBgActive(false);
    }
  };
  const logout = () => {
   setActive(!active)
   Cookie.remove("token");
   router.push("/");
   router.reload();
 };
  return (
    <NavbarSupport
      style={{
        zIndex: 20,
      }}
      className={`top-0 left-0 fixed w-full   px-5 py-3   lg:px-14 c ${
        !bgActive && homeRouter
          ? "bg-white   shadow-md"
          : "bg-white  shadow-md "
      }`}
    >
      <div className=" items-center justify-between w-full flex container-box">
        <div>
          <Link href="/">
            {!bgActive && homeRouter ? (
              <img
                src="/assets/logo-nav-min.png"
                alt="Logo Karya Nusantara"
                width={150}
                height={50}
                className="z-30 cursor-pointer object-cover "
              />
            ) : (
              <img
                src="/assets/logo-nav-min.png"
                alt="Logo Karya Nusantara"
                width={150}
                height={50}
                className="z-30 cursor-pointer object-cover"
              />
            )}
          </Link>
        </div>
        <div
          className="absolute flex w-full bg-white border-t border-b border-gray-300 lg:hidden container-box"
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
                Tentang Kami
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

            {user ? (
              <>
                <li
                  onClick={() => setActive(!active)}
                  className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
                >
                  <Link href="/cart"> Keranjang saya</Link>
                </li>
                <li
                  onClick={() => setActive(!active)}
                  className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
                >
                  <Link href="/member/profile"> Dasboard</Link>
                </li>
                <li
                  onClick={logout}
                  className="w-full p-1 ml-4 cursor-pointer mt-7 text-grey-100 hover:text-blue-100"
                >
                  <span> Logout</span>
                </li>
              </>
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
                Tentang Kami
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
              <Link href="/mitra"> Cerita Ukm</Link>
            </li>
          </ul>
        </div>
        {user ? (
          <div className="hidden lg:flex flex-row items-center relative">
            {/* <NavbarProfile /> */}
            {/* <span>{ user?.name}</span> */}
            {/* <button className="p-2 ml-4 text-white bg-blue-100 rouned-md">
              Logout
            </button> */}
            <Link href={"/cart"}>
              <div className="flex flex-row">
                <div className="relative">
                  <img
                    src={"/assets/icon/cart.svg"}
                    alt="store icon"
                    className="lg:w-5 mr-1"
                  />
                  {cart && cart?.item_cart?.length >= 1 && (
                    <div className="absolute  top-0 right-0 lg:w-2 lg:h-2 bg-red-600 rounded-full"></div>
                  )}
                </div>

                <span className="cursor-pointer mr-5">Keranjang</span>
              </div>
            </Link>
            <ProfileDropdown loading={loading} name={user.name} />
          </div>
        ) : (
          <div className="relative hidden lg:block ">
            <LoginModal bgActive={bgActive} homeRouter={homeRouter} />
            <div
              className={`   px-5 py-1 ml-4 inline-block ${
                !bgActive && homeRouter
                  ? "text-white bg-blue-100 "
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
      </div>
    </NavbarSupport>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const response = await getProfile(bearerToken);
  const user = response.data.data;

  return {
    props: {
      user: user,
    },
  };
}

export default Navbar;

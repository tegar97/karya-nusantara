import React, { useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { PersonAdd, Settings } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import Link from 'next/link';

function ProfileDropdown({ name, loading }) {
  
  const dropdownRef  :any= useRef("");
   const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    };
    
    const logout = () => {
        Cookies.remove("token");
        router.push('/')
      router.reload()
      setShowMenu(false)
  }
  
  const showDropdown = (e) => {
    // if (!dropdownRef.current.contains(e.taget)) {
    //   console.log('yo')
    // }

    if (!dropdownRef.current.contains(e.target)) {
      console.log('click outside')
      setShowMenu(false)
    } 
          setShowMenu(true);

  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false)
      } else {
        setShowMenu(true)
      }
    }
        document.addEventListener("click", handleClickOutside, true);
  return () => {
    document.removeEventListener("click", handleClickOutside, true);
  };
  },[showMenu])
  return (
    <div className="" ref={dropdownRef}>
      <div
        className="flex flex-row items-center cursor-pointer"
      >
        <img
          src={"/assets/icon/health_icon.svg"}
          alt="store icon"
          className="lg:w-5 mr-2"
        />
        <span className="">
          {name.split(" ").length > 2
            ? name.split(" ").slice(0, -1).join(" ")
            : name}
        </span>
      </div>
      {showMenu && (
        <div
          className="absolute bg-white  border shadow-sm border-gray-300 "
          style={{ right: 0, top: 40 }}
        >
          <div className="border-b border-gray-300 px-2 py-2 flex flex-row items-center cursor-pointer">
            <img
              src={"/assets/icon/profile.svg"}
              alt="store icon"
              className="lg:w-5"
            />
            <span className="text-sm ml-2 text-gray-900">{name}</span>
          </div>
          <div className=" px-2 py-2 mt-1">
            <ul>
              <Link href="/member/profile">
                <li
                  className="flex flex-row items-center mb-3 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                >
                  <img
                    src={"/assets/icon/health_icon.svg"}
                    alt="store icon"
                    className="lg:w-5"
                  />
                  <span className="text-sm ml-2">Akun Saya</span>
                </li>
              </Link>

              <Link href="/member/order/ongoing">
                <li
                  className="flex flex-row items-center mb-3 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                >
                  <img
                    src={"/assets/icon/order-list.svg"}
                    alt="store icon"
                    className="lg:w-5"
                  />
                  <span className="text-sm ml-2">Pesanan Saya</span>
                </li>
              </Link>

              <Link href="/payment/payment-list">
                <li
                  className="flex flex-row items-center mb-3 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                >
                  <img
                    src={"/assets/icon/pending-payment.svg"}
                    alt="store icon"
                    className="lg:w-5"
                  />
                  <span className="text-sm ml-2 overwrap text-left">
                    Menunggu Pembayaran
                  </span>
                </li>
              </Link>

              <li
                className="flex flex-row items-center mb-3 cursor-pointer"
                onClick={logout}
              >
                <img
                  src={"/assets/icon/logout.svg"}
                  alt="store icon"
                  className="lg:w-5"
                />
                <span className="text-sm ml-2 overwrap text-left">Keluar</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown
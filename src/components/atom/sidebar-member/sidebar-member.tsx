import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

function SideBarMember() {

    const router = useRouter();
  return (
    <div className="sidebar flex flex-col">
      <img
        alt="members profile"
        className="lg:w-40 lg:h-40"
        src={
          "https://www.static-src.com/frontend/static/img/classic.9448d71.png"
        }
      />
      <div className="mt-5 flex flex-col">
        <span className="text-lg font-bold">Muhammad Tegar Akmal</span>
        <span className="text-gray-400 text-sm">terdaftar sejak Mar 2022</span>
      </div>
      <div className="mt-8 flex flex-col">
        <ul>
          <li
            className="border-b border-gray-200  pb-1 pl-2 cursor-pointer mb-3"
            style={{
              borderLeft:
                router.pathname.split("/member")[1] == "/profile"
                  ? "4px solid #5996ab"
                  : "",
            }}
          >
            <Link href="/member/profile">
              <span>Profile</span>
            </Link>
          </li>
          <li
            className="border-b border-gray-200  pb-1 pl-2 cursor-pointer mb-3"
            style={{
              borderLeft:
                router.pathname.split("/member")[1] == "/alamat"
                  ? "4px solid #5996ab"
                  : "",
            }}
          >
            <Link href="/member/alamat">
              <span>Alamat</span>
            </Link>
          </li>
          <li
            className="border-b border-gray-200  pb-1 pl-2 cursor-pointer mb-3"
            style={{
              borderLeft:
                router.pathname.split("/member")[1] == "/order/ongoing" ||
                router.pathname.split("/member")[1] == 
                "/order/completed" ||    router.pathname.split("/member")[1] == "/order/canceled" 
                  ? "4px solid #5996ab"
                  : "",
            }}
          >
            <Link href="/member/order/ongoing">
              <span>Pesanan</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarMember
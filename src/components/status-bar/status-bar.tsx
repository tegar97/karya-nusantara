import { Button } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

function StatusBar() {
    const router = useRouter();
    console.log(router.pathname)
  return (
    <ul className="flex flex-row mt-5">
      <li>
        <Link href="/member/order/ongoing">
          <Button
            variant="contained"
            style={{
              backgroundColor:
                router.pathname == "/member/order/ongoing"
                  ? "#5996ab"
                  : "#F3F4F6",
              color:
                router.pathname == "/member/order/ongoing"
                  ? "#FFFFFF"
                  : "#5996ab",
            }}
            className="ring-0 outline-none normal-case  ml-2 hover:opacity-90 rounded-full px-6"
          >
            Saat ini
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/member/order/completed">
          <Button
            variant="contained"
            style={{
              backgroundColor:
                router.pathname == "/member/order/completed"
                  ? "#5996ab"
                  : "#F3F4F6",
              color:
                router.pathname == "/member/order/completed"
                  ? "#FFFFFF"
                  : "#5996ab",
            }}
            className="bg-gray-100 text-blue-100 ring-0  outline-none normal-case focus:bg-gray-100 ml-2 rounded-full px-6"
          >
            Selesai
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/member/order/canceled">
          <Button
            style={{
              backgroundColor:
                router.pathname == "/member/order/canceled"
                  ? "#5996ab"
                  : "#F3F4F6",
              color:
                router.pathname == "/member/order/canceled"
                  ? "#FFFFFF"
                  : "#5996ab",
            }}
            variant="contained"
            className="bg-gray-100 text-blue-100 ring-0  outline-none normal-case focus:bg-gray-100 ml-2 rounded-full px-6"
          >
            Dibatalkan
          </Button>
        </Link>
      </li>
    </ul>
  );
}

export default StatusBar
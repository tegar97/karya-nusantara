import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

import Cookie from "js-cookie";
import { toast } from "react-toastify";
import router, { useRouter } from "next/router";
import DasboardSkeleton from "../../../components/atom/dasboard-skeleton/dasboard-skeleton";
import Link from "next/link";
import SideBarMember from "../../../components/atom/sidebar-member/sidebar-member";
import { getProfile, update } from "../../../constant/api/auth";
import PaymentPendingList from "../../../components/payment-pending-list/payment-pending-list";
import TranasctionCard from "../../../components/transaction-card/transaction-card";
import { NextSeo } from "next-seo";
function Ongoing({ user, data }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const router = useRouter();

  return (
    <div>
      <NextSeo title="Pesanan saya" />
      <DasboardSkeleton user={user}>
        <div className="content col-span-5 ml-5">
          <ul className="mt-5 flex flex-row w-full">
            <Link href="/member/order/ongoing">
              <li className="text-blue-100 font-semibold border-b-2 pb-2 border-blue-100  cursor-pointer ">
                Pesanan diproses
              </li>
            </Link>

            <Link href="/member/order/ordersent">
              <li className="text-gray-400 font-semibold  pb-2  ml-5  cursor-pointer">
                Sedang dikirim
              </li>
            </Link>

            <Link href="/member/order/completed">
              <li className="text-gray-400 font-semibold  pb-2  ml-5  cursor-pointer">
                Selesai
              </li>
            </Link>
          </ul>

          <div className="w-full mt-10">
            {data.data.length == 0 && (
              <span>Belum Ada Pesanan Yang sedang diproses</span>
            )}

            {data.data.map((data, index) => {
              return <TranasctionCard key={index} data={data} />;
            })}
          </div>
        </div>
      </DasboardSkeleton>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;
  // Fetch data from external API
  const res = await fetch(`${process.env.API_V2}/api/transaction/code/2`, {
    headers: new Headers({
      Authorization: bearerToken,
    }),
  });
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
  const data = await res.json();


  return {
    props: {
      user: user,
      data: data,
    },
  };
}
export default Ongoing;

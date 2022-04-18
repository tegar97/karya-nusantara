import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

import Cookie from "js-cookie";
import { toast } from "react-toastify";
import router, { useRouter } from "next/router";
import Link from "next/link";
import DasboardSkeleton from "../../../../components/atom/dasboard-skeleton/dasboard-skeleton";
import SideBarMember from "../../../../components/atom/sidebar-member/sidebar-member";
import { getProfile, update } from "../../../../constant/api/auth";
import PaymentSuccessList from "../../../../components/payment-success-list/payment-success-list";


function index({ user, data }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const router = useRouter();
    console.log(data)

  return (
    <div>
      <DasboardSkeleton user={user}>
        <div className="content col-span-5 ml-5">
          <ul className="mt-5">
            <li className="text-blue-100 font-semibold border-b-2 pb-2 border-blue-100 lg:w-20">
              Riwayat Pembayaran
            </li>
          </ul>

          <div className="w-full mt-10">
            {data.data.map((data, idx) => {
              return <PaymentSuccessList data={data} key={idx} />;
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
  const res = await fetch(`${process.env.API_V2}/api/payment/status/success`, {
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

  console.log(token);

  return {
    props: {
      user: user,
      data: data,
    },
  };
}
export default index;

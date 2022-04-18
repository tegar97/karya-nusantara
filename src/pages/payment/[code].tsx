import React from "react";
import { getProfile, refresh } from "../../constant/api/auth";
import Cookie from "js-cookie";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import Countdown from "react-countdown";
import "moment/locale/id";
import NumberFormat from "react-number-format";
import Link from "next/link";
export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;

  // Fetch data from external API
  const res = await fetch(`${process.env.API_V2}/api/payment/${params.code}`, {
    headers: new Headers({
      Authorization: bearerToken,
    }),
  });
  const data = await res.json();

  if (data.data === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  //Get other store product

  //Get user address

  if (!token) {
    return { props: { data, user: null, token: null } };
  }
  try {
    const response = await getProfile(bearerToken);
    const user = response?.data;
    return { props: { data, user, token } };
  } catch (error) {
    const newToken = await refresh(bearerToken);
    Cookie.set("token", newToken.data.access_token, { expires: 1 });
    const redirect = true;
    return {
      props: { data, redirect },
    };
  }

  // Pass data to the page via props
}

function Payment({ data }) {
  const content = () => {
    if (
      data.data.payment_gateway.gateway_code == "MANDIRI" ||
      data.data.payment_gateway.gateway_code == "BCA" ||
      data.data.payment_gateway.gateway_code == "BNI" ||
      data.data.payment_gateway.gateway_code == "BRI"
    ) {
      return (
        <div className="flex flex-col w-full">
          {data.data?.payment_code && (
            <div className="flex flex-row justify-between items-center mb-2">
              <span className="text-lg">Kode bank</span>
              <span className="text-lg font-semibold">
                {data.data.payment_code}
              </span>
            </div>
          )}

          <div className="flex flex-row justify-between items-center mb-2">
            <span className="text-lg">Nomor Virtual Account</span>
            <span className="text-lg font-semibold">
              {data.data.payment_key}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center mb-2">
            <span className="text-lg">Total Pembayaran</span>
            <span className="text-lg font-semibold">
              {
                <NumberFormat
                  value={data.data.amount}
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </span>
          </div>
          <div className="flex flex-row justify-between items-center mb-2">
            <span className="text-lg">Status Pembayaran</span>
            <span className="text-lg font-semibold">
              {data.data.payment_status == 2 && (
                <span>Menunggu Pembayaran</span>
              )}
              {data.data.payment_status == 1 && (
                <span> Pembayaran Berhasil</span>
              )}
            </span>
          </div>
        </div>
      );
    } else {
    }
  };

  if (!data) {
    <>
      <NextSeo title="Pembayaran" />
      <div
        className="  relative h-full w-full py-0 lg:px-20 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="flex justify-items-center  items-center w-full">
          <CircularProgress className="flex justify-items-center  items-center w-full" />
          ;
        </div>
      </div>
    </>;
  } else {
    return (
      <>
        <NextSeo title="Pembayaran" />
        <div
          className="  relative h-full w-full py-0 lg:px-60 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
          style={{
            minHeight: "100vh",
          }}
        >
          <div className="flex flex-col justify-items-center  items-center w-full">
            {data.data.payment_status == 2 && (
              <div className="flex items-center justify-center w-full flex-col">
                <h1 className="text-2xl font-semibold">
                  Selesaikan Pembayaran dalam
                </h1>
                <div className="mt-2 ">
                  <span className="text-xl text-blue-100">
                    <Countdown date={data.data.expire_time_str} />
                  </span>
                </div>
                <span className="text-xl text-gray-700 mt-2">
                  Sebelum tanggal
                </span>
                <span className="text-xl font-semibold mt-2">
                  {" "}
                  {moment(data.data.expire_time_str).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </span>
              </div>
            )}
            {data.data.payment_status == 1 && (
              <div className="flex items-center justify-center w-full flex-col">
                <h1 className="text-2xl font-semibold">
                  Terima kasih, Pembayaran telah berhasil
                </h1>
                <h2 className="text-xl mt-1">
                  Pesanan anda akan segera diproses
                </h2>
              </div>
            )}

            <div className="w-full border border-gray-300 mt-5 py-2">
              <div className="flex flex-row justify-between py-5 px-5 items-center border-b border-gray-300">
                <span className="text-lg font-semibold">
                  {data.data.payment_gateway.gateway_name}
                </span>
                <img
                  src={`${process.env.API_V2}/storage/images/gateway/${data.data.payment_gateway.gateway_logo}`}
                  alt="logo gateway"
                  style={{ width: 80, height: 30 }}
                />
              </div>
              <div className="flex flex-row justify-between py-5 px-5  ">
                {content()}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-5 w-full">
              {data.data.payment_status == 2 && (
                <Link href="/payment/payment-list">
                  <button className="border border-blue-100 py-2 px-2 w-full outline-none rounded-md">
                    Cek pembayaran
                  </button>
                </Link>
              )}
              {data.data.payment_status == 1 && (
                <Link href="/member/order/ongoing">
                  <button className="border border-blue-100 py-2 px-2 w-full outline-none rounded-md">
                    Cek Pesanan
                  </button>
                </Link>
              )}

              <button className="border border-blue-100 py-2 px-2 w-full outline-none rounded-md text-white bg-blue-100">
                Belanja lagi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Payment;

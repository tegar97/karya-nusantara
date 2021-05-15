import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function feature() {
  const router = useRouter();
  const [role, setRole] = useState("howToBuy");
  console.log();
  return (
    <div className="px-10 py-5 lg:px-20 lg:py-36">
      <div className="flex w-full">
        <button
          className={`w-full p-2 ${
            role == "howToBuy"
              ? "bg-blue-100 text-white"
              : "border-blue-100 border-2"
          } `}
          onClick={() => setRole("howToBuy")}
        >
          Cara Belanja
        </button>
        <button
          className={`w-full p-2 ${
            role == "payment"
              ? "bg-blue-100 text-white"
              : "border-blue-100 border-2"
          } `}
          onClick={() => setRole("payment")}
        >
          Pembayaran
        </button>
      </div>
      {role == "howToBuy" ? (
        <div>
          <div className="mt-10 text-center">
            <div className="mt-10">
              <img
                src="/assets/cara-bayar.jpg"
                alt="alur mitra"
                className="w-full "
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col mt-10 text-center">
            <span className="text-xl">
              Pembayaran di Karya Nusantara dapat bisa dilakukan dengan dua cara
            </span>
          </div>

          <div className="mt-5 text-center">
            <img
              src="/assets/pembayaran.jpg"
              alt="alur mitra"
              className="w-full "
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default feature;

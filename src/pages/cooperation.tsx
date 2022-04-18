import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function cooperation() {
  const router = useRouter();
  const [role, setRole] = useState("mitra");
  return (
    <div className="px-10 py-5 lg:px-20 lg:py-36">
      <div className="flex w-full">
        <button
          className={`w-full p-2 ${
            role == "mitra"
              ? "bg-blue-100 text-white"
              : "border-blue-100 border-2"
          } `}
          onClick={() => setRole("mitra")}
        >
          MITRA
        </button>
        <button
          className={`w-full p-2 ${
            role == "klien"
              ? "bg-blue-100 text-white"
              : "border-blue-100 border-2"
          } `}
          onClick={() => setRole("klien")}
        >
          KLIEN
        </button>
      </div>
      {role == "mitra" ? (
        <div>
          <div className="mt-10 text-center">
            <h1 className="mt-5 mb-5 text-xl font-medium text-blue-100 lg:text-3xl">
              Alur Menjadi Mitra
            </h1>
            <div className="mt-10">
              <img
                src="/assets/mitra.jpg"
                alt="alur mitra"
                className="w-full "
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col mt-10 text-left">
            <span className="text-xl">
              Kami menerima penawaran untuk menjadi penyedia kebutuhan pengadaan
              perusahaan Anda dengan berbagai bentuk kemitraan lainnya.
            </span>
            <span className="mt-5 text-xl">
              Untuk tahu lebih banyak terkait kemitraan, Anda cukup menghubungi
              kami melalui link berikut :
            </span>
          </div>
          <button className="p-2 mt-5 text-white bg-blue-100 ">
            <a href="mailto:info@karyanusantara.co.id">Hubungi Kami</a>
          </button>
          <div className="mt-5 text-center">
            <Image
              width={600}
              height={450}
              src="/assets/klien.png"
              alt="klient ilustration"
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default cooperation;

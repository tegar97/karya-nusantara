import React from "react";
import Link from "next/link";
import { Container } from "@material-ui/core";

function Success() {
  return (
    <div
      style={{
        background: "url('/assets/bg-register2.jpg')",
        minHeight: "180vh",
        backgroundRepeat: "none",
      }}
      className="flex justify-center w-full bg-no-repeat bg-cover "
    >
      <Container
        maxWidth="xl"
        className="w-11/12 h-full px-5 py-5 mt-10 bg-white border-2 border-blue-100 lg:mt-32 lg:w-4/6"
        style={{ boxShadow: "2px 2px #5996ab", borderRadius: "10px" }}
      >
        <div className="py-5 text-center bg-white lg:px-20">
          <h1 className="text-4xl font-medium font-bold text-blue-100">
            Terima Kasih Sudah Mendaftar
          </h1>
          <div className="mt-5">
            <p>
              Tahapan Selanjutnya,Produk Anda akan dikurasi oleh tim Karya
              Nusantara. Pemberitahuan hasil kurasi akan dikirim ke Email anda
            </p>
          </div>
          <div className="mt-5">
            <Link href="/">
              <button className="px-5 py-3 text-white bg-blue-100">
                Kembali Ke Halaman Utama
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Success;

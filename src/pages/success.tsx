import React from "react";
import Link from "next/link";
function Success() {
  return (
    <div className="text-center lg:px-20 py-36">
      <h1 className="text-4xl font-medium text-blue-100">
        Terima Kasih Sudah Mendaftar
      </h1>
      <div className="mt-5">
        <p>Silahkan verifikasi email anda,untuk mulai bertransaksi. </p>
      </div>
      <div className="mt-5">
        <Link href="/">
          <span className="text-blue-100">Kembali Ke Halaman Utama</span>
        </Link>
      </div>
    </div>
  );
}

export default Success;

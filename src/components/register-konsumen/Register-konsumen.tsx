import React, { useState } from "react";

function RegisterKonsumen() {
  const [formDetail, setformDetail] = useState(false);

  return (
    <div className="mt-5">
      <form>
        <div className={`${formDetail ? "hidden" : ""}`}>
          <div className="mt-5 text-sm">
            <label
              htmlFor="nama"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              autoFocus
              id="nama"
              name="name"
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nama Lengkap Anda"
            ></input>
          </div>
          <div className="my-5 text-sm">
            <label
              htmlFor="email"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Email
            </label>
            <input
              type="email"
              autoFocus
              name="email"
              id="email"
              className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Alamat Email"
            ></input>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="password"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Password
            </label>
            <input
              type="password"
              autoFocus
              id="password"
              name="password"
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
          </div>
          <button
            type="button"
            onClick={() => setformDetail(true)}
            className="p-3 mt-3 text-white bg-blue-100 "
          >
            Lanjut
          </button>
        </div>
        <div className={`${formDetail ? "" : "hidden"}`}>
          <div className="mt-5 text-sm">
            <label
              htmlFor="company"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nama Perusahaan
            </label>
            <input
              type="text"
              autoFocus
              id="company"
              name="company"
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
          </div>
          <div className="my-5 text-sm">
            <label
              htmlFor="company_adress"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Alamat Lengkap Perusahaan
            </label>
            <input
              type="email"
              autoFocus
              id="company_adress"
              name="company_adress"
              className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Alamat Email"
            ></input>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="company_birth"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Tanggal Mulai Perusahaan
            </label>
            <input
              type="date"
              autoFocus
              id="company_birth"
              name="company_birth"
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="compay_email"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Email Perusahaan
            </label>
            <input
              type="date"
              autoFocus
              id="compay_email"
              name="compay_email"
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="phone_number"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nomor Hp
            </label>
            <input
              type="date"
              autoFocus
              id="phone_number"
              name="phone_number"
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setformDetail(false)}
              className="p-3 mt-3 text-black border-2 border-blue-100 "
            >
              Kembali
            </button>
            <button
              type="submit"
              className="p-3 mt-3 ml-5 text-white bg-blue-100 "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterKonsumen;

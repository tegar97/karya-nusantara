import React from "react";

function RegisterKonsumen() {
  return (
    <div className="mt-5">
      <form>
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
            className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
            placeholder="Masukan Password Anda"
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
            id="email"
            className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
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
            className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
            placeholder="Masukan Password Anda"
          ></input>
        </div>

        <button className="p-3 mt-3 text-white bg-blue-100 ">Lanjut</button>
      </form>
    </div>
  );
}

export default RegisterKonsumen;

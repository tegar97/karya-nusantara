import { Card, CardContent, Container, Paper } from "@material-ui/core";
import React, { useState } from "react";
import LoginModal from "../Login-Modal/Login-Modal.component";
import RegisterKonsumen from "../register-konsumen/Register-konsumen";
import { RegisterContainer, RegisterBoxContainer } from "./Register.styles";
import Image from "next/image";
function RegisterBox() {
  const [roleClick, setRoleClick] = useState(false);
  const [role, setRole] = useState(null);

  const RoleCustumer = () => {
    setRoleClick(true);
    setRole("konsumen");
  };
  const Roleumkm = () => {
    setRoleClick(true);
    setRole("konsumen");
  };

  const RemoveRole = () => {
    setRoleClick(false);
    setRole(null);
  };
  return (
    <div className="grid grid-cols-3 lg:px-20 py-36 ">
      <div className="col-span-2 lg:w-10/12 ">
        <h1 className="text-2xl font-medium text-blue-100">
          Daftar Akun Baru Sebagai {role}
        </h1>
        <div className="mt-5">
          {roleClick ? (
            <span>Silahkan Isi Form Di Bawah Ini </span>
          ) : (
            <span>Saya Akan Daftar Sebagai : </span>
          )}
          {roleClick ? (
            <span
              className="block mt-5 font-semibold text-blue-100 cursor-pointer"
              onClick={RemoveRole}
            >
              Ganti Status Akun
            </span>
          ) : (
            <div className="mt-5 text-white">
              <button className="p-2 bg-blue-100" onClick={RoleCustumer}>
                Konsumen
              </button>
              <button className="p-2 ml-5 bg-blue-100" onClick={Roleumkm}>
                UMKM
              </button>
            </div>
          )}
        </div>
        {role == "konsumen" ? <RegisterKonsumen /> : ""}
      </div>
      <div className="">
        <Image
          src="/assets/logo-kn.png"
          alt="Logo Karya nusantara"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default RegisterBox;

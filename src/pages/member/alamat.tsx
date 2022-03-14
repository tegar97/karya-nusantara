import { Button, TextField } from "@material-ui/core";
import React from "react";
import SideBarMember from "../../components/atom/sidebar-member/sidebar-member";
import FormInput from "../../components/input-container/input-container";

function Profile() {
  return (
    <div>
      <div
        className=" relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="grid grid-cols-6">
          <SideBarMember />
          <div className="content col-span-4 ml-5">
                      <h1 className="font-bold lg:text-3xl">Alamat</h1>
                      <span className="text-gray-400 text-sm mt-1">Alamat dibawah akan dipakai sebagai alamat pengiriman pesanan</span>

            <ul className="mt-5">
              <li className="text-blue-100 font-semibold border-b-2 pb-2 border-blue-100 lg:w-20">
                Alamat
              </li>
            </ul>

            <div className="content-input-area mt-10">
              <TextField
                className="w-full rounded-md mb-6"
                id="outlined-basic"
                color="primary"
                label="Label Alamat"
                variant="outlined"
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Nomer telepon"
                              variant="outlined"
                              type="number"
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Kota dan Kecamatan"
                variant="outlined"
              />
       
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Kode Pos"
                variant="outlined"
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Alamat Lengkap"
                variant="outlined"
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Catatan Untuk Kurir (opsional)"
                variant="outlined"
              />
       
            </div>
            <Button
              variant="contained"
              className="bg-blue-100 text-white rounded-lg px-5 py-2 "
              
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

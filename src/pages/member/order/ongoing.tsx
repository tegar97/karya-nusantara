import { Button, TextField } from "@material-ui/core";
import React from "react";
import SideBarMember from "../../../components/atom/sidebar-member/sidebar-member";
import FormInput from "../../../components/input-container/input-container";
import StatusBar from "../../../components/status-bar/status-bar";

function OnGoing() {
  return (
    <div>
      <div
        className=" relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="grid grid-cols-6 ml-5">
          <SideBarMember />
          <div className="content col-span-5 ">
            <h1 className="font-bold lg:text-3xl">Pesanan</h1>
            <div className="flex flex-row justify-between items-center">
             <StatusBar/>
              <FormInput
                placeholder="Cari pesanan"
                className="mt-5 border-none bg-gray-100 text-gray-500 px-5 py-3 rounded-2xl"
                defaultPlaceHolder={true}
              />
            </div>
            <div className="flex justify-center mt-20">
              {/* <img src={ '/assets/icon/notFound.png'} className="lg:w-1/3 lg:h-1/3"/> */}
              <div className="flex flex-col w-full  text-center">
                <div className="text-center">
                <span className="font-bold text-lg">Belum ada pesanan</span>
                  <p className="text-gray-700 mt-2"  >
                    Belanja kebutuhanmu sekarang atau lihat halaman Selesai.
                  </p>
                </div>

                <Button
                  variant="outlined"
                  className="bg-blue-100 text-white rounded-xl normal-case w-full py-3 mt-5 hover:bg-blue-100 hover:opacity-90"
                >
                  Belanja Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnGoing;

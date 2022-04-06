import React, { FormEvent, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";

import axios from "axios";
import { useAuthDispatch } from "./../../context/auth";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";

import { Button, Input, MenuItem, Select, TextField } from "@material-ui/core";
import FormInput from "../input-container/input-container";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "40%",
    height: "75%",
    maxWidth: 800,
    maxHeight:1200,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: '10px'
 
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const PopAddressBox = (props,{
  bgActive = null,
  homeRouter = null,
  loginRequire = null,
}) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [province, setProvince] = React.useState([]);
  const styles = {
    textAlign: "center",
    padding: 0,
  };
  
  function openModal() {
    setIsOpen(true);
  }



  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    // Get province data
    const getProvince = async () => {
 const province = await axios
   .get(
     "https://api.rajaongkir.com/starter/province?key=6ff13d6f98bc4ca4390a7332bb2e12bb"
   )
   .then((res) => {
     console.log(res)
     setProvince(res.data.provinsi);
   });
    }
   getProvince()
  },[])
  console.log(province)

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
  };
  Modal.setAppElement("#root");

  return (
    <div>
      <Button
        onClick={openModal}
        className="lg:h-10  bg-gray-100 outline-none rounded-lg"
      >
        Change
      </Button>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Address Modal"
      >
        <div className="relative w-full  ">
          <div className="absolute flex justify-end w-full">
            <button onClick={closeModal} className="text-blue-100 ">
              <img src={"/assets/icon/exit.svg"} className="lg:w-4 " />
            </button>
          </div>
          <div className="w-full px-5  py-6 ">
            <div className="flex justify-center">
              <h2 className="text-xl font-bold text-gray-700">
                Alamat Pengiriman
              </h2>
            </div>
            <div className="content w-full mt-5">
              <FormInput
                defaultPlaceHolder={true}
                placeholder="Tulis label alamat"
                descriptionClassName="text-sm text-gray-400 mb-2"
                description="contoh : Alamat rumah,Alamat kantor"
                labelClassName="text-gray-500 text-sm"
                className="rounded-md mt-2"
                label="Label Alamat"
              />
              <div className="grid grid-cols-2 gap-5">
                <FormInput
                  defaultPlaceHolder={true}
                  descriptionClassName="text-sm text-gray-400 mb-2"
                  labelClassName="text-gray-500 text-sm"
                  className="rounded-md mt-2"
                  label="Nama Penerima"
                />
                <FormInput
                  defaultPlaceHolder={true}
                  descriptionClassName="text-sm text-gray-400 mb-2"
                  labelClassName="text-gray-500 text-sm"
                  className="rounded-md mt-2"
                  label="Nomor Telepon"
                />
              </div>
              <select className="w-full">
                {province.map(res => {
             
                  return (
                    <option value={res.province_id}>{res.province}</option>
                  );

                })}
  
              </select>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3">
                  <FormInput
                    defaultPlaceHolder={true}
                    descriptionClassName="text-sm text-gray-400 mb-2"
                    labelClassName="text-gray-500 text-sm"
                    className="rounded-md mt-2 grid "
                    placeholder="Tulis Nama Alamat / Kota / Kecamatan tujuan penerima"
                    label="Kota atau Kecamatan"
                  />
                </div>
                <FormInput
                  defaultPlaceHolder={true}
                  descriptionClassName="text-sm text-gray-400 mb-2"
                  labelClassName="text-gray-500 text-sm placeholder-text-sm"
                  className="rounded-md mt-2"
                  label="Kode pos "
                />
              </div>

              <div className="mt-3">
                <FormInput
                  defaultPlaceHolder={true}
                  descriptionClassName="text-sm text-gray-400 mb-2"
                  labelClassName="text-gray-500 text-sm"
                  className="rounded-md mt-2 grid "
                  placeholder="isi dengan Nama Jalan,nomer kompleks,nama gedung"
                  label="Alamat Lengkap "
                />
              </div>
              <div className="mt-3">
                <FormInput
                  defaultPlaceHolder={true}
                  descriptionClassName="text-sm text-gray-400 mb-2"
                  labelClassName="text-gray-500 text-sm"
                  className="rounded-md mt-2 grid "
                  placeholder="isi dengan patokan rumah "
                  label="Catatan Untuk Kurir(opsional) "
                />
              </div>

              <div className="border-t-border gray-300 mt-5 ">
                <Button
                  style={{ color: "white", backgroundColor: "#5996ab" }}
                  className="lg:w-24 outline-none"
                >
                  Simpan
                </Button>
                <Button
                  variant="text"
                  className="text-gray-500 ml-3"
                  onClick={() => closeModal()}
                >
                  Kembali
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopAddressBox;

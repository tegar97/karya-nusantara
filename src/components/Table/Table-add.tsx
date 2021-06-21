import React, { FormEvent, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";

import axios from "axios";
import { useAuthDispatch } from "../../context/auth";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import FormInput from "../input-container/input-container";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #5996ab",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const RequestProduct = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = useState({});
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const dispatch = useAuthDispatch();
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

  Modal.setAppElement("#root");

  return (
    <div>
      <button
        onClick={openModal}
        className="flex items-center p-2 text-white bg-blue-100 "
      >
        <AddIcon />
        <span className="ml-1">Tambahkan Produk</span>
      </button>{" "}
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Modal Request"
      >
        <div className="relative w-full">
          <div className="absolute flex justify-end w-full">
            <button onClick={closeModal} className="text-blue-100 ">
              X
            </button>
          </div>
          <div className="w-full px-5 py-4 ">
            <div className="flex justify-center w-full ">
              <img
                width="200"
                height="200"
                className="object-cover "
                src="/assets/logo-nav-min.png"
              />
            </div>
            <div className="mt-5">
              <form>
                <FormInput
                  name="name"
                  id="name"
                  type="text"
                  label="Nama Barang"
                  placeholder="Isi Nama barang yang anda cari"
                  onChange={(e) => onChange(e)}
                  className="text-black"
                  defaultPlaceHolder
                />
                <div className="grid grid-cols-2 gap-5">
                  <FormInput
                    name="quantity"
                    id="quantity"
                    type="number"
                    label="Quantity"
                    placeholder="1"
                    onChange={(e) => onChange(e)}
                    className="text-black"
                    defaultPlaceHolder
                  />
                  <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="satuan">Satuan Barang</label>
                    <select
                      style={{
                        width: "100%",
                        border: "1px solid #c2c2c2 ",
                        background: "#ffff",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        outline: "none",
                      }}
                    >
                      <option>Pilih Satuan Barang</option>
                      <option value="unit">UNIT</option>
                      <option value="liter">Liter</option>
                      <option value="Kg">Kg</option>
                      <option value="box">Box</option>
                      <option value="meter">Meter</option>
                      <option value="set">Set</option>
                    </select>
                  </div>
                </div>
                <FormInput
                  name="description"
                  id="description"
                  label="Keterangan"
                  type="text"
                  placeholder="Isikan warna,ukuran dan keterangan lainya"
                  onChange={(e) => onChange(e)}
                  className=""
                  defaultPlaceHolder
                />
                <FormInput
                  name="images"
                  id="images"
                  type="file"
                  label="Foto Produk"
                  placeholder="Contoh Produk Yang anda inginkan"
                  onChange={(e) => onChange(e)}
                  defaultPlaceHolder
                  className=""
                />
                <div className="flex justify-center mt-5">
                  <button className="px-16 py-2 text-white bg-blue-100">
                    Buat Penawaran
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RequestProduct;

import React, { FormEvent, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";

import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/auth";
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
  const [error, setError] = useState({});
  const [ProductName, setProductName]: any = useState("");
  const [Quantity, setQuantity]: any = useState("");
  const [Description, setDescription] = useState("");
  const [Unit, setUnit] = useState("");
  const [CapacityProduct, setCapacityProduct]: any = useState("");
  const [file, setSelectedFile]: any = useState("");

  const { authenticated, loading, user } = useAuthState();
  const router = useRouter();
  const styles = {
    textAlign: "center",
    padding: 0,
  };

  const ImageChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (user.Name != "") {
    //   formData.UsersID = user.ID;
    // } else {
    //   formData.UkmID = user.ID;
    // }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const formData = new FormData();
      formData.append("Image", file);
      console.log(formData);
      let content;
      if (file) {
        console.log(file);
        const uploadFile = await fetch(
          `${process.env.API_LARAVEL}/api/uploadFile`,
          {
            method: "POST",
            body: formData,
          }
        ).then(async (res) => {
          const content = await res.json();

          await axios.post(
            `${process.env.API_LARAVEL}/api/rfq`,
            {
              product_name: ProductName,
              capacity_product: CapacityProduct,
              description: Description,
              quantity: Quantity,
              unit: Unit,
              user_id: user.ID,
              image: content.data,
            },

            { withCredentials: false }
          );
        });
      } else {
        console.log("124");
        content = "";
      }
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  };

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
              <form
                onSubmit={onSubmit}
                method="post"
                encType="multipart/form-data"
              >
                <FormInput
                  name="name"
                  id="name"
                  type="text"
                  label="Nama Barang"
                  placeholder="Isi Nama barang yang anda cari"
                  onChange={(e) => setProductName(e.target.value)}
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
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-black"
                    defaultPlaceHolder
                  />
                  <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="satuan">Satuan Barang</label>
                    <select
                      onChange={(e) => setUnit(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                  className=""
                  defaultPlaceHolder
                />
                <FormInput
                  name="Image"
                  id="images"
                  type="file"
                  label="Foto Produk"
                  placeholder="Contoh Produk Yang anda inginkan"
                  onChange={(e) => ImageChangeHandler(e)}
                  defaultPlaceHolder
                  className=""
                />

                <div className="flex justify-center mt-5">
                  <button
                    type="submit"
                    className="px-16 py-2 text-white bg-blue-100"
                  >
                    Buat Penawaran
                  </button>

                  {/* <button
                        disabled
                        className="px-16 py-2 text-white bg-blue-100 opacity-50 "
                      >
                        Login Terlebih Dahulu untuk melanjutkan
                      </button> */}
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

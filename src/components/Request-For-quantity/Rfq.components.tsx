import axios from "axios";
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import { useAuthState } from "../../context/auth";
import FormInput from "../input-container/input-container";
import LoginModal from "../Login-Modal/Login-Modal.component";
import { RfqBackground } from "./rfq.styled";

function Rfq() {
  const [formData, setFormData] = useState({});
  const [ProductName, setProductName]: any = useState("");
  const [Quantity, setQuantity]: any = useState("");
  const [Description, setDescription] = useState("");
  const [Unit, setUnit] = useState("");
  const [CapacityProduct, setCapacityProduct]: any = useState("");
  const [file, setSelectedFile]: any = useState("");
  const { authenticated, loading, user } = useAuthState();
  const [loadingRequest, setLoadingRequest] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const ImageChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // if (user.Name != "") {
    //   formData.UsersID = user.ID;
    // } else {
    //   formData.UkmID = user.ID;
    // }

    try {
      setLoadingRequest(true);
      const formData = new FormData();
      formData.append("Image", file);
      let content;
      if (file) {
        const uploadFile = await fetch(
          `${process.env.API_LARAVEL}/api/uploadFile`,
          {
            method: "POST",
            body: formData,
          }
        ).then(async (res) => {
          const content = await res.json();
          if (user.Role) {
            await axios
              .post(
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
              )
              .then((res) => {
                setLoadingRequest(false);

                router.push("/request");
              });
          }
        });
      } else {
        content = "";
      }
    } catch (error) {
    }
  };
  return (
    <div className="py-3 mt-5 lg:px-20  container-box">
      <RfqBackground>
        {/* <HeadingSecondary className="text-center ">
        Request For Quotation
      </HeadingSecondary> */}
        <div>
          <div
            className="flex items-end justify-end p-5 lg:p-10"
            style={{ borderRadius: "10px" }}
          >
            <div className="w-full mt-10 border-2 border-blue-100 md:w-full lg:w-5/12 ">
              <div
                className="p-5 "
                style={{ background: "rgba(255,255,255,.93)" }}
              >
                <div className="flex justify-center">
                  <span className="text-lg font-bold text-blue-100">
                    Dapatkan Penawaran Terbaik
                  </span>
                </div>
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
                    {!loading && authenticated ? (
                      loadingRequest ? (
                        <button
                          disabled
                          className="px-16 py-2 text-white bg-blue-100 opacity-50"
                        >
                          Loading ...
                        </button>
                      ) : user.Role ? (
                        <button className="px-16 py-2 text-white bg-blue-100">
                          Buat Penawaran
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="px-16 py-2 text-white bg-blue-100 opacity-50"
                        >
                          Buat Penawaran
                        </button>
                      )
                    ) : (
                      <LoginModal loginRequire="Buat Penawaran" />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </RfqBackground>
    </div>
  );
}

export default Rfq;

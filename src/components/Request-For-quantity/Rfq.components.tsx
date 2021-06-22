import Link from "next/link";
import React, { useState } from "react";
import FormInput from "../input-container/input-container";

function Rfq() {
  const [formData, setFormData] = useState({});
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="py-3 mt-5 lg:px-20">
      <div
        className="bg-no-repeat bg-cover border-2 border-blue-100 "
        style={{ backgroundImage: "url('/assets/newRfq.png')" }}
      >
        {/* <HeadingSecondary className="text-center ">
        Request For Quotation
      </HeadingSecondary> */}
        <div>
          <div className="flex items-end justify-end p-5 lg:p-10">
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
        </div>
      </div>
    </div>
  );
}

export default Rfq;

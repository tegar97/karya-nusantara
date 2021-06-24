import React, { useState } from "react";
import { Container } from "@material-ui/core";
import FormInput from "../components/input-container/input-container";
import SelectOptions from "../components/select-options/select-options.component";
import {
  Input,
  TextArea,
} from "../components/input-container/input-container.styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ProductPopUp from "../components/register-mitra-popup/product-popup";

function RegisterUkm() {
  const [formData, setFormData] = useState({});
  const [productModal, setProductModal] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        background: "url('/assets/bg-register2.jpg')",
        minHeight: "180vh",
        backgroundRepeat: "none",
      }}
      className="flex justify-center w-full bg-no-repeat bg-cover "
    >
      <Container
        maxWidth="xl"
        className="w-11/12 h-full px-5 py-5 mt-10 bg-white lg:mt-32 lg:w-1/2"
        style={{ boxShadow: "2px 2px #5996ab", borderRadius: "10px" }}
      >
        <div className="flex justify-center w-full ">
          <img
            width="200"
            height="200"
            className="object-cover "
            src="/assets/logo-nav-min.png"
          />
        </div>
        <form>
          <FormInput
            name="email"
            id="email"
            type="email"
            placeholder="Email anda"
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="password"
            id="password"
            placeholder="Password anda"
            type="password"
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="ukmName"
            id="ukmName"
            placeholder="Nama Ukm"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="ownerName"
            id="ownerName"
            placeholder="Nama Pemilik"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <SelectOptions
            name="businessSize"
            id="businessBirth"
            className="text-blue-100"
          >
            <option className="text-grey-100 hover:text-blue-100">
              Bentuk Badan Usaha
            </option>
            <option value="1">Firma</option>
            <option value="2">Persekutuan</option>
            <option value="3">Koperasi Terbatas</option>
            <option value="4">Yayasan</option>
          </SelectOptions>
          <FormInput
            name="businessBirth"
            id="businessBirth"
            placeholder="Tahun Mulai Usaha "
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="phoneNumber"
            id="phoneNumber"
            placeholder="No Tlp Pemilik Ukm"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="bussinessAddress"
            id="bussinessAddress"
            placeholder="Alamat Lengkap Ukm"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <div className="grid grid-cols-3 gap-x-5">
            <FormInput
              name="city"
              id="city"
              placeholder="Kota"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
            <FormInput
              name="districts"
              id="districts"
              placeholder="Kecamatan anda"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
            <FormInput
              name="village"
              id="village"
              placeholder="Keluruhan"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
            <FormInput
              name="postalCode"
              id="postalCode"
              placeholder="Postal Code"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
          </div>
          <div className="relative">
            <div className="relative flex items-center">
              <button
                onClick={() => setProductModal(true)}
                type="button"
                className="w-full text-left text-blue-100 border-2 outline-none "
                style={{
                  border: "1px solid #c2c2c2",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                Produk
              </button>
              <ArrowDropDownIcon
                fontSize="inherit"
                className="absolute text-3xl right-2"
              />
            </div>
            <div className="flex items-center mt-2 cursor-pointer">
              <AddCircleOutlineIcon
                className="text-2xl text-grey-100"
                fontSize="inherit"
              />
              <span
                onClick={() => setProductModal(true)}
                className="ml-1 text-grey-100 text-md"
              >
                Tambahkan Produk
              </span>
            </div>
            {productModal && <ProductPopUp onChange={onChange} />}
          </div>
          <FormInput
            name="employees"
            id="employees"
            placeholder="Total Karyawan"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <div className="flex flex-col items-center mt-2">
            <span>
              Dapatkan produk ukm berkualitas dengan penawaran terbaik
            </span>
            <button className="p-1 px-10 mt-4 text-lg text-white bg-blue-100">
              Dapatkan Sebagai Konsumen
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default RegisterUkm;

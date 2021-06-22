import React, { useState } from "react";
import { Container } from "@material-ui/core";
import FormInput from "../components/input-container/input-container";

function RegisterKonsumen() {
  const [formData, setFormData] = useState({});
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
            name="adress"
            id="adress"
            placeholder="Alamat Lengkap "
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
          <FormInput
            name="phone"
            id="phone"
            placeholder="No Tlp"
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

export default RegisterKonsumen;

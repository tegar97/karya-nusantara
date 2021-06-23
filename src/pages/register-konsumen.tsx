import React, { useState } from "react";
import { Container } from "@material-ui/core";
import FormInput from "../components/input-container/input-container";
import router from "next/router";
import axios from "axios";

function RegisterKonsumen() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError]: any = useState({});

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      await axios.post("/v1/users/register", formData);

      router.push("/success");
    } catch (err) {
      setError(err.response.data);
    }

    setLoading(false);
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
        <form onSubmit={onSubmit} method="post">
          <FormInput
            name="email"
            id="email"
            type="email"
            placeholder="Email anda"
            onChange={(e) => onChange(e)}
            className=""
            error={error.email}
          />

          <FormInput
            name="password"
            id="password"
            placeholder="Password anda"
            type="password"
            onChange={(e) => onChange(e)}
            className=""
            error={error.password}
          />

          <FormInput
            name="name"
            id="name"
            type="text"
            placeholder="Nama anda"
            onChange={(e) => onChange(e)}
            className=""
            error={error.name}
          />

          <FormInput
            name="address"
            id="address"
            placeholder="Alamat Lengkap "
            type="text"
            onChange={(e) => onChange(e)}
            className=""
            error={error.address}
          />

          <FormInput
            name="CompanyName"
            id="CompanyName"
            placeholder="Nama Instansi / Perusahaan "
            type="text"
            onChange={(e) => onChange(e)}
            className=""
            error={error.CompanyName}
          />

          <div className="grid grid-cols-3 gap-x-5">
            <FormInput
              name="city"
              id="city"
              placeholder="Kota"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
              error={error.city}
            />

            <FormInput
              name="districts"
              id="districts"
              placeholder="Kecamatan anda"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
              error={error.districts}
            />

            <FormInput
              name="village"
              id="village"
              placeholder="Keluruhan"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
              error={error.village}
            />

            <FormInput
              name="postCode"
              id="postCode"
              placeholder="Postal Code"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
              error={error.postCode}
            />
          </div>
          <FormInput
            name="PhoneNumber"
            id="phone"
            placeholder="No Tlp"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
            error={error.PhoneNumber}
          />

          <div className="flex flex-col items-center mt-2">
            <span>
              Dapatkan produk ukm berkualitas dengan penawaran terbaik
            </span>

            <button
              type="submit"
              className="p-1 px-10 mt-4 text-lg text-white bg-blue-100"
            >
              Dapatkan Sebagai Konsumen
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default RegisterKonsumen;

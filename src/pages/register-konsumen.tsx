import React, { useState } from "react";
import { Container } from "@material-ui/core";
import FormInput from "../components/input-container/input-container";
import router from "next/router";
import axios from "axios";
import styled from "styled-components";
import { NextSeo } from "next-seo";

const BgContainer = styled.div`
  background: url("/assets/bg-register2.jpg");
  min-height: 180vh;
  background-repeat: none;
`;
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
      const res = await axios.post("/v1/users/register", formData);
      router.push("/success");
      await axios.post(
        `${process.env.API_LARAVEL}/api/sendEmail`,
        {
          email: res.data.email,
          name: res.data.name,
          token: res.data.VerifyToken,
        },
        { withCredentials: false }
      );
    } catch (err) {
      setError(err.response.data);
    }

    setLoading(false);
  };
  return (
    <>
      <NextSeo
        title="Register Konsumens"
        description="Karya Nusantara adalah program konsolidasi produk UKM terpilih hasil kurasi yang menyelaraskan permintaan dari konsumen (B2B, B2G, dan B2E) dengan produk/jasa yang disediakan oleh UKM melalui pendampingan untuk menyetarakan standarisasi. Program ini didukung oleh UKMindonesia.id dan Kementerian Koperasi dan UKM RI."
        canonical="karyanusantara.co.id"
        openGraph={{
          url: "karyanusantara.co.id",
          title: "Register Konsumens",
          description:
            "Karya Nusantara adalah program konsolidasi produk UKM terpilih hasil kurasi yang menyelaraskan permintaan dari konsumen (B2B, B2G, dan B2E) dengan produk/jasa yang disediakan oleh UKM melalui pendampingan untuk menyetarakan standarisasi. Program ini didukung oleh UKMindonesia.id dan Kementerian Koperasi dan UKM RI.",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "Karya Nusantara ",
        }}
      />
      <BgContainer className="flex justify-center w-full bg-no-repeat bg-cover ">
        <Container
          maxWidth="xl"
          className="w-11/12 h-full px-5 py-5 mt-24 bg-white lg:mt-32 lg:w-1/2"
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
              {loading ? (
                <button
                  type="submit"
                  disabled
                  className="p-1 px-10 mt-4 text-lg text-white bg-blue-100 opacity-50"
                >
                  Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="p-1 px-10 mt-4 text-lg text-white bg-blue-100"
                >
                  Daftar Sebagai Konsumen
                </button>
              )}
            </div>
          </form>
        </Container>
      </BgContainer>
    </>
  );
}

export default RegisterKonsumen;

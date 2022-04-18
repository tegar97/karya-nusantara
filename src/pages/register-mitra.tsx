import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import FormInput from "../components/input-container/input-container";
import router from "next/router";
import axios from "axios";
import styled from "styled-components";
import { NextSeo } from "next-seo";
import { toast } from "react-toastify";

const BgContainer = styled.div`
  min-height: 100vh;
  background-repeat: none;
`;
function RegisterMitra() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ukmName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]: any = useState({});

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/auth/umkm/register", formData);

      router.push("/success");
      // await axios.post(
      //   `${process.env.API_LARAVEL}/api/sendEmail`,
      //   {
      //     email: res.data.email,
      //     name: res.data.name,
      //     token: res.data.VerifyToken,
      //   },
      //   { withCredentials: false }
      // );
    } catch (err) {
      toast.error(err.response.data.meta.message);
      setError(err.response.data.meta);
    }

    setLoading(false);
  };

  return (
    <>
      <NextSeo
        title="Register Mitra"
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
      <BgContainer className="flex justify-center w-full bg-no-repeat bg-cover container-box ">
        <Container
          maxWidth="xl"
          className="w-11/12 h-full px-5 py-5 mt-24 bg-white lg:mt-32 lg:w-1/2 shadow-2xl rounded-lg"
          style={{ borderRadius: "10px" }}
        >
          <div className="flex justify-center w-full ">
            <img
              width="300"
              height="300"
              className="object-cover "
              src="/assets/logo-nav-min.png"
            />
          </div>
          <form onSubmit={onSubmit} method="post">
            <FormInput
              name="ukmName"
              id="ukmName"
              type="text"
              placeholder="Nama Ukm"
              onChange={(e) => onChange(e)}
              className="py-3 rounded-lg mb-2"
            />

            <FormInput
              name="email"
              id="email"
              type="email"
              placeholder="Email "
              onChange={(e) => onChange(e)}
              className="py-3 rounded-lg mb-2"
            />
            <FormInput
              name="password"
              id="password"
              placeholder="Kata sandi "
              type="password"
              onChange={(e) => onChange(e)}
              className="py-3 rounded-lg mb-2"
            />

            <div className="flex flex-col items-center mt-5">
              <span>
                Dapatkan produk ukm berkualitas dengan penawaran terbaik
              </span>
              {loading ? (
                <button
                  type="submit"
                  disabled
                  className="p-1 px-10 mt-2 text-lg text-white bg-blue-100 opacity-50"
                >
                  Loading
                </button>
              ) : formData?.ukmName.length < 1 ||
                formData.email.length < 5 ||
                formData.password.length < 5 ? (
                <button
                  disabled
                  className="py-3 px-10 mt-4 text-lg  rounded-lg text-gray-400 bg-gray-300"
                >
                  Daftar
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-3 px-10 mt-4 text-lg  rounded-lg text-white bg-blue-100"
                >
                  Daftar
                </button>
              )}
            </div>
          </form>
        </Container>
      </BgContainer>
    </>
  );
}

export default RegisterMitra;

import { Container } from "@material-ui/core";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { RegisterContainer } from "../components/Register/Register.styles";
import RegisterBox from "../components/Register/RegisterBox.component";
import { NextSeo } from "next-seo";
import Head from "next/head";
function forgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios
        .post(
          `${process.env.API_LARAVEL}/api/verify-forgot-password`,
          {
            email: email,
          },
          { withCredentials: false }
        )
        .then((res) => {
          setSuccess(res.data.message);
        });
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }

    setLoading(false);
  };
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="forgot password,ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title="Lupa Password Akun"
        description="Lupa Password Akun"
        canonical="karyanusantara.co.id/forgot-password"
        openGraph={{
          url: "karyanusantara.co.id/forgot-password",
          title: "Lupa Password Akun",
          description: "Lupa Password Akun",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "Lupa Password Akun",
        }}
      />
      <Container
        maxWidth="lg"
        className="flex items-center justify-center"
        style={{ backgroundColor: "#ffff", minHeight: "100vh" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:px-20 py-36 ">
          <div className="w-full lg:col-span-2 lg:w-10/12 ">
            <h1 className="text-2xl font-medium text-center text-blue-100 lg:text-left">
              Lupa Password
            </h1>
            <form onSubmit={onSubmit}>
              <p className="text-red-500">{error}</p>

              {success ? (
                <h2 className="text-green-500">{success}</h2>
              ) : (
                <>
                  <div className="mt-5 text-sm">
                    <label
                      htmlFor="email"
                      className="block text-black "
                      style={{ fontSize: "1.05rem" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      autoFocus
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
                      placeholder="Email Anda"
                    ></input>
                  </div>
                  {loading ? (
                    <button
                      disabled
                      className="p-3 mt-3 text-blue-100 bg-gray-200 "
                    >
                      Loading ......
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="p-3 mt-3 text-white bg-blue-100 "
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </form>
          </div>

          <div className="order-first text-center lg:text-left lg:order-last">
            <Image
              src="/assets/logo-kn.png"
              alt="Logo Karya nusantara"
              width={200}
              height={200}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default forgotPassword;

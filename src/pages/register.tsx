import { Container } from "@material-ui/core";
import Image from "next/image";
import React from "react";
import { RegisterContainer } from "../components/Register/Register.styles";
import RegisterBox from "../components/Register/RegisterBox.component";
import { NextSeo } from "next-seo";
import Head from "next/head";
function register() {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title="Daftar"
        description="Daftar Akun Karya Nusantara"
        canonical="karyanusantara.co.id/register"
        openGraph={{
          url: "karyanusantara.co.id/register",
          title: "Produk Karya Nusantara",
          description: "Produk Karya Nusantara",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Daftar Akun Karya Nusantara",
            },
          ],
          site_name: "Daftar",
        }}
      />
      <Container
        maxWidth="lg"
        className="flex items-center justify-center"
        style={{ backgroundColor: "#ffff", minHeight: "100vh" }}
      >
        <RegisterBox />
      </Container>
    </>
  );
}

export default register;

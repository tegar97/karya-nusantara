import React from "react";
import { HeadingSecondary } from "../components/About/About.styled";
import Image from "next/image";
import { NextSeo } from "next-seo";
import Head from "next/head";
export async function getStaticProps() {
  const res = await fetch(`${process.env.API_LARAVEL}/api/client`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
function klien({ data }) {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title="klien Karya Nusantara"
        description="perusahaan yang telah kerja sama bersama kami"
        canonical="karyanusantara.co.id"
        openGraph={{
          url: "karyanusantara.co.id",
          title: "klien Karya Nusantara",
          description: "klien Karya Nusantara",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "klien Karya Nusantara",
        }}
      />
      <div className="px-10 lg:px-20 py-36">
        <div className="text-center">
          <HeadingSecondary className="text-center text-blue-100">
            Tentang kita
          </HeadingSecondary>
          <div className="mt-4">
            <span className="text-md">
              Berikut adalah perusahaan yang telah kerja sama bersama kami
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-3 lg:grid-cols-4">
          {data.data.map((data) => (
            <div className="p-2 text-center border border-blue-100 rounded-md hover:translate-y-8">
              <Image
                src={`${process.env.API_LARAVEL}/storage/${data.icon}`}
                width={200}
                height={200}
                alt="Klient 1"
                className="self-center mb-5 text-center"
              />
              <div className="text-center">
                <span>{data.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default klien;

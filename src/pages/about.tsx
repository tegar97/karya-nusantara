import axios from "axios";
import React, { useState } from "react";
import { HeadingSecondary } from "../components/About/About.styled";
import ScrollAnimation from "react-animate-on-scroll";
import Head from "next/head";
import { NextSeo } from "next-seo";

function about() {
  const [text, setText] = useState(
    "Karya Nusantara merupakan salah satu agregator dan konsolidator produk K-UMKM yang menjalankan fungsi pendampingan kualitas produk yang secara spesifik dan terstandar. Dengan pola ini, Karya Nusantara memungkinkan terjadinya distribusi proses produksi produk ke banyak pelaku K-UMKM untuk memenuhi permintaan skala besar atas produk dengan standar kualitas yang sama dan dikemas dalam satu payung merek bersama.Kehadiran Karya Nusantara telah terbukti bisa meningkatkan standar mutu produk yang dihasilkan oleh K-UMKM dalam jaringannya, dan disisi lain, juga membuat pembeli besar, dipercaya baik oleh pemerintah, BUMN, dan perusahaan suasta menjadi percaya bahwa ternyata K-UMKM juga bisa menghasilkan produk dengan standar kualitas dan harga yang berdaya saing.Berkomitmen untuk ambil peran dalam proses kurasi, konsolidasi bahan baku, dan konsolidasi standar mutu produk, perlahan Karya Nusantara terus mengembangkan cakupan kategori produk pada katalognya, dengan misi untuk menunjukkan ke banyak pihak bahwa produk #UKMPUNYASTANDAR dan kita bisa #banggabuatanindonesia."
  );

  return (
    <div className="px-10 py-5 lg:px-20 lg:py-36">
      <Head>
        <meta
          name="keywords"
          content="agregator dan konsolidator produk K-UMKM ,ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title="Tentang Karya Nusantara"
        description={text}
        canonical="karyanusantara.co.id/about"
        openGraph={{
          url: "karyanusantara.co.id/about",
          title: "Tentang Karya Nusantara",
          description: text,
          images: [
            {
              url: "favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "Tentang Karya Nusantara",
        }}
      />

      <div>
        <div className="text-center">
          <h2 className="w-full col-span-3 text-3xl font-bold text-center lg:col-span-1 lg:-col-span-1 lg:text-4xl text-grey-100 hover:text-blue-100">
            Tentang Kami
          </h2>
        </div>

        <div className="w-full mt-5">
          <div>
            <div className="flex justify-center lg:block lg:text-left">
              <img
                src="/assets/logo-kn.png"
                className="w-40 m-3 text-center lg:w-64 lg:float-left "
                alt="logo karyanusantara"
              />
            </div>
            <div>
              <p className="text-lg lg:text-2xl">
                <span className="lg:ml-10 ">Karya Nusantara </span>
                merupakan salah satu agregator dan konsolidator produk K-UMKM
                yang menjalankan fungsi pendampingan kualitas produk yang secara
                spesifik dan terstandar.
              </p>
              <p className="mt-5 text-lg lg:text-2xl">
                <span className="lg:ml-10 ">
                  Dengan pola ini, Karya Nusantara{" "}
                </span>
                memungkinkan terjadinya distribusi proses produksi produk ke
                banyak pelaku K-UMKM untuk memenuhi permintaan skala besar atas
                produk dengan standar kualitas yang sama dan dikemas dalam satu
                payung merek bersama.
              </p>
              <p className="mt-5 text-lg lg:mt-20 lg:text-2xl">
                <span className="lg:ml-10 ">Kehadiran Karya Nusantara</span>
                telah terbukti bisa meningkatkan standar mutu produk yang
                dihasilkan oleh K-UMKM dalam jaringannya, dan disisi lain, juga
                membuat pembeli besar, dipercaya baik oleh pemerintah, BUMN, dan
                perusahaan suasta menjadi percaya bahwa ternyata K-UMKM juga
                bisa menghasilkan produk dengan standar kualitas dan harga yang
                berdaya saing.
              </p>
              <p className="mt-5 text-lg lg:mt-5 lg:text-2xl">
                <span className="lg:ml-10 ">
                  {" "}
                  Berkomitmen untuk ambil peran dalam proses kurasi
                </span>
                , konsolidasi bahan baku, dan konsolidasi standar mutu produk,
                perlahan Karya Nusantara terus mengembangkan cakupan kategori
                produk pada katalognya, dengan misi untuk menunjukkan ke banyak
                pihak bahwa produk #UKMPUNYASTANDAR dan kita bisa
                #banggabuatanindonesia.
              </p>
            </div>
          </div>
          <div className="mt-20">
            <div>
              <img src="/assets/about_image.png" />
            </div>
            {/* <div className="text-center normal-case ">
              <HeadingSecondary className="text-lg text-blue-100 lg:text-3xl ">
                Keuntungan Memesan di Karya Nusantara
              </HeadingSecondary>
            </div> */}
            {/* <ScrollAnimation animateIn="fadeIn">
              <div className="mt-10">
                <div className="grid w-full lg:grid-cols-4 ">
                  <div className="mb-5 border-2 border-blue-100 lg:mb-0 lg:p-3">
                    <img src="/assets/ikon-1.png" alt="icon 1" />
                  </div>

                  <div className="flex flex-col lg:ml-10 lg:col-span-3">
                    <div className="text-center lg:text-left">
                      <span className="text-xl font-bold text-blue-100 lg:text-2xl text-bold">
                        Produk UKM Pilihan
                      </span>
                    </div>
                    <p className="mt-5 text-xl">
                      Di buat di UKM pilihan yang sudah melalui tahap kurasi
                      produk.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeIn">
              <div className="mt-10">
                <div className="grid w-full lg:grid-cols-4 ">
                  <div className="p-3 mb-5 border-2 border-blue-100 lg:mb-0">
                    <img src="/assets/ikon-2.png" alt="icon 1" />
                  </div>

                  <div className="flex flex-col lg:ml-10 lg:col-span-3">
                    <div className="text-center lg:text-left">
                      <span className="text-xl font-bold text-blue-100 lg:text-2xl text-bold">
                        Penyelarasan Kualitas
                      </span>
                    </div>
                    <p className="mt-2 text-xl lg:mt-5">
                      Karya Nusantara mendampingi UKM dalam penyelarasan produk
                      dan komitmen untuk menyelesaikannya tepat waktu.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animateIn="fadeIn">
              <div className="mt-10">
                <div className="grid w-full lg:grid-cols-4 ">
                  <div className="p-3 mb-5 border-2 border-blue-100 lg:mb-0">
                    <img src="/assets/ikon-3.png" alt="icon 1" />
                  </div>

                  <div className="flex flex-col lg:ml-10 lg:col-span-3">
                    <div className="text-center lg:text-left">
                      <span className="text-xl font-bold text-blue-100 lg:text-2xl text-bold">
                        Kemudahan Proses
                      </span>
                    </div>
                    <p className="mt-5 text-xl">
                      Menyediakan berbagai macam kebutuhan dalam satu wadah.
                      Tidak perlu buang waktu, tenaga dan biaya untuk
                      berhubungan dengan banyak vendor.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default about;

import axios from "axios";
import React, { useState } from "react";
import { HeadingSecondary } from "../components/About/About.styled";
import ScrollAnimation from "react-animate-on-scroll";
import Head from "next/head";
import { NextSeo } from "next-seo";

function about() {
  const [text, setText] = useState(
    "program konsolidasi produk UKM terpilih hasil kurasi yang menyelaraskan permintaan dari konsumen (B2B, B2G, dan B2E) dengan produk/jasa yang disediakan oleh UKM melalui pendampingan untuk menyetarakan standarisasi. Program ini didukung oleh UKMindonesia.id dan Kementerian Koperasi dan UKM RI."
  );
  const [text2, setText2] = useState(
    "Karya Nusantara </span> berkomitmenuntuk selalu memberi produk dengan standar kualitas yang baik.Kehadiran kami diharapkan dapat membuka akses pasar untuk UKMsehingga dapat menjadi tuan rumah di negeri sendiri.#banggabuatanindonesia"
  );
  return (
    <div className="px-10 py-5 lg:px-20 lg:py-36">
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
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
          <HeadingSecondary className="text-blue-100">
            Tentang Kami
          </HeadingSecondary>
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
                <span className="lg:ml-10 ">Karya Nusantara </span> adalah
                program konsolidasi produk UKM terpilih hasil kurasi yang
                menyelaraskan permintaan dari konsumen (B2B, B2G, dan B2E)
                dengan produk/jasa yang disediakan oleh UKM melalui pendampingan
                untuk menyetarakan standarisasi. Program ini didukung oleh
                UKMindonesia.id dan Kementerian Koperasi dan UKM RI.
              </p>
              <p className="mt-5 text-lg lg:mt-40 lg:text-2xl">
                <span className="lg:ml-10">Karya Nusantara </span> berkomitmen
                untuk selalu memberi produk dengan standar kualitas yang baik.
                Kehadiran kami diharapkan dapat membuka akses pasar untuk UKM
                sehingga dapat menjadi tuan rumah di negeri sendiri.
                #banggabuatanindonesia
              </p>
            </div>
          </div>
          <div className="mt-20">
            <div className="text-center normal-case ">
              <HeadingSecondary className="text-lg text-blue-100 lg:text-3xl ">
                Keuntungan Memesan di Karya Nusantara
              </HeadingSecondary>
            </div>
            <ScrollAnimation animateIn="fadeIn">
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
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}

export default about;

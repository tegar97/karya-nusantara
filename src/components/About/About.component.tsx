import React from "react";
import {
  HeadingSecondary,
  AboutHeading,
  ReadMore,
  Composition,
  CompositionPhoto1,
  CompositionPhoto2,
  CompositionPhoto3,
} from "./About.styled";

function About({ image }) {
  return (
    <div
      className="px-10 pt-16 pb-40 lg:pt-24 lg:px-24 lg:pb-60"
      style={{ backgroundColor: "var(--color-background" }}
    >
      <HeadingSecondary className="text-center text-blue-100">
        Tentang kita
      </HeadingSecondary>
      <div className="grid w-full grid-cols-1 mt-10 lg:mt-20 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <AboutHeading className="text-lg text-blue-100 lg:text-2xl">
            Apa Itu Karya Nusantara ?
          </AboutHeading>
          <p className="mt-4 text-md">
            Karya Nusantara adalah program konsolidasi produk UKM dengan
            menyelaraskan permintaan dari konsument (B2B,B2G,dan B2E) dengan
            produk / jasa yang disediakan oleh UKM melalui pendampingan untuk
            menyetarakn standirasi. Program ini merupakan didukung oleh
            UKMindonesia.id dan kementrian Koperasi dan UKM RI.
          </p>

          {/* <ReadMore className="mt-5 text-blue-100">
            Lihat Selengkapnya &rarr;{" "}
          </ReadMore> */}
        </div>

        <div className="mt-20 md:mt-0">
          <Composition>
            <CompositionPhoto1
              alt="photo 1 "
              src={`${process.env.API_LARAVEL}/storage/${image[0].about_img1}`}
            ></CompositionPhoto1>
            <CompositionPhoto2
              alt="photo 2 "
              src={`${process.env.API_LARAVEL}/storage/${image[0].about_img2}`}
            ></CompositionPhoto2>
            <CompositionPhoto3
              alt="photo 3 "
              src={`${process.env.API_LARAVEL}/storage/${image[0].about_img3}`}
            ></CompositionPhoto3>
          </Composition>
        </div>
      </div>
    </div>
  );
}

export default About;

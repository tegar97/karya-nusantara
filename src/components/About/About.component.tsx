import React from "react";
import {
  HeadingSecondary,
  AboutHeading,
  ReadMore,
  Composition,
  CompositionPhoto,
} from "./About.styled";

function About() {
  return (
    <div
      className="p-20 mt-3"
      style={{ backgroundColor: "var(--color-background" }}
    >
      <HeadingSecondary className="text-center ">
        Tentang Karya Nusantara
      </HeadingSecondary>
      <div className="grid w-full grid-cols-2 mt-20">
        <div>
          <AboutHeading className="text-2xl">
            Apa Itu Karya Nusantara ?
          </AboutHeading>
          <p className="mt-4 text-md">
            Karya Nusantara adalah program konsolidasi produk UKM dengan
            menyelaraskan permintaan dari konsument (B2B,B2G,dan B2E) dengan
            produk / jasa yang disediakan oleh UKM melalui pendampingan untuk
            menyetarakn standirasi. Program ini merupakan didukung oleh
            UKMindonesia.id dan kementrian Koperasi dan UKM RI.
          </p>

          <ReadMore className="mt-5">Lihat Selengkapnya &rarr; </ReadMore>
        </div>

        <div>
          <Composition>
            <CompositionPhoto
              src="/assets/foto1.jpg"
              style={{ left: "10%", top: "-1rem" }}
            ></CompositionPhoto>
            <CompositionPhoto
              src="/assets/foto2.jpg"
              style={{ left: "45%", top: "1.3rem" }}
            ></CompositionPhoto>
            <CompositionPhoto
              src="/assets/foto3.jpg"
              style={{ left: "20%", top: "6.2rem" }}
            ></CompositionPhoto>
          </Composition>
        </div>
      </div>
    </div>
  );
}

export default About;

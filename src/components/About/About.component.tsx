import Link from "next/link";
import React from "react";
import FadeInAnimation from "../gsap/FadeIn";
import {
  HeadingSecondary,
  AboutHeading,
  ReadMore,
  Composition,
  CompositionPhoto1,
  CompositionPhoto2,
  CompositionPhoto3,
} from "./About.styled";
import ScrollAnimation from "react-animate-on-scroll";

function About({ image }) {
  return (
    <div
      className="px-10 pt-8 pb-20 lg:pt-10 lg:px-24 lg:pb-40"
      style={{ backgroundColor: "var(--color-background" }}
    >
      <HeadingSecondary className="text-center text-blue-100">
        Tentang kita
      </HeadingSecondary>

      <div className="grid w-full grid-cols-1 mt-10 lg:mt-20 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <ScrollAnimation animateIn="fadeIn">
            <FadeInAnimation direction="left">
              <p className="mt-4 text-md">
                Karya Nusantara adalah program konsolidasi produk UKM terpilih
                hasil kurasi yang menyelaraskan permintaan dari konsumen (B2B,
                B2G, dan B2E) dengan produk/jasa yang disediakan oleh UKM
                melalui pendampingan untuk menyetarakan standardisasi. Program
                ini didukung oleh UKMindonesia.id dan Kementerian Koperasi dan
                UKM RI.
              </p>
            </FadeInAnimation>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn">
            <FadeInAnimation direction="up">
              <Link href="/about">
                <ReadMore className="mt-5 text-blue-100">
                  Lihat Selengkapnya &rarr;
                </ReadMore>
              </Link>
            </FadeInAnimation>
          </ScrollAnimation>
        </div>

        <div className="mt-20 md:mt-0">
          <ScrollAnimation animateIn="fadeIn">
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
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}

export default About;

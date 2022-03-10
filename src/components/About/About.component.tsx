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
      className="px-10 pt-8 pb-20 lg:pt-10 lg:px-24 lg:pb-40 bg-white"
    >
     
      <div style={{maxWidth: 1200,position: 'relative',margin: '0 auto'}}  > 
         <h2 className="w-full text-3xl font-bold text-center cursor-pointer lg:text-4xl xl:text-5xl text-grey-100 hover:text-blue-100">
        Tentang Kita
      </h2>
      <div className="grid w-full grid-cols-1 mt-10 lg:mt-20 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1" >
        <div>
          <ScrollAnimation animateIn="fadeIn">
            <FadeInAnimation direction="left">
              <p className="mt-4 ">
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

        <div className="mt-20 lg:mt-0">
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
    </div>
  );
}

export default About;

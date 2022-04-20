import Head from "next/head";
import About from "../components/About/About.component";
import Client from "../components/Client/Client.component";
import FooterComponent from "../components/Footer/Footer.component";
import Hero from "../components/Hero/Hero.component";
import OurMitra from "../components/Mitra/Mitra.component";
import ProductCategory from "../components/product-category/product-category.component";
import Rfq from "../components/Request-For-quantity/Rfq.components";
import ScrollAnimation from "react-animate-on-scroll";
import { NextSeo } from "next-seo";
import { Html } from "next/document";
import ProductCategoryMobile from "../components/product-category/product-category.mobile";
import BestProduct from "../components/bestProduct/bestProduct";
import Feature from "../components/feature/feature";
import RfqMobile from "../components/Request-For-quantity/rfq-mobile.component";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_LARAVEL}/api/settings`);
  const res2 = await fetch(`${process.env.API_LARAVEL}/api/setting-carousel`);

  const data = await res.json();
  const data2 = await res2.json();

  return {
    props: { data, data2 },
    revalidate: 10, // will be passed to the page component as props
  };
}

export default function Home({ data, data2 }) {
  return (
    <div>
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, kerja sama ukm,umks indonesia, karya nusantara,jual,beli,ukm"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NextSeo
        title="Karya Nusantara - Ragam Solusi Berkualitas Hasil Karya UKM Lokal Indonesia"
        description={data[0].web_description}
        canonical="karyanusantara.co.id"
        openGraph={{
          url: "karyanusantara.co.id",
          title:
            "Karya Nusantara - Ragam Solusi Berkualitas Hasil Karya UKM Lokal Indonesia",
          description: `${data[0].web_description}`,
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

      {/* <Hero />
      <About image={data} /> */}
      <div className="hidden lg:block md:hidden mt-20">
        <ProductCategory data2={data2} />
      </div>
      <div className="block lg:hidden md:block">
        <ProductCategoryMobile />
      </div>
      <div className="block lg:lock ">
        <BestProduct />
      </div>
      <div className="hidden lg:block md:hidden mt-10">
        <ScrollAnimation animateIn="fadeIn">
          <Rfq />
        </ScrollAnimation>
      </div>
      <div className="block lg:hidden md:block">
        <ScrollAnimation animateIn="fadeIn">
          <RfqMobile />
        </ScrollAnimation>
      </div>

      <ScrollAnimation animateIn="fadeIn" >
        <Feature />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn">
        <Client />
      </ScrollAnimation>

      <OurMitra />
    </div>
  );
}

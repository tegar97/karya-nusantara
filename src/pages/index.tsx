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

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_LARAVEL}/api/settings`);
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

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title="Karya Nusantara"
        description={data[0].web_description}
        canonical="karyanusantara.co.id"
        openGraph={{
          url: "karyanusantara.co.id",
          title: "Karya Nusantara",
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

      <Hero />
      <About image={data} />
      <div className="hidden lg:block">
        <ProductCategory />
      </div>
      <div className="block lg:hidden">
        <ProductCategoryMobile />
      </div>
      <ScrollAnimation animateIn="fadeIn">
        <Rfq />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn">
        <Client />
      </ScrollAnimation>

      <OurMitra />
    </div>
  );
}

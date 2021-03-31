import Head from "next/head";
import About from "../components/About/About.component";
import Hero from "../components/Hero/Hero.component";
import ProductCategory from "../components/product-category/product-category.component";
import Rfq from "../components/Request-For-quantity/rfq.components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Karya Nusantra</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
      <ProductCategory />
      <Rfq />
    </div>
  );
}

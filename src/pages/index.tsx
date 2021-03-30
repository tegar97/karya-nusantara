import Head from "next/head";
import About from "../components/About/About.component";
import Hero from "../components/Hero/Hero.component";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Karya Nusantra</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
    </div>
  );
}

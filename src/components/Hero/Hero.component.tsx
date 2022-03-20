import Link from "next/link";
import ReactPlayer from "react-player";
import styles from "./Hero.module.css";
function Hero() {
  return (
    <div className={styles.HeroContainer}>
      <div
        className={`flex items-center justify-center h-full HeroTextContainer relative`}
      >
        <img src="/assets/daun2.png" className={styles.daun} alt="hero" />
        <div className="text-center  ">
          <h1
            style={{ textShadow: "1px 1px 1px white" }}
            className="mb-5 text-xl font-extrabold text-white md:text-3xl lg:text-5xl xl:text-5xl "
          >
            Ragam Solusi Berkualitas Hasil <br />
            Karya UKM Lokal Indonesia
          </h1>
          <Link href="/product">
            <button
              className="p-3 font-bold bg-white border-black rounded-md cursor-pointer"
              style={{ color: "var(--color-primary)", opacity: "80%" }}
            >
              "UKM Punya Standar"
            </button>
          </Link>
        </div>
      
      </div>
    </div>
  );
}

export default Hero;

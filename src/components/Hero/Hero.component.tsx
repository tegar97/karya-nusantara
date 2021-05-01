import styles from "./Hero.module.css";
function Hero() {
  return (
    <div className={styles.HeroContainer}>
      <div className="flex items-center justify-center h-full">
        <img src="/assets/daun2.png" className={styles.daun} alt="hero" />

        <div className="text-center ">
          <h1 className="mb-5 text-3xl font-extrabold text-white lg:text-5xl ">
            Ragam Solusi Berkualitas Hasil <br />
            Karya UKM Lokal Indonesia
          </h1>
          <span
            className="p-3 font-bold bg-white border-black"
            style={{ color: "var(--color-primary)" }}
          >
            "UKM Punya Standar"
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hero;

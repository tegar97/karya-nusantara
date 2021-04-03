import styles from "./Hero.module.css";
function Hero() {
  return (
    <div className={styles.HeroContainer}>
      <div className="flex items-center justify-center h-full">
        <img src="/assets/DauntPutih.png" className={styles.daun} />

        <div className="text-center ">
          <h1 className="mb-5 text-5xl font-extrabold text-white ">
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

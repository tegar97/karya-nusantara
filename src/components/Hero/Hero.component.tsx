import type { AppProps } from "next/app";
import styles from "./Hero.module.css";
function Hero() {
  return (
    <div className={styles.tes}>
      <div className="flex items-center justify-center h-full">
        <img src="/assets/DauntPutih.png" className={styles.daun} />

        <div style={{ zIndex: 2 }} className="relative text-center">
          <h1 className="mb-2 mb-5 text-5xl font-extrabold text-white">
            Ragam Solusi Berkualitas Hasil <br />
            Karya UKM Lokal Indonesia
          </h1>
          <span className="p-3 bg-white ">"UKM Punya Standar"</span>
        </div>
      </div>
    </div>
  );
}

export default Hero;

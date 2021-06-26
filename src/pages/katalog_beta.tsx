import React, { useState, useRef, useEffect } from "react";
import BorderBottom from "../components/border-bottom/border-bottom";
import KatalogItems from "../components/katalog-items/katalog-items";
import ProductSearch from "../components/product-search/product-search.component";
import { ReactSVG } from "react-svg";
import ScrollAnimation from "react-animate-on-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import FadeInAnimation from "../components/gsap/FadeIn";
import { ImageFilter } from "../components/image-manipulation/image-manipulation";
FadeInAnimation;
function KatalogBeta() {
  const itemContainerRef = useRef();
  const [fixPosition, setFixPosition] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeBox);

    return () => {
      window.removeEventListener("scroll", changeBox);
    };
  }, []);

  const changeBox = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 300) {
      setFixPosition(true);
    } else {
      setFixPosition(false);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="w-full lg:py-20 lg:px-16"
    >
      <div
        className={`flex flex-col justify-center w-full mt-10 lg:px-60  transition duration-700 ease-in  ${
          fixPosition &&
          "  border-2  border-blue-100 z-10 bg-white lg:py-10 top-10 "
        }`}
      >
        <div className="grid grid-cols-4 gap-x-10 gap-y-5 lg:grid-cols-5">
          <div className="relative w-full cursor-pointer group ">
            <ImageFilter
              className="w-full transition duration-700 ease-in "
              src="/assets/icon biru 1.png"
              alt="Logo "
            />
            <div className="absolute z-10 w-40 p-0 px-2 py-2 duration-300 bg-white border-2 border-blue-100 opacity-0 -bottom-20 transation group-hover:opacity-100">
              <ul className="w-full ">
                <li className="text-sm hover:text-blue-100">Mukena</li>
                <li className="text-sm hover:text-blue-100">Gamis </li>
                <li className="text-sm hover:text-blue-100">Rompi</li>
                <li className="text-sm hover:text-blue-100">Mukena</li>
              </ul>
            </div>
          </div>

          {/* <svg>
            <use href="/assets/icon_biru_1.svg"></use>
          </svg> */}
          <ImageFilter
            className="w-full transition duration-700 ease-in "
            src="/assets/icon biru 2.png"
            alt="Logo "
          />
          <ImageFilter
            className="w-full transition duration-700 ease-in "
            src="/assets/icon biru 3.png"
            alt="Logo "
          />
          <ImageFilter
            className="w-full transition duration-700 ease-in "
            src="/assets/icon biru 4.png"
            alt="Logo "
          />
          <ImageFilter
            className="w-full transition duration-700 ease-in "
            src="/assets/icon biru 5.png"
            alt="Logo "
          />
        </div>
        <div className="mt-3">
          <ProductSearch onSearch={() => console.log("searcg")} />
        </div>
      </div>
      <div className="px-10 mt-10">
        <div>
          <span className="text-lg font-bold ">Alat Pelindung diri</span>
          <BorderBottom />
        </div>
        <div
          ref={itemContainerRef}
          className="grid gap-5 mt-10 lg:grid-cols-4 gap-y-11 "
        >
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
          <div data-aos="fade-up">
            <KatalogItems />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KatalogBeta;

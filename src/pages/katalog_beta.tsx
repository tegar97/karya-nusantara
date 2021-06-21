import React, { useRef } from "react";
import BorderBottom from "../components/border-bottom/border-bottom";
import KatalogItems from "../components/katalog-items/katalog-items";
import ProductSearch from "../components/product-search/product-search.component";

import FadeInAnimation from "../components/gsap/FadeIn";
FadeInAnimation;
function KatalogBeta() {
  const itemContainerRef = useRef();
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="py-20 lg:px-14 "
    >
      <div className="flex flex-col justify-center w-full mt-10 lg:px-60">
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 lg:grid-cols-5">
          <img className="w-full " src="/assets/APD-ICON.png" alt="Logo " />
          <img
            className="w-full "
            src="/assets/product-unggulan.png"
            alt="Logo "
          />
          <img className="w-full " src="/assets/souvenir.png" alt="Logo " />
          <img
            className="w-full "
            src="/assets/Perkonveksiann.png"
            alt="Logo "
          />
          <img
            className="w-full "
            src="/assets/Perkonveksiann.png"
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
        <div ref={itemContainerRef} className="grid gap-5 mt-10 lg:grid-cols-4">
          <FadeInAnimation itemContainerRef={itemContainerRef} direction="up">
            <KatalogItems />
          </FadeInAnimation>
          <FadeInAnimation itemContainerRef={itemContainerRef} direction="up">
            <KatalogItems />
          </FadeInAnimation>
          <FadeInAnimation itemContainerRef={itemContainerRef} direction="up">
            <KatalogItems />
          </FadeInAnimation>
          <FadeInAnimation itemContainerRef={itemContainerRef} direction="up">
            <KatalogItems />
          </FadeInAnimation>
          <FadeInAnimation itemContainerRef={itemContainerRef} direction="up">
            <KatalogItems />
          </FadeInAnimation>
          <FadeInAnimation itemContainerRef={itemContainerRef} direction="up">
            <KatalogItems />
          </FadeInAnimation>
          <FadeInAnimation itemContainerRef={itemContainerRef} direction="up">
            <KatalogItems />
          </FadeInAnimation>
        </div>
      </div>
    </div>
  );
}

export default KatalogBeta;

import React, { useEffect } from "react";
import { TweenLite } from "gsap";

function KatalogItems() {
  return (
    <div id="ui" className="flex flex-col w-full cursor-pointer">
      <div>
        <img
          src="https://www.bikin.co/konveksi-baju/wp-content/uploads/elementor/thumbs/Baju-Polo-Bikin.co_-oyxo54mrtn7dfboharrrsxbc2bban7lc2ni4kumtvc.jpg"
          className="object-cover w-full"
          alt="product thumbnail"
        />
      </div>
      <div className="flex flex-col text-center">
        <h2 className="font-bold text-blue-100">Masker Kain 3 lapis</h2>
        <span className="font-regular">Rp.5000 - /sd Rp.85000</span>
      </div>
    </div>
  );
}

export default KatalogItems;

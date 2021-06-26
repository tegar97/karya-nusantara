import React from "react";
import BorderBottom from "../border-bottom/border-bottom";
import KatalogItems from "../katalog-items/katalog-items";

function ProductItems() {
  return (
    <div className="px-10 mt-10">
      <div>
        <span className="text-lg font-bold ">Alat Pelindung diri</span>
        <BorderBottom />
      </div>
      <div className="grid gap-5 mt-10 lg:grid-cols-4 gap-y-11 ">
        <div data-aos="fade-up">
          <KatalogItems />
        </div>
      </div>
    </div>
  );
}

export default ProductItems;

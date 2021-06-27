import React from "react";
import BorderBottom from "../border-bottom/border-bottom";
import KatalogItems from "../katalog-items/katalog-items";

function ProductItems({ data }) {
  return (
    <div key={data.category.id} className="px-10 mt-10">
      <div>
        <span className="text-lg font-bold capitalize">
          {data.category.name}
        </span>
        <BorderBottom />
      </div>
      <div className="grid gap-5 mt-10 lg:grid-cols-4 gap-y-11 ">
        {data.data.map((data, i) => (
          <KatalogItems key={i} data={data} />
        ))}
      </div>
    </div>
  );
}

export default ProductItems;

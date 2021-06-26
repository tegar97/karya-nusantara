import React from "react";
import BorderBottom from "../border-bottom/border-bottom";
import KatalogItems from "../katalog-items/katalog-items";

function ProductItems({ data }) {
  return (
    <div className="px-10 mt-10">
      <div>
        <span className="text-lg font-bold capitalize">
          {data.category.name}
        </span>
        <BorderBottom />
      </div>
      <div className="grid gap-5 mt-10 lg:grid-cols-4 gap-y-11 ">
        {data.data
          // .filter((product) => {
          //   console.log(product.data);
          //   if (search == "") {
          //     return product;
          //   } else if (
          //     product.name.toLowerCase().includes(search.toLowerCase())
          //   ) {
          //     return product;
          //   }
          // })
          .map((data, i) => (
            <KatalogItems key={i} data={data} />
          ))}
      </div>
    </div>
  );
}

export default ProductItems;

import { Skeleton } from "@mui/material";
import React from "react";
import BorderBottom from "../border-bottom/border-bottom";
import KatalogItems from "../katalog-items/katalog-items";

function ProductItems({ data, loading }) {

    return (
      <div key={data.id} className="mt-10 ">
        <div>
          <span className="text-lg font-bold capitalize">
            {data.categoryName}
          </span>
          <BorderBottom />
        </div>
        <div className="grid gap-5 mt-10 lg:grid-cols-4 gap-y-11 ">
          {data.product.map((data, i) => (
            <KatalogItems key={i} data={data} loading={loading} />
          ))}
        </div>
      </div>
    );
  }
  


export default ProductItems;

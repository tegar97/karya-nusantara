import React, { useEffect, useState } from "react";

import ProductSideBar from "../components/Product-sidebar/Product-sidebar";
import { useRouter } from "next/router";
import { ProductJSON } from "./../Data/productData";
import ProductSideBarItems from "../components/product-sidebar-items/product-sidebar-items";
import Katalog from "../components/katalog/katalog.component";
import ProductSearch from "../components/product-search/product-search.component";
export const getStaticProps = async () => {
  return {
    props: {
      product: ProductJSON,
    }, // will be passed to the page component as props
  };
};
function Product({ product }) {
  const router = useRouter();
  const [getData, setGetData] = useState(null);
  const { category, sc, all } = router.query;

  const getProduct = () => {
    router.push("/?category=1", "/product?category=1", { shallow: true });
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5f5", minHeight: "100vh" }}>
      <div className="grid grid-cols-5 px-20 py-40 ">
        <div>
          <ProductSideBar>
            {product.map((data) => (
              <ProductSideBarItems
                setGetData={setGetData}
                key={data.id}
                product={data}
              />
            ))}
          </ProductSideBar>
        </div>
        <div className="col-span-4 ml-5">
          <div className="mb-5">
            <ProductSearch />
          </div>

          <div className="grid w-full grid-cols-3 gap-5">
            {!all && category
              ? product
                  .filter((p) => p.id == category)
                  .map((p) =>
                    p.subCategory
                      .filter((data) => data.id == sc)
                      .map((item) =>
                        item.items.map((itemData) => (
                          <Katalog key={itemData.id} product={itemData} />
                        ))
                      )
                  )
              : ""}
          </div>

          {!sc && !all && !category ? (
            <div className="grid w-full grid-cols-3 gap-5">
              {product.map((data) => (
                <Katalog product={data} />
              ))}
            </div>
          ) : (
            ""
          )}
          {all || (category && !sc) ? (
            <div className="grid w-full grid-cols-3 gap-5">
              {product
                .filter((p) => p.id == category)
                .map((p) =>
                  p.subCategory.map((category) => (
                    <Katalog key={category.id} product={category} />
                  ))
                )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;

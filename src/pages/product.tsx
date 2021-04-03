import React, { useEffect, useState } from "react";

import ProductSideBar from "../components/Product-sidebar/Product-sidebar";
import { useRouter } from "next/router";
import { ProductJSON } from "./../Data/productData";
import ProductSideBarItems from "../components/product-sidebar-items/product-sidebar-items";

export const getStaticProps = async () => {
  return {
    props: {
      product: ProductJSON,
    }, // will be passed to the page component as props
  };
};
function Product({ product }) {
  const router = useRouter();

  const getProduct = () => {
    router.push("/?category=1", "/product?category=1", { shallow: true });
  };
  return (
    <div style={{ backgroundColor: "#f5f5f5f5", minHeight: "100vh" }}>
      <div className="grid grid-cols-5 px-20 py-40 ">
        <div>
          <ProductSideBar>
            {product.map((data) => (
              <ProductSideBarItems key={data.id} product={data} />
            ))}
          </ProductSideBar>
        </div>
        <div className="col-span-2">Product S</div>
      </div>
    </div>
  );
}

export default Product;

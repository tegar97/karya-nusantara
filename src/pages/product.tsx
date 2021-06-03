import React, { useEffect, useState } from "react";

import ProductSideBar from "../components/Product-sidebar/Product-sidebar";
import { useRouter } from "next/router";
import { ProductJSON } from "./../Data/productData";
import ProductSideBarItems from "../components/product-sidebar-items/product-sidebar-items";
import Katalog from "../components/katalog/katalog.component";
import ProductSearch from "../components/product-search/product-search.component";
import axios from "axios";
import useSWR from "swr";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import Pagination from "../components/pagination/pagination.component";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { NextSeo } from "next-seo";
import Head from "next/head";
import CatalogMobile from "./../components/catalog-mobile/catalog-mobile.component";
// export const getStaticProps = async () => {
//   const router = useRouter();

//   const { category, sc, all } = router.query;

//   const res = await fetch(`http://127.0.0.1:8000/api/category`);
//   const res2 = await fetch(`http://127.0.0.1:8000/api/product/${category}`);
//   const data = await res.json();
//   const data2 = await res2.json();
//   return {
//     props: {
//       categoryData: data,
//       productData: data2,
//       product: ProductJSON,
//     }, // will be passed to the page component as props
//   };
// };

//ts-ignore
const fetcher = (
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
): any => fetch(...args).then((res) => res.json());

function Product() {
  const router = useRouter();
  const [getData, setGetData] = useState(null);
  const [getProduct, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { category, sc, all } = router.query;
  const onSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  // const getProduct = () => {
  //   router.push("/?category=1", "/product?category=1", { shallow: true });
  // };
  const { data: product, error } = useSWR(
    `${
      search == ""
        ? `${process.env.API_LARAVEL}/api/product/${category}?page=${page}`
        : `${process.env.API_LARAVEL}/api/product/`
    }`,
    fetcher
  );
  const { data: categoryData, error: errorCategory } = useSWR(
    `${process.env.API_LARAVEL}/api/category/`,
    fetcher
  );

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title="Produk Karya Nusantara"
        description="Produk Karya Nusantara"
        canonical="karyanusantara.co.id/product"
        openGraph={{
          url: "karyanusantara.co.id/product",
          title: "Produk Karya Nusantara",
          description: "Produk Karya Nusantara",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "Produk Karya Nusantara",
        }}
      />
      <div style={{ backgroundColor: "#f5f5f5f5", minHeight: "100vh" }}>
        <div className="grid w-full grid-cols-1 px-5 py-5 lg:px-20 lg:py-32 lg:grid-cols-5 ">
          <div className="hidden lg:block">
            <ProductSideBar>
              {!categoryData
                ? "Loading ...."
                : categoryData.data.category.data.map((data) => (
                    <ProductSideBarItems
                      setGetData={setGetData}
                      getData={getData}
                      key={data.id}
                      product={data}
                    />
                  ))}
            </ProductSideBar>
          </div>
          <div className="lg:ml-5 lg:col-span-4">
            <div className="px-2 mb-5">
              <ProductSearch onSearch={onSearch} />
            </div>
            <CatalogMobile
              setGetData={setGetData}
              getData={getData}
              categoryData={categoryData}
            />
            <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3">
              {/* {!all && category
              ? product.data.map((data) => (
                  <Katalog product={data} isCategory="true" />
                ))
              : ""} */}
            </div>

            {!sc && !all && !category && categoryData && search == "" ? (
              <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-3">
                {categoryData.data.category.data.map((data) => (
                  <Katalog key={data.id} product={data} isCategory="true" />
                ))}
              </div>
            ) : (
              ""
            )}
            <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-4">
              {!product ? (
                <SkeletonTheme color="#fffff" highlightColor="#ffff">
                  <p>
                    <Skeleton count={3} />
                  </p>
                </SkeletonTheme>
              ) : all || (category && !sc) || search.length > 1 ? (
                <>
                  <>
                    {!product ? (
                      "....."
                    ) : product.data.product.data.length == 0 ? (
                      <h1>Tidak Ada Produk dengan kategori tersebut </h1>
                    ) : (
                      product.data.product.data
                        .filter((product) => {
                          if (search == "") {
                            return product;
                          } else if (
                            product.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return product;
                          }
                        })
                        .map((data) => (
                          <Katalog
                            key={data.id}
                            product={data}
                            isCategory={false}
                          />
                        ))
                    )}
                  </>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="mt-10">
              {!sc && !all && !category && categoryData && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={categoryData.data.category.last_page}
                />
              )}
              {category && !sc && product && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={product.data.product.last_page}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

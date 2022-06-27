import React, { useState, useRef, useEffect, useContext } from "react";
import ProductSearch from "../components/product-search/product-search.component";
import AOS from "aos";
import "aos/dist/aos.css";

import CategoryItems from "../components/category-items/category-items";
import ProductItems from "../components/product-items/product-items";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import {
  CategoryContainer,
  SearchContainer,
} from "../components/category-items/category-items.styled";
import { NextSeo } from "next-seo";
import { CategoryProductContext } from "../context/productCategory";
import { Checkbox } from "@material-ui/core";
import { getProduct } from "../constant/api/product";
import useSWR from "swr";
import fetcher from "../util/useSwrFetcher";
import CategoryItem from "../components/category-item/category-item";
import { useRouter } from "next/router";
import { authlkpp, getProfile } from "../constant/api/auth";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

// export async function getStaticProps() {
//   const res = await fetch(`${process.env.API_LARAVEL}/api/categoryProduct`);
//   const category = await res.json();

//   if (!category) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { category },
//     revalidate: 1,
//     // will be passed to the page component as props
//   };
// }
export async function getServerSideProps(context) {
  const { query, res } = context;


  let token_lkpp: any = null;
  let isLkpp = false
  
  if (query.nonce) {
    try {
      isLkpp = true
      token_lkpp = await jwt_decode(query?.nonce);


      const bearerToken = `Bearer ${query.nonce}`;
      const response = await getProfile(bearerToken);

      const user = response.data.data;

      if (user) {
        res.setHeader("set-cookie", [
          `lkkp_token=${token_lkpp?.token_lkpp};SameSite=None; Secure`,
          `token=${query.nonce};SameSite=None; Secure`,
        ]);
      }
    } catch {}
  } else {
    isLkpp = false
  }

  // Pass data to the page via props
  return {
    props: {
      isLkpp,
    },
  };
}

function Product({isLkpp}) {
  const itemContainerRef = useRef();
  const [fixPosition, setFixPosition] = useState(false);
  const [categoryData, setCategoryData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]: any = useState("");
  const [product, setProduct] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [search2, setSearch2] = useState("");
  const [groupByCategory, setGroupByCategory] = useState("");
  const [province, setProvince] = useState("");
  const [showAllProvince, setShowAllProvince] = useState(false);
  const [listCity, setListCity] = useState([]);
  const [delayChangeLocation, setDelayChangeLocation] = useState(false);
  const router = useRouter();
  const { nonce } = router.query;
  const [categoryId, setCategoryId] = useContext(CategoryProductContext);
  const { category } = router.query;
  const { data: productData, error: erroProductData } = useSWR(
    `${process.env.API_V2}/api/products?category=${
      category ? category : ""
    }&province=${province ? province : ""}&subcategory=${
      subCategory ? subCategory : ""
    }`,
    fetcher
  );

  const { data: ProvinceData, error: ProvinceDataError } = useSWR(
    `${process.env.API_V2}/api/province`,
    fetcher
  );

  useEffect(() => {
    console.log(productData);
    const groupByCategory = productData?.data?.reduce((acc, curr) => {
      (acc[curr.category.categoryName] =
        acc[curr.category.categoryName] || []).push(curr);

      return acc;
    }, {});

    console.log(`Token lkpp : ${isLkpp}`);
    setGroupByCategory(groupByCategory);

    console.log(groupByCategory);

    // console.log(groupByCategory);
  }, [productData, subCategory, province]);
  const onSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const { data, error } = useSWR(
    `${process.env.API_V2}/api/categoriestMain`,
    fetcher
  );

  // useEffect(() => {
  //   setLoading(true);
  //   setCategoryData(category.data);
  //   setLoading(false);
  // }, []);

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
    if (window.scrollY >= 300) {
      setFixPosition(true);
    } else {
      setFixPosition(false);
    }
  };
  const onSearchSubmit = async (e) => {
    e.preventDefault();

    await axios
      .get(`${process.env.API_LARAVEL}/api/categoryProduct/${search}`, {
        withCredentials: false,
      })
      .then((res) => {
        setCategoryData(res.data.data);
      });
  };

  const subCategoryFilter = (val) => {
    if (val.target.checked) {
      if (subCategory === "") {
        setSubCategory(`${val.target.name}`);
      } else {
        setSubCategory((prev) => `${prev},${val.target.name}`);
      }
    }

    if (val.target.checked === false) {
      if (subCategory === val.target.name) {
        setSubCategory(subCategory.replace(val.target.name, ""));
      } else {
        setSubCategory(subCategory.replace(`,${val.target.name}`, ""));
      }
    }
  };

  console.log(subCategory);
  const changeLocation = (val) => {
    if (val.target.checked) {
      if (province === "") {
        setProvince(`${val.target.name}`);
      } else {
        setProvince((prev) => `${prev},${val.target.name}`);
      }
    }

    if (val.target.checked === false) {
      if (province === val.target.name) {
        setProvince(province.replace(val.target.name, ""));
      } else {
        setProvince(province.replace(`,${val.target.name}`, ""));
      }
    }

    // provinceNull.concat(val.target.name);
    // setProvince();
  };
  console.log(province);

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <>
      <NextSeo
        title="Katalog Product karyanusantara"
        description="Karya Nusantara adalah program konsolidasi produk UKM terpilih hasil kurasi yang menyelaraskan permintaan dari konsumen (B2B, B2G, dan B2E) dengan produk/jasa yang disediakan oleh UKM melalui pendampingan untuk menyetarakan standarisasi. Program ini didukung oleh UKMindonesia.id dan Kementerian Koperasi dan UKM RI."
        canonical="karyanusantara.co.id"
        openGraph={{
          url: "karyanusantara.co.id",
          title: "Ragam Solusi Berkualitas Hasil Karya UKM Lokal Indonesia",
          description: "",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "Karya Nusantara ",
        }}
      />
      <div
        style={{
          minHeight: "100vh",
        }}
        className="w-full px-6 py-10 lg:py-20 lg:px-16 container-box  "
      >
        <div className="lg:grid flex flex-col  mt-20   lg:mt-0 lg:grid-cols-5">
          <div className="flex flex-col mt-0 lg:mt-10">
            {!isLkpp && (
              <div className="box shadow-md w-full   px-2 py-4">
                <span className="text-lg ">Kategori</span>
                <div className="mt-2 ml-2">
                  <ul>
                    {data?.data.map((data) => {
                      return (
                        <CategoryItem
                          setSubCategory={setSubCategory}
                          data={data}
                          key={data.id}
                          category={category}
                          subCategoryFilter={subCategoryFilter}
                        />
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            <div className="box shadow-md w-full px-2 py-4 mt-2 flex flex-col rounded-md">
              <span>Lokasi</span>
              <div className="mt-2 flex-col">
                {ProvinceData && showAllProvince
                  ? ProvinceData?.data.map((province) => {
                      return (
                        <div className="province ">
                          <Checkbox
                            className="py-1 px-1"
                            style={{
                              color: "#5996ab",
                            }}
                            name="Bandung"
                            onChange={(val) => changeLocation(val)}
                          />
                          <span className="text-sm text-gray-600">
                            {province.province_name}
                          </span>
                        </div>
                      );
                    })
                  : ProvinceData?.data.slice(0, 10)?.map((province) => {
                      return (
                        <div className="province " key={province.id}>
                          <Checkbox
                            className="py-1 px-1"
                            style={{
                              color: "#5996ab",
                            }}
                            name={province.province_id}
                            onChange={(val) => changeLocation(val)}
                          />
                          <span className="text-sm text-gray-600">
                            {province.province_name}
                          </span>
                        </div>
                      );
                    })}

                {!showAllProvince && (
                  <span
                    className="py-1 px-1 text-sm text-blue-100 cursor-pointer"
                    onClick={() => setShowAllProvince(true)}
                  >
                    Lihat selengkapnya{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-4 lg:px-10">
            {/* <SearchContainer className="z-0 mt-3 group-hover:z-1">
              <form onSubmit={onSearchSubmit} method="GET">
                <ProductSearch onSearch={onSearch} />
              </form>
            </SearchContainer> */}
            {/* {product?.length > 0 ? (
              product?.map((data, index) => (
                <ProductItems key={index} data={data} loading={loading} />
              ))
            ) : (
              <div className="text-center mt-10">
                <h1>Tidak ada produk yang sesuai</h1>
              </div>
            )} */}
            {groupByCategory &&
              Object.keys(groupByCategory).map((categoryName, index) => {
                return (
                  <ProductItems
                    key={index}
                    categoryName={categoryName}
                    data={groupByCategory}
                    loading={loading}
                  />
                );
              })}
            {productData?.data?.length === 0 && (
              <div className="text-center mt-10">
                <h1>Tidak ada produk yang sesuai</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

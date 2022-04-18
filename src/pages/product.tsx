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

  // Fetch data from external API
  // if (query.nonce ) {
  //    const ressponse :any = await fetch(
  //      `${process.env.API_V2}/api/auth/checklkpp/${query.nonce}`, {
  //        method: 'POST'
  //      }
  //   );

  //   if (ressponse.ok) {
  //         const lkppauth = await ressponse.json();

  //     res.setHeader("set-cookie", [
  //       `lkkp_token=${lkppauth.data.lkkp_token}`,
  //       `token=${lkppauth.data.access_token}`]);

  //   }
  let token_lkpp :any;
  if (query.nonce) {

    try {
      
      token_lkpp = await jwt_decode(query?.nonce);
      
      const bearerToken = `Bearer ${query.nonce}`;
      const response = await getProfile(bearerToken);

      const user = response.data.data;

      if (user) {
        res.setHeader("set-cookie", [
          `lkkp_token=${token_lkpp?.token_lkpp}`,
          `token=${query.nonce}`,
        ]);
      }
    } catch {
      
    }
    

    
    
 
  }

  // Pass data to the page via props
  return { props: { } };
}

function Product() {
  const itemContainerRef = useRef();
  const [fixPosition, setFixPosition] = useState(false);
  const [categoryData, setCategoryData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]: any = useState("");
  const [product, setProduct] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [search2, setSearch2] = useState("");
  const [city, setCity] = useState("");
  const [listCity, setListCity] = useState([]);
  const router = useRouter();
  const { nonce } = router.query;
  const [categoryId, setCategoryId] = useContext(CategoryProductContext);
 const { category } = router.query;
  const onSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  useEffect(() => {
    console.log(nonce);
    if (nonce !== null) {
      const load = async () => {
        const response = await authlkpp(nonce);

        console.log(response);
      };
      load();
    }
  }, [nonce]);
  useEffect(() => {
    const getProductByCategory = async () => {

      console.log(category);
      setLoading(true);
      if (city === "") {
        const response = await getProduct("", category);

        if (response) {
          setProduct(response.data);
        }
      } else {
        const response = await getProduct(city, category);

        if (response) {
          setProduct(response.data);
        }
      }

      setLoading(false);
    };
    getProductByCategory();
  }, [city, subCategory]);

  const { data, error } = useSWR(
    `${process.env.API_V2}/api/categoriestMain`,
    fetcher
  );
  console.log(data);

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
      if (city === "") {
        setCity(`${val.target.name}`);
      } else {
        setCity((prev) => `${prev},${val.target.name}`);
      }
    }

    if (val.target.checked === false) {
      if (city === val.target.name) {
        setCity(city.replace(val.target.name, ""));
      } else {
        setCity(city.replace(`,${val.target.name}`, ""));
      }
    }

    // cityNull.concat(val.target.name);
    // setCity();
  };

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
                        subCategoryFilter={subCategoryFilter}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="box shadow-md w-full px-2 py-4 mt-2 flex flex-col rounded-md">
              <span>Lokasi</span>
              <div className="mt-2 flex-col">
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="Bandung"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">Bandung</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="jakarata"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">Jakarta</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="jawa barat"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">Jawa barat</span>
                </div>

                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="DKI Jakarta"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">DKI Jakarta</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="Jawa tengah"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">Jawa tengah</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="Jawa timur"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">Jawa Timur</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="Bali"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">Bali</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="NTB"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">NTB</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="NTT"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">NTT</span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="Sulawesi Selatan"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">
                    Sulawesi selatan
                  </span>
                </div>
                <div className="city ">
                  <Checkbox
                    className="py-1 px-1"
                    style={{
                      color: "#5996ab",
                    }}
                    name="Jambi"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">Jambi</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 lg:px-10">
            {/* <SearchContainer className="z-0 mt-3 group-hover:z-1">
              <form onSubmit={onSearchSubmit} method="GET">
                <ProductSearch onSearch={onSearch} />
              </form>
            </SearchContainer> */}
            {product?.length > 0 ? (
              product?.map((data, index) => (
                <ProductItems key={index} data={data} loading={loading} />
              ))
            ) : (
              <div className="text-center mt-10">
                <h1>Tidak ada produk yang sesuai</h1>
              </div>
            )}
            {}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

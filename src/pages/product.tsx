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

function Product({ category }) {
  const itemContainerRef = useRef();
  const [fixPosition, setFixPosition] = useState(false);
  const [categoryData, setCategoryData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]: any = useState("");
  const [product, setProduct] = useState([]);
  const [search2, setSearch2] = useState("");
  const [city, setCity] = useState('');
  const [listCity, setListCity] = useState([]);

  const [categoryId, setCategoryId] = useContext(CategoryProductContext);
  const onSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  useEffect(() => {
    const getProductByCategory = async () => {
      console.log('useEffect city',city)
      setLoading(true);
      if (city === '') {
        const response = await getProduct('');
        
      if (response) {
        setProduct(response.data);
      }
        
      } else {
        const response = await getProduct(city);
        
      if (response) {
        setProduct(response.data);
      }
      }        

      setLoading(false);

    };
    getProductByCategory();
  }, [city]);

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

  useEffect(() => {
    console.log(city);

  },[city])
  const changeLocation = (val) => {
    console.log(val.target.checked)

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

  }

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
        title="Ragam Solusi Berkualitas Hasil Karya UKM Lokal Indonesia"
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
        className="w-full px-6 py-10 lg:py-20 lg:px-16 container-box "
      >
        <div className="grid grid-cols-5">
          <div className="flex flex-col">
            <div className="box shadow-md w-full max-h-44 px-2 py-2">
              <span>Kategori</span>
            </div>
            <div className="box shadow-md w-full max-h-44 px-2 py-4 mt-2 flex flex-col rounded-md">
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
                    name="Kabupaten Batang"
                    onChange={(val) => changeLocation(val)}
                  />
                  <span className="text-sm text-gray-600">
                    Kabupaten Batang
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 lg:px-10">
            <SearchContainer className="z-0 mt-3 group-hover:z-1">
              <form onSubmit={onSearchSubmit} method="GET">
                <ProductSearch onSearch={onSearch} />
              </form>
            </SearchContainer>
            {product?.length > 0 ? (
              product?.map((data) => (
                <ProductItems data={data} loading={loading} />
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

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

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_LARAVEL}/api/categoryProduct`);
  const category = await res.json();

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category },
    revalidate: 1,
    // will be passed to the page component as props
  };
}

function Product({ category }) {
  const itemContainerRef = useRef();
  const [fixPosition, setFixPosition] = useState(false);
  const [categoryData, setCategoryData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]: any = useState("");
  const [search2, setSearch2] = useState("");

  const [categoryId, setCategoryId] = useContext(CategoryProductContext);
  const onSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  useEffect(() => {
    const getProductByCategory = async () => {
      if (categoryId > 0) {
        await axios
          .get(
            `${process.env.API_LARAVEL}/api/getProductCategory/${categoryId}`,
            {
              withCredentials: false,
            }
          )
          .then((res) => {
            setLoading(true);

            setCategoryData(res.data.data);
            setLoading(false);
          });
      }
    };
    getProductByCategory();
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);
    setCategoryData(category.data);
    setLoading(false);
  }, []);

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
        <div
          className={`flex flex-col justify-center w-full mt-10 lg:px-60  transition duration-700 ease-in group ${
            fixPosition &&
            "  border-2  border-blue-100 z-10 bg-white lg:py-10 top-10  "
          }`}
        >
          <CategoryContainer className="grid justify-center grid-cols-4 gap-x-5 lg:gap-x-10 gap-y-5 lg:grid-cols-5 ">
            {category.data.map((data) => (
              <CategoryItems data={data} setCategoryId={setCategoryId} />
            ))}
          </CategoryContainer>
          <SearchContainer className="z-0 mt-3 group-hover:z-1">
            <form onSubmit={onSearchSubmit} method="GET">
              <ProductSearch onSearch={onSearch} />
            </form>
          </SearchContainer>
        </div>

        {loading ? (
          <SkeletonTheme color="#fffff" highlightColor="#ffff">
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        ) : categoryData.length == 0 ? (
          ""
        ) : (
          categoryData.map((data) => <ProductItems data={data} />)
        )}
      </div>
    </>
  );
}

export default Product;

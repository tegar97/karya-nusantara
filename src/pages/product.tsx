import React, { useState, useRef, useEffect } from "react";
import BorderBottom from "../components/border-bottom/border-bottom";
import KatalogItems from "../components/katalog-items/katalog-items";
import ProductSearch from "../components/product-search/product-search.component";
import { ReactSVG } from "react-svg";
import ScrollAnimation from "react-animate-on-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";

import FadeInAnimation from "../components/gsap/FadeIn";
import CategoryItems from "../components/category-items/category-items";
import ProductItems from "../components/product-items/product-items";
import router from "next/router";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import {
  CategoryContainer,
  SearchContainer,
} from "../components/category-items/category-items.styled";

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
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const [categoryId, setCategoryId] = useState(0);
  const onSearch = (e) => {
    setLoading(true);
    setSearch(e.target.value.toLowerCase());
    setLoading(false);
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

            console.log(res);
          });
      }
    };
    getProductByCategory();
  }, [categoryId]);

  console.log(search2.includes(search.toLowerCase()));
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
    console.log(window.scrollY);
    if (window.scrollY >= 300) {
      setFixPosition(true);
    } else {
      setFixPosition(false);
    }
  };

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="w-full px-6 py-10 lg:py-20 lg:px-16 "
    >
      <div
        className={`flex flex-col justify-center w-full mt-10 lg:px-60  transition duration-700 ease-in group ${
          fixPosition &&
          "  border-2  border-blue-100 z-10 bg-white lg:py-10 top-10  "
        }`}
      >
        <CategoryContainer className="grid grid-cols-4 gap-x-5 lg:gap-x-10 gap-y-5 lg:grid-cols-5">
          {category.data.map((data) => (
            <CategoryItems data={data} setCategoryId={setCategoryId} />
          ))}
        </CategoryContainer>
        <SearchContainer className="z-0 mt-3 group-hover:z-1">
          <ProductSearch onSearch={onSearch} />
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
        categoryData
          .filter((product) => {
            if (search == "") {
              return product;
            } else {
              product.data.map((productData) => {
                product = productData.name
                  .toString()
                  .toLowerCase()
                  .includes(search.toLowerCase());
              });
            }
            {
              return product;
            }
          })
          .map((data) => (
            <ProductItems data={data} search={search} setSearch2={setSearch2} />
          ))
      )}
    </div>
  );
}

export default Product;

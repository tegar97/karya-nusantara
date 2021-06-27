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
import { ImageFilter } from "../components/image-manipulation/image-manipulation";
import CategoryItems from "../components/category-items/category-items";
import ProductItems from "../components/product-items/product-items";
import router from "next/router";
import axios from "axios";

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_LARAVEL}/api/categoryProduct`);
  const category = await res.json();

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category }, // will be passed to the page component as props
  };
}

function Product({ category }) {
  const itemContainerRef = useRef();
  const [fixPosition, setFixPosition] = useState(false);
  const [categoryData, setCategoryData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
        className={`flex flex-col justify-center w-full mt-10 lg:px-60  transition duration-700 ease-in  ${
          fixPosition &&
          "  border-2  border-blue-100 z-10 bg-white lg:py-10 top-10 "
        }`}
      >
        <div className="grid grid-cols-4 gap-x-5 lg:gap-x-10 gap-y-5 lg:grid-cols-5">
          {category.data.map((data) => (
            <CategoryItems data={data} setCategoryId={setCategoryId} />
          ))}
        </div>
        <div className="mt-3">
          <ProductSearch onSearch={onSearch} />
        </div>
      </div>

      {loading
        ? "Loading..."
        : categoryData
            .filter((product) => {
              if (search == "") {
                return product;
              } else if (
                product.data
                  .map((productName) => {
                    return productName.name.toLowerCase();
                  })
                  .includes(search.toLowerCase())
              ) {
                return product;
              }
            })
            .map((data) => <ProductItems data={data} />)}
    </div>
  );
}

export default Product;

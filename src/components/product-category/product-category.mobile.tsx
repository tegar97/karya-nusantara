import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import { useContext } from "react";
import { CategoryProductContext } from "../../context/productCategory";

function ProductCategoryMobile() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

          infinite: false,
          dots: false,
          centerMode: true,
          centerPadding: "50px",
          rtl: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,

          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,

          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const [categoryId, setCategoryId] = useContext(CategoryProductContext);

  return (
    <div className="py-5">
      <div className="w-full px-2 py-10 ">
        <div className="grid justify-center grid-cols-4 gap-5 ">
          <Link href="/product">
            <div
              onClick={() => setCategoryId(2)}
              className="flex flex-col items-center py-2 text-center cursor-pointer hover:translate-y-5"
            >
              <img
                src="/assets/APD-ICON.png"
                alt="logo apd"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm"> Alat Pelindung Diri</span>
            </div>
          </Link>

          <Link href="/product">
            <div
              onClick={() => setCategoryId(3)}
              className="flex flex-col items-center py-2 text-center cursor-pointer hover:translate-y-5"
            >
              <img
                src="/assets/Perkonveksiann.png"
                alt="logo apd"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm">Perkonveksian</span>
            </div>
          </Link>

          <Link href="/product">
            <div
              onClick={() => setCategoryId(4)}
              className="flex flex-col items-center py-2 text-center cursor-pointer hover:translate-y-5"
            >
              <img
                src="/assets/hampers.png"
                alt="logo hampers"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm">Hampers</span>
            </div>
          </Link>

          <Link href="/product">
            <div
              onClick={() => setCategoryId(6)}
              className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 "
            >
              <img
                src="/assets/product-unggulan.png"
                alt="logo apd"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm">Product Populer</span>
            </div>
          </Link>

          <Link href="/product">
            <div
              onClick={() => setCategoryId(5)}
              className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 "
            >
              <img
                src="/assets/craft.png"
                alt="logo hampers"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm">Craft</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-5 ">
        {/* <Slider {...settings}>
          <div className="w-full p-2">
            <img
              className="w-full rounded-md "
              src="/assets/b1.jpg"
              alt="poster 1"
            />
          </div>
          <div className="w-full p-2">
            <img src="/assets/b2.jpg" alt="poster 1" />
          </div>
          <div className="w-full p-2">
            <img src="/assets/b3.jpg" alt="poster 1" />
          </div>
        </Slider> */}

        <Carousel
          autoPlay
          showThumbs={false}
          infiniteLoop={true}
          showArrows={false}
        >
          <Link href="/product?category=3&all=true">
            <div>
              <img
                src="/assets/b1.jpg"
                alt="Banner Hampers"
                className="w-full cursor-pointer"
              ></img>
            </div>
          </Link>
          <Link href="/product?category=2&all=true">
            <div>
              <img
                src="/assets/b2.jpg"
                alt="banner Alat Pelindung Diri "
                className="w-full"
              ></img>
            </div>
          </Link>
          <Link href="/product?category=4">
            <div>
              <img
                src="/assets/b3.jpg"
                alt="Banners Penkonversian "
                className="w-full"
              ></img>
            </div>
          </Link>
        </Carousel>
      </div>
    </div>
  );
}

export default ProductCategoryMobile;

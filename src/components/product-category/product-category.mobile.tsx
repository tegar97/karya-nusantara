import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import { useContext } from "react";
import { CategoryProductContext } from "../../context/productCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

function ProductCategoryMobile() {


  const [categoryId, setCategoryId] = useContext(CategoryProductContext);

  return (
    <div className="py-5">
      <div className="w-full px-2 py-10 ">
  <Swiper
      spaceBetween={40}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>

            <Link href="/product">
              <div
                onClick={() => setCategoryId(2)}
                className="flex flex-col items-center py-2 text-center cursor-pointer hover:translate-y-5"
              >
                <img
                  src="/assets/APD-ICON.png"
                  alt="logo apd"
                  className="w-12 h-12 mb-2"
                />
                <span className="" style={{ fontSize: ".8rem" }}> Alat Pelindung  Diri</span>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/product">
              <div
                onClick={() => setCategoryId(3)}
                className="flex flex-col items-center py-2 text-center cursor-pointer hover:translate-y-5"
              >
                <img
                  src="/assets/Perkonveksiann.png"
                  alt="logo apd"
                  className="w-12 h-12 mb-2"
                />
                <span style={{ fontSize: ".8rem" }}>Perkonveksian</span>
              </div>
            </Link>

          </SwiperSlide>

          <SwiperSlide>

            <Link href="/product">
              <div
                onClick={() => setCategoryId(4)}
                className="flex flex-col items-center py-2 text-center cursor-pointer hover:translate-y-5"
              >
                <img
                  src="/assets/hampers.png"
                  alt="logo hampers"
                  className="w-12 h-12 mb-2"
                />
                <span style={{ fontSize: ".8rem" }}>Hampers</span>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>

            <Link href="/product">
              <div
                onClick={() => setCategoryId(6)}
                className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 "
              >
                <img
                  src="/assets/product-unggulan.png"
                  alt="logo apd"
                  className="w-12 h-12 mb-2"
                />
                <span style={{ fontSize: ".8rem" }}>Product Populer</span>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link href="/product">
            <div
              onClick={() => setCategoryId(5)}
              className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 "
            >
              <img
                src="/assets/craft.png"
                alt="logo hampers"
                className="w-12 h-12 mb-2"
              />
              <span style={{ fontSize: ".8rem" }}>Craft</span>
            </div>
          </Link>
          </SwiperSlide>
    </Swiper>
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

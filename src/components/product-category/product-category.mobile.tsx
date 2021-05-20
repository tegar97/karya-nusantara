import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";

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
  return (
    <div className="py-5" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="w-full py-10 bg-white px-7">
        <div className="grid justify-center grid-cols-3 gap-5 bg-white shadow-sm ">
          <Link href="/product">
            <div className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5">
              <img
                src="/assets/APD-ICON.png"
                alt="logo apd"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm">Masker Kain</span>
            </div>
          </Link>
          <Link href="/product">
            <div className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 ">
              <img
                src="/assets/Perkonveksiann.png"
                alt="logo apd"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm">Perkonveksian</span>
            </div>
          </Link>
          <Link href="/product">
            <div className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 ">
              <img
                src="/assets/souvenir.png"
                alt="logo souvenir"
                className="w-16 mb-2 h-13"
              />
              <span className="text-sm">Masker Kain</span>
            </div>
          </Link>
          <Link href="/product">
            <div className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 ">
              <img
                src="/assets/hampers.png"
                alt="logo apd"
                className="w-16 h-13"
              />
              <span className="text-sm">Masker Kain</span>
            </div>
          </Link>
          <Link href="/product">
            <div className="flex flex-col items-center text-center cursor-pointer hover:translate-y-5 ">
              <img
                src="/assets/product-unggulan.png"
                alt="logo apd"
                className="w-16"
              />
              <span className="text-sm">Masker Kain</span>
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
          <img src="/assets/b1.jpg" alt="banner 1" className="w-full"></img>
          <img src="/assets/b2.jpg" alt="banner 2" className="w-full"></img>
          <img src="/assets/b3.jpg" alt="banner 3" className="w-full"></img>
        </Carousel>
      </div>
    </div>
  );
}

export default ProductCategoryMobile;

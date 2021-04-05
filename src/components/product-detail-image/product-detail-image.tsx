import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function ProductDetailImage() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <img
        className="w-full col-span-4 "
        src="/assets/katalog/baju/1.jpg"
        alt="baju"
        style={{ width: "100%" }}
      />
      <Slider {...settings}>
        <div>
          <img className="" src="/assets/katalog/baju/1.jpg" alt="baju" />
        </div>
        <div>
          <img className="" src="/assets/katalog/baju/2.jpg" alt="baju" />
        </div>
        <div>
          <img className="" src="/assets/katalog/baju/2.jpg" alt="baju" />
        </div>
        <div>
          <img className="" src="/assets/katalog/baju/2.jpg" alt="baju" />
        </div>
        <div>
          <img className="" src="/assets/katalog/baju/2.jpg" alt="baju" />
        </div>
      </Slider>
    </>
  );
}

export default ProductDetailImage;

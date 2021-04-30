import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
function ProductDetailImage({ product }) {
  const [mainImage, setMainImage] = useState("");
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <img
        className="w-full col-span-4 "
        src={`${process.env.API_LARAVEL}/storage/${
          mainImage ? mainImage : product.data[0].images.split(",")[0]
        }`}
        alt="baju"
        style={{ width: "100%" }}
      />
      <Slider {...settings}>
        {product.data[0].images.split(",").map((img, index) => (
          <motion.div
            whileTap={{ scale: 0.9 }}
            key={index}
            onClick={() => setMainImage(img)}
          >
            <img
              className=""
              src={`${process.env.API_LARAVEL}/storage/${img}`}
              alt="baju"
            />
          </motion.div>
        ))}
      </Slider>
    </motion.div>
  );
}

export default ProductDetailImage;

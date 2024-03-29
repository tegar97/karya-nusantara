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
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
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
        className="object-contain w-full max-w-full max-h-full mb-2 lg:mb-10"
        src={`${process.env.API_LARAVEL}/storage/${
          mainImage ? mainImage : product.data[0].images.split(",")[0]
        }`}
        alt={`product ${product.data[0].name}`}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <Slider {...settings}>
        {product.data[0].images.split(",").map((img, index) => (
          <motion.div
            whileTap={{ scale: 0.9 }}
            key={index}
            onClick={() => setMainImage(img)}
          >
            <img
              className="object-cover w-40 h-40 p-2"
              src={`${process.env.API_LARAVEL}/storage/${img}`}
              alt={`product ${product.data[0].name}`}
            />
          </motion.div>
        ))}
      </Slider>
    </motion.div>
  );
}

export default ProductDetailImage;

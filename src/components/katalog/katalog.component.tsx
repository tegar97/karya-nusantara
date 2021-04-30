import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
function Katalog({ product, isCategory }) {
  return (
    <Link
      href={
        isCategory
          ? `/product/?category=${product.id}&all=true`
          : `/product/${product.slug}`
      }
    >
      <motion.div
        className="bg-white rounded-md shadow-lg hover:translate-x-14 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="relative flex flex-col justify-center">
          <Image
            src={`${process.env.API_LARAVEL}/storage/${
              !isCategory ? product.images.split(",")[0] : product.image
            }`}
            alt="Baju Hazmat"
            width={500}
            height={700}
          />
          <div className="absolute w-full p-2 text-center bg-blue-100 rounded-md bg-opacity-80 bottom-6 ">
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default Katalog;

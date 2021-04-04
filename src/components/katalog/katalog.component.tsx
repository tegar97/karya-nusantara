import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
function Katalog({ product }) {
  return (
    <Link
      href={
        product.isCategory
          ? `/product/?category=${product.id}&all=true`
          : `/product/${product.name}`
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
          <Image src={product.img} alt="Baju Hazmat" width={400} height={500} />
          <div className="absolute w-full p-2 text-center bg-blue-100 rounded-md bg-opacity-80 bottom-6 ">
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default Katalog;

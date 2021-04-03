import Image from "next/image";
import React from "react";

function Katalog({ product }) {
  return (
    <div className="bg-white rounded-md shadow-md ">
      <div className="relative flex flex-col justify-center">
        <img
          src="/assets/katalog/Hazmat/1.jpg"
          alt="Baju Hazmat"
          width={300}
          height={300}
        />
        <div className="absolute w-full p-2 text-center bg-blue-100 bottom-6 ">
          <span className="text-white">{product.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Katalog;

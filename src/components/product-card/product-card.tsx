import React from 'react'

function ProductCard() {
  return (
    <div className="border border-gray-300 py-1 cursor-pointer">
      <img
        className="rounded-lg"
        alt="image product"
        src={
          "https://api.karyanusantara.co.id/storage/20210806045030-bP6NZIqTUUBKuCf2QiuABefTjXUMCwSPYyGItvMn-product-1.jpg.jpg"
        }
      />
      <div className="py-2 px-2">
        <div className="flex flex-col">
          <span className="font-semibold lg:text-sm">Surgical Face Mask</span>
          <span className=" text-xs text-gray-500">By Tegar Akmal</span>
          <span className=" font-bold mt-2 text-blue-100">Rp 25.000</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard
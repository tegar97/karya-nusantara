import Link from 'next/link';
import React from 'react'

function CardItem({ item,quantity }) {
  return (
    <div className="w-full border border-gray-400 rounded-md px-2  py-5 lg:py-4 flex  flex-col lg:flex-row justify-between ">
      <div className="flex  flex-col lg:flex-row lg:items-start items-center">
        <img
          className="w-20 h-20 lg:w-14 lg:h-14 rounded-md"
          alt="product photo"
          src={`${process.env.API_V2}/storage/images/product/${item.images[0]?.imageName}`}
        />
        <div className="flex flex-col ml-2 lg:mt-0 mt-5 lg:items-start items-center">
          <span className="font-bold lg:md sm">{item.name}</span>
          <span> Jumlah : {quantity} unit</span>
        </div>
      </div>
      <Link href="/cart">
        <button className="lg:mt-0 lg:py-0 py-1 mt-5 bg-blue-100 hover:opacity-80 text-white font-bold   px-1 lg:px-5  rounded outline-none">
          Lihat Keranjang
        </button>
      </Link>
    </div>
  );
}

export default CardItem
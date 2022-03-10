import React from 'react'

function CardItem() {
  return (
    <div className="w-full border border-gray-400 rounded-md px-2 py-4 flex flex-row justify-between ">
      <div className="flex flex-row">
        <img
          className="lg:w-14 lg:h-14 rounded-md"
          src={
            "https://bs.moselo.com/images/product_s3/large/sv-8106-2-1594894656342.png"
          }
        />
        <div className="flex flex-col ml-2">
          <span className="font-bold">Wellness Sticker Sheet</span>
          <span> Jumlah : 100 unit</span>
        </div>
      </div>
      <button
        className="bg-blue-100 hover:opacity-80 text-white font-bold  px-5 rounded outline-none"
      >
        Lihat  Keranjang
      </button>
    </div>
  );
}

export default CardItem
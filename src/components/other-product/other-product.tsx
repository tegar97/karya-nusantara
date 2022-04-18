import Link from 'next/link';
import React from 'react'
import NumberFormat from 'react-number-format';

function OtherProduct({ data }) {
  return (
    <a href={`/product/${data.slug}`}>
      <div className="flex w-full flex-col shadow-md rounded-md p-0  cursor-pointer mb-4">
        <img
          src={`${process.env.API_V2}/storage/images/product/${data.images[0]?.imageName}`}
          alt={"Photo produk dari " + data.name}
          className="w-full rounded-md  h-40 hover:opacity-80 	"
        />
        <div className="pl-2 pr-2 mt-2 text-left pb-2 flex flex-col">
          <span className="text-sm text-gray-700 ">{data.name}</span>
          <span className="text-sm text-blue-100 mt-2">
            <NumberFormat
              value={data.price}
              prefix="Rp "
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </div>
      </div>
    </a>
  );
}

export default OtherProduct
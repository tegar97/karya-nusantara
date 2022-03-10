import React from 'react'

function OtherProduct() {
  return (
    <div className="flex w-full flex-col shadow-md rounded-md p-0  cursor-pointer mb-4">
      <img
        alt="demo"
        className="w-full rounded-md  h-40 hover:opacity-80 	"
        src={
          "https://bs.moselo.com/images/product_s3/large/sv-8106-2-1594894656342.png"
        }
      />
      <div className="pl-2 pr-2 mt-2 text-left pb-2">
        <span className="text-sm text-gray-700 ">
          Kabel data Fast charging{" "}
        </span>
        <span className="text-sm text-blue-100 mt-2">Rp.25.0000 </span>
      </div>
    </div>
  );
}

export default OtherProduct
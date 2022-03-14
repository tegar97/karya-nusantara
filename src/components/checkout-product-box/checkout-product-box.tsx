import { Button } from '@material-ui/core';
import React from 'react'

function CheckoutPageProduct() {
    return (
      
    <div className="mt-5 border border-gray-200 shadow-sm px-4 py-4 rounded-lg">
      <div className="flex flex-row  ">
        <div className="flex flex-col w-full ">
          <div className="flex flex-row justify-between w-full items-center border-b border-gray-200 pb-2">
            <div className="flex flex-row">
              <img
                src={"assets/icon/store.svg"}
                alt="store icon"
                className="lg:w-6"
              />
              <span className="ml-2">Dummy Shop</span>
            </div>

            <span className="text-sm text-gray-500">Bandung</span>
          </div>
          <div className="flex flex-row mt-5 w-full  justify-between items-center ">
            <div className="flex flex-row w-full ">
              <img
                className="lg:w-28 w-16 h-16 lg:h-28 rounded-md"
                src={
                  "https://bs.moselo.com/images/product_s3/large/sv-8106-2-1594894656342.png"
                }
              />
              <div className="flex flex-col ml-3 ">
                <span className="text-sm lg:text-lg">
                  Wellness Sticker Sheet
                </span>
                <span className="  text-gray-600 mt-2 lg:text-sm text-xs">
                  1 barang (1kg)
                </span>
                <span className="text-black font-bold mt-2 lg:text-sm text-xs">
                  Rp 25.000
                </span>
              </div>
            </div>
            <div className="">
              <button className="relative  bg-blue-100 hover:opacity-80  py-2 text-white lg:w-60 lg:h-10 w-full rounded outline-none">
                <span>Jasa Pengiriman</span>
                {/* <img src={"/assets/icon/arrow_down.svg"} className="absolute  right-0 top-10" /> */}
              </button>
            </div>
          </div>
        </div>
        
            </div>
            
    </div>
  );
}

export default CheckoutPageProduct
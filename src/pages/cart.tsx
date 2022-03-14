import { Button, Checkbox } from '@material-ui/core';
import React from 'react'
import CartProduct from '../components/atom/cart-product-container/cart-product-container';
import OtherProduct from '../components/other-product/other-product';

function CartPage() {
  return (
    <div className="relatie">
      <div
        className="w-full fixed bottom-0 bg-white border-t border-gray-300  pl-4  pr-4 pt-6 pb-6 lg:hidden flex justify-between items-center"
        style={{ zIndex: 999 }}
      >
        <div className="flex-col flex">
          <span className="text-gray-600">Total Harga</span>
          <span className="text-xl  text-blue-100 font-bold lg:text-xl">
            Rp 25.000
          </span>
        </div>
        <div className=" flex-row flex">
          <div className="  ml-2  w-full  ">
            <button className="bg-blue-100 hover:opacity-80 text-white font-bold py-2 px-20 w-full rounded outline-none">
              Beli
            </button>
          </div>
        </div>
      </div>
      <div
        className="  relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="flex  flex-col lg:flex-row  flex-1">
          <div className=" lg:w-9/12 lg:pr-8">
            <h1 className="lg:text-2xl font-bold ">Keranjang</h1>

            <div className="mt-5 border border-gray-200 shadow-sm px-4 py-4 rounded-lg">
              <Checkbox
                style={{
                  color: "#5996ab",
                }}
                onChange={(val) => console.log(val)}
              />
              <span className="text-md text-gray-600">Pilih semua produk</span>
            </div>

            <ul>
              <li>
                <CartProduct />
                <CartProduct />
              </li>
            </ul>
          </div>
          <div className="  hidden lg:flex relative ">
            <div className=" shadow-md rounded-md  fixed  lg:w-72 px-5 py-5">
              <span className="font-bold ">Ringkasan Belanja</span>
              <div className="flex justify-between mt-5">
                <span className="text-gray-600 text-sm">
                  Total harga (1 barang)
                </span>
                <span className="text-gray-600 text-sm">0</span>
              </div>
              <div className="flex justify-between mt-5 border-t border-gray-300 pt-5">
                <span className="font-bold text-md">Total harga</span>
                <span className="font-bold text-md">0</span>
              </div>
              {/* <button className="w-full bg-blue-100 mt-5 px-2 py-2 text-white outline-none rounded-md">
                Checkout (2)
              </button> */}
              <Button className="w-full bg-blue-100 mt-5 px-2 py-2 focus:outline-none  text-white outline-none rounded-md border-transparent focus:border-transparent focus:ring-0 hover:opacity-90 hover:bg-blue-100 ">
                Checkout (2)
              </Button>
            </div>
          </div>
        </div>
        {/* 
          <span>Rekomendasi untuk kamu</span>
        <div className="grid grid-cols-3 gap-3 mt-5">
          <OtherProduct />
        
        </div> */}
      </div>
    </div>
  );
}

export default CartPage
import { Button, Checkbox } from "@material-ui/core";
import React from "react";
import AddressBox from "../components/atom/address-box/address-box";
import CartProduct from "../components/atom/cart-product-container/cart-product-container";
import CheckoutPageProduct from "../components/checkout-product-box/checkout-product-box";
import OtherProduct from "../components/other-product/other-product";

function CheckoutPage() {
  return (
    <div className="relatie">
      <div
        className="w-full fixed bottom-0 bg-white border-t border-gray-300  pl-4  pr-4 pt-6 pb-6 lg:hidden flex justify-between items-center"
        style={{ zIndex: 999 }}
      ></div>
      <div
        className="  relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="flex  flex-col lg:flex-row  flex-1">
          <div className=" lg:w-9/12 lg:pr-8">
            <h1 className="lg:text-2xl font-bold ">Keranjang</h1>
            {/* <div className="mt-4 flex flex-row items-center">
              <img
                className="lg:w-6 w-3 "
                src="/assets/icon/house.svg"
                alt="house icon"
              />

              <h2 className="ml-2 text-md text-gray-800">Alamat Pengiriman </h2>
            </div> */}
            <AddressBox />

            <CheckoutPageProduct />
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
              <div className="flex justify-between mt-5">
                <span className="text-gray-600 text-sm">
                  Ongkos Kirim
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
                Bayar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

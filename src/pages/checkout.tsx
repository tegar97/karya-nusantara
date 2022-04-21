import { Button, Checkbox } from "@material-ui/core";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import useSWR from "swr";
import AddressBox from "../components/atom/address-box/address-box";
import CartProduct from "../components/atom/cart-product-container/cart-product-container";
import CheckoutPageProduct from "../components/checkout-product-box/checkout-product-box";
import OtherProduct from "../components/other-product/other-product";
import PaymentModal from "../components/payment-modal/payment-modal";
import { getProfile } from "../constant/api/auth";
import { getMyCart } from "../constant/api/cart";
import convertToRupiah from "../util/converRupiah";
import fetcher from "../util/useSwrFetcher";

function CheckoutPage({ cart, address }) {
  const [groupBySeller, setGroupBySeller] = useState([]);
  const [getTotal, setTotal]: any = useState({});
  const [grandTotal, setGrandTotal] = useState();
  const [updateNotifier, setUpdateNotifier] = useState(false);
  const [loading, setLoading] = useState(true);
  const [triggerNotif, setTriggetNotif] = useState(false);
  const [totalOngkir, setTotalOngkir] = useState(0);
  let getTempOngkir = []
  const [getOngkirprice, setOngkirPrice]: any = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [groupData, setGroupData] = useState({
    payment_code: '',
    payment_type: "'",
    amount: grandTotal,
    order_list: orderList,
  });
  
  const [isEmpty, setIsEmpyt] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    const loadCart = async () => {
      const groupBySeller = cart.data.item_cart.reduce((acc, curr) => {
        (acc[curr.umkm.ukmName] = acc[curr.umkm.ukmName] || []).push(curr);

        return acc;
      }, {});
      setGroupBySeller(groupBySeller);
      setTotal(cart?.data);
    };
    loadCart();
    setLoading(false);
  }, []);
  useEffect(() => {
    setGrandTotal(getTotal.total + totalOngkir);
  }, [totalOngkir]);

  useEffect(() => {

    if (getOngkirprice.length >= 1) {
      const totalOngkir = getOngkirprice?.reduce((acc, num) => {
    
         return acc + num.courier_total;
       },0);
      setTotalOngkir(totalOngkir)
    }
     
  }, [triggerNotif]);

  

  const alert = () => {
    if (getOngkirprice.length !== Object.keys(groupBySeller).length) {
      toast.error("mohon pilih layanan pengiriman terlebih dahulu");
    } 

    ///GET BUYERS ID
    //
  };
  
  return (
    <>
    <NextSeo title="Checkout"/>

    <div className="relatie">
      <div
        className="w-full fixed bottom-0 bg-white border-t border-gray-300  pl-4  pr-4 pt-6 pb-6 lg:hidden flex justify-between items-center"
        style={{ zIndex: 999 }}
      >
        <div className="flex-col flex">
          <span className="text-gray-600">Total Harga</span>
          <span className="text-xl  text-blue-100 font-bold lg:text-xl">
            <NumberFormat
              value={grandTotal}
              prefix="Rp"
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </div>
        <div className=" flex-row flex">
          <div className="  ml-2  w-full  flex ">
            {getOngkirprice.length !== Object.keys(groupBySeller).length ? (
              <button
                onClick={alert}
                className=" lg:block  w-full bg-blue-100 mt-5 px-2 py-2 text-white outline-none rounded-md"
              >
                Pilih pembayaran
              </button>
            ) : (
              <PaymentModal
                isMobile={true}
                grandTotal={grandTotal}
                orderList={orderList}
              />
            )}
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
            <h1 className="lg:text-2xl font-bold ">Checkout</h1>
            {/* <div className="mt-4 flex flex-row items-center">
              <img
                className="lg:w-6 w-3 "
                src="/assets/icon/house.svg"
                alt="house icon"
              />

              <h2 className="ml-2 text-md text-gray-800">Alamat Pengiriman </h2>
            </div> */}
            <AddressBox address={address?.address[0]} />
            {Object.keys(groupBySeller).map((ukmName, index) => {
              return (
                <CheckoutPageProduct
                  key={ukmName}
                  index={index}
                  setOngkirPrice={setOngkirPrice}
                  getOngkirprice={getOngkirprice}
                  address={address.address[0]}
                  getTempOngkir={getTempOngkir}
                  groupBySeller={groupBySeller}
                  ukmName={ukmName}
                  orderList={orderList}
                  setOrderList={setOrderList}
                  setTriggetNotif={setTriggetNotif}
                />
              );
            })}
          </div>
          <div className="  flex lg:flex relative  ">
            <div className=" shadow-md rounded-md  w-full lg:fixed  lg:w-72 px-5 py-5">
              <span className="font-bold ">Ringkasan Belanja</span>
              <div className="flex justify-between mt-5">
                <span className="text-gray-600 text-sm">
                  Total harga barang
                </span>
                <span className="text-gray-600 text-sm">
                  {
                    <NumberFormat
                      value={getTotal.total}
                      prefix="Rp"
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  }
                </span>
              </div>
              {totalOngkir > 0 && (
                <div className="flex justify-between mt-5">
                  <span className="text-gray-600 text-sm">Ongkos Kirim</span>
                  <span className="text-gray-600 text-sm">
                    <span>
                      <NumberFormat
                        value={totalOngkir}
                        prefix="Rp"
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </span>
                  </span>
                </div>
              )}

              <div className="flex justify-between mt-5 border-t border-gray-300 pt-5">
                <span className="font-bold text-md">Total harga</span>
                <span className="font-bold text-md">
                  {" "}
                  <NumberFormat
                    value={grandTotal}
                    prefix="Rp"
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>

              {getOngkirprice.length !== Object.keys(groupBySeller).length ? (
                <button
                  onClick={alert}
                  className=" lg:block hidden w-full bg-blue-100 mt-5 px-2 py-2 text-white outline-none rounded-md"
                >
                  Pilih pembayaran
                </button>
              ) : (
                <PaymentModal grandTotal={grandTotal} orderList={orderList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const bearerToken = `Bearer ${token}`;
  const cart = await getMyCart(bearerToken);

  
  const response = await getProfile(bearerToken);

  
  const user = response.data

  return {
    props: {
      cart: cart,
      address: user,
    },
  };
}
export default CheckoutPage;

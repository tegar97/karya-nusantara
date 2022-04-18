import { Button, Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import CartProduct from '../components/atom/cart-product-container/cart-product-container';
import OtherProduct from '../components/other-product/other-product';
import { getMyCart } from '../constant/api/cart';
import { removeProductFromCart } from '../redux/cart/action/cart';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';
import convertToRupiah from '../util/converRupiah';
import Link from 'next/link';
function CartPage({ cart }) {
  const [groupBySeller, setGroupBySeller] = useState([]);
  const [getTotal, setTotal]: any = useState({});
  const [updateNotifier, setUpdateNotifier] = useState(false);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="relative">
      <div
        className="w-full fixed bottom-0 bg-white border-t border-gray-300  pl-4  pr-4 pt-6 pb-6 lg:hidden flex justify-between items-center"
        style={{ zIndex: 999 }}
      >
        <div className="flex-col flex">
          <span className="text-gray-600">Total Harga</span>
          <span className="text-xl  text-blue-100 font-bold lg:text-xl">
            {convertToRupiah(parseInt(getTotal?.total))}
          </span>
        </div>
        <div className=" flex-row flex">
          <div className="  ml-2  w-full  ">
         
            <Link href="/checkout">
              <button className="bg-blue-100 hover:opacity-80 text-white font-bold py-2 px-20 w-full rounded outline-none">
                Checkout ({getTotal?.item_cart?.length})
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="  relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="flex  flex-col lg:flex-row  ">
          <div className=" lg:w-9/12 lg:pr-8">
            <h1 className="lg:text-2xl font-bold ">Keranjang</h1>
            {/*      
            <div className="mt-5 border border-gray-200 shadow-sm px-4 py-4 rounded-lg">
              <Checkbox
                style={{
                  color: "#5996ab",
                }}
                onChange={(val) => console.log(val)}
              />
              <span className="text-md text-gray-600">Pilih semua produk</span>
            </div> */}
            {cart.data.item_cart.length < 1 && (
              <h1 className="mt-5 text-xl">Keranjang belanjamu kosong</h1>
            )}
            <ul>
              <li>
                {loading ? (
                  <h1>loading ...</h1>
                ) : (
                  Object.keys(groupBySeller).map((ukmName) => {
                    return (
                      <CartProduct
                        setUpdateNotifier={setUpdateNotifier}
                        ukmName={ukmName}
                        setTotal={setTotal}
                        getTotal={getTotal}
                        setGroupBySeller={setGroupBySeller}
                        groupBySeller={groupBySeller}
                      />
                    );
                  })
                )}
              </li>
            </ul>
          </div>
          {loading ? (
            <h1>Loading ..</h1>
          ) : (
            <div className="  hidden lg:flex flex-1 relative ">
              <div className=" shadow-md rounded-md  fixed   px-5 py-5 lg:w-72">
                <span className="font-bold ">Ringkasan Belanja</span>
                <div className="flex justify-between mt-5">
                  <span className="text-gray-600 text-sm">
                    Total harga ({getTotal?.item_cart?.length} barang)
                  </span>
                  <span className="text-gray-600 text-sm">
                    {loading
                      ? "Loading ...."
                      : isEmpty
                      ? "0"
                      : convertToRupiah(parseInt(getTotal?.total))}
                  </span>
                </div>
                <div className="flex justify-between mt-5 border-t border-gray-300 pt-5">
                  <span className="font-bold text-md">Total harga</span>
                  <span className="font-bold text-md">
                    {loading
                      ? "Loading ...."
                      : isEmpty
                      ? "0"
                      : convertToRupiah(parseInt(getTotal?.total))}
                  </span>
                </div>
                {/* <button className="w-full bg-blue-100 mt-5 px-2 py-2 text-white outline-none rounded-md">
                Checkout (2)
              </button> */}
                <Link href="/checkout">
                  <Button className="w-full bg-blue-100 mt-5 px-2 py-2 focus:outline-none  text-white outline-none rounded-md border-transparent focus:border-transparent focus:ring-0 hover:opacity-90 hover:bg-blue-100 ">
                    Checkout ({getTotal?.item_cart?.length})
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* 
          <span>Rekomendasi untuk kamu</span>
        <div className="grid grid-cols-3 gap-3 mt-5">
          <OtherProduct />
        
        </div> */}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;
      const cart = await getMyCart(bearerToken);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }


  return {
    props: {
      token: token,
      cart: cart,
    },
  };
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProduct: (index) => dispatch(removeProductFromCart(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);


import { Checkbox } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { deleteCartItem, updateCart } from "../../../../constant/api/cart";
import convertToRupiah from "../../../../util/converRupiah";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function CartProductChild({
  data,
  setUpdateNotifier,
  setTotal,
  setGroupBySeller,
  getTotal,
  groupBySeller,
  key,
  idx,
}) {
  console.log(data);
  const [addNote, setAddNote] = useState(false);
  idx;
  const [quantity, setQuantity] = useState(data.quantity);

  // useEffect(() => {
  //   setQuantity(data.quantity);
  // }, [groupBySeller]);
  const [isSelected, setIsSelected] = useState(data.isSelected);
  const [delay, setDelay] = useState(false);
  const token = Cookie.get("token");
const router = useRouter();

  const Bearer = `Bearer ${token}`;

  const deleteCart = async () => {
    const response = await deleteCartItem(data.id, Bearer);
    if (response.error === false) {
      router.reload();

    }
    // let getProduct = Object.keys(groupBySeller).map((ukmName) => {
    //   return groupBySeller[ukmName].filter((groupProductId) => {
    //     return groupProductId.id !== data.id;
    //   });
    // });

    // let tempProductCart = [];
    // let productNotNull = getProduct.filter((e) => {
    //   return e != null;
    // });
    // productNotNull.map((data) => {
    //   data.map((child) => {
    //     tempProductCart.push(child);
    //   });
    // });

    // const filterBack = tempProductCart.reduce((acc, curr) => {
    //   (acc[curr.umkm.ukmName] = acc[curr.umkm.ukmName] || []).push(curr);
    //   return acc;
    // }, {});
    // setGroupBySeller(filterBack);

    const total = parseInt(data.product.price) * parseInt(quantity);
    setTotal({
      ...getTotal,
      total: response.data.total,
    });

    // if (response.error === false) {
    //   toast.success("Product telah dihapus dari keranjang")
    //   const updateGroupBySeller = response.data.item_cart.reduce((acc, curr) => {
    //     (acc[curr.umkm.ukmName] = acc[curr.umkm.ukmName] || []).push(curr);

    //     return acc;
    //   })
    //   setGroupBySeller([...groupBySeller, updateGroupBySeller]);
    // } else {
    // }
  };
  const notifUpdate = async (type) => {
    setDelay(true);

    if (type === "add") {
      const Responsedata = {
        itemCart_id: data.id,
        isSelected: isSelected,
        quantity: quantity + 1,
      };
      const response = await updateCart(Responsedata, Bearer);
    } else {
      const Responsedata = {
        itemCart_id: data.id,
        isSelected: isSelected,
        quantity: quantity - 1,
      };
      const response = await updateCart(Responsedata, Bearer);
    }
    setDelay(false);

    // if (response.error === false) {

    //   const groupBySellerUpdate = response.data.item_cart.reduce((acc, curr) => {
    //     (acc[curr.umkm.ukmName] = acc[curr.umkm.ukmName] || []).push(curr);

    //     return acc;
    //   }, {});
    //   setGroupBySeller([...groupBySellerUpdate, groupBySeller]);
    //   setTotal([...getTotal,response.data]);
    //   }
    if (isSelected == 1) {
       type == "add"
         ? setTotal({
             ...getTotal,
             total: parseInt(getTotal.total) + parseInt(data.product.price),
           })
         : setTotal({
             ...getTotal,
             total: parseInt(getTotal.total) - parseInt(data.product.price),
           });
       setUpdateNotifier(true);
    }
   
  };
  const addQuantity = () => {
    const realquantity = quantity + 1;
    if (realquantity <= parseInt(data.product.stock)) {
      setQuantity(quantity + 1);
      groupBySeller[data.umkm.ukmName][idx].quantity = quantity + 1;

      notifUpdate("add");
    }
  };
  const lessQuantity = () => {
    setQuantity(quantity - 1);
    notifUpdate("less");
  };

  const updateSelectProduct = async (status) => {
    const Responsedata = {
      itemCart_id: data.id,
      isSelected: status,
      quantity: quantity ,
    };
    const response = await updateCart(Responsedata, Bearer);
    if (response.error === false) {
      if (status == 0) {
        setTotal({
          ...getTotal,
          total:
            parseInt(getTotal.total) -
            parseInt(data.quantity) * parseInt(data.product.price),
        });
      } else {
        setTotal({
          ...getTotal,
          total:
            parseInt(getTotal.total) +
            parseInt(data.quantity) * parseInt(data.product.price),
        });
      }
      setIsSelected(status);
    }
  };
  return (
    <div
      className="mt-5 flex items-start  lg:flex-row flex-col justify-between overflow-hidden"
      key={data.id}
    >
      <div className="flex ">
        <div className="flex flex-row">
          <div className="flex flex-row items-center ">
            {isSelected == 1 ? (
              <Checkbox
                checked
                value={1}
                onChange={() => updateSelectProduct(0)}
                style={{
                  color: "#5996ab",
                }}
              />
            ) : (
              <Checkbox
                onChange={() => updateSelectProduct(1)}
                value={0}
                style={{
                  color: "#5996ab",
                }}
              />
            )}

            <img
              src={`${process.env.API_V2}/storage/images/product/${data.product.images[0]?.imageName}`}
              alt={"Photo produk dari " + data.name}
              className=" lg:w-28 w-20 h-20 lg:h-28 rounded-md"
            />
          </div>

          <div className="flex flex-col ml-5  lg:max-w-md">
            <div className="flex flex-col">
              <span className="text-md lg:text-lg">{data?.product?.name}</span>
              <span className="text-blue-100 mt-2 lg:text-lg text-sm">
                {convertToRupiah(data?.product?.price)}
              </span>
            </div>
            <div className="mt-3">
              {/* {!addNote && (
                <span
                  className="text-blue-100 mt-2 cursor-pointer"
                  onClick={() => setAddNote(true)}
                >
                  Tuliskan catatan
                </span>
              )}
              {addNote == true && (
                <div className="flex flex-row items-center">
                  <input
                    placeholder="Ukuran M yahh"
                    className="py-1 text-gray-600 rounded-md px-2 border border-blue-100  focus:border-blue-100 focus:border focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                  <span
                    className="ml-2 text-blue-100 text-sm font-semibold cursor-pointer"
                    onClick={() => setAddNote(false)}
                  >
                    Selesai
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-0 mt-5 lg:ml-0  flex-row  lg:flex-col   justify-between w-full  lg:w-auto items-center lg:items-end ">
        <button
          className="order-1 lg:order-none	 outline-none border-none ring-0 just"
          onClick={() => deleteCart()}
        >
          <img
            src={"/assets/icon/delete.svg"}
            className="w-5 lg:10"
            alt="trash icon"
          />
        </button>
        <div className="lg:w-36 ml-10 lg:m-0">
          <div className="border   border-gray-300 mt-2 items-center py-1 px-1 rounded-lg justify-between  flex flex-row">
            {quantity >= 2 ? (
              delay ? (
                <button
                  className="  border-l border-gray-300 lg  w-5 lg:w-5/12 "
                  disabled
                >
                  -
                </button>
              ) : (
                <button
                  className="  border-l border-gray-300   w-5 lg:w-5/12 "
                  onClick={() => lessQuantity()}
                >
                  -
                </button>
              )
            ) : (
              <button className="  border-l border-gray-300 lg:w-5/12" disabled>
                -
              </button>
            )}
            <input
              placeholder="1"
              className=" px-2 text-center border w-20 lg:w-16"
              value={quantity}
              type="number"
            />
            {delay ? (
              <button
                className="border-r  border-gray-300   w-5 lg:w-1/3"
                disabled
              >
                +
              </button>
            ) : (
              <button
                className="border-r border-gray-300    w-5 lg:w-1/3"
                onClick={() => addQuantity()}
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductChild;

import { Checkbox } from "@material-ui/core";
import React,{useState} from "react";
import { deleteCartItem, updateCart } from "../../../../constant/api/cart";
import convertToRupiah from "../../../../util/converRupiah";
import Cookie from 'js-cookie'
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function CartProductChild({ data, setUpdateNotifier, setTotal,setGroupBySeller,getTotal,groupBySeller}) {
  const [addNote, setAddNote] = useState(false);
  const [quantity, setQuantity] = useState(data.quantity);
  const [isSelected, setIsSelected] = useState(data.isSelected);
  const [delay, setDelay] = useState(false);
  const token = Cookie.get("token");
  const router = useRouter();

    const Bearer = `Bearer ${token}`;

  const deleteCart = async () => {
    const response = await deleteCartItem(data.id, Bearer);
    let getProduct = Object.keys(groupBySeller).map((ukmName) => {
      return groupBySeller[ukmName].filter((groupProductId) => {
        return groupProductId.id !== data.id;
      });
    });
    console.log(getProduct)
     let tempProductCart = [];
    let productNotNull = getProduct.filter(e => {
        return e != null
    })
    productNotNull.map(data => {
      data.map(child => {
                  tempProductCart.push(child);

        })
      console.log("-", data);
    })
      console.log("=", tempProductCart);

      const filterBack = tempProductCart.reduce((acc, curr) => {
        console.log(acc);
        console.log(curr);
        (acc[curr.umkm.ukmName] = acc[curr.umkm.ukmName] || []).push(curr);
        return acc;
      }, {});
      console.log(filterBack);
      setGroupBySeller(filterBack);
    
     setTotal({
       ...getTotal,
       total: parseInt(getTotal.total) - parseInt(data.product.price),
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

  } 
  const notifUpdate = async (type) => {
    
  setDelay(true)
    
    if (type === 'add') {
        const Responsedata = {
          itemCart_id: data.id,
          isSelected: 1,
          quantity: quantity + 1,
      };
              const response = await updateCart(Responsedata, Bearer);

    } else {
      const Responsedata = {
        itemCart_id: data.id,
        isSelected: 1,
        quantity: quantity - 1,
      };
              const response = await updateCart(Responsedata, Bearer);

    }
    setDelay(false)
       

        // if (response.error === false) {

        //   const groupBySellerUpdate = response.data.item_cart.reduce((acc, curr) => {
        //     (acc[curr.umkm.ukmName] = acc[curr.umkm.ukmName] || []).push(curr);

        //     return acc;
        //   }, {});
        //   setGroupBySeller([...groupBySellerUpdate, groupBySeller]);
        //   setTotal([...getTotal,response.data]);
        //   }
    
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
  const addQuantity =  () => {
    setQuantity(quantity + 1);
    notifUpdate('add')
    
  };
  const lessQuantity =  () => {
    setQuantity(quantity - 1);
       notifUpdate("less");


  };
  return (
    <div className="mt-5 flex items-start  lg:flex-row justify-between overflow-hidden">
      <div className="flex ">
        <div className="flex flex-row items-center ">
          {isSelected == 1 ? (
            <Checkbox
              checked
              value={1}
              onChange={() => setIsSelected(0)}
              style={{
                color: "#5996ab",
              }}
            />
          ) : (
            <Checkbox
              onChange={() => setIsSelected(1)}
              value={0}
              style={{
                color: "#5996ab",
              }}
            />
          )}

          <img
            className="lg:w-28 w-16 h-16 lg:h-28 rounded-md"
            src={
              "https://bs.moselo.com/images/product_s3/large/sv-8106-2-1594894656342.png"
            }
          />
        </div>

        <div className="flex flex-col ml-2">
          <div className="flex flex-col">
            <span className="text-sm lg:text-lg">{data?.product?.name}</span>
            <span className="text-blue-100 mt-2 lg:text-lg text-xs">
              {convertToRupiah(data?.product?.price)}
            </span>
          </div>
          <div className="mt-3">
            {!addNote && (
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
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between   items-end ">
        <button
          className="outline-none border-none ring-0"
          onClick={() => deleteCart()}
        >
          <img
            src={"/assets/icon/delete.svg"}
            className="w-5 lg:10"
            alt="trash icon"
          />
        </button>
        <div className="w-36">
          <div className="border   border-gray-300 mt-2 items-center py-1 px-1 rounded-lg justify-between  flex flex-row">
            {quantity >= 2 ? (
              delay ? (
                <button
                  className="  border-l border-gray-300 lg lg:w-5/12 "
                  disabled
                >
                  -
                </button>
              ) : (
                <button
                  className="  border-l border-gray-300 lg lg:w-5/12 "
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
              className=" px-2 text-center border lg:w-16"
              value={quantity}
              defaultValue="0"
              type="number"
            />
            {delay ? (
              <button className="border-r border-gray-300 w-1/3" disabled>
                +
              </button>
            ) : (
              <button
                className="border-r border-gray-300 w-1/3"
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

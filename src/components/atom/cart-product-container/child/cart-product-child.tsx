import { Checkbox } from "@material-ui/core";
import React,{useState} from "react";

function CartProductChild() {
  const [addNote, setAddNote] = useState(false);
  const [quantity, setQuantity] = useState(1);
   const addQuantity = () => {
     setQuantity(quantity + 1);
   };

   const lessQuantity = () => {
     setQuantity(quantity - 1);
   };
  return (
    <div className="mt-5 flex items-start  lg:flex-row justify-between overflow-hidden">
      <div className="flex ">
        <div className="flex flex-row items-center ">
          <Checkbox
            style={{
              color: "#5996ab",
            }}
          />
          <img
            className="lg:w-28 w-16 h-16 lg:h-28 rounded-md"
            src={
              "https://bs.moselo.com/images/product_s3/large/sv-8106-2-1594894656342.png"
            }
          />
        </div>
        
        <div className="flex flex-col ml-2">
          <div className="flex flex-col">
            <span className="text-sm lg:text-lg">Wellness Sticker Sheet</span>
            <span className="text-blue-100 mt-2 lg:text-lg text-xs">
              Rp 25.000
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
        <button className="outline-none border-none ring-0">
          <img
            src={"/assets/icon/delete.svg"}
            className="w-5 lg:10"
            alt="trash icon"
          />
        </button>
        <div className="w-36">
          <div className="border   border-gray-300 mt-2 items-center py-1 px-1 rounded-lg justify-between  flex flex-row">
            {quantity > 0 ? (
              <button
                className="  border-l border-gray-300 lg lg:w-5/12 "
                onClick={() => lessQuantity()}
              >
                -
              </button>
            ) : (
              <button className="  border-l border-gray-300 lg:w-5/12">
                -
              </button>
            )}

            <input
              placeholder="1"
              className=" px-2 text-center border lg:w-16"
              value={quantity}
              defaultValue="0"
              onChange={(value) => {
                if (value.target.value == "" || value.target.value == null) {
                  setQuantity(null);
                } else {
                  setQuantity(parseInt(value.target.value));
                }
              }}
              type="number"
            />
            <button
              className="border-r border-gray-300 w-1/3"
              onClick={() => addQuantity()}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductChild;

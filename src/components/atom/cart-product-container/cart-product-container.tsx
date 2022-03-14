import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react'
import QuantityCard from '../quantity/quantity-card';
import CartProductChild from './child/cart-product-child'
function CartProduct() {
  const [addNote, setAddNote] = useState(false);


  return (
    <div className="w-full mt-5 border border-gray-200 shadow-sm px-4 py-4 rounded-lg flex flex-col">
      <div className="flex flex-row w-full pb-3 border-b border-gray-200 items-center">
        <Checkbox
          style={{
            color: "#5996ab",
          }}
          onChange={(val) => console.log(val)}
        />
        <img
          src={"assets/icon/store.svg"}
          alt="store icon"
          className="lg:w-8"
        />
        <span className="ml-2 text-md text-gray-800">Toko dummy</span>
      </div>
      <ul>
        <li className='mb-3'>
          {" "}
          <CartProductChild />
        </li>
        <li className='mb-3'>
          {" "}
          <CartProductChild />
        </li>
      </ul>
    </div>
  );
}

export default CartProduct
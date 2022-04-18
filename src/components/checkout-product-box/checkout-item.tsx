import React from 'react'
import NumberFormat from 'react-number-format';
import convertToKg from '../../util/convertToKg';

function CheckoutItem({ product }) {

   
    return (
      <div className="mb-5">
        <div className="flex flex-row w-full ">
          <img
            className="lg:w-28 w-20 h-20 lg:h-28 rounded-md "
            alt="product photo"
            src={`${process.env.API_V2}/storage/images/product/${product.product.images[0]?.imageName}`}
          />
          <div className="flex flex-col ml-3 ">
            <span className="text-sm lg:text-lg">{product.product.name}</span>
            <span className="  text-gray-600 mt-2 lg:text-sm text-sm">
              {product.quantity} barang (
              {convertToKg(
                parseInt(product.quantity) * parseInt(product.product.weight)
              )}
              )
            </span>
            <span className="text-black font-bold mt-2 lg:text-sm text-sm">
              <NumberFormat
                value={product.product.price}
                prefix="Rp "
                displayType={"text"}
                thousandSeparator={true}
              />
            </span>
          </div>
        </div>
        
      </div>
    );
}

export default CheckoutItem;
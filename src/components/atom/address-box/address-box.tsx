import { Button } from '@material-ui/core';
import React from 'react'
import PopAddressBox  from '../../popup-address-box/popup-address-box';
function AddressBox() {
  return (
    <div className="mt-5 border border-gray-200 shadow-sm px-4 py-4 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col lg:w-8/12 ">
          <span>Alamat Pengiriman </span>

          <span className="mt-3 font-bold text-gray-800  ">
            Jl. Raya Cikalang No.116, Cileunyi Kulon, Kec. Cileunyi
          </span>
          <span className="font-bold text-gray-800  mt-1">
            Jawa Barat 40622, Indonesia,
          </span>
        </div>
       <PopAddressBox/>
      </div>
    </div>
  );
}

export default AddressBox
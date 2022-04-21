import { Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react'
import PopAddressBox  from '../../popup-address-box/popup-address-box';
function AddressBox({ address }) {
  return (
    <div className="mt-5 border border-gray-200 shadow-sm px-4 py-4 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col lg:w-8/12 ">
          <span>Alamat Pengiriman </span>
          {address !== undefined && (
            <>
              <span className="mt-3 font-bold text-gray-800  ">
                {address?.complateAddress +
                  "," +
                  address?.village +
                  "," +
                  address?.subdistrict +
                  "," +
                  address?.postalCode}
              </span>
              <span className="font-bold text-gray-800  mt-1">
                {address?.province_name}, Indonesia,
              </span>
            </>
          )}
        </div>
        {address !== undefined ? (
          <Link href="/member/alamat">
            <Button className="lg:h-10  bg-gray-100 outline-none rounded-lg">
              Change
            </Button>
          </Link>
        ) : (
          <Link href="/member/alamat" >
            <Button className="lg:h-10  bg-gray-100 outline-none rounded-lg">
              Tambahkan
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default AddressBox
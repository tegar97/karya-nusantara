import moment from 'moment';
import Link from 'next/link';
import React from 'react'
import NumberFormat from 'react-number-format';

function PaymentPendingList({data}) {
  return (
    <div className="shadow-md w-full py-2 px-5 rounded-md mb-5">
      <div className="flex flex-row justify-between">
        <div>
          <span className="text-sm">Belanja </span>
          <span className="text-sm">
            {moment(data.created_at).format("DD MMMM YYYY")}{" "}
          </span>
        </div>
        <div className="">
          <span className="text-sm">Bayar sebelum</span>
          <span className="text-sm text-yellow-500">
            {moment(data.expire_time_str).format("DD MMMM YYYY")}
          </span>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between mt-5 items-center ">
        <div className="flex flex-row items-center">
          <div>
            <img
              src={`${process.env.API_V2}/storage/images/gateway/${data.payment_gateway.gateway_logo}`}
              width="53"
              height={16}
              alt="logo payment gateway"
            />
          </div>
          <div className="flex flex-col ml-5">
            <span className="text-sm text-gray-700 mb-1 ">
              Metode pembayaran
            </span>
            <span className="text-gray-900 font-semibold">
              {data.payment_gateway.gateway_name}
            </span>
          </div>
          <div className="flex flex-col ml-2">
            <span className="text-sm text-gray-700  mb-1">
              Nomer Virtual Account
            </span>
            <span className="text-gray-900 font-semibold">
              {data.payment_key}
            </span>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">Total Pembayaran</span>
            <span>
              {
                <NumberFormat
                  value={data.amount}
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Link href={`/payment/detail/${data.payment_url}`}>
          <span className="cursor-pointer mr-5">Lihat detail</span>
        </Link>
        <span className="cursor-pointer">Batalkan Pembayaran</span>
      </div>
    </div>
  );
}

export default PaymentPendingList
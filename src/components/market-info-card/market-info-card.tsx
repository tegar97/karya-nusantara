import { Avatar } from '@material-ui/core';
import Link from 'next/link';
import React from 'react'

function MarketInfoCard({ ukmData }) {
  return (
    <div
      className="flex flex-col border border-gray-200  	"
      style={{ borderRadius: 10, minHeight: 50 }}
    >
      <div className=" flex-1 flex-row flex justify-between pl-5 pr-5 pt-4 pb-4 ">
        <div className="flex-row flex justify-start w-11/12 location.svg">
          <div>
            {ukmData.profile ? (
              <img
                alt="Logo Illo Factory"
                src=""
                className="object-cover  rounded-full"
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <Avatar style={{ backgroundColor: "#5996ab" }}>
                {ukmData.ukmName.charAt(0)}{" "}
              </Avatar>
            )}
          </div>
          <div className="flex flex-col ml-2 ">
            <span className="text-md font-bold">{ukmData.ukmName}</span>
            <span className="" style={{ fontSize: 11 }}>
              {ukmData.city_name}, {ukmData.province_name}
            </span>
          </div>
        </div>
        <div className="w-full flex-1">
          <Link href={`/mitra/profile/${ukmData.slug}`}>
            <button className="border border-gray-200 text-gray-600 font-bold p-1 pl-4 pr-4  w-full rounded text-xs">
              View Profile
            </button>
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-200 flex flex-row ">
        <div className="w-1/2 pl-5 pr-5 pt-4 pb-4 text-center  flex flex-row items-center">
          <img src={"/assets/icon/success.svg"} className="lg:w-5" />
          <span className="text-md  "> Transaksi Sukses</span>
        </div>
        <div className="w-1/2 border-l border-gray-200 pl-5 pr-5 pt-4 pb-4  justify-around justify-items-center items-center flex text-center">
          <img src={"/assets/icon/star.svg"} className="lg:w-5" />

          <span className="text-md">4.9 Rating</span>
        </div>
      </div>
    </div>
  );
}

export default MarketInfoCard
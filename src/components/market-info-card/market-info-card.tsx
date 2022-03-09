import React from 'react'

function MarketInfoCard() {
  return (
    <div
      className="flex flex-col border border-gray-200  	"
      style={{ borderRadius: 10, minHeight: 50 }}
    >
      <div className=" flex-1 flex-row flex justify-between pl-5 pr-5 pt-4 pb-4 ">
        <div className="flex-row flex justify-start w-11/12">
          <div>
            <img
              alt="Logo Illo Factory"
              src="https://bs.moselo.com/images/users/small/user20688-1553606060"
              className="object-cover  rounded-full"
              style={{ width: 50, height: 50 }}
            />
          </div>
          <div className="flex flex-col ml-2 ">
            <span className="text-md font-bold">Illo Factory</span>
            <span className="" style={{ fontSize: 11 }}>
              Jakarta Barat, DKI Jakarta
            </span>
          </div>
        </div>
        <div className="w-full flex-1">
          <button className="border border-gray-200 text-gray-600 font-bold p-1 pl-4 pr-4  w-full rounded text-xs">
            View Profile
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 flex flex-row ">
        <div className="w-1/2 pl-5 pr-5 pt-4 pb-4 text-center table">
          <span className='' >21</span>
          <span className="text-md "> Transaksi Sukses</span>
        </div>
        <div className="w-1/2 border-l border-gray-200 pl-5 pr-5 pt-4 pb-4">
          <h1>21 success</h1>
        </div>
      </div>
    </div>
  );
}

export default MarketInfoCard
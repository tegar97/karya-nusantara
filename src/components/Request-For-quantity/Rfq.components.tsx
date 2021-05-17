import Link from "next/link";
import React from "react";

function Rfq() {
  return (
    <div className="py-3">
      <div className="p-3 mb-3 text-xl text-center text-white bg-blue-100 lg:text-2xl ">
        Request for Quotation
      </div>

      <div
        className="bg-cover "
        style={{ backgroundImage: "url('/assets/rfq.png')" }}
      >
        {/* <HeadingSecondary className="text-center ">
        Request For Quotation
      </HeadingSecondary> */}
        <div className="grid items-center content-center gap-4 p-4 sm:p-4 lg:p-5 lg:grid-cols-5 md:grid-cols-1 ">
          <div className="col-span-1 text-left lg:col-span-3 ">
            <h4 className="mb-5 text-2xl font-bold text-white lg:text-4xl ">
              Solusi cepat Untuk Mendapatkan Penawaran Harga
            </h4>
            <span className="text-lg text-white ">
              Isikan Detail Barang Yang Anda inginkan disini
            </span>
          </div>
          <div className="w-full col-span-2 ">
            <div className="bg-white p-7 ">
              <span>Dapatkan Penawaran Terbaik</span>
              <form>
                <div className="my-5 text-sm">
                  <label htmlFor="name" className="block text-black">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
                    placeholder="Isi Barang Yang Anda Cari"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="my-5 text-sm">
                    <label htmlFor="quantity" className="block text-black">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
                      placeholder="Jumlah Barang"
                    />
                  </div>
                  <div className="col-span-2 my-5 text-sm">
                    <label htmlFor="quantity" className="block text-black">
                      Satuan
                    </label>
                    <select
                      id="quantity"
                      className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
                      placeholder="Isi Barang Yang Anda Cari"
                    >
                      <option>Pilih Satuan Barang</option>
                      <option value="unit">UNIT</option>
                      <option value="liter">Liter</option>
                      <option value="Kg">Kg</option>
                      <option value="box">Box</option>
                      <option value="meter">Meter</option>
                      <option value="set">Set</option>
                    </select>
                  </div>
                </div>
                <div className="my-5 text-sm">
                  <label htmlFor="keterangan" className="block text-black">
                    Keterangan
                  </label>
                  <textarea
                    id="keterangan"
                    className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
                    placeholder="Jumlah Barang"
                  ></textarea>
                </div>
                <Link href="/request">
                  <button className="p-2 text-white bg-blue-100 ">
                    Submit
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rfq;

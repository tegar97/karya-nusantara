import React from "react";
import { HeadingSecondary } from "./../About/About.styled";

function Rfq() {
  return (
    <div
      className="bg-cover "
      style={{ backgroundImage: "url('/assets/rfq.png')" }}
    >
      {/* <HeadingSecondary className="text-center ">
        Request For Quotation
      </HeadingSecondary> */}
      <div className="grid grid-cols-5 gap-4 p-20 ">
        <div className="col-span-3">
          <h4 className="mb-5 text-4xl font-bold text-white">
            Solusi cepat Untuk Mendapatkan Penawaran Harga
          </h4>
          <span className="text-lg text-white ">
            Isikan Detail Barang Yang Anda inginkan disini
          </span>
        </div>
        <div className="w-full col-span-2">
          <div className="p-5 bg-white ">
            <span>Dapatkan Penawaran Terbaik</span>
            <form>
              <div className="my-5 text-sm">
                <label htmlFor="stuff" className="block text-black">
                  Nama Barang
                </label>
                <input
                  type="text"
                  autoFocus
                  id="stuff"
                  className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
                  placeholder="Isi Barang Yang Anda Cari"
                />
              </div>
              <div className="my-5 text-sm">
                <label htmlFor="stuff" className="block text-black">
                  Nama Barang
                </label>
                <input
                  type="text"
                  autoFocus
                  id="stuff"
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
                    autoFocus
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
                    autoFocus
                    id="quantity"
                    className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
                    placeholder="Isi Barang Yang Anda Cari"
                  >
                    <option>Pilih Satuan Barang</option>
                    <option value="unit">UNIT</option>
                    <option value="unit">Pasang</option>
                  </select>
                </div>
              </div>
              <div className="my-5 text-sm">
                <label htmlFor="keterangan" className="block text-black">
                  Keterangan
                </label>
                <textarea
                  autoFocus
                  id="keterangan"
                  className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
                  placeholder="Jumlah Barang"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rfq;

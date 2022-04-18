import React from 'react'

function Feature() {
  return (
    <div className="px-10 pt-8 pb-20 lg:pt-10 lg:px-24 lg:pb-40 bg-gray-100 flex justify-center flex-col items-center">
      <h2 className="text-blue-100 text-3xl font-bold ">
        Kenapa Belanja di Karya Nusantara
      </h2>

      <div className="grid   lg:grid-cols-3 mt-20  md:grid-cols-3 gap-5 lg:gap-40">
        <div className="flex flex-col justify-center items-center">
          <img
            src={`/assets/feature_3.png`}
            className="lg:w-52 lg:h-52 h-40 w-40"
            alt="icon produk umkm"
          />
          <div className="mt-6 items-center flex flex-col">
            <h3 className="text-xl text-blue-100 font-semibold">Produk Umkm</h3>
            <div className="flex flex-col items-center  mt-2">
              <span>#bisnislestari</span>
              <span>#bisnisberdampaksocial</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <img
            src={`/assets/feature_2.png`}
            className="lg:w-52 lg:h-52 h-40 w-40"
            alt="icon pendampingan standar"
          />
          <div className="mt-6 items-center flex flex-col">
            <h3 className="text-xl text-blue-100 font-semibold">
              Pendampingan Standar
            </h3>
            <div className="flex flex-col items-center text-center   mt-2">
              <span>#ukmpunyastandar</span>
              <span>#ukmprofesional</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <img
            src={`/assets/feature_1.png`}
            className="lg:w-52 lg:h-52 h-40 w-40"
            alt="icon terpecaya"
          />
          <div className="mt-6 items-center flex flex-col">
            <h3 className="text-xl text-blue-100 font-semibold">Terpercaya</h3>
            <div className="flex flex-col items-center text-center mt-2">
              <span>#transparan</span>
              <span>#getikuminaktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature
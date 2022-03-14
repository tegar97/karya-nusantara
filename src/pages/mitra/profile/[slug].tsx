import { Rating } from '@mui/material';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.min.css";
import ProductCard from '../../../components/product-card/product-card';
function MitraShop() {
  return (
    <div className="relative">
      <div
        className=" relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="flex flex-col lg:grid  lg:grid-cols-6">
          <div className="shadow-md flex  flex-col rounded-lg col-span-2 lg:h-80 ">
            <div className="flex flex-row  py-5 px-5">
              <img
                alt="mitra photos"
                className="lg:w-20 h-20 w-20 lg:h-20 rounded-full"
                src={
                  "https://bs.moselo.com/images/users/medium/user4947-1588218619.png"
                }
              />
              <div className="flex flex-col ml-2">
                <span className="text-lg text-gray-700 font-bold">
                  Toko Dummy
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  Jakarta Selatan,DKI Jakarta
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-5 border-t  border-b border-gray-300">
              <div className="  py-5 px-5 text-center flex flex-col">
                <span className="text-xl font-bold text-blue-100">47</span>
                <span className="text-gray-600 text-md">Order Success</span>
              </div>
              <div className="border-l border-gray-300  text-center flex flex-col  py-5 px-5">
                <span className="text-xl font-bold text-blue-100">4.8</span>
                <span className="text-gray-600 text-md">Rating </span>
              </div>
            </div>
            <div className=" py-5 px-5">
              <p className="text-sm  text-gray-800">
                Orderan akan dikirim di hari senin-jumat
              </p>
            </div>
          </div>

          <div className="ml-5 flex-1 col-span-4  lg:mt-0 mt-10">
            <span className="font-bold lg:text-2xl text-gray-700">
              Last Reviews
            </span>
            <Swiper
              className="mt-5 cursor-pointer"
              spaceBetween={5}
              breakpoints={{
                // when window width is >= 640px
                320: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 3,
                },
              }}
              slidesPerView={10}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide className=" border border-gray-300 py-5 px-2">
                <div className="flex flex-col">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="mt-1">Pengirimanya cepat sekali</span>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" border border-gray-300 py-5 px-2">
                <div className="flex flex-col">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="mt-1">
                    Kualitas bahan bagus. Aman untuk si kecil. Aman buat bayi
                    👶.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" border border-gray-300 py-5 px-2">
                <div className="flex flex-col">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="mt-1">Pengirimanya cepat sekali</span>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" border border-gray-300 py-5 px-2">
                <div className="flex flex-col">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="mt-1">Pengirimanya cepat sekali</span>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" border border-gray-300 py-5 px-2">
                <div className="flex flex-col">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="mt-1">Pengirimanya cepat sekali</span>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="mt-10">
              <span className="font-bold lg:text-2xl text-gray-700">
                Product dari Toko Dummy
              </span>

              <div className='mt-2'>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">

                  <ProductCard/>
                  <ProductCard/>
                  <ProductCard/>
                  <ProductCard/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MitraShop
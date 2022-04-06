import { Rating } from '@mui/material';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.min.css";
import ProductCard from '../../../components/product-card/product-card';
import { getProfile, refresh } from '../../../constant/api/auth';
import Cookie from 'js-cookie'
import { Avatar } from '@material-ui/core';
import ProductItems from '../../../components/product-items/product-items';
import KatalogItems from '../../../components/katalog-items/katalog-items';

export async function getServerSideProps({ req, params }) {
  // Fetch data from external API
  const res = await fetch(
    `http://karyanusantara.test/api/umkm/${params.slug}`
  );
  const data = await res.json();

  //Get user address
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;
  if (!token) {
    return { props: { data, user: null, token: null } };
  }
  try {
    const response = await getProfile(bearerToken);
    const user = response?.data;
    return { props: { data, user, token } };
  } catch (error) {
    const newToken = await refresh(bearerToken);
    Cookie.set("token", newToken.data.access_token, { expires: 1 });
    const redirect = true;
    return { props: { data, redirect } };
  }

  // Pass data to the page via props
}
function MitraShop({ data }) {
  console.log(data)
  return (
    <div className="relative">
      <div
        className=" relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="flex flex-col lg:grid  lg:grid-cols-7">
          <div className="shadow-md flex  flex-col rounded-lg col-span-2 lg:h-80 ">
            <div className="flex flex-row  py-5 px-5">
              {data.data[0].profile_photo ? (
                <img
                  alt="mitra photos"
                  className="lg:w-20 h-20 w-20 lg:h-20 rounded-full"
                />
              ) : (
                <Avatar
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#5996ab",
                    fontSize: 30,
                  }}
                >
                  {data.data[0].ukmName.charAt(0)}
                </Avatar>
              )}

              <div className="flex flex-col ml-3">
                <span className="text-lg text-gray-700 font-bold">
                  {data.data[0].ukmName}
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  {data.data[0].city_name} , {data.data[0].province_name}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-5 border-t  border-b border-gray-300">
              <div className="  py-5 px-5 text-center flex flex-col">
                <span className="text-xl font-bold text-blue-100">0</span>
                <span className="text-gray-600 text-md">Order Success</span>
              </div>
              <div className="border-l border-gray-300  text-center flex flex-col  py-5 px-5">
                <span className="text-xl font-bold text-blue-100">0</span>
                <span className="text-gray-600 text-md">Rating </span>
              </div>
            </div>
            <div className=" py-5 px-5">
              <p className="text-sm  text-gray-800"></p>
            </div>
          </div>

          <div className="ml-5 flex-1 col-span-5 lg:mt-0 mt-10">
            {/* <span className="font-bold lg:text-2xl text-gray-700">
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
            </Swiper> */}
            <div className="mt-10">
              <span className="font-bold lg:text-2xl text-gray-700">
                Product dari {data.data[0].ukmName}
              </span>

              <div className="mt-2">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                  {data.data[0].product.map(product => {
                    return <KatalogItems data={product} key={product.id} loading={false}  />
                  })}
              
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
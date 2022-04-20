import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from 'swr';
import KatalogItems from '../katalog-items/katalog-items';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
function BestProduct() {

  const { data, error } = useSWR(`${process.env.API_V2}/api/umkm/product/main`);

  console.log(data);
  return (
    <div
      className="px-10 pt-8 pb-20 lg:py-10 lg:px-20  "
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <h2 className="text-blue-100  text-lg lg:text-2xl font-bold">
        Product Unggulan Karya Nusantara
      </h2>
      <Swiper
        className="mt-10"
        spaceBetween={5}
        slidesPerView={4}
        pagination={{ clickable: true }}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          // when window width is >= 640px
          100: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 5,
          },
        }}
      >
        {data &&
          data?.data.map((data) => {
            return (
              <SwiperSlide>
                <KatalogItems isTextcenter={true} key={data.id} data={data} />
              </SwiperSlide>
            );
          })}
      </Swiper>
      {/* {data &&
          data.data.map((data) => {
            return (
              <KatalogItems isTextcenter={true} key={data.id} data={data} />
            );
          })} */}
    </div>
  );
}

export default BestProduct
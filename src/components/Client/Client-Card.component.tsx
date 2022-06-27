import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
): any => fetch(...args).then((res) => res.json());
const ClientCard = () => {
  const { data, error: errorCategory } = useSWR(
    `${process.env.API_LARAVEL}/api/client/`,
    fetcher
  );
  var settings = {
    dots: false,
    className: "client-grid",
    centerMode: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    
    speed: 4000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    // pauseOnHover: true,
    accessibility: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        className: "center",
        centerPadding: "60px",
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        className: "center",
        centerPadding: "60px",
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        className: "center",
        centerPadding: "60px",
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="text-center ">
      <>
        {!data ? (
          <div>Loading ....</div>
        ) : data.data.length >= 8 ? (
          <Slider {...settings} style={{ zIndex: 2 }}>
            {data.data.map((data) => (
              <div className="  text-center border border-gray-200 shadow-lg rounded-md   ">
                <img
                  src={`${process.env.API_LARAVEL}/storage/${data.icon}`}
                  alt={`${data.name}`}
                  className="self-center object-cover mb-5 text-center w-30 h-30 "
                />
                <div className="mt-5 text-center">
                  <span>{data.name}</span>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid w-full grid-cols-3 p-0 gap-x-16 gap-y-5 lg:gap-x-10 lg:grid-cols-7 ">
            {data.data.map((data) => (
              <div className="px-2 py-2 border border-gray-200 ">
                <img
                  src={`${process.env.API_LARAVEL}/storage/${data.icon}`}
                  alt={`${data.name}`}
                  className="self-center object-cover mb-5 text-center "
                />
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default ClientCard;

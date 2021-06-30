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
    className: "center",

    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    // pauseOnHover: true,
    accessibility: true,
    arrows: true,

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
    <div>
      <>
        {!data ? (
          <div>Loading ....</div>
        ) : data.data.length >= 8 ? (
          <Slider {...settings} style={{ zIndex: 2 }}>
            {data.data.map((data) => (
              <div className="px-5">
                <img
                  src={`${process.env.API_LARAVEL}/storage/${data.icon}`}
                  alt={`${data.name}`}
                  className="self-center object-cover mb-5 text-center "
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid w-full grid-cols-3 p-0 gap-x-16 gap-y-5 lg:gap-x-10 lg:grid-cols-7 ">
            {data.data.map((data) => (
              <img
                src={`${process.env.API_LARAVEL}/storage/${data.icon}`}
                alt={`${data.name}`}
                className="self-center object-cover mb-5 text-center "
              />
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default ClientCard;

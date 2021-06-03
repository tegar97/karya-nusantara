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
    dots: true,
    className: "center",

    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 20000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        className: "center",
        centerPadding: "60px",
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        className: "center",
        centerPadding: "60px",
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        className: "center",
        centerPadding: "60px",
        settings: {
          slidesToShow: 1,
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
        ) : data.data.length >= 3 ? (
          <Slider {...settings}>
            {data.data.map((data) => (
              <div className="w-full p-2 text-center bg-white border-black shadow-lg">
                <Image
                  src={`${process.env.API_LARAVEL}/storage/${data.icon}`}
                  width={200}
                  height={200}
                  alt="Klient 1"
                  className="self-center mb-5 text-center"
                />
                <div>
                  <span>{data.description}</span>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 ">
            {data.data.map((data) => (
              <div className="w-full p-2 text-center bg-white shadow-lg">
                <Image
                  src={`${process.env.API_LARAVEL}/storage/${data.icon}`}
                  width={200}
                  height={200}
                  alt="Klient 1"
                  className="self-center mb-5 text-center"
                />
                <div>
                  <span>{data.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default ClientCard;

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import useSWR from "swr";
import { HeadingSecondary } from "../About/About.styled";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import MitraCardComponent from "./Mitra-card.componen";

const fetcher = (
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
): any => fetch(...args).then((res) => res.json());
function OurMitra() {
  const { data, error } = useSWR(
    `${process.env.API_LARAVEL}/api/mitra/`,
    fetcher
  );
  function createMarkup(data) {
    return { __html: data };
  }
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 20000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="px-5 pt-2 mb-10 lg:p-20 ">
      <div className="mb-5">
        <h2 className="w-full text-3xl font-bold text-center lg:text-4xl text-grey-100 hover:text-blue-100">
          Mitra Kami
        </h2>
      </div>
      <div>
        {!data ? (
          <SkeletonTheme color="#fffff" highlightColor="#ffff">
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        ) : (
          <div className="group">
            <Slider {...settings}>
              {data.data.map((data) => (
                <MitraCardComponent data={data} />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurMitra;

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import useSWR from "swr";
import Link from "next/link";
import { HeadingSecondary } from "../About/About.styled";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
  console.log(data);
  return (
    <div className="px-5 pt-2 mb-10 lg:p-20 ">
      <div className="mb-5">
        <HeadingSecondary className="text-center text-blue-100">
          Cerita Dari Mitra Karya Nusantara
        </HeadingSecondary>
      </div>
      <div>
        {!data ? (
          <SkeletonTheme color="#fffff" highlightColor="#ffff">
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        ) : (
          <div>
            <Slider {...settings}>
              {data.data.map((data) => (
                <div className="p-2">
                  <Link href={`/mitra/${data.slug}`}>
                    <div className="relative flex content-end w-full mb-5 border-2 border-blue-100 shadow-md cursor-pointer lg:py-0 lg-py-5 group hover:border-4 hover:shadow-lg hover:translate-y-20">
                      <img
                        className="w-full h-80 "
                        src={`${process.env.API_LARAVEL}/storage/${data.photoMitra}`}
                        alt="Mitra 1"
                      />
                      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full duration-500 bg-gray-100 opacity-0 transation group-hover:opacity-75">
                        &nbsp;
                      </div>
                      <div className="absolute left-0 w-full p-2 text-center transition duration-500 bg-blue-100 opacity-0 group-hover:opacity-80 bottom-2 ">
                        <span>{data.ukmName}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurMitra;

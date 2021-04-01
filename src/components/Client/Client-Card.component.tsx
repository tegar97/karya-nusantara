import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";

export default class ClientCard extends Component {
  render() {
    var settings = {
      dots: true,
      className: "center",

      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
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
            slidesToShow: 2,
            slidesToScroll: 2,
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
        <Slider {...settings}>
          <div className="w-full p-2 text-center bg-white border-black shadow-lg h-72 ">
            <Image
              src="/assets/logo-kemenkes.png"
              width={200}
              height={200}
              alt="Klient 1"
              className="self-center mb-5 text-center"
            />
            <div>
              <span>
                Pemberian 11 juta lebih Masker Kain 3 lapis Untuk Indonesia
              </span>
            </div>
          </div>
          <div className="w-full p-2 text-center bg-white border-black shadow-lg h-72 ">
            <Image
              src="/assets/kimia-farma.png"
              width={200}
              height={200}
              alt="Klient 1"
              className="self-center mb-5 text-center"
            />
            <div>
              <span>Pengadaan 500 Ribu Masker Kain 3 Lapis</span>
            </div>
          </div>
          <div className="w-full p-2 text-center bg-white border-black shadow-lg h-72 ">
            <Image
              src="/assets/logo-farma.png"
              width={200}
              height={200}
              alt="Klient 1"
              className="self-center mb-5 text-center"
            />
            <div>
              <span>Pengadaan lebih dari 2300 Hazmat</span>
            </div>
          </div>
          <div className="w-full p-2 text-center bg-white border-black shadow-lg h-72 ">
            <Image
              src="/assets/logo-farma.png"
              width={200}
              height={200}
              alt="Klient 1"
              className="self-center mb-5 text-center"
            />
            <div>
              <span>Pengadaan lebih dari 2300 Hazmat</span>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

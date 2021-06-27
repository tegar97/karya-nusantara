import React, { useEffect } from "react";
import { TweenLite } from "gsap";
import convertToRupiah from "../../util/converRupiah";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
function KatalogItems({ key, data }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div data-aos="fade-up">
      <Link href={`/product/${data.slug}`}>
        <div
          key={key}
          id="ui"
          className="flex flex-col w-full duration-300 transform cursor-pointer hover:scale-110 transation group"
        >
          <div>
            <img
              src={`${process.env.API_LARAVEL}/storage/${
                data.images.split(",")[0]
              }`}
              className="object-cover w-full"
              alt="product thumbnail"
            />
          </div>
          <div className="flex flex-col text-center">
            <h2 className="font-bold text-blue-100 group-hover:font-bold">
              {data.name}
            </h2>
            <span className="font-regular">
              {convertToRupiah(data.low_price)} - s/d{" "}
              {convertToRupiah(data.high_price)}{" "}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default KatalogItems;

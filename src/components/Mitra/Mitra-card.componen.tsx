import Link from "next/link";
import React from "react";
import { ImageContainer } from "./mitraPage.styles";

function MitraCardComponent({ data }) {
  return (
    <div className="p-2 ">
      <Link href={`/mitra/${data.slug}`}>
        <div className="relative flex content-end w-full px-2 mb-5 border-2 border-blue-100 shadow-md cursor-pointer lg:px-5 lg:py-0 lg-py-5 hover:border-4 hover:shadow-lg hover:translate-y-20">
          <ImageContainer
            className="w-full h-60 lg:h-80 group-hover:grayscale-0"
            src={`${process.env.API_LARAVEL}/storage/${data.photoMitra}`}
            alt="Mitra 1"
          />

          <div
            style={{ backgroundColor: "rgba(211,211,211,.7)" }}
            className="absolute left-0 flex flex-col w-full p-2 text-center transition duration-500 bg-blue-100 bottom-2"
          >
            <span className="text-sm lg:text-md">{data.name}</span>
            <span className="text-sm lg:text-md">{data.ukmName}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MitraCardComponent;

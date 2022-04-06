import React, { useEffect } from "react";
import { TweenLite } from "gsap";
import convertToRupiah from "../../util/converRupiah";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function KatalogItems({ key, data, loading }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  console.log(data.images);

  if (loading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    );
  }
    return (
      <div data-aos="fade-up">
        <Link href={`/product/${data.slug}`}>
          <div
            key={key}
            id="ui"
            className=" flex flex-col w-full duration-300 transform cursor-pointer hover:scale-110 transation group border  rounded-md pb-4  border-gray-300  shadow-md"
          >
            <div className="max-h-60">
              <img
                src={`${process.env.API_V2}/storage/images/product/${data.images[0]?.imageName}`}
                className="object-cover w-full lg:max-h-56"
                 
                alt={'Photo produk dari '+data.name}
              />
            </div>
            <div className="flex flex-col  px-2 mt-2">
              <h2 className="font-bold text-blue-100  group-hover:font-bold">
                {data.name}
              </h2>
              <span className="text-gray-800 text-sm ">
                By {data?.umkm?.ukmName}
              </span>
              <span className="text-gray-800 text-sm mt-1 ">
                {data.umkm?.city_name}
              </span>
              <span className=" mt-1 text-gray-900  font-bold text-lg">
                {convertToRupiah(data?.price)}
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default KatalogItems;

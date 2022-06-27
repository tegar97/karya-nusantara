import React, { useEffect } from "react";
import { TweenLite } from "gsap";
import convertToRupiah from "../../util/converRupiah";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function KatalogItems({  data, loading=false,isTextcenter= false }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
        <Link href={`/product/${data?.slug}`}>
          <div
            id="ui"
            className={`bg-white flex flex-col w-full duration-300 transform cursor-pointer hover:scale-110 transation group border  rounded-md pb-4  border-gray-300  h-96	 shadow-md ${
              isTextcenter == true && "text-center"
            }`}
          >
            <div>
              <img
                src={`${process.env.API_V2}/storage/images/product/${data.images[0]?.imageName}`}
                className="object-cover w-full lg:h-60 bg-cover"
                alt={"Photo produk dari " + data?.name}
              />
            </div>
            <div
              className={`flex flex-col  px-2 mt-2  ${!isTextcenter ? "justify-between" : ""}`}
              style={{ height: "100%" }}
            >
              <div className="flex flex-col">
                <h2 className="font-bold text-blue-100  group-hover:font-bold">
                  {data?.name.length > 40
                    ? data?.name.substring(0, 40) + "..."
                    : data?.name}
                </h2>
                <span className="text-gray-800 text-sm ">
                  By {data?.umkm?.ukmName}
                </span>
                <span className="text-gray-800 text-sm mt-1 ">
                  {data?.umkm?.city_name}
                </span>
              </div>

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

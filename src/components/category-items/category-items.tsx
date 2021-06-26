import zIndex from "@material-ui/core/styles/zIndex";
import React, { useEffect } from "react";
import { ImageFilter } from "../image-manipulation/image-manipulation";
import { WrapperKatalog } from "./category-items.styled";
import AOS from "aos";
import Link from "next/link";

function CategoryItems({ data, setCategoryId }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      key={data.category.id}
      className="relative w-full cursor-pointer group "
      style={{ zIndex: 1 }}
      data-aos="fade-right"
      onClick={() => setCategoryId(data.category.id)}
    >
      <ImageFilter
        className="w-full transition duration-700 ease-in "
        src={`${process.env.API_LARAVEL}/storage/${data.category.image}`}
        alt="Logo "
      />
      <div className="relative" style={{ zIndex: 100 }}>
        <WrapperKatalog className="absolute z-10 w-40 p-0 px-2 py-2 duration-300 bg-white border-2 border-blue-100 opacity-0 -bottom-10 transation group-hover:opacity-100">
          {data.data.length == 0 ? (
            "Tidak Ada Produck"
          ) : (
            <ul className="z-10 w-full ">
              {data.data.map((product) => (
                <Link href={`product/${product.slug}`}>
                  <li className="text-sm hover:text-blue-100">
                    {product.name}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </WrapperKatalog>
      </div>
    </div>
  );
}

export default CategoryItems;

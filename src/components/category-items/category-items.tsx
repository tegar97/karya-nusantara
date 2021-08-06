import zIndex from "@material-ui/core/styles/zIndex";
import React, { useEffect, useState } from "react";
import {
  ImageFilter,
  WrapperKatalog,
  CategoryItemsContainer,
} from "./category-items.styled";
import AOS from "aos";
import Link from "next/link";

function CategoryItems({ data, setCategoryId }) {
  const [showBox, setShowBox] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const handleBox = () => {
    setShowBox(true);
  };
  const onLeave = () => {
    setShowBox(false);
  };
  return (
    <CategoryItemsContainer
      onMouseEnter={() => handleBox()}
      onMouseLeave={() => onLeave()}
      key={data.category.id}
      className="relative w-full cursor-pointer "
      data-aos="fade-right"
      onClick={() => setCategoryId(data.category.id)}
    >
      <ImageFilter
        className="w-full transition duration-700 ease-in "
        src={`${process.env.API_LARAVEL}/storage/${data.category.image}`}
        alt="Logo "
      />
      <WrapperKatalog className={`relative ${showBox ? "block" : "hidden"}`}>
        <div className="absolute w-40 p-0 px-2 py-2 duration-300 bg-white border-2 border-blue-100 -top-0 transation group-hover:opacity-100">
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
        </div>
      </WrapperKatalog>
    </CategoryItemsContainer>
  );
}

export default CategoryItems;

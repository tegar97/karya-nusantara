import React, { useContext, useState,useRef } from "react";
import {
  CategoryProductList,
  CategoryProductListContainer,
  CategoryProductText,
  LeftCategory,
} from "./product-category.styled";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import FadeInAnimation from "../gsap/FadeIn";
import ScrollAnimation from "react-animate-on-scroll";
import { CategoryProductContext } from "../../context/productCategory";
import useSWR from "swr";
function ProductCategory({ data2 }) {
  const fetcher = (
    ...args: [input: RequestInfo, init?: RequestInit | undefined]
  ): any => fetch(...args).then((res) => res.json());

  const [categoryId, setCategoryId] = useContext(CategoryProductContext);
  const [showSubCategoryState, setShowSubCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
    const categoryListRef :any= useRef();


  const { data, error } = useSWR(
    `${process.env.API_V2}/api/categoriestMain`,
    fetcher
  );
  const { data: subCategory, error: errorSubCategory } = useSWR(
    `${process.env.API_V2}/api/getSubCategoryByCategory/${showSubCategoryState}`,
    fetcher
  );

  const showSubCategory = (element, id) => {
            const { offsetTop } = categoryListRef.current;

    console.log(offsetTop);
    setShowSubCategory(id);
    
  };
  console.log(subCategory);
  return (
    <div className="container-box ">
      <div className="grid grid-cols-4 lg:px-20 lg:py-10 gap-7   relative  ">
        <LeftCategory
          className="col-span-4  border-2 bg-grey-200 lg:p-5 lg:col-span-1   "
          style={{ borderRadius: "7px" }}
        >
          <CategoryProductListContainer>
                <Link href="/product">
                  <span className="text-xl text-white cursor-pointer lg:text-xl text-md font-semibold" >
                    Katalog Product
                  </span>
                </Link>
            <ScrollAnimation animateIn="fadeIn">
              <ul className="mt-3 ">
                {data
                  ? data.data.map((data) => {
                      return (
                        <CategoryProductList
                          ref={categoryListRef}
                          onClick={(e) => showSubCategory(e, data.id)}
                          className="shadow-lg  z-20"
                        >
                          {/* <Image
                            src="/assets/icon-mask.png"
                            alt="apd"
                            width={35}
                          height={34}
                            objectFit={'contain'}
                          ></Image> */}
                          <img
                            className="lg:w-10 w-10 h-10 lg:h-10 "
                            alt="product photo"
                            src={`${process.env.API_V2}/storage/images/categoryIcon/${data.categoryIcon}`}
                          />
                          <span className="ml-3 text-sm md:text-md lg:text-lg">
                            {data.categoryName}
                          </span>
                        </CategoryProductList>
                      );
                    })
                  : "Loading ..."}
              </ul>
            </ScrollAnimation>
          </CategoryProductListContainer>
        </LeftCategory>
        <div className="hidden rounded-sm lg:col-span-3 lg:grid relative">
          <ScrollAnimation animateIn="fadeIn">
            <Carousel
              autoPlay
              showThumbs={false}
              infiniteLoop={true}
              showArrows={false}
            >
              {data2.data[0].image1 && (
                <Link href="/product?category=3&all=true">
                  <div>
                    <img
                      src={`${process.env.API_LARAVEL}/storage/${data2.data[0].image1}`}
                      alt={`gambar ${data2.data[0].image1}`}
                      className="w-full h-full cursor-pointer"
                      style={{ borderRadius: "10px" }}
                    ></img>
                  </div>
                </Link>
              )}
              {data2.data[0].image2 && (
                <Link href="/product?category=2&all=true">
                  <div>
                    <img
                      src={`${process.env.API_LARAVEL}/storage/${data2.data[0].image2}`}
                      alt={`gambar ${data2.data[0].image2}`}
                      className="w-full"
                      style={{ borderRadius: "10px" }}
                    ></img>
                  </div>
                </Link>
              )}
              {data2.data[0].image3 && (
                <Link href="/product?category=2&all=true">
                  <div>
                    <img
                      src={`${process.env.API_LARAVEL}/storage/${data2.data[0].image3}`}
                      alt={`gambar ${data2.data[0].image3}`}
                      className="w-full"
                      style={{ borderRadius: "10px" }}
                    ></img>
                  </div>
                </Link>
              )}
            </Carousel>
          </ScrollAnimation>
          {/* {showSubCategoryState && (
            <div
              className="bg-white absolute w-full  border border-blue-100  "
              style={{ zIndex: 999, top: 90 }}
            >
              {subCategory ? (
                <div className="py-2 px-2 rounded-md">
                  {subCategory.data.map((subCategory) => {
                    return (
                      <ul>
                        <span>{}</span>
                        <li className="flex flex-row">
                          <span>{subCategory.subCategoryName}</span>
                          <ul>
                            {subCategory?.products.map(data => {
                             return <li>{data.name}</li>;

                            })}
                          </ul>
                        </li>
                      </ul>
                    );
                  })}
                  {subCategory.data.length === 0 && (
                    <span>Tidak ada product dengan category tersebut</span>
                  )}
                </div>
              ) : (
                "Loading ..."
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;

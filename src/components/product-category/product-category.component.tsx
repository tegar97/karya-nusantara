import React, { useContext } from "react";
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
function ProductCategory({ data2 }) {
  const [categoryId, setCategoryId] = useContext(CategoryProductContext);

  return (
      <div className="container-box">
    <div className="grid grid-cols-4 lg:px-20 lg:py-10 gap-7 ">


      <LeftCategory
        className="col-span-4  border-2 bg-grey-200 lg:p-5 lg:col-span-1 "
        style={{ borderRadius: "7px" }}
      >
        <CategoryProductListContainer>
          <ScrollAnimation animateIn="fadeIn">
            <FadeInAnimation direction="left">
              <Link href="/product">
                <span className="text-xl text-white cursor-pointer lg:text-2xl text-md">
                  Katalog Product
                </span>
              </Link>
            </FadeInAnimation>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn">
            <FadeInAnimation direction="up">
              <ul className="mt-3 relative">
                  <CategoryProductList
                    className="shadow-lg"
                  >
                    <Image
                      src="/assets/icon-mask.png"
                      alt="apd"
                      width={35}
                      height={34}
                    ></Image>
                    <span className="ml-3 text-sm md:text-md lg:text-lg">
                      Alat Pelindung Diri
                    </span>
                  </CategoryProductList>

                <Link href="/product">
                  <CategoryProductList
                    className="shadow-lg"
                    onClick={() => setCategoryId(3)}
                  >
                    <Image
                      src="/assets/icon1.png"
                      alt="Perkoveksian"
                      width={35}
                      height={34}
                    ></Image>
                    <span className="ml-3 text-lg">Perkonveksian</span>
                  </CategoryProductList>
                </Link>
                <Link href="/product">
                  <CategoryProductList
                    className="shadow-lg"
                    onClick={() => setCategoryId(4)}
                  >
                    <Image
                      src="/assets/icon-hampers.png"
                      alt="Picture of the author"
                      width={35}
                      height={34}
                    ></Image>
                    <span className="ml-3 text-lg">Hampers</span>
                  </CategoryProductList>
                </Link>
                <Link href="/product">
                  <CategoryProductList
                    className="shadow-lg"
                    onClick={() => setCategoryId(5)}
                  >
                    <Image
                      src="/assets/icon putih 6.png"
                      alt="Picture of the author"
                      width={35}
                      height={34}
                    ></Image>
                    <span className="ml-3 text-lg">Craft</span>
                  </CategoryProductList>
                </Link>
                <Link href="/product">
                  <CategoryProductList
                    className="shadow-lg"
                    onClick={() => setCategoryId(6)}
                  >
                    <Image
                      src="/assets/icon-star.png"
                      alt="Picture of the author"
                      width={35}
                      height={34}
                    ></Image>
                    <span className="ml-3 text-lg">Populer</span>
                  </CategoryProductList>
                </Link>
              </ul>
            </FadeInAnimation>
          </ScrollAnimation>
        </CategoryProductListContainer>
      </LeftCategory>
      <div className="hidden rounded-sm lg:col-span-3 lg:grid ">
        <ScrollAnimation animateIn="fadeIn">
          <FadeInAnimation direction="right">
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
          </FadeInAnimation>
        </ScrollAnimation>
      </div>
    </div>
      </div>
  );
}

export default ProductCategory;

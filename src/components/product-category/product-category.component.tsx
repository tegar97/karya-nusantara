import React from "react";
import {
  CategoryProductList,
  CategoryProductListContainer,
  CategoryProductText,
  LeftCategory,
} from "./product-category.styled";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";

function ProductCategory() {
  return (
    <div className="grid grid-cols-4 gap-7 ">
      <LeftCategory
        className="col-span-4 bg-blue-100 shadow-xl lg:col-span-1"
        style={{
          boxShadow:
            "10px 8px 8px 4px rgba(0, 0, 0, 0.12), 4px 6px 4px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CategoryProductListContainer>
          <Link href="/product">
            <span className="mb-3 text-xl text-white cursor-pointer lg:text-2xl text-md">
              Katalog Product
            </span>
          </Link>
          <ul className="mt-3">
            <Link href="/product">
              <CategoryProductList className="shadow-lg">
                <Image
                  src="/assets/icon-mask.png"
                  alt="Picture of the author"
                  width={35}
                  height={34}
                ></Image>
                <span className="ml-3 text-lg">Alat Pelindung Diri</span>
              </CategoryProductList>
            </Link>
            <Link href="/product">
              <CategoryProductList className="shadow-lg">
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
              <CategoryProductList className="shadow-lg">
                <Image
                  src="/assets/icon-soviner.png"
                  alt="Picture of the author"
                  width={35}
                  height={34}
                ></Image>
                <span className="ml-3 text-lg">Souvenir & Merhandise </span>
              </CategoryProductList>
            </Link>
            <Link href="/product">
              <CategoryProductList className="shadow-lg">
                <Image
                  src="/assets/icon1.png"
                  alt="Picture of the author"
                  width={35}
                  height={34}
                ></Image>
                <span className="ml-3 text-lg">Perkonveksian</span>
              </CategoryProductList>
            </Link>
            <Link href="/product">
              <CategoryProductList className="shadow-lg">
                <Image
                  src="/assets/icon-star.png"
                  alt="Picture of the author"
                  width={35}
                  height={34}
                ></Image>
                <span className="ml-3 text-lg">Produk Unggulan</span>
              </CategoryProductList>
            </Link>
          </ul>
        </CategoryProductListContainer>
      </LeftCategory>
      <div className="hidden rounded-sm lg:col-span-3 lg:grid ">
        <Carousel
          autoPlay
          showThumbs={false}
          infiniteLoop={true}
          showArrows={false}
        >
          <Link href="/product?category=3&all=true">
            <div>
              <img
                src="/assets/b1.jpg"
                alt="Banner Hampers"
                className="w-full cursor-pointer"
              ></img>
            </div>
          </Link>
          <Link href="/product?category=2&all=true">
            <div>
              <img
                src="/assets/b2.jpg"
                alt="banner Alat Pelindung Diri "
                className="w-full"
              ></img>
            </div>
          </Link>
          <Link href="/product?category=4">
            <div>
              <img
                src="/assets/b3.jpg"
                alt="Banners Penkonversian "
                className="w-full"
              ></img>
            </div>
          </Link>
        </Carousel>
      </div>
    </div>
  );
}

export default ProductCategory;

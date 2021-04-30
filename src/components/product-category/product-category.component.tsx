import React from "react";
import {
  CategoryProductList,
  CategoryProductListContainer,
  CategoryProductText,
  LeftCategory,
} from "./product-category.styled";
import Image from "next/image";
import Link from "next/link";

function ProductCategory() {
  return (
    <div className="grid grid-cols-4 gap-7 ">
      <LeftCategory className="col-span-4 bg-blue-100 lg:col-span-1">
        <CategoryProductText className="text-blue-100 text-1xl">
          KATEGORI PRODUK
        </CategoryProductText>

        <CategoryProductListContainer>
          <ul>
            <Link href="/product">
              <CategoryProductList>
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
              <CategoryProductList>
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
              <CategoryProductList>
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
              <CategoryProductList>
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
              <CategoryProductList>
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
        <Image
          src="/assets/category-dummy.jpg"
          alt="Picture of the author"
          width={400}
          height={400}
        ></Image>
      </div>
    </div>
  );
}

export default ProductCategory;

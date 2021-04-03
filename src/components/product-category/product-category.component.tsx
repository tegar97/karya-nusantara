import React from "react";
import {
  CategoryProductList,
  CategoryProductListContainer,
  CategoryProductText,
  LeftCategory,
} from "./product-category.styled";
import Image from "next/image";

function ProductCategory() {
  return (
    <div className="grid grid-cols-4 gap-7 ">
      <LeftCategory className="bg-blue-100">
        <CategoryProductText className="text-blue-100 text-1xl">
          KATEGORI PRODUK
        </CategoryProductText>

        <CategoryProductListContainer>
          <ul>
            <CategoryProductList>
              <Image
                src="/assets/icon-mask.png"
                alt="Picture of the author"
                width={35}
                height={34}
              ></Image>
              <span className="ml-3 text-lg">Alat Pelindung Diri</span>
            </CategoryProductList>
            <CategoryProductList>
              <Image
                src="/assets/icon-hampers.png"
                alt="Picture of the author"
                width={35}
                height={34}
              ></Image>
              <span className="ml-3 text-lg">Hampers</span>
            </CategoryProductList>
            <CategoryProductList>
              <Image
                src="/assets/icon-soviner.png"
                alt="Picture of the author"
                width={35}
                height={34}
              ></Image>
              <span className="ml-3 text-lg">Souvenir & Merhandise </span>
            </CategoryProductList>
            <CategoryProductList>
              <Image
                src="/assets/icon1.png"
                alt="Picture of the author"
                width={35}
                height={34}
              ></Image>
              <span className="ml-3 text-lg">Perkonveksian</span>
            </CategoryProductList>
            <CategoryProductList>
              <Image
                src="/assets/icon-star.png"
                alt="Picture of the author"
                width={35}
                height={34}
              ></Image>
              <span className="ml-3 text-lg">Produk Unggulan</span>
            </CategoryProductList>
          </ul>
        </CategoryProductListContainer>
      </LeftCategory>
      <div className="grid col-span-3 rounded-sm ">
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

import callApi from "../../config/axios";

export async function getProduct(city, category) {
  let url;

  if (category === undefined || category === "" || category === null) {
    url = `/category/get-product-by-category?city=${city}`;
  } else {
    if (city === undefined || city === "" || city === null) {
      url = `/category/get-product-by-category?category=${category}`;
    } else {
      url = `/category/get-product-by-category?city=${city}&category=${category}`;
    }

    console.log("tess");
  }

  return callApi({
    url,
    method: "GET",
  });
}


export async function getProductV2(province, category,subCategory) {
  
}
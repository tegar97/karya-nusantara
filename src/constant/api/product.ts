import callApi from "../../config/axios";

export async function getProduct(city) {
  const url = `/category/get-product-by-category?city=${city}`;

  return callApi({
    url,
    method: "GET",
  });
}

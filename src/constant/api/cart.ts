import callApi from "../../config/axios";

export async function addToCart(data,token) {
  const url = "/cart";

  return callApi({
    url,
    method: "POST",
      data,
    headers: token
  });
}


export async function getMyCart(token) {
     const url = "/cart";

     return callApi({
       url,
       method: "GET",
       headers: token,
     });
}

export async function updateCart(data, token) {
       const url = "/cart/update";

       return callApi({
         url,
           method: "POST",
         data,
         headers: token,
       });
}

export async function deleteCartItem(id, token) {
  const url = `/cart/${id}`;

  return callApi({
    url,
    method: "DELETE",
    headers: token,
  });
}
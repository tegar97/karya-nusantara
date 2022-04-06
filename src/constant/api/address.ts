import axios from "axios";
import callApi from "../../config/axios";

export async function fastSearchAddress(subdistricts) {
  const url = `/fastsearch?q=${subdistricts}`;

  return callApi({
    url,
    method: "GET",
  });
}


export async function addAddress(data, bearerToken) {
    const url = `/buyerAddress`

    return callApi({
      url,
      method: "POST",
      data,
      headers: bearerToken,
    });

}

export async function updateAddress(id,data, bearerToken) {
    const url = `/buyerAddress/update/${id}`;

    return callApi({
      url,
      method: "POST",
      data,
      headers: bearerToken,
    });

}
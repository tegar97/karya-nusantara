import callApi from "../../config/axios";

export async function ComplateTheOrder(data, token) {
 const url = "/transaction/ComplateTheOrder";

  return callApi({
    url,
    method: "POST",
    data,
    headers: token,
  });
}

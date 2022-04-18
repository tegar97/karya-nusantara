import callApi from "../../config/axios";

export async function order(data, token, gateway_code) {
  let url;
  switch (gateway_code) {
    case "INDOMARET":
      url = "/orders/indomaret";
      break;
    case "MANDIRI":
      url = "/orders/mandiribill";
      break;
    case "BCA":
      url = "/orders/VirtualAccount";
    case "BNI":
      url = "/orders/VirtualAccount";
    case "BRI":
      url = "/orders/VirtualAccount";
      break;
  }

  return callApi({
    url,
    method: "POST",
    data,
    headers: token,
  });
}

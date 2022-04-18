import axios from "axios";
import callApi from "../../config/axios";
import handleRajaOngkir from "../../config/axios/rajaongkir";

export async function getOngkirPrice(data) {
  const url = "/cekongkir";

  return callApi({
    url,
    method: "POST",
    data,
  });
}


export async function track(data) {
  const url = "/track";

  return callApi({
    url,
    method: "POST",
    data,
  });
}

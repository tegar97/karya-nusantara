import axios from "axios"
import callApi from "../../config/axios";

export async function setLogin(data) {
    const url = '/auth/login';

    return callApi({
        url,
        method : 'POST',
        data
    })
}

export async function getProfile(bearerToken) {
    const url = '/auth/me'

    return callApi({
        url,
        method: 'GET',
        headers: bearerToken
    });
}



export async function refresh(OldbearerToken) {
    const url = '/auth/refresh'

    return callApi({
        url,
        method: 'POST',
        headers: OldbearerToken
    });
}

export async function update(data,bearerToken) {
    const url = '/auth/update'

      return callApi({
        url,
        method: 'POST',
        data,
        headers: bearerToken
    });

}

export async function changePassword(data, bearerToken) {
    const url = '/auth/changePassword'
  return callApi({
        url,
        method: 'POST',
        data,
        headers: bearerToken
    });

}

export async function authlkpp(token) {
      const url = `/auth/checklkpp/${token}`;
      return callApi({
        url,
        method: "POST",
      });
}
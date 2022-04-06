import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import DasboardSkeleton from "../../components/atom/dasboard-skeleton/dasboard-skeleton";
import SideBarMember from "../../components/atom/sidebar-member/sidebar-member";
import FormInput from "../../components/input-container/input-container";
import { addAddress, fastSearchAddress, updateAddress } from "../../constant/api/address";
import { getProfile } from "../../constant/api/auth";
import Cookie from 'js-cookie'
import { toast } from "react-toastify";
import router from "next/router";
function Address({ user }) {
  const [labelAddress, setLabelAddress] = useState(user?.address[0]?.labelAddress ?  user?.address[0]?.labelAddress : '');
  const [province, setProvince] = useState(
    user?.address[0]?.province_name ? user?.address[0]?.province_name : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.address[0]?.phoneNumber ? user?.address[0]?.phoneNumber : '');
  const [city, setCity] = useState(
    user?.address[0]?.city_name ? user?.address[0]?.city_name : ""
  );
  const [district, setDistrict] = useState(user?.address[0]?.district  ?  user?.address[0]?.district : '');
  const [subdistrict, setSubDistrict] = useState(
    user?.address[0]?.subdistrict ? user?.address[0]?.subdistrict : ""
  );
  const [village, setVillage] = useState(
    user?.address[0]?.village ? user?.address[0]?.village : ""
  );
  const [postalCode, setPostalCode] = useState(
    user?.address[0]?.postalCode ? user?.address[0]?.postalCode : ""
  );
  const [complateAddress, setComplateAddress] = useState(user?.address[0]?.complateAddress ?  user?.address[0]?.complateAddress : "");
  const [courirMessage, setCourirMessage] = useState(
    user?.address[0]?.courirMessage ? user?.address[0]?.courirMessage : ''
  );
  const [closeSearchBar, setCloseSearchBar] = useState(false);

  const [provinceId,setProvinceId] = useState(user?.address[0]?.province_id ? user?.address[0]?.province_id : '')
  const [subdistrictId, setSubdistrictId] = useState(
    user?.address[0]?.subdistrict_id ? user?.address[0]?.subdistrict_id : ""
  );
  const [cityId,setCityId] = useState(user?.address[0]?.city_id ? user?.address[0]?.city_id : '')

  //Search kecamatan
  const [Search, setSearch] = useState(
    user?.address[0]?.province_name
      ? `${user?.address[0]?.province_name} , ${user?.address[0]?.city_name}, ${user?.address[0]?.subdistrict}`
      : ""
  );
  const [SearchFocus, setSearchFocus] = useState(() => false);
  const [SearchResponse, setSearchResponse] = useState(() => ({
    isLoading: false,
    isError: false,
    data: [],
  }));

  console.log(user?.address[0]);


  /// Handle search kecamatan

  let timeOutSearch = useRef(null);

  function  handleSearch (e) { 
    e.persist();
    setCloseSearchBar(false)
    setSearch(e.target.value);
    clearTimeout(timeOutSearch.current);

    timeOutSearch.current = setTimeout(async () => {
      setSearchResponse({
        isLoading: true,
        isError: false,
        data : null
        
      })

      if (Search.length >= 2) {
        const response = await fastSearchAddress(e.target.value);
         if (response?.data !== null) {
           setSearchResponse({
             isLoading: false,
             isError: false,
             data: response?.data,
           });
         } else {
           setSearchResponse({
             isLoading: false,
             isError: true,
             data: null,
           });
         }

      }
     
    },1000)
  } 

  const autoFillAddress = (item) => {

    setCity(item.city_name);
    setSubDistrict(item.subdistrict_name);
    setProvince(item.province_name);
    setSearch(item.subdistrict_name);
    setProvinceId(item.province_id);
    setCityId(item.city_id);
    setSubdistrictId(item.subdistrict_id);
    setSearch(
      `${item.province_name} , ${item.city_name}, ${item.subdistrict_name}`
    );
    setCloseSearchBar(true)

  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      province_id: provinceId,
      subdistrict_id: subdistrictId,
      city_id: cityId,
      city_name: city,
      province_name: province,
      subdistrict: subdistrict,
      labelAddress: labelAddress,
      phoneNumber: phoneNumber,
      postalCode: postalCode,
      complateAddress: complateAddress,
      village: village,
      courirMessage: courirMessage,
      isMainddress: true,
    };

    try {
      const token = Cookie.get("token");
      const bearerToken = `Bearer ${token}`;

      if (user.address[0] === undefined) {
        const response = await addAddress(data, bearerToken);
        toast.success("Berhasil Menambah alamat");
        router.reload();
      } else {
        const id = user.address[0]?.id;
        const response = await updateAddress(id, data, bearerToken);
        toast.success("Berhasil update alamat");
      }
      
   } catch (error) {
     
   }
  }

  return (
    <div>
      <DasboardSkeleton user={user.data}>
        <div className="content col-span-4 ml-5">
          <h1 className="font-bold lg:text-3xl">Alamat</h1>
          <span className="text-gray-400 text-sm mt-1">
            Alamat dibawah akan dipakai sebagai alamat pengiriman pesanan
          </span>

          <ul className="mt-5">
            <li className="text-blue-100 font-semibold border-b-2 pb-2 border-blue-100 lg:w-20">
              Alamat
            </li>
          </ul>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="relative flex flex-col mt-10">
              <TextField
                className="w-full rounded-md mb-1 "
                id="q"
                type="text"
                label="Masukan Nama kecamatan "
                variant="outlined"
                autoComplete="off"
                onFocus={() => setSearchFocus(!SearchFocus)}
                onBlur={() => setSearchFocus(!SearchFocus)}
                onChange={handleSearch}
                value={Search}
              />
              {/* {
                Search.length >= 3 &&
              <span className="text text-red-400 text-sm">Harap di isi dengan pilihan yang sudah disediakan</span>
              } */}
              {Search.length >= 3 &&
                (closeSearchBar ? (
                  ""
                ) : (
                  <div
                    className="flex flex-col py-2 px-4 bg-white border border-gray-300 rounded-md w-full absolute z-10"
                    style={{ top: 55 }}
                  >
                    <div className=" lg:max-h-40  overflow-auto flex flex-col">
                      {SearchResponse.isLoading
                        ? "Loading"
                        : SearchResponse?.data?.length > 0 &&
                          SearchResponse?.data?.map?.((item, index) => {
                            return (
                              <div
                                className="flex flex-row mb-1 hover:bg-gray-200 px-1 py-1"
                                onClick={() => autoFillAddress(item)}
                              >
                                <span className="text-md text-gray-600 cursor-pointer">
                                  {item?.province_name},
                                </span>
                                <span className="text-md text-gray-600 cursor-pointer ml-1">
                                  {item?.city_name},
                                </span>
                                <span className="text-md text-gray-600 cursor-pointer ml-1 ">
                                  {item?.subdistrict_name}
                                </span>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                ))}
            </div>

            <div className="content-input-area mt-10">
              <TextField
                className="w-full rounded-md mb-6"
                id="outlined-basic"
                color="primary"
                onChange={(e) => setLabelAddress(e.target.value)}
                label="Label Alamat (misal : Rumah ,Kantor ,Apartemen "
                variant="outlined"
                value={labelAddress}
              />

              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Nomer telepon [Nomer telepon yang bisa dihubungi]"
                variant="outlined"
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Provinsi "
                variant="outlined"
                value={province}
                disabled
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Kota "
                variant="outlined"
                value={city}
                disabled
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Kecamatan "
                variant="outlined"
                value={subdistrict}
                disabled
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Keluruhan "
                variant="outlined"
                onChange={(e) => setVillage(e.target.value)}
                value={village}
              />

              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Kode Pos"
                variant="outlined"
                type="number"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Alamat Lengkap"
                onChange={(e) => setComplateAddress(e.target.value)}
                variant="outlined"
                value={complateAddress}
              />
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Catatan Untuk Kurir (opsional)"
                variant="outlined"
                onChange={(e) => setCourirMessage(e.target.value)}
                value={courirMessage}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              className="bg-blue-100 text-white rounded-lg px-5 py-2 "
            >
              Simpan
            </Button>
          </form>
        </div>
      </DasboardSkeleton>
    </div>
  );
}
export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const response = await getProfile(bearerToken);
  const user = response.data;



  return {
    props: {
      user: user
    },
  };
}
export default Address;

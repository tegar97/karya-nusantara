import axios from "axios";
import React, { useState } from "react";
import { useAuthDispatch } from "../../context/auth";
import { useForm } from "../../Hook/hooks";
import { useRouter } from "next/router";

function RegisterKonsumen() {
  const router = useRouter();
  const [formDetail, setformDetail] = useState(false);
  const [formData, setFormData]: any = useState({});

  const dispatch = useAuthDispatch();
  const [Error, setError]: any = useState();
  const [Loading, setLoading] = useState(false);

  const [Success, setSuccess] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/v1/users/register", formData);

      setLoading(false);
      setSuccess(true);

      router.push("/success");

      await axios.post(
        `${process.env.API_LARAVEL}/api/sendEmail`,
        {
          email: res.data.email,
          name: res.data.name,
          token: res.data.token,
          isUkm: false,
        },
        { withCredentials: false }
      );
    } catch (err) {
      setError(err.response.data);
      if (
        err.response.data.email ||
        err.response.data.password ||
        err.response.data.name
      ) {
        setformDetail(false);
      }
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={onSubmit}>
        <div className={`${formDetail ? "hidden" : ""}`}>
          <div className="mt-5 text-sm">
            <label
              htmlFor="nama"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              autoFocus
              id="nama"
              name="name"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nama Lengkap Anda"
            ></input>
          </div>
          <div className="my-5 text-sm">
            <label
              htmlFor="email"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Email
            </label>
            <input
              type="email"
              autoFocus
              name="email"
              id="email"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Alamat Email"
            ></input>
            <span className="text-red-500 ">{Error && Error.email}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="password"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Password
            </label>
            <input
              type="password"
              autoFocus
              id="password"
              name="password"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.password}</span>
          </div>
          <button
            type="button"
            onClick={() => setformDetail(true)}
            className="p-3 mt-3 text-white bg-blue-100 "
          >
            Lanjut
          </button>
        </div>
        <div className={`${formDetail ? "" : "hidden"}`}>
          <div className="mt-5 text-sm">
            <label
              htmlFor="company"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nama Perusahaan
            </label>
            <input
              type="text"
              autoFocus
              id="company"
              name="CompanyName"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.CompanyName}</span>
          </div>
          <div className="my-5 text-sm">
            <label
              htmlFor="company_adress"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Alamat Lengkap Perusahaan
            </label>
            <input
              type="text"
              autoFocus
              id="company_adress"
              name="CompanyAdress"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Alamat Email"
            ></input>
            <span className="text-red-500 ">
              {Error && Error.CompanyAdress}
            </span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="company_birth"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Tanggal Mulai Perusahaan
            </label>
            <input
              type="date"
              autoFocus
              id="company_birth"
              name="CompanyBirth"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
            ></input>
            <span className="text-red-500 ">{Error && Error.CompanyBirth}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="compay_email"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Email Perusahaan
            </label>
            <input
              type="email"
              autoFocus
              id="compay_email"
              name="CompanyEmail"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Email Perusahaan Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.CompanyEmail}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="phone_number"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nomor Hp
            </label>
            <input
              type="text"
              autoFocus
              id="phone_number"
              name="PhoneNumber"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nomer Hp Anda Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.PhoneNumber}</span>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setformDetail(false)}
              className="p-3 mt-3 text-black border-2 border-blue-100 "
            >
              Kembali
            </button>
            {Loading ? (
              <button
                type="submit"
                disabled
                className="p-3 mt-3 ml-5 text-black bg-gray-100 "
              >
                Loading .....
              </button>
            ) : (
              <button
                type="submit"
                className="p-3 mt-3 ml-5 text-white bg-blue-100 "
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterKonsumen;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Container } from "@material-ui/core";
import Image from "next/image";

function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [repeatPassword, setrepeatnewPassword] = useState("");
  const [isAllow, setIsAllow] = useState("");
  const [formError, setFormError] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading2(true);
    setError("");

    try {
      if (newPassword == repeatPassword) {
        await axios
          .post(
            `${process.env.API_LARAVEL}/api/reset-password`,
            {
              password: newPassword,
              token: token,
            },
            { withCredentials: false }
          )
          .then((res) => {
            setSuccess(true);
          });
      } else {
        setFormError("Password Dan Confirm Password Tidak Sama");
      }
    } catch (error) {
      setError(error.response.data.message);
    }

    setLoading2(false);
  };
  useEffect(() => {
    setLoading(true);

    const CheckToken = async () => {
      try {
        await axios
          .get(
            `${process.env.API_LARAVEL}/api/CheckTokenResetPassword/${token}`,
            {
              withCredentials: false,
            }
          )
          .then((res) => {
            setTokenValid(true);
            setLoading(false);
          })
          .catch((err) => {
            setIsAllow(err.response.data.message);
            setTokenValid(false);

            setLoading(false);
          });
      } catch (error) {}
    };
    CheckToken();
  }, [token]);
  return (
    <Container
      maxWidth="lg"
      style={{ backgroundColor: "#ffff", minHeight: "100vh" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:px-20 py-36 ">
        <div className="w-full lg:col-span-2 lg:w-10/12 ">
          <h1 className="text-2xl font-medium text-center text-blue-100 lg:text-left">
            Lupa Password
          </h1>
          <form onSubmit={onSubmit}>
            <p className="text-red-500">{error}</p>
            {/* {success && !loading && (
              <div>
                <h2 className="text-lg text-red-500">{isAllow}</h2>
              </div>
            )} */}

            {tokenValid ? (
              !success ? (
                <>
                  <div className="mt-5 text-sm">
                    <label
                      htmlFor="email"
                      className="block text-black "
                      style={{ fontSize: "1.05rem" }}
                    >
                      Password Baru
                    </label>
                    <input
                      type="password"
                      autoFocus
                      id="password"
                      name="password"
                      onChange={(e) => setnewPassword(e.target.value)}
                      className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
                      placeholder="Password Baru  Anda"
                    ></input>
                  </div>
                  <div className="mt-5 text-sm">
                    <label
                      htmlFor="email"
                      className="block text-black "
                      style={{ fontSize: "1.05rem" }}
                    >
                      Konfirmasi Password
                    </label>
                    <input
                      type="password"
                      autoFocus
                      id="password"
                      name="password"
                      onChange={(e) => setrepeatnewPassword(e.target.value)}
                      className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
                      placeholder=" Masukan Sekali lagi Konfirmasi Baru"
                    ></input>
                    <span className="text-red-500">
                      {formError && formError}
                    </span>
                  </div>
                  {loading ? (
                    <button
                      disabled
                      className="p-3 mt-3 text-blue-100 bg-gray-200 "
                    >
                      Loading ......
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="p-3 mt-3 text-white bg-blue-100 "
                    >
                      Submit
                    </button>
                  )}
                </>
              ) : (
                <span>
                  Reset Password Berhasil , Silahkan Login dengan password baru
                </span>
              )
            ) : (
              ""
            )}
          </form>
        </div>

        <div className="order-first text-center lg:text-left lg:order-last">
          <Image
            src="/assets/logo-kn.png"
            alt="Logo Karya nusantara"
            width={200}
            height={200}
          />
        </div>
      </div>
    </Container>
  );
}

export default ResetPassword;

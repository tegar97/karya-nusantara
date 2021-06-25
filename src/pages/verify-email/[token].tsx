import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container } from "@material-ui/core";
import Link from "next/link";

const Token = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { token } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (token) {
          setLoading(true);
          await axios
            .get(`${process.env.API_LARAVEL}/api/verifyEmail/${token}`, {
              withCredentials: false,
            })
            .then((res) => {
              setLoading(false);
              setSuccess(true);
            });
        }
      } catch (err) {
        setError(err);
        setSuccess(false);
        setLoading(false);
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div
      style={{
        background: "url('/assets/bg-register2.jpg')",
        minHeight: "180vh",
        backgroundRepeat: "none",
      }}
      className="flex justify-center w-full bg-no-repeat bg-cover "
    >
      <Container
        maxWidth="xl"
        className="w-11/12 h-full px-5 py-5 mt-10 bg-white border-2 border-blue-100 lg:mt-32 lg:w-4/6"
        style={{ boxShadow: "2px 2px #5996ab", borderRadius: "10px" }}
      >
        {loading ? (
          ""
        ) : success ? (
          <div className="py-5 text-center bg-white lg:px-20">
            <h1 className="text-4xl font-medium font-bold text-blue-100">
              Terima Kasih Melakukan Verifikasi Email
            </h1>

            <div className="mt-5">
              <Link href="/">
                <button className="px-5 py-3 text-white bg-blue-100">
                  Kembali Ke Halaman Utama
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-5 text-center bg-white lg:px-20">
            <h1 className="text-4xl font-medium font-bold text-red-500">
              Token Invalid / Akun Anda Sudah Terverifikasi
            </h1>
            <div className="mt-5">
              <Link href="/">
                <button className="px-5 py-3 text-white bg-blue-100">
                  Kembali Ke Halaman Utama
                </button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Token;

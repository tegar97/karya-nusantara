import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { useAuthDispatch } from "./../../context/auth";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import Link from "next/link";
const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isUkm, setUkm] = useState(false);
  const [forgotPassword, setForgotPassword] = useState();

  const router = useRouter();
  const dispatch = useAuthDispatch();
  const styles = {
    textAlign: "center",
    padding: 0,
  };
  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    if (email.length == 0 || password.length == 0) {
      setError("Email Dan Password Wajib di isi");
      setLoading(false);
    } else {
      try {
        const res = await axios.post(
          "/v1/users/login",
          {
            email,
            password,
            Role: isUkm ? "ukm" : "users",
          },
          { withCredentials: true }
        );

        dispatch("LOGIN_REGISTER", res.data);
        setOpen(false);
        router.push("/");
      } catch (err) {
        setError(err.response.data.general);
      } finally {
        dispatch("STOP_LOADING");
        setLoading(false);
      }
    }
  };
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="inline-block">
        <button onClick={onOpenModal}>Masuk</button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex items-center justify-between p-0 border-b border-gray-300 border-1">
            <span>Masuk</span>
          </div>

          <div>
            <form onSubmit={submitForm}>
              <p className="mt-5 text-red-400">{error}</p>

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
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Alamat Email"
                ></input>
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
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Masukan Password Anda"
                ></input>
                <Link href="/forgot-password">
                  <span className="mt-3 underline text-md ">
                    Lupa Password ? Klik Disini
                  </span>
                </Link>
              </div>
              <div className="flex items-center mt-7">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 form-checkbox"
                  onChange={() => setUkm(!isUkm)}
                />
                {/* <span className="ml-2 text-gray-700">
                  Centang ini jika sebelumnya anda mendaftar sebagai ukm
                </span> */}
              </div>

              {Loading ? (
                <button className="p-3 mt-3 text-white bg-blue-100 ">
                  Loading ....
                </button>
              ) : (
                <button className="p-3 mt-3 text-white bg-blue-100 ">
                  Masuk
                </button>
              )}
            </form>
          </div>
          <Link href="/register">
            <span className="mt-5 underline text-md">
              Belum punya akun? Ayo Daftar
            </span>
          </Link>
          <p style={{ visibility: "hidden" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
      </div>
    </>
  );
};

export default LoginModal;

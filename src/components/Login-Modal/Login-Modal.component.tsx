import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";

import axios from "axios";
import { useAuthDispatch } from "./../../context/auth";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import Link from "next/link";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #5996ab",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const LoginModal = ({ bgActive }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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
        setIsOpen(false);
        router.push("/");
      } catch (err) {
        setError(err.response.data.general);
      } finally {
        dispatch("STOP_LOADING");
        setLoading(false);
      }
    }
  };
  Modal.setAppElement("#root");

  return (
    <div className="inline-block ">
      <div
        className={`px-5 py-1 border-2 border-blue-100    ${
          bgActive
            ? "lg:border-2 lg:text-blue-100 lg:border-blue-100 lg:hover:border-blue-100 lg:hover:text-blue-100"
            : "lg:border-2 lg:text-white lg:border-white lg:hover:border-blue-100 lg:hover:text-blue-100"
        }  `}
      >
        <button onClick={openModal} className="outline-none">
          Masuk
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <div className="relative w-full">
          <div className="absolute flex justify-end w-full">
            <button onClick={closeModal} className="text-blue-100 ">
              X
            </button>
          </div>
          <div className="w-full px-5 py-4 ">
            <div>
              <div className="flex justify-center w-full ">
                <img
                  width="200"
                  height="200"
                  className="object-cover "
                  src="/assets/logo-nav-min.png"
                />
              </div>
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
                    className="w-full px-2 py-2 mt-3 border-2 rounded-md focus:outline-none"
                    style={{ border: "1px solid #c2c2c2" }}
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
                    className="w-full px-2 py-2 mt-3 border-2 rounded-md focus:outline-none"
                    style={{ border: "1px solid #c2c2c2" }}
                    placeholder="Masukan Password Anda"
                  ></input>
                  <Link href="/forgot-password">
                    <span
                      onClick={() => setIsOpen(false)}
                      className="mt-3 text-red-600 underline cursor-pointer text-md"
                    >
                      Lupa Password ? [Klik Disini]
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col items-center w-full mt-5">
                  <button className="px-20 py-2 text-white bg-blue-100 ">
                    Masuk
                  </button>
                  <Link href="/register">
                    <span
                      onClick={() => setIsOpen(false)}
                      className="mt-3 text-blue-100 underline cursor-pointer text-md"
                    >
                      Belum Punya Akun ? [Daftar Disini]
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;

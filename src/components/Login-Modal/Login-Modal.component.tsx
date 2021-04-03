import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const styles = {
    textAlign: "center",
    padding: 0,
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
            <form>
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
                  id="password"
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Masukan Password Anda"
                ></input>
                <span className="mt-3 underline text-md ">
                  Lupa Password ? Klik Disini
                </span>
              </div>
              <button className="p-3 mt-3 text-white bg-blue-100 ">
                Masuk
              </button>
            </form>
          </div>
          <p className="mt-5 underline text-md">Belum punya akun? Ayo Daftar</p>
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

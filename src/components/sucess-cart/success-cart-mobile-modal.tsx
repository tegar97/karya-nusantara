import React, { FormEvent, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";

import axios from "axios";
import { useAuthDispatch } from "./../../context/auth";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import Link from "next/link";
import CardItem from "../atom/card-item/card-item";
import OtherProduct from "../other-product/other-product";

const customStyles = {
  content: {
    top: "70%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "100%",
    height: "100%",
    maxWidth: 1200,
    maxHeight: 1200,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
        border: "1px solid #ffff",
        borderRadius : '0 0 10px 10px'
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const SuccessCartModalMobile = ({
  bgActive = null,
  homeRouter = null,
  loginRequire = null,
}) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
  };
  Modal.setAppElement("#root");

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-100 hover:opacity-80 text-white font-bold py-2 px-4 w-full rounded outline-none"
      >
        Order
      </button>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Success Cart Modal"
      >
        <div className="relative w-full">
          <div className="absolute flex justify-end w-full">
            <button onClick={closeModal} className="text-blue-100 ">
              <img src={"/assets/icon/exit.svg"} className="lg:w-4 " />
            </button>
          </div>
          <div className="w-full px-5  ">
            <div className="flex justify-center">
              <h2 className="text-xl font-bold text-gray-700">
                Berhasil ditambahkan{" "}
              </h2>
            </div>
            <div className="mt-6">
              <CardItem />
            </div>
            <div className="mt-6">
              <h3 className="font-bold text-lg">
                Product Lainya dari toko Illu factory
              </h3>
              <div className="grid grid-cols-5 gap-3 mt-5">
                <OtherProduct />
                <OtherProduct />
                <OtherProduct />
                <OtherProduct />
                <OtherProduct />
                <OtherProduct />
                <OtherProduct />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SuccessCartModalMobile;

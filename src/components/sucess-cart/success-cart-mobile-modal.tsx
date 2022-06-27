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
import Cookie from "js-cookie";
import { addToCart } from "../../constant/api/cart";
import { toast } from "react-toastify";
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
    borderRadius: "20px 20px 0 0",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const SuccessCartModalMobile = ({ item, quantity, variants }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

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
  const submit = async () => {
    const data = {
      products_id: item.id,
      quantity: quantity,
    };
    const token = Cookie.get("token");
    console.log(token);

    if (!token) {
      toast.error("Silahkan login terlebih dahulu untuk melanjutkan");
    }
    const bearer = `Bearer ${token}`;

    if (quantity < item.stock) {
      const response = await addToCart(data, bearer);
      if (response.error === false) {
        setIsOpen(true);
      }
    } else {
      toast.error(`Maximal pembelian ${item.stock}`);
    }
  };
  Modal.setAppElement("#root");

  return (
    <div>
      <button
        onClick={submit}
        className="bg-blue-100 hover:opacity-80 text-white font-bold py-2 px-4 w-full rounded outline-none"
      >
        Order
      </button>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Success Cart Modal"
      >
        <div className="relative w-full mt-3">
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
              <CardItem item={item} quantity={quantity} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SuccessCartModalMobile;

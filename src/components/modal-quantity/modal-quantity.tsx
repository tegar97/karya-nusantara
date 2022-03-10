

import React, { FormEvent, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";

import axios from "axios";
import { useAuthDispatch } from "./../../context/auth";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import Link from "next/link";
import CardItem from "../atom/card-item/card-item";
import OtherProduct from "../other-product/other-product";
import SuccessCartModal from "../sucess-cart/succes-cart-moda";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    height: "45%",
    maxWidth: 1900,
    maxHeight: 1200,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ffff",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const ModalQuantityModal = ({
  bgActive = null,
  homeRouter = null,
  loginRequire = null,
}) => {
  let subtitle;

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [quantity,setQuantity] = useState(1)
    const [isAddNote,setIsAddNote] = useState(false)

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
    
    useEffect(() => {
        if (quantity < 0) {
           setQuantity(0)
        }
    },[quantity])

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
        contentLabel="Login Modal"
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
                Atur jumlah beli dan catatan
              </h2>
            </div>
            <div className="flex flex-col mt-5">
              {/* <h3>Beli berapa ?</h3> */}
              <span className="font-semibold text-black-400">Jumlah</span>
              <div className="border w-full border-gray-300 mt-2 items-center py-1 px-1 rounded-md justify-between  flex flex-row">
                {quantity > 0 ? (
                  <button
                    className="  border-l border-gray-300  w-1/3"
                    onClick={() => setQuantity(quantity - +1)}
                  >
                    -
                  </button>
                ) : (
                  <button className="  border-l border-gray-300  w-1/3">
                    -
                  </button>
                )}

                <input
                  placeholder="1"
                  className="pr-5 px-5 text-center"
                  value={quantity}
                  type="number"
                />
                <button
                  className="border-r border-gray-300 w-1/3"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <span className="text-xs text-red-500 mt-2">
                Maximal pembelian 100
              </span>
            </div>
            {!isAddNote && (
              <button
                onClick={() => setIsAddNote(true)}
                className="mt-5 flex flex-row items-center cursor-pointer"
              >
                <img src={"/assets/icon/pencil.svg"} className="lg-w-3" />
                <span className="font-semibold text-sm text-black-400 text-blue-100 ml-3">
                  Tambah catatan
                </span>
              </button>
            )}
            {isAddNote && (
              <input
                className="w-full border  rounded-md px-2 py-2  mt-5 border-blue-100"
                placeholder="Bajunya ukuran L semua yahh"
              />
            )}
            {isAddNote && (
              <button
                onClick={() => setIsAddNote(false)}
                className="mt-5 flex flex-row items-center cursor-pointer"
              >
                <span className="font-semibold text-sm text-black-400 text-blue-100 ml-3">
                  Batalkan catatan
                </span>
              </button>
            )}
            <div className="mt-5">
              <SuccessCartModal />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalQuantityModal;


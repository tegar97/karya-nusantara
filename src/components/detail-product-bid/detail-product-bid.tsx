import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import { useRouter } from "next/router";
import LoginModal from "../Login-Modal/Login-Modal.component";
import convertToRupiah from "../../util/converRupiah";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    maxHeight: "30rem",
    overflow: "auto",
    border: "1px solid #5996ab",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};
const DetailProduct = ({ data }) => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="inline-block">
        <button
          onClick={openModal}
          className="px-3 text-black border-2 border-blue-100"
        >
          Spesifikasi
        </button>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Login Modal"
        >
          <div className="w-full ">
            <div className="relative mt-5 ">
              {data.images.split(",").map((img, index) => (
                <img
                  className="object-cover w-full mb-5"
                  src={`${process.env.API_LARAVEL}/storage/${img}`}
                  alt={`gambar ${img}`}
                />
              ))}
              <div className="absolute flex justify-end w-full text-lg -top-6 justify-items-center">
                <button onClick={closeModal} className="text-blue-100 ">
                  X
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DetailProduct;

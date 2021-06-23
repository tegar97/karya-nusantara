import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";

import axios from "axios";
import { useAuthDispatch } from "../../context/auth";
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

const TableDeleteModal = ({ id, deleteProduct }) => {
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

  Modal.setAppElement("#root");

  return (
    <div>
      <button
        onClick={openModal}
        className="absolute text-blue-100 outline-none opacity-0 left-2 group-hover:opacity-100"
      >
        X
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Delete Table Data Modal"
      >
        <div className="relative w-full">
          <div className="absolute flex justify-end w-full">
            <button onClick={closeModal} className="text-blue-100 ">
              X
            </button>
          </div>
          <div className="w-full px-5 py-4 ">
            <div className="flex justify-center w-full ">
              <img
                width="200"
                height="200"
                className="object-cover "
                src="/assets/logo-nav-min.png"
              />
            </div>
            <span className="text-black font-regular text-md">
              Apakah Anda yakin untuk menghapus penawaran {id}
            </span>
            <div className="grid grid-cols-1 gap-2 mt-5 mg:grid-cols-2 lg:grid-cols-2">
              <button
                onClick={() => deleteProduct(id)}
                className="w-full py-1 text-white bg-blue-100 "
              >
                Ya
              </button>
              <button className="w-full py-1 text-blue-100 bg-white border-2 border-blue-100">
                Tidak
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableDeleteModal;

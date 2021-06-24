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
    top: "80%",
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

const ProductModal = ({}) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

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
    <div className="inline-block ">
      <div onClick={openModal}>asd</div>
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
              <form method="post">
                <p>dasd</p>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductModal;

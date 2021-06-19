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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
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
        <button onClick={openModal}>Masuk</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <div></div>
      </Modal>
    </div>
  );
};

export default LoginModal;

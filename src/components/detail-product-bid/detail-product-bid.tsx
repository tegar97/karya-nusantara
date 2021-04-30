import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import { useRouter } from "next/router";
import LoginModal from "../Login-Modal/Login-Modal.component";

const DetailProduct = ({ product }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="inline-block">
        <button
          onClick={onOpenModal}
          className="px-3 py-2 text-black border-2 border-blue-100"
        >
          Detail
        </button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex items-center justify-between p-0 border-b border-gray-300 border-1">
            <span>Detail Barang </span>
          </div>
          <div>
            <div className="grid grid-cols-2 p-5 mt-5 border-2 border-gray-200">
              <div className="w-full h-full ">
                <div className="mb-5 border-r border-gray-300">
                  Nama Product
                </div>
                <div>Kebutuhan Barang</div>
              </div>
              <div>
                <div className="mb-5">Nama Product</div>
              </div>
            </div>
          </div>
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

export default DetailProduct;

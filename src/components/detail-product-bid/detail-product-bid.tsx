import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import { useRouter } from "next/router";
import LoginModal from "../Login-Modal/Login-Modal.component";
import convertToRupiah from "../../util/converRupiah";

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
          <div className="flex items-center justify-between p-0 border-b border-gray-300 border-1 ">
            <span>Detail Barang </span>
          </div>
          <div className="mt-5">
            <table
              style={{ borderSpacing: "5em" }}
              className="table w-full h-full min-w-full leading-normal border-2 border-collapse border-gray-300 table-bordered"
            >
              <tbody className="p-10">
                <tr className="w-2/5 px-5 py-5 pb-10 bg-white border-b border-gray-200 text-md">
                  <th
                    className="px-2 py-2"
                    style={{ width: "50%" }}
                    scope="row"
                  >
                    Nama Barang
                  </th>
                  <td>{product.product_name}</td>
                </tr>
                <tr className="w-2/5 px-5 py-5 bg-white border-b border-gray-200 text-md">
                  <th scope="row" className="px-2 py-2">
                    Kebutuhan Barang
                  </th>
                  <td>{product.capacity_product}</td>
                </tr>
                <tr className="w-2/5 px-5 py-5 bg-white border-b border-gray-200 text-md">
                  <th className="px-2 py-2" scope="row">
                    Kisaran Harga
                  </th>
                  <td> {convertToRupiah(product.price)}</td>
                </tr>
                <tr className="w-2/5 px-5 py-5 bg-white border-b border-gray-200 text-md">
                  <th className="px-2 py-2" scope="row">
                    Penjelasan Barang / Deskripsi Barang
                  </th>
                  <td> {product.description}</td>
                </tr>
                <tr className="w-2/5 px-5 py-5 bg-white border-b border-gray-200 text-md">
                  <th className="px-2 py-2" scope="row">
                    Gambar Barang
                  </th>
                  <td>
                    <img
                      src={`${process.env.API_LARAVEL}/storage/${product.image}`}
                      width="100"
                      height="100"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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

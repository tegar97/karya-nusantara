import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { useAuthDispatch } from "./../../context/auth";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
const AddProduct = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="inline-block">
        <button onClick={onOpenModal}>Masuk</button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex items-center mt-5 text-sm text-blue-100 cursor-pointer">
            <AddIcon />
            <span className="text-lg">Tambah Produk (opsional)</span>
          </div>
          <div>
            <form>
              <div className="my-5 text-sm">
                <label
                  htmlFor="email"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  autoFocus
                  id="name"
                  className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Conth : Masker kain 3 lapis"
                ></input>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="password"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Jumlah Kebutuhan
                </label>
                <input
                  type="number"
                  autoFocus
                  id="amount"
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Jumlah Kebutuhan"
                ></input>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="lowprice"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Harga Terendah
                </label>
                <input
                  type="number"
                  autoFocus
                  id="lowprice"
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Jumlah Kebutuhan"
                ></input>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="highprice"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Harga Tertinggi
                </label>
                <input
                  type="number"
                  autoFocus
                  id="highprice"
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Jumlah Kebutuhan"
                ></input>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="highprice"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  spefikasi product
                </label>
                <textarea
                  autoFocus
                  id="highprice"
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="isikan warna , ukuran dan detail product lainya"
                ></textarea>
              </div>

              <div className="mt-5 text-sm">
                <label
                  htmlFor="highprice"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Gambar
                </label>
                <input
                  type="file"
                  id="image"
                  name="Images"
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="isikan warna , ukuran dan detail product lainya"
                ></input>
              </div>
            </form>
          </div>
          <Link href="/register">
            <span className="mt-5 underline text-md">
              Belum punya akun? Ayo Daftar
            </span>
          </Link>
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

export default AddProduct;

import React, { FormEvent, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "./../../context/auth";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import LoginModal from "../Login-Modal/Login-Modal.component";

/* Fungsi formatRupiah */

const AddBid = ({ data, setSuccessMessage }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [CapacityProduct, setCapacityProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [Price, setPrice] = useState("");
  const [DatabasePrice, setDatabasePrice] = useState("");
  const [Deadlines, setDeadlines] = useState("");
  const { user, authenticated } = useAuthState();
  const SetToRupiah = (angka, prefix) => {
    setDatabasePrice(angka.replace(/[^,\d]/g, "").toString());
    const converNumber = angka;
    var number_string = converNumber.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    setPrice(prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "");
  };
  const onSubmit = async (e) => {
    console.log(parseInt(DatabasePrice));
    try {
      e.preventDefault();
      setLoading(true);
      await axios.post(
        `${process.env.API_LARAVEL}/api/bid_ukm`,
        {
          capacity_product: CapacityProduct,
          estimatePrice: parseInt(DatabasePrice),
          ukm_id: user.ID,
          offer_id: data.id,
          estimateTime: Deadlines,
        },
        { withCredentials: false }
      );
      setLoading(false);
      setOpen(false);
      setSuccessMessage(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccessMessage(false);
    }
  };

  return (
    <>
      <div className="inline-block">
        <button
          onClick={onOpenModal}
          className="px-3 py-2 ml-3 text-white bg-blue-100 text-blue"
        >
          Ajukan Penawaran
        </button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="mt-5">
            <form onSubmit={onSubmit}>
              <div className="my-5 text-sm">
                <label
                  htmlFor="capacityProduct"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Kapasitas Produksi
                </label>
                <input
                  type="number"
                  autoFocus
                  id="capacityProduct"
                  onChange={(e) => setCapacityProduct(e.target.value)}
                  className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Jumlah Produk / Hari"
                ></input>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="password"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Perkiraan Harga
                </label>
                <div>
                  <input
                    type="text"
                    maxLength={9999}
                    autoFocus
                    id="rupiah"
                    className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                    placeholder="Harga / pcs"
                    value={Price}
                    onChange={(e) => SetToRupiah(e.target.value, "RP")}
                  ></input>
                </div>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="password"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Perkiraan Waktu Produksi
                </label>
                <input
                  type="date"
                  autoFocus
                  onChange={(e) => setDeadlines(e.target.value)}
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                ></input>
              </div>
              <div className="mt-5">
                {loading ? (
                  <button disabled className="p-2 text-white bg-blue-100 ">
                    Loading ....
                  </button>
                ) : authenticated ? (
                  <button className="p-2 text-white bg-blue-100 ">
                    Ajukan Penawaran
                  </button>
                ) : (
                  <div>
                    <button
                      className="p-2 text-white bg-blue-100 opacity-50"
                      disabled
                    >
                      Silahkan login terlebih dahulu untuk melanjutkan
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>

          <p style={{ visibility: "hidden" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          </p>
        </Modal>
      </div>
    </>
  );
};

export default AddBid;

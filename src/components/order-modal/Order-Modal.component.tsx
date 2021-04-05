import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const OrderModal = () => {
  const [open, setOpen] = useState(false);
  const [quatity, setQuantity] = useState(null);
  const [keterangan, setKeterangan] = useState(null);
  const [error, setError] = useState(null);
  const styles = {
    textAlign: "center",
    padding: 0,
  };

  const getLinkWhastapp = (number) => {
    if (!quatity && !keterangan) {
      return setError("Form Wajib di isi");
    }
    const message = `Halo Admin , saya mau membeli barang A dengan jumlah ${quatity} dengan ${keterangan}  `;
    const url =
      "https://api.whatsapp.com/send?phone=" + number + "&text=%20" + message;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    setError("");
    return newWindow;
  };

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="inline-block">
        <button
          onClick={() => onOpenModal()}
          className="w-20 p-2 text-white bg-blue-100 outline-none"
        >
          Beli
        </button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex items-center justify-between p-2 border-b border-gray-300 border-1">
            <h2 className="text-lg">Dapatkan Penawaran Terbaik</h2>
          </div>
          <div>
            <div className="mt-3 text-center">
              <span className="text-red-500">{error}</span>
            </div>

            <div className="my-5 text-sm">
              <label
                htmlFor="quatity"
                className="block text-black "
                style={{ fontSize: "1.05rem" }}
              >
                Quantity
              </label>
              <input
                type="number"
                autoFocus
                id="quatity"
                className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
            </div>
            <div className="mt-5 text-sm">
              <label
                htmlFor="keterangan"
                className="block text-black "
                style={{ fontSize: "1.05rem" }}
              >
                Deskripsi / Keterangan
              </label>
              <textarea
                autoFocus
                id="keterangan"
                className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                placeholder="Keterangan (warna , ukuran dan lainya)"
                onChange={(e) => setKeterangan(e.target.value)}
              ></textarea>
            </div>
            <button
              className="p-3 mt-3 text-white "
              style={{ backgroundColor: "#128c7e		" }}
              onClick={() => getLinkWhastapp(`085125125`)}
            >
              Beli via whatsapp
            </button>
          </div>
          <p style={{ visibility: "hidden" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          </p>
        </Modal>
      </div>
    </>
  );
};

export default OrderModal;

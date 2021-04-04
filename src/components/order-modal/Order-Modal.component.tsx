import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const OrderModal = () => {
  const [open, setOpen] = useState(false);
  const styles = {
    textAlign: "center",
    padding: 0,
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
            <form>
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
                ></textarea>
              </div>
              <button
                className="p-3 mt-3 text-white "
                style={{ backgroundColor: "#128c7e		" }}
              >
                Beli via whatsapp
              </button>
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

export default OrderModal;

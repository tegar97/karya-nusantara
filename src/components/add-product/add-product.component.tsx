import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import { useRouter } from "next/router";
import LoginModal from "../Login-Modal/Login-Modal.component";

const AddProduct = ({ setYourProduct, yourProduct }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData]: any = useState({});
  const [ProductName, setProductName]: any = useState("");
  const [Price, setPrice]: any = useState("");
  const [Description, setDescription] = useState("");
  const [DatabasePrice, setDatabasePrice] = useState("");

  const [CapacityProduct, setCapacityProduct]: any = useState("");

  const [file, setSelectedFile] = useState("");
  const [selectFileName, setSelectedFileName] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const { authenticated, loading, user } = useAuthState();

  const [Error, setError]: any = useState({});

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

  const ImageChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedFileName(event.target.files[0].name);
    setIsFilePicked(true);
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // if (user.Name != "") {
    //   formData.UsersID = user.ID;
    // } else {
    //   formData.UkmID = user.ID;
    // }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      if (!authenticated) {
        return setError("Silahkan Login Terlebih Dahulu untuk melanjutkan");
      }
      const formData = new FormData();
      formData.append("Image", file);

      const uploadFile = await fetch(
        `${process.env.API_LARAVEL}/api/uploadFile`,
        {
          method: "POST",
          body: formData,
        }
      );
      const content = await uploadFile.json();
      if (!user.UkmName) {
        const res = await axios.post("/v1/product", {
          CapacityProduct: parseInt(CapacityProduct),
          ProductName: ProductName,
          Price: parseInt(DatabasePrice),
          Description: Description,
          UsersID: parseInt(user.ID),
          Image: content.data,
        });

        setYourProduct([...yourProduct, res.data.data]);
        setOpen(false);
      } else {
        const res = await axios.post("/v1/product", {
          CapacityProduct: parseInt(CapacityProduct),
          ProductName: ProductName,
          Price: parseInt(DatabasePrice),
          Description: Description,
          UkmID: parseInt(user.ID),
          Image: content.data,
        });

        setYourProduct([...yourProduct, res.data.data]);
        setOpen(false);
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="inline-block">
        <button
          onClick={onOpenModal}
          className="flex items-center p-2 text-white bg-blue-100 "
        >
          <AddIcon />
          <span className="ml-1">Tambahkan Produk</span>
        </button>{" "}
        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex items-center justify-between p-0 border-b border-gray-300 border-1">
            <span>Ajukan Penawaran </span>
          </div>
          <div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <div className="mt-5 text-center"></div>
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
                  required
                  name="ProductName"
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Conth : Masker kain 3 lapis"
                ></input>
                <span className="text-red-500 ">
                  {Error && Error.ProductName}
                </span>
              </div>
              <div className="my-5 text-sm">
                <label
                  htmlFor="email"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Kebutuhan Barang
                </label>
                <input
                  type="number"
                  autoFocus
                  id="CapacityProduct"
                  name="CapacityProduct"
                  required
                  onChange={(e) => setCapacityProduct(e.target.value)}
                  className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Kebutuhan Barang"
                ></input>
              </div>
              <div className="my-5 text-sm">
                <label
                  htmlFor="price"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Price
                </label>
                <input
                  type="text"
                  autoFocus
                  id="price"
                  required
                  name="Price"
                  value={Price}
                  onChange={(e) => SetToRupiah(e.target.value, "Rp")}
                  className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="Conth : Masker kain 3 lapis"
                ></input>
              </div>
              <div className="my-5 text-sm">
                <label
                  htmlFor="email"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Deskripsi Barang
                </label>
                <textarea
                  autoFocus
                  id="Description"
                  name="Description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                ></textarea>
              </div>

              <div className="mt-5 text-sm">
                <label
                  htmlFor="Image"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Gambar
                </label>
                <input
                  type="file"
                  id="Image"
                  name="file"
                  onChange={(e) => ImageChangeHandler(e)}
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="isikan warna , ukuran dan detail product lainya"
                ></input>
              </div>
              {!authenticated ? (
                <p className="p-2 text-red-500 ">
                  Silahkan Login Terlebih dahulu untuk melanjutkan
                </p>
              ) : (
                <button type="submit" className="p-2 text-white bg-blue-100">
                  Submit
                </button>
              )}
            </form>
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

export default AddProduct;

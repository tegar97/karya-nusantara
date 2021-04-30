import axios from "axios";
import React, { useState } from "react";
import { useAuthDispatch } from "../../context/auth";
import { useForm } from "../../Hook/hooks";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
function RegisterUKM() {
  const router = useRouter();
  const [formDetail, setformDetail] = useState(false);
  const [formData, setFormData]: any = useState({});
  const [isMemberUKM, setIsMemberUKM] = useState(false);
  const [InterestedJoin, setInterestedJoin] = useState(false);
  const [valueMemberUkm, setValueMemberUkm]: any = useState(0);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [valueInterestedJoin, setValueInterestedJoin]: any = useState(0);
  const [DatabasePrice, setDatabasePrice]: any = useState(0);
  const [Price, setPrice] = useState("");

  const dispatch = useAuthDispatch();
  const [Error, setError]: any = useState();
  const [Loading, setLoading] = useState(false);

  const [Success, setSuccess] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedFiles) {
        let images = selectedFiles;
        let fd = new FormData();
        fd.append("Image", images);
        const uploadFile = await fetch(
          `${process.env.API_LARAVEL}/api/uploadFile`,
          {
            method: "POST",
            body: fd,
          }
        );
        const content = await uploadFile.json();

        const res = await axios.post("/v1/users/UKM", {
          UkmName: formData.UkmName,
          OwnerName: formData.OwnerName,
          Email: formData.Email,
          Password: formData.Password,
          BusinessSize: formData.BusinessSize,
          BusinessBirth: formData.BusinessBirth,
          BusinessAdress: formData.BusinessAdress,
          TurnoverYears: formData.TurnoverYears,
          IsMemberUKMID: parseInt(valueMemberUkm),
          InterestedJoin: parseInt(valueInterestedJoin),
          BusinessInstagram: formData.BusinessInstagram,
          CertficateName: formData.CertficateName,
          CertificateID: formData.CertificateID,
          employees: parseInt(formData.employees),
          PhoneNumber: formData.PhoneNumber,
          BusinnesEmail: formData.BusinnesEmail,
          ProductName: formData.ProductName,
          CapacityProduct: parseInt(formData.CapacityProduct),
          Price: parseInt(DatabasePrice),
          Image: content.data,
          Description: formData.ProductDescription,
        });

        router.push("/success-ukm");
        await axios.post(
          `${process.env.API_LARAVEL}/api/sendEmail`,
          {
            email: res.data.email,
            name: res.data.name,
            token: res.data.token,
          },
          { withCredentials: false }
        );
      } else {
        const res = await axios.post("/v1/users/UKM", {
          UkmName: formData.UkmName,
          OwnerName: formData.OwnerName,
          Email: formData.Email,
          Password: formData.Password,
          BusinessSize: formData.BusinessSize,
          BusinessBirth: formData.BusinessBirth,
          BusinessAdress: formData.BusinessAdress,
          TurnoverYears: formData.TurnoverYears,
          IsMemberUKMID: isMemberUKM ? 1 : 0,
          InterestedJoin: InterestedJoin ? 1 : 0,
          BusinessInstagram: formData.BusinessInstagram,
          CertficateName: formData.CertficateName,
          CertificateID: formData.CertificateID,
          employees: formData.employees,
          PhoneNumber: formData.PhoneNumber,
          BusinnesEmail: formData.BusinnesEmail,
          ProductName: formData.ProductName,
          CapacityProduct: parseInt(formData.CapacityProduct),
          Price: parseInt(DatabasePrice),
          Description: formData.ProductDescription,
        });

        router.push("/success-ukm");
        await axios.post(
          `${process.env.API_LARAVEL}/api/sendEmail`,
          {
            email: res.data.email,
            name: res.data.name,
            token: res.data.token,
          },
          { withCredentials: false }
        );
      }

      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err.response.data);
      if (
        err.response.data.email ||
        err.response.data.password ||
        err.response.data.name
      ) {
        setformDetail(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className={`${formDetail ? "hidden" : ""}`}>
          <div className="mt-5 text-sm">
            <label
              htmlFor="UkmName"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nama UKM
            </label>
            <input
              type="text"
              autoFocus
              id="UkmName"
              name="UkmName"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nama Usaha Anda"
            ></input>
          </div>
          <span className="text-red-500 ">{Error && Error.UkmName}</span>

          <div className="mt-5 text-sm">
            <label
              htmlFor="OwnerName"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nama Pemilik usaha
            </label>
            <input
              type="text"
              autoFocus
              id="OwnerName"
              name="OwnerName"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nama Pemilik Usaha"
            ></input>
            <span className="text-red-500 ">{Error && Error.OwnerName}</span>
          </div>
          <div className="my-5 text-sm">
            <label
              htmlFor="Email"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Email
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Alamat Email"
            ></input>
            <span className="text-red-500 ">{Error && Error.email}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="Password"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Password
            </label>
            <input
              type="Password"
              autoFocus
              id="Password"
              name="Password"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Password Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.password}</span>
          </div>
          <button
            type="button"
            onClick={() => setformDetail(true)}
            className="p-3 mt-3 text-white bg-blue-100 "
          >
            Lanjut
          </button>
        </div>
        <div className={`${formDetail ? "" : "hidden"}`}>
          <div className="mt-5 text-sm">
            <label
              htmlFor="BusinessSize"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Bentuk usaha
            </label>
            <select
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              name="BusinessSize"
              id="BusinessSize"
              onChange={(e) => onChange(e)}
            >
              <option value="a">Perusahaan Perseorangan</option>
              <option value="b">Persekutuan Perdata</option>
              <option value="c">Persekutuan Firma</option>
              <option value="d">Persekutuan Komanditer</option>
              <option value="e">Perseroan Terbatas (PT)</option>
              <option value="g">Koperasi</option>
            </select>

            <span className="text-red-500 ">{Error && Error.BusinessSize}</span>
          </div>
          <div className="my-5 text-sm">
            <label
              htmlFor="BusinessAdress"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Alamat Lengkap Usaha
            </label>
            <input
              type="text"
              autoFocus
              id="BusinessAdress"
              name="BusinessAdress"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Alamat Tempat Usaha"
            ></input>
            <span className="text-red-500 ">
              {Error && Error.BusinessAdress}
            </span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="BusinessBirth"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Tanggal Mulai Usaha
            </label>
            <input
              type="date"
              autoFocus
              id="BusinessBirth"
              name="BusinessBirth"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
            ></input>
            <span className="text-red-500 ">{Error && Error.CompanyBirth}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="BusinnesEmail"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Email Perusahaan
            </label>
            <input
              type="email"
              autoFocus
              id="BusinnesEmail"
              name="BusinnesEmail"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Email Perusahaan Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.CompanyEmail}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="BussinessEmail"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Total karyawan
            </label>
            <input
              type="text"
              autoFocus
              id="employees"
              name="employees"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Total karyawan"
            ></input>
            <span className="text-red-500 ">{Error && Error.CompanyEmail}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="TurnoverYears"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Penghasilan Pertahun
            </label>
            <select
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              name="TurnoverYears"
              id="TurnoverYears"
              onChange={(e) => onChange(e)}
            >
              <option value="a">
                Usaha Mikro memiliki omzet paling banyak (300.000.000) dalam 1
                tahun
              </option>
              <option value="b">
                Usaha Kecil memiliki omzet paling banyak (300.000.000 -
                2.500.000.000) dalam 1 tahun
              </option>
              <option value="c">
                Usaha Menengah memiliki omzet paling banyak (2.500.000.000 -
                10.000.000.000) dalam 1 tahun
              </option>
            </select>

            <span className="text-red-500 ">
              {Error && Error.TurnoverYears}
            </span>
          </div>

          <div className="mt-5 text-sm">
            <label
              htmlFor="PhoneNumber"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nomor Hp
            </label>
            <input
              type="text"
              autoFocus
              id="PhoneNumber"
              name="PhoneNumber"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nomer Hp Anda Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.PhoneNumber}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="BusinessInstagram"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Instagram Usaha
            </label>
            <input
              type="text"
              autoFocus
              id="BusinessInstagram"
              name="BusinessInstagram"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Instagram Usaha Anda"
            ></input>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="CertficateName"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Sertifikat/Perizinan
            </label>
            <input
              type="text"
              autoFocus
              id="CertficateName"
              name="CertficateName"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Sertifikat / Perizinan (Contoh: Sertifikat Halal)"
            ></input>
            <span className="text-red-500 ">
              {Error && Error.CertficateName}
            </span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="CertificateID"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              No sertifikat
            </label>
            <input
              type="text"
              autoFocus
              id="CertificateID"
              name="CertificateID"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Sertifikat / Perizinan (Contoh: Sertifikat Halal)"
            ></input>
            <span className="text-red-500 ">
              {Error && Error.CertificateID}
            </span>
          </div>

          <div className="mt-5 text-sm">
            <label
              htmlFor="ProductName"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Nama Produk
            </label>
            <input
              type="text"
              autoFocus
              id="ProductName"
              name="ProductName"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Sertifikat / Perizinan (Contoh: Sertifikat Halal)"
            ></input>
            <span className="text-red-500 ">{Error && Error.productName}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="CapacityProduct"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Kapasisitas Produk / Bulan
            </label>
            <input
              type="number"
              autoFocus
              id="CapacityProduct"
              name="CapacityProduct"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Kapasitas Produk / Bulan"
            ></input>
            <span className="text-red-500 ">
              {Error && Error.CertificateID}
            </span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="CapacityProduct"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Harga / pcs
            </label>
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
            <span className="text-red-500 ">{Error && Error.Price}</span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="ProductDescription"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Deskripsi Produk
            </label>
            <textarea
              autoFocus
              id="ProductDescription"
              name="ProductDescription"
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Sertifikat / Perizinan (Contoh: Sertifikat Halal)"
            ></textarea>
            <span className="text-red-500 ">
              {Error && Error.CertificateID}
            </span>
          </div>
          <div className="mt-5 text-sm">
            <label
              htmlFor="Image"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Photo Prodok
            </label>
            <input
              autoFocus
              type="file"
              id="Image"
              name="Image"
              onChange={(e) => setSelectedFiles(e.target.files[0])}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
            ></input>
            <span className="text-red-500 ">
              {Error && Error.CertificateID}
            </span>
          </div>

          <div className="mt-5 text-sm">
            <label
              htmlFor="CertificateID"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Apakah Anda Member UKMIndonesia.id ?
            </label>
            <div className="flex items-center mt-5 ">
              <div>
                <input
                  type="text"
                  hidden
                  name="valueMemberUkm"
                  value={isMemberUKM ? 1 : 0}
                  onChange={(e) => setValueMemberUkm(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setIsMemberUKM(!isMemberUKM)}
                  className={`w-full px-10 py-1 text-lg bg-white border-2 border-blue-100 ${
                    isMemberUKM ? "bg-blue-100 text-white" : ""
                  }`}
                >
                  IYA
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setIsMemberUKM(!isMemberUKM)}
                  className={`w-full ml-10 px-10 py-1 text-lg bg-white border-2 border-blue-100 ${
                    !isMemberUKM ? "bg-blue-100 text-white" : ""
                  }`}
                >
                  BUKAN
                </button>
              </div>
            </div>
          </div>
          {
            <>
              {!isMemberUKM && (
                <div className="mt-5 text-sm">
                  <label
                    htmlFor="CertificateID"
                    className="block text-black "
                    style={{ fontSize: "1.05rem" }}
                  >
                    Apakah Anda Berminat Untuk Bergabung ?
                  </label>
                  <div className="flex items-center mt-5 ">
                    <div>
                      <input
                        type="text"
                        hidden
                        name="InterestedJoin"
                        value={InterestedJoin ? 1 : 0}
                        onChange={(e) => setValueInterestedJoin(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setInterestedJoin(!InterestedJoin)}
                        className={`w-full px-10 py-1 text-lg bg-white border-2 border-blue-100 ${
                          InterestedJoin ? "bg-blue-100 text-white" : ""
                        }`}
                      >
                        IYA,Saya Berminat
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setInterestedJoin(!InterestedJoin)}
                        className={`w-full ml-10 px-10 py-1 text-lg bg-white border-2 border-blue-100 ${
                          !InterestedJoin ? "bg-blue-100 text-white" : ""
                        }`}
                      >
                        Tidak Berminat
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          }

          <div className="mt-5">
            <button
              type="button"
              onClick={() => setformDetail(false)}
              className="p-3 mt-3 text-black border-2 border-blue-100 "
            >
              Kembali
            </button>
            {Loading ? (
              <button
                type="submit"
                disabled
                className="p-3 mt-3 ml-5 text-black bg-gray-100 "
              >
                Loading .....
              </button>
            ) : (
              <button
                type="submit"
                className="p-3 mt-3 ml-5 text-white bg-blue-100 "
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterUKM;

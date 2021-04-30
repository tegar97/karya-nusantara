import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useForm } from "../../Hook/hooks";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import { motion } from "framer-motion";
function DasboardProfile() {
  const router = useRouter();
  const [formDetail, setformDetail] = useState(false);
  const [formData, setFormData]: any = useState({});
  const [isMemberUKM, setIsMemberUKM] = useState(false);
  const [InterestedJoin, setInterestedJoin] = useState(false);
  const { user } = useAuthState();

  const dispatch = useAuthDispatch();
  const [Error, setError]: any = useState();
  const [Loading, setLoading] = useState(false);

  const [Success, setSuccess] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/v1/users/UKM", formData);
      dispatch("LOGIN_REGISTER", res.data);
      setLoading(false);
      setSuccess(true);

      router.push("/success");
    } catch (err) {
      setError(err.response.data);
      if (
        err.response.data.email ||
        err.response.data.password ||
        err.response.data.name
      ) {
        setformDetail(false);
      }
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="p-2 mt-5"
      style={{ maxHeight: "40rem", overflow: "scroll" }}
    >
      <form onSubmit={onSubmit}>
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
              value={user.UkmName}
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nama Usaha Anda"
            ></input>
          </div>
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
              value={user.OwnerName}
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
              autoFocus
              name="Email"
              id="Email"
              value={user.email}
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Alamat Email"
            ></input>
            <span className="text-red-500 ">{Error && Error.email}</span>
          </div>
        </div>
        <div>
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
              value={user.BusinessSize}
            >
              <option value="a">Perusahaan Perseorangan</option>
              <option value="b">Persekutuan Perdata</option>
              <option value="c">Persekutuan Firma</option>
              <option value="d">Persekutuan Komanditer</option>
              <option value="e">Perseroan Terbatas (PT)</option>
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
              value={user.BusinessAdress}
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
              htmlFor="TurnoverYears"
              className="block text-black "
              style={{ fontSize: "1.05rem" }}
            >
              Tanggal Mulai Usaha
            </label>
            <input
              type="date"
              autoFocus
              id="TurnoverYears"
              name="TurnoverYears"
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
              value={user.BusinessAdress}
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
              value={user.employees}
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
              value={user.TurnoverYears}
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
              value={user.PhoneNumber}
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
              value={user.BusinessInstagram}
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Instagram Usaha Anda"
            ></input>
            <span className="text-red-500 ">{Error && Error.PhoneNumber}</span>
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
              value={user.CertficateName}
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
              value={user.CertificateID}
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Sertifikat / Perizinan (Contoh: Sertifikat Halal)"
            ></input>
            <span className="text-red-500 ">
              {Error && Error.CertificateID}
            </span>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default DasboardProfile;

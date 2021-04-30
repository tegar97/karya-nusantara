import axios from "axios";
import React, { useState } from "react";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useForm } from "../../Hook/hooks";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import { motion } from "framer-motion";
function DasboardAccount() {
  const router = useRouter();
  const [formDetail, setformDetail] = useState(false);
  const [formData, setFormData]: any = useState({});
  const [changePassword, setChangePassword] = useState(false);
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
              Email
            </label>
            <input
              type="text"
              autoFocus
              id="UkmName"
              disabled
              name="UkmName"
              value={user.email}
              onChange={(e) => onChange(e)}
              className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
              placeholder="Masukan Nama Usaha Anda"
            ></input>
          </div>
          {!changePassword && (
            <button
              className="p-2 text-blue-100 "
              onClick={() => setChangePassword(true)}
            >
              Ganti Password
            </button>
          )}
          {changePassword && (
            <>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="OldPassword"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Masukan Password Lama
                </label>
                <input
                  type="text"
                  autoFocus
                  id="OldPassword"
                  name="OldPassword"
                  onChange={(e) => onChange(e)}
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
                  placeholder="Masukan Password Lama"
                ></input>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="OldPassword"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Masukan Password Baru
                </label>
                <input
                  type="text"
                  autoFocus
                  id="NewPassword"
                  name="NewPassword"
                  onChange={(e) => onChange(e)}
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
                  placeholder="Masukan Nama Usaha Anda"
                ></input>
              </div>
              <div className="mt-5 text-sm">
                <label
                  htmlFor="NewPassword"
                  className="block text-black "
                  style={{ fontSize: "1.05rem" }}
                >
                  Masukan Password Sekali Lagi
                </label>
                <input
                  type="text"
                  autoFocus
                  id="VerifyPassword"
                  name="VerifyPassword"
                  onChange={(e) => onChange(e)}
                  className="w-full px-2 py-2 mt-3 mb-3 border-2 border-gray-300 rounded-md focus:outline-none"
                  placeholder="Masukan Password Baru Anda"
                ></input>
              </div>
              <button className="p-2 mt-5 text-white bg-blue-100">
                Change Password
              </button>
            </>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default DasboardAccount;

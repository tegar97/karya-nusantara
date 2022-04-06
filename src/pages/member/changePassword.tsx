import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import SideBarMember from "../../components/atom/sidebar-member/sidebar-member";
import FormInput from "../../components/input-container/input-container";
import { changePassword, getProfile, update } from "../../constant/api/auth";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import router, { useRouter } from "next/router";
import DasboardSkeleton from "../../components/atom/dasboard-skeleton/dasboard-skeleton";
function Profile({ user }) {
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState('');
  const router = useRouter();

  const updateData = async () => {
    const token = Cookie.get("token");
    const Bearer = `Bearer ${token}`;
    console.log(token);

    const data = {
      old_password,
      new_password,
    };
      if (new_password !== passwordVerify) {
        toast.error("Konfirmasi password  berbeda dengan password baru");
      } else {
       
          const response = await changePassword(data, Bearer);
          console.log(response)
          
          if (response?.error) {
              toast.error('Password lama salah')
          }
          toast.success("Sukses Ganti password");

          router.reload();

      }

   
  };

  return (
    <div>
      <DasboardSkeleton user={user}>
        <div className="content col-span-4 ml-5">
          <ul className="mt-5 w-full">
            <li className="text-blue-100 font-semibold border-b-2 pb-2 border-blue-100 lg:w-40">
              Ganti password
            </li>
            <div className="mt-2">
              <span className="mt-2 text-gray-400">
                Password harus lebih dari 6 huruf
              </span>
            </div>
          </ul>

          <div className="content-input-area mt-10">
            <TextField
              className="w-full rounded-md mb-6 "
              id="outlined-basic"
              label="Password lama"
              type="password"
              variant="outlined"
              onChange={(e) => setOldPassword(e.target.value)}
              value={old_password}
            />
            <TextField
              className="w-full rounded-md mb-6 "
              id="outlined-basic"
              label="Password Baru"
              variant="outlined"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={new_password}
            />
            <TextField
              className="w-full rounded-md mb-6 "
              id="outlined-basic"
              type="password"
              label="Konfirmasi password baru"
              variant="outlined"
              onChange={(e) => setPasswordVerify(e.target.value)}
              value={passwordVerify}
            />
          </div>
          {old_password.length < 6 ||
          new_password.length < 6 ||
          passwordVerify.length < 6 ||
          new_password !== passwordVerify ? (
            <Button
              variant="contained"
              className="bg-blue-100 text-white rounded-lg px-5 py-2 "
              disabled
            >
              Simpan
            </Button>
          ) : (
            <Button
              variant="contained"
              className="bg-blue-100 text-white rounded-lg px-5 py-2 "
              onClick={() => updateData()}
            >
              Simpan
            </Button>
          )}
        </div>
      </DasboardSkeleton>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const response = await getProfile(bearerToken);
  const user = response.data.data;

  console.log(token);

  return {
    props: {
      user: user,
    },
  };
}
export default Profile;

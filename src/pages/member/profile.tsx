import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import SideBarMember from '../../components/atom/sidebar-member/sidebar-member';
import FormInput from '../../components/input-container/input-container';
import { getProfile, update } from '../../constant/api/auth';
import Cookie from 'js-cookie'
import { toast } from 'react-toastify';
import router, { useRouter } from 'next/router';
import DasboardSkeleton from '../../components/atom/dasboard-skeleton/dasboard-skeleton';
import Link from 'next/link';
function Profile({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const router = useRouter()

  const updateData = async () => {
    const token = Cookie.get('token');
    const Bearer = `Bearer ${token}`;

    const data = {
      name,
      email,
      phoneNumber
    }

    try {
      
      await update(data, Bearer);
      toast.success('Sukses update profile')

      router.reload();

    } catch {
      toast.error("Gagal update profile");

    }
    

    

  }




  return (
    <div>
      <DasboardSkeleton user={user}>
        <div className="content col-span-4 ml-5">
          <ul className="mt-5">
            <li className="text-blue-100 font-semibold border-b-2 pb-2 border-blue-100 lg:w-20">
              My Profile
            </li>
          </ul>

          <div className="content-input-area mt-10">
            <TextField
              className="w-full rounded-md mb-6 border border-gray-400"
              id="outlined-basic"
              color="primary"
              label="Nama Lengkap"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="outlined"
            />
            <TextField
              className="w-full rounded-md mb-6 "
              id="outlined-basic"
              label="Email Akun"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="relative">
              <TextField
                className="w-full rounded-md mb-6 "
                id="outlined-basic"
                label="Kata sandi"
                variant="outlined"
                disabled
              />
              <Link href="/member/changePassword">
                <span className="absolute right-5 top-4 text-blue-100 font-bold  cursor-pointer">
                  Ubah{" "}
                </span>
              </Link>
            </div>
            <TextField
              className="w-full rounded-md mb-6 "
              id="outlined-basic"
              label="Nomer Telepon"
              variant="outlined"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          {name === user.name &&
          email === user.email &&
          phoneNumber === user.phoneNumber ? (
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
  const { token } = req.cookies
      const bearerToken = `Bearer ${token}`;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const response = await getProfile(bearerToken);
  const user= response.data.data;

  console.log(token);

  return {
    props: {
      user: user,
    },
  };
 }
export default Profile
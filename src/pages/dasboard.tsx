import Image from "next/image";
import React, { useState, useEffect } from "react";
import PersonIcon from "@material-ui/icons/Person";
import DasboardProfile from "../components/dasboard-profil/dasboard-profile";
import DasboardAccount from "../components/dasboard-account/dasboard-account";
import { useAuthState } from "../context/auth";
import { useRouter } from "next/router";
import HistoryBid from "../components/history-bid/history-bid";
import Link from "next/link";

function Dasboard() {
  const [Menu, SetMenu] = useState("");
  const { user: userData, authenticated, loading } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated]);
  return authenticated ? (
    <div>
      <div
        className="relative w-full bg-top bg-cover"
        style={{
          minHeight: "23rem",
        }}
      >
        <div className="absolute bottom-0 w-full bg-black opacity-25 h-1/4"></div>
        <div
          className="absolute flex items-center left-5 group "
          style={{ bottom: "-60px" }}
        >
          <div className="relative">
            <Image
              src="/assets/default2.jpg"
              className="rounded-full "
              width={150}
              height={150}
              alt="profile"
            />
            <span className="absolute text-blue-100 left-7 top-14 group">
              Ganti Profile
            </span>
          </div>
          <div className="flex flex-col mt-10">
            <span className="mb-5 ml-10 text-4xl text-white">
              {!loading && authenticated && userData && userData.UkmName}
            </span>
            <span className="mb-5 ml-10 text-lg font-bold text-black">
              {!loading && authenticated && userData && userData.OwnerName}
            </span>
          </div>
        </div>
      </div>

      {!loading && userData.UkmName && (
        <div className="px-5 py-10">
          <div
            className="grid grid-cols-2 px-10 py-10 mt-20 bg-white border-2 border-blue-100 shadow-md lg:grid-cols-4"
            style={{ borderRadius: "7px" }}
          >
            <div>
              <ul>
                <li
                  className="flex items-center mb-5 cursor-pointer hover:text-blue-100"
                  onClick={() => SetMenu("profil")}
                >
                  {/* <PersonIcon className="text-blue-100" /> */}
                  <Image
                    src="/assets/i4.png"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <span
                    className={`ml-3 ${Menu == "profil" && "text-blue-100"}`}
                  >
                    Profil UKM
                  </span>
                </li>
                <li
                  onClick={() => SetMenu("account")}
                  className="flex items-center mb-5 cursor-pointer hover:text-blue-100"
                >
                  <Image
                    src="/assets/i2.png"
                    alt="icon"
                    width={30}
                    height={30}
                  />

                  <span
                    className={`ml-3 ${Menu == "account" && "text-blue-100"}`}
                  >
                    Akun Penawaran
                  </span>
                </li>
                <Link href="/penawaran">
                  <li className="flex items-center mb-5 cursor-pointer hover:text-blue-100">
                    <Image
                      src="/assets/i3.png"
                      alt="icon"
                      width={30}
                      height={30}
                    />

                    <span
                      className={`ml-3 ${Menu == "cari" && "text-blue-100"}`}
                    >
                      Cari Penawaran
                    </span>
                  </li>
                </Link>
                <li
                  onClick={() => SetMenu("progres")}
                  className="flex items-center mb-5 cursor-pointer hover:text-blue-100"
                >
                  <Image
                    src="/assets/i1.png"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <span
                    className={`ml-3 ${Menu == "progres" && "text-blue-100"}`}
                  >
                    Kerja Sama
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-span-3 hover:text-blue-100">
              {Menu == "profil" && <DasboardProfile />}
              {Menu == "account" && <DasboardAccount />}
              {Menu == "progres" && <HistoryBid user={userData} />}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}

export default Dasboard;

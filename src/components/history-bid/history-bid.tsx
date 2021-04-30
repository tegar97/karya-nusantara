import { Router } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import convertToRupiah from "../../util/converRupiah";

function HistoryBid({ user }) {
  const [yourBid, setYourBid] = useState([]);
  const [loading, isLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    const loadYourBid = async () => {
      isLoading(true);
      const res = await axios
        .get(`${process.env.API_LARAVEL}/api/getMyBid/${user.ID}`, {
          withCredentials: false,
        })
        .then((res) => {
          setYourBid(res.data.data);
          isLoading(false);
        });
    };

    loadYourBid();
  }, []);
  return (
    <div>
      {!loading &&
        yourBid.map((data) => (
          <div className="w-full p-5 mb-5 border-2 border-blue-100 shadow-lg">
            <div className="flex mb-2 text-lg ">
              <span>Status</span>
              <span className="ml-20">:</span>
              <span className="ml-3 font-medium text-red-500">Berjalan</span>
            </div>

            <div className="flex mb-2 text-lg ">
              <span>Produk</span>
              <span style={{ marginLeft: "4.3rem" }}>:</span>
              <span className="ml-3 font-medium ">{data.product_name}</span>
            </div>
            <div className="flex mb-2 text-lg ">
              <span> Jumlah Produk</span>
              <span className="ml-2">:</span>
              <span className="ml-3 font-medium ">Cover All</span>
            </div>
            <div className="flex mb-2 text-lg ">
              <span>Harga/Piece</span>
              <span className="ml-8">:</span>
              <span className="ml-3 font-medium ">
                {convertToRupiah(data.price)}
              </span>
            </div>
            <div className="flex mb-2 text-lg ">
              <span>Tenggat Waktu</span>
              <span className="ml-2">:</span>
              <span className="ml-3 font-medium ">
                {data.created_at} - {data.deadlines}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default HistoryBid;

import { Button } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ComplateTheOrder } from "../../constant/api/transaction";
import DetailModal from "./detail-card";
import TrackModal from "./track-modal";
import Cookie from 'js-cookie'
import { toast } from "react-toastify";
import router from "next/router";
function TranasctionCard({ data }) {
  const [groupNameProduct, setGroupNameProduct] = useState("");

  useEffect(() => {
    const nameGroup = data.transaction_item.reduce((acc, value, index) => {
      if (index == 0) {
        return acc + value.product.name;
      } else {
        return acc + "," + value.product.name;
      }
    }, "");
    setGroupNameProduct(nameGroup);
  }, []);


  const complateTheOrder = async () => {
    const token = Cookie.get("token");
    const bearer = `Bearer ${token}`
    const ResponseData = {
      transaction_id : data.id
    }
    const confirm = window.confirm("Apakah paket telah anda terima  dan barang telah sesuai ? ");

    if (confirm) {
      const response = await ComplateTheOrder(ResponseData, bearer);
       if (response.error !== false) {
         toast.success("Transaksi berhasil");

         router.push("/member/order/completed");
       }
    } else {
    }

   
    
  }
  return (
    <div className="w-full bg-white shadow-md rounded-lg flex flex-row items-center px-2 py-5 justify-between  mb-5">
      <div className="flex flex-row items-center   ">
        <div>
          <img
            src={`${process.env.API_V2}/storage/images/product/${data.transaction_item[0].product.images[0].imageName}`}
            width="60"
          />
        </div>
        <div className="flex flex-col  ml-5  ">
          <div className="mb-1">
            <span className="font-semibold text-md">
              {groupNameProduct.length > 20
                ? groupNameProduct.substring(0, 20) + "....."
                : groupNameProduct}
            </span>
            <span className="text-blue-100 ml-1">{data.umkm.ukmName}</span>
          </div>
          <div>
            <span className="font-semibold text-md mb-1">{data.invoice}</span>
            <DetailModal data={data} />
          </div>

          <div className="flex flex-row">
            <span className="font-semibold">
              {moment(data.created_at).format("DD MMMM YY")}
            </span>
            <span className="ml-1">
              Total pembayaran{" "}
              <span className="text-gray-900">
                <NumberFormat
                  value={data.amount + data.shipping_amount}
                  prefix="Rp "
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col  ml-5 px-10 h-full py-2">
        {data.status == 2 ? (
          <div className="flex flex-col h-full ">
            <span>Status</span>

            <span style={{ color: "#f97316" }}>{data.status_str}</span>
          </div>
        ) : data.status == 3 ? (
          <div className="flex flex-col h-full ">
            {
              <div className="flex flex-col items-center">
                <span className="text-blue-100 cursor-pointer" onClick={complateTheOrder}>Selesaikan pesanan</span>
                <TrackModal
                  logistic_code={data.logistic_code}
                  resi={data.resi}
                  logistic_type={data.logistic_type}
                />
              </div>
            }
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TranasctionCard;

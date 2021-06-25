import React from "react";
import FormInput from "../input-container/input-container";
import { TextArea } from "../input-container/input-container.styles";

function OmsetPopup({ setOmset, setOmsetModal }) {
  const onClick = (value) => {
    setOmset(value);
    setOmsetModal(false);
  };
  return (
    <div
      className="absolute top-0 w-full px-2 py-2 bg-white border-2 border-blue-100 "
      style={{ zIndex: 2 }}
    >
      <div className="flex flex-col">
        <span className="font-bold text-blue-100 cursor-pointer">
          *Tidak Termasuk tanah dan bangunan tempat usaha
        </span>
        <span
          onClick={() => onClick("a")}
          className="cursor-pointer hover:text-blue-100"
        >
          Hasil Penjualan / Omset maksimal Rp.300.000.000 setahun
        </span>
        <span
          onClick={() => onClick("b")}
          className="cursor-pointer hover:text-blue-100"
        >
          Hasil Penjualan / Omset maksimal Rp.300.000.000 - Rp.2.500.000.000{" "}
        </span>
        <span
          onClick={() => onClick("c")}
          className="cursor-pointer hover:text-blue-100"
        >
          Hasil Penjualan / Omset maksimal Rp.2.500.000.000 - Rp.50.000.000.000{" "}
        </span>
      </div>
    </div>
  );
}

export default OmsetPopup;

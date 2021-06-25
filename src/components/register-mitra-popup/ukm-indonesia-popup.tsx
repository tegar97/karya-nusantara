import React, { useState } from "react";
import FormInput from "../input-container/input-container";
import { TextArea } from "../input-container/input-container.styles";

function UkmIndonesiaPopUp({
  setIsMemberUkmIndonesia,
  setIsMemberUkmModal,
  isMemberUkmIndonesia,
  setIsInterestedJoinUkm,
}) {
  const [isNotMemberUkm, setIsNotMemberUkm] = useState(true);
  const isMemberUkm = () => {
    setIsMemberUkmIndonesia(1);
    setIsInterestedJoinUkm(0);

    setIsMemberUkmModal(false);
  };
  const ifNotMemberUkm = () => {
    setIsMemberUkmIndonesia(false);
    setIsNotMemberUkm(false);
  };

  const interestedJoinUkmIndonesia = () => {
    setIsInterestedJoinUkm(1);
    setIsMemberUkmIndonesia(0);

    setIsMemberUkmModal(false);
  };
  return (
    <div
      className="absolute top-0 w-full px-2 py-2 bg-white border-2 border-blue-100 "
      style={{ zIndex: 2 }}
    >
      {isNotMemberUkm ? (
        <div>
          <span className="text-grey-300">Member UKM Indonesia ? </span>
          <div className="grid grid-cols-2 gap-5 mt-2 ">
            <button
              type="button"
              onClick={() => isMemberUkm()}
              className="text-blue-100 bg-white border-2 border-blue-100 text-blue-blue"
            >
              Ya
            </button>
            <button
              type="button"
              onClick={() => ifNotMemberUkm()}
              className="text-blue-100 bg-white border-2 border-blue-100 text-blue-blue"
            >
              Tidak
            </button>
          </div>
        </div>
      ) : (
        <div>
          <span className="text-grey-300">
            Apakah Berminat Bergabung Dengan UKM Indonesia ?{" "}
          </span>
          <div className="grid grid-cols-2 gap-5 mt-2 ">
            <button
              type="button"
              onClick={() => interestedJoinUkmIndonesia()}
              className="text-blue-100 bg-white border-2 border-blue-100 text-blue-blue"
            >
              Ya
            </button>
            <button
              onClick={() => setIsMemberUkmModal(false)}
              type="button"
              className="text-blue-100 bg-white border-2 border-blue-100 text-blue-blue"
            >
              Tidak
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UkmIndonesiaPopUp;

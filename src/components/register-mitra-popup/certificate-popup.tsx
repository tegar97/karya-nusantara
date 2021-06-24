import React from "react";
import FormInput from "../input-container/input-container";
import { TextArea } from "../input-container/input-container.styles";

function CertificatePopup(props: any) {
  return (
    <div
      className="absolute top-0 w-full px-2 py-2 bg-white border-2 border-blue-100 "
      style={{ zIndex: 2 }}
    >
      <div className="flex flex-col">
        <FormInput
          name="certificateName"
          value={props.certificateName}
          placeholder="Contoh : Sertifikat Halal"
          onChange={(e) => props.setCertificateName(e.target.value)}
        />
        <FormInput
          onChange={(e) => props.setCertificateId(e.target.value)}
          name="certificateId"
          placeholder="Nomer Sertifikat"
          value={props.certificateId}
        />
      </div>
      <button
        onClick={() => props.setCertificateModal(false)}
        type="button"
        className="px-2 py-2 text-white bg-blue-100 "
      >
        Simpan
      </button>
    </div>
  );
}

export default CertificatePopup;

import React, { useState } from "react";
import { Container } from "@material-ui/core";
import FormInput from "../components/input-container/input-container";
import SelectOptions from "../components/select-options/select-options.component";
import {
  Input,
  TextArea,
} from "../components/input-container/input-container.styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ProductPopUp from "../components/register-mitra-popup/product-popup";
import OmsetPopup from "../components/register-mitra-popup/omset-popup";
import MediaSocialPopup from "../components/register-mitra-popup/media-social-popup";
import UkmIndonesiaPopUp from "../components/register-mitra-popup/ukm-indonesia-popup";
import CertificatePopup from "../components/register-mitra-popup/certificate-popup";
import axios from "axios";
import router from "next/router";

function RegisterUkm() {
  const [formData, setFormData]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [omsetModal, setOmsetModal] = useState(false);
  const [omset, setOmset]: any = useState();
  const [mediaSocial, setMediaSocial] = useState(false);
  const [socialMediaName, setSocialMediaName] = useState();
  const [linkSocialMedia, setLinkSocialMedia] = useState();
  const [isMemberUkmIndonesiaModal, setIsMemberUkmModal] = useState(false);
  const [certificateModal, setCertificateModal] = useState(false);
  const [certificateName, setCertificateName] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [isMemberUkmIndonesia, setIsMemberUkmIndonesia]: any = useState(0);
  const [selectedFile, setSelectedFile] = useState();

  const [interestedJoinUkm, setIsInterestedJoinUkm]: any = useState(0);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      console.log();
      const res = await axios
        .post("/v1/users/UKM", {
          UkmName: formData.ukmName,
          OwnerName: formData.OwnerName,
          Email: formData.email,
          password: formData.password,
          BusinessSize: formData.BusinessSize,
          BusinessBirth: formData.BusinessBirth.toString(),
          BusinessAdress: formData.BusinessAdress,
          TurnoverYears: omset.toString(),
          CertficateName: certificateName.toString(),
          CertificateID: certificateId.toString(),
          city: formData.city,
          districts: formData.districts,
          village: formData.village,
          postCode: formData.postCode,
          employees: parseInt(formData.employees),
          PhoneNumber: formData.PhoneNumber,
          ProductName: formData.productName,
          Category: formData.category,
          CapacityProduct: formData.capacity_product,
          Description: formData.description,
          IsMemberUKMID: parseInt(isMemberUkmIndonesia),
          InterestedJoin: parseInt(interestedJoinUkm),
          BussinessSocialMedia: socialMediaName,
          BussinessSocialMediaLink: linkSocialMedia,
        })
        .then((res) => {
          setLoading(false);
          router.push("/success-ukm");
        });
    } catch (error) {}
  };
  return (
    <div
      style={{
        background: "url('/assets/bg-register2.jpg')",
        minHeight: "180vh",
        backgroundRepeat: "none",
      }}
      className="flex justify-center w-full bg-no-repeat bg-cover "
    >
      <Container
        maxWidth="xl"
        className="w-11/12 h-full px-5 py-5 mt-10 bg-white lg:mt-32 lg:w-1/2"
        style={{ boxShadow: "2px 2px #5996ab", borderRadius: "10px" }}
      >
        <div className="flex justify-center w-full ">
          <img
            width="200"
            height="200"
            className="object-cover "
            src="/assets/logo-nav-min.png"
          />
        </div>
        <form onSubmit={onSubmit} method="post">
          <FormInput
            name="email"
            id="email"
            type="email"
            placeholder="Email anda"
            value={formData.email}
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="password"
            id="password"
            placeholder="Password anda"
            type="password"
            value={formData.password}
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="ukmName"
            id="ukmName"
            placeholder="Nama Ukm"
            type="text"
            value={formData.ukmName}
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="OwnerName"
            id="ownerName"
            placeholder="Nama Pemilik"
            type="text"
            value={formData.OwnerName}
            onChange={(e) => onChange(e)}
            className=""
          />
          <SelectOptions
            name="BusinessSize"
            id="BusinessSize"
            onChange={(e) => onChange(e)}
            value={formData.BusinessSize}
          >
            <option className="text-grey-100 hover:text-blue-100">
              Bentuk Badan Usaha
            </option>
            <option value="a">Firma</option>
            <option value="b">Persekutuan</option>
            <option value="c">Koperasi Terbatas</option>
            <option value="d">Yayasan</option>
          </SelectOptions>
          <FormInput
            name="BusinessBirth"
            id="BusinessBirth"
            placeholder="Tahun Mulai Usaha "
            type="text"
            onChange={(e) => onChange(e)}
            value={formData.BusinessBirth}
            className=""
          />
          <FormInput
            name="PhoneNumber"
            id="PhoneNumber"
            placeholder="No Tlp Pemilik Ukm"
            type="text"
            value={formData.PhoneNumber}
            onChange={(e) => onChange(e)}
            className=""
          />
          <FormInput
            name="BusinessAdress"
            id="BusinessAdress"
            value={formData.BusinessAdress}
            placeholder="Alamat Lengkap Ukm"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <div className="grid grid-cols-3 gap-x-5">
            <FormInput
              name="city"
              id="city"
              placeholder="Kota"
              type="text"
              value={formData.city}
              onChange={(e) => onChange(e)}
              className=""
            />
            <FormInput
              name="districts"
              id="districts"
              placeholder="Kecamatan anda"
              type="text"
              value={formData.districts}
              onChange={(e) => onChange(e)}
              className=""
            />
            <FormInput
              name="village"
              id="village"
              value={formData.village}
              placeholder="Keluruhan"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
            <FormInput
              name="postCode"
              id="postCode"
              value={formData.postCode}
              placeholder="Postal Code"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
          </div>
          <div className="relative">
            <div className="relative flex items-center">
              <button
                onClick={() => setProductModal(true)}
                type="button"
                className="w-full text-left text-blue-100 border-2 outline-none "
                style={{
                  border: "1px solid #c2c2c2",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                Produk
              </button>
              <ArrowDropDownIcon
                fontSize="inherit"
                className="absolute text-3xl right-2"
              />
            </div>
            <div className="flex items-center mt-2 mb-5 cursor-pointer">
              <AddCircleOutlineIcon
                className="text-2xl text-grey-100"
                fontSize="inherit"
              />
              <span
                onClick={() => setProductModal(true)}
                className="ml-1 text-grey-100 text-md"
              >
                Tambahkan Produk
              </span>
            </div>
            {productModal && (
              <ProductPopUp
                setProductModal={setProductModal}
                onChange={onChange}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                formData={formData}
              />
            )}
          </div>
          <div className="relative">
            <div className="relative flex items-center">
              <button
                onClick={() => setCertificateModal(true)}
                type="button"
                className="w-full text-left text-blue-100 border-2 outline-none "
                style={{
                  border: "1px solid #c2c2c2",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                {certificateName ? certificateName : "Perizinan / Sertifikat"}
              </button>
              <ArrowDropDownIcon
                fontSize="inherit"
                className="absolute text-3xl right-2"
              />
            </div>
            <div className="flex items-center mt-2 mb-5 cursor-pointer">
              <AddCircleOutlineIcon
                className="text-2xl text-grey-100"
                fontSize="inherit"
              />
              <span
                onClick={() => setProductModal(true)}
                className="ml-1 text-grey-100 text-md"
              >
                Tambahkan Perizinan/Sertifikat
              </span>
            </div>
            {certificateModal && (
              <CertificatePopup
                certificateName={certificateName}
                setCertificateName={setCertificateName}
                setCertificateId={setCertificateId}
                certificateId={certificateId}
                setCertificateModal={setCertificateModal}
              />
            )}
          </div>
          <FormInput
            name="employees"
            id="employees"
            placeholder="Total Karyawan"
            type="number"
            onChange={(e) => onChange(e)}
            value={formData.employees}
            className=""
          />

          <div className="relative " style={{ marginBottom: "10px" }}>
            <div className="relative flex items-center">
              <button
                onClick={() => setOmsetModal(true)}
                type="button"
                className="w-full text-left text-blue-100 border-2 outline-none "
                style={{
                  border: "1px solid #c2c2c2",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                {omset == 1
                  ? " Hasil Penjualan / Omset maksimal Rp.300.000.000 setahun"
                  : omset == 2
                  ? "Hasil Penjualan / Omset maksimal Rp.300.000.000 - Rp.2.500.000.000"
                  : omset == 3
                  ? 'Hasil Penjualan / Omset maksimal Rp.2.500.000.000 - Rp.50.000.000.000{" "}'
                  : "Omset Tahunan"}
              </button>
              <ArrowDropDownIcon
                fontSize="inherit"
                className="absolute text-3xl right-2"
              />
            </div>

            {omsetModal && (
              <OmsetPopup setOmset={setOmset} setOmsetModal={setOmsetModal} />
            )}
          </div>
          <div className="relative" style={{ marginBottom: "10px" }}>
            <div className="relative flex items-center">
              <button
                onClick={() => setMediaSocial(true)}
                type="button"
                className="w-full text-left text-blue-100 border-2 outline-none "
                style={{
                  border: "1px solid #c2c2c2",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                {socialMediaName ? socialMediaName : "Media Social"}
              </button>
              <ArrowDropDownIcon
                fontSize="inherit"
                className="absolute text-3xl right-2"
              />
            </div>

            {mediaSocial && (
              <MediaSocialPopup
                setMediaSocial={setMediaSocial}
                socialMediaName={socialMediaName}
                setSocialMediaName={setSocialMediaName}
                setLinkSocialMedia={setLinkSocialMedia}
                linkSocialMedia={linkSocialMedia}
              />
            )}
          </div>

          <div className="relative">
            <div className="relative flex items-center">
              <button
                onClick={() => setIsMemberUkmModal(true)}
                type="button"
                className="w-full text-left text-blue-100 border-2 outline-none "
                style={{
                  border: "1px solid #c2c2c2",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                {isMemberUkmIndonesia
                  ? "Anda Member Ukm Indonesia"
                  : interestedJoinUkm
                  ? "Anda tertarik bergabung dengan ukm indonesia"
                  : "Member Ukm Indonesia"}
              </button>
              <ArrowDropDownIcon
                fontSize="inherit"
                className="absolute text-3xl right-2"
              />
            </div>

            {isMemberUkmIndonesiaModal && (
              <UkmIndonesiaPopUp
                setIsMemberUkmModal={setIsMemberUkmModal}
                setIsMemberUkmIndonesia={setIsMemberUkmIndonesia}
                isMemberUkmIndonesia={isMemberUkmIndonesia}
                setIsInterestedJoinUkm={setIsInterestedJoinUkm}
              />
            )}
          </div>

          <div className="flex flex-col items-center mt-2">
            <span>Ayo bergabung bersama ratusan mitra lainya</span>
            <button
              type="submit"
              className="p-1 px-10 mt-4 text-lg text-white bg-blue-100"
            >
              Daftar Sebagai Mitra
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default RegisterUkm;

import React from "react";
import Image from "next/image";
import ProductDetailImage from "../../components/product-detail-image/product-detail-image";
import OrderModal from "../../components/order-modal/Order-Modal.component";

function Slug() {
  var yourNumber = "";
  var yourMessage = "";

  const getLinkWhastapp = (number, message) => {
    number = yourNumber;
    message = yourMessage.split(" ").join("%20");

    return console.log(
      "https://api.whatsapp.com/send?phone=" + number + "&text=%20" + message
    );
  };
  return (
    <div style={{ backgroundColor: "#ffff", minHeight: "100vh" }}>
      <div className="h-full px-20 py-40">
        <div className="grid grid-cols-2 gap-5">
          <div className="grid grid-cols-4">
            <ProductDetailImage />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">
              AUQOZ 360 Omni Conference Mic / Microphone Rapat Belajar Online
              Daring{" "}
            </h1>
            <div className="mt-5">
              <span className="text-lg font-medium ">Bahan</span>
              <p className="mt-3">
                TERBARU dan TERMURAH: Professional Microphone untuk meeting yang
                dapat membantu Anda merekam atau berkomunikasi antar divisi
                secara online, jangkauan mic ini hingga 3m, hasil suara yang
                jernih dan stabil membuat rapat menjadi lebih mudah.
              </p>
            </div>
            <div className="flex items-center mt-5">
              <OrderModal />
              <span className="ml-3 text-sm cursor-pointer">
                Ajukan Penawaran
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slug;

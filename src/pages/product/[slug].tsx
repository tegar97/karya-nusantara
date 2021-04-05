import React from "react";
import Image from "next/image";
import ProductDetailImage from "../../components/product-detail-image/product-detail-image";
import OrderModal from "../../components/order-modal/Order-Modal.component";
import ProductDetailSpec from "../../product-detail-spec/product-detail-spec";

function Slug() {
  return (
    <div style={{ backgroundColor: "#ffff", minHeight: "100vh" }}>
      <div className="h-full px-20 py-40">
        <div className="grid grid-cols-2 gap-5">
          <div className="grid grid-cols-1">
            <ProductDetailImage />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">
              AUQOZ 360 Omni Conference Mic / Microphone Rapat Belajar Online
              Daring{" "}
            </h1>
            <div className="mt-5">
              <ProductDetailSpec />
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

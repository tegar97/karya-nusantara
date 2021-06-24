import React from "react";
import FormInput from "../input-container/input-container";
import { TextArea } from "../input-container/input-container.styles";

function ProductPopUp({ onChange }) {
  return (
    <div className="absolute top-0 bg-white border-2 border-blue-100 ">
      <div className="grid w-full grid-cols-3 gap-5 px-2 py-2 ">
        <div className="flex flex-col items-center justify-center border-2 border-blue-100">
          <input type="file" className="absolute w-full h-full opacity-0" />
          <span>Upload Foto</span>
          <span>Max 2mb</span>
        </div>

        <div className="col-span-2">
          <FormInput
            name="productName"
            id="productName"
            placeholder="Nama Produk"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
          />
          <div className="grid grid-cols-2 gap-5">
            <FormInput
              name="category"
              id="category"
              placeholder="Kategori"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
            <FormInput
              name="capacity_product"
              id="capacity_product"
              placeholder="Kapasitas Produk"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
            />
          </div>
          <TextArea
            name="description"
            className="w-full focus:border-2 focus:border-blue-100"
            placeholder="Deskripsi secara singkat produk anda (proses produksi,bahan baku,dll)"
            rows="5"
          ></TextArea>
        </div>
      </div>
    </div>
  );
}

export default ProductPopUp;

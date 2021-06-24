import React, { useEffect, useState } from "react";
import FormInput from "../input-container/input-container";
import { TextArea } from "../input-container/input-container.styles";

function ProductPopUp({
  onChange,
  setProductModal,
  selectedFile,
  setSelectedFile,
  formData,
}) {
  const [preview, setPreview]: any = useState();
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div
      style={{ zIndex: 2 }}
      className="top-0 bg-white border-2 border-blue-100 lg:absolute "
    >
      <div className="grid w-full grid-cols-1 gap-5 px-2 py-2 lg:grid-cols-3 ">
        <div className="relative flex flex-col items-center justify-center border-2 border-blue-100">
          <input
            onChange={onSelectFile}
            type="file"
            className="absolute w-full h-full opacity-0"
          />
          {selectedFile && (
            <img
              src={preview}
              className="object-cover h-64 w-52"
              width="215"
              height="266"
            />
          )}
          {selectedFile ? (
            ""
          ) : (
            <>
              <span>Upload Foto</span>
              <span>Max 2mb</span>
            </>
          )}
        </div>

        <div className="col-span-2">
          <FormInput
            name="productName"
            id="productName"
            placeholder="Nama Produk"
            type="text"
            onChange={(e) => onChange(e)}
            className=""
            value={formData.productName}
          />
          <div className="grid grid-cols-2 gap-5">
            <FormInput
              name="category"
              id="category"
              placeholder="Kategori"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
              value={formData.category}
            />
            <FormInput
              name="capacity_product"
              id="capacity_product"
              placeholder="Kapasitas Produk"
              type="text"
              onChange={(e) => onChange(e)}
              className=""
              value={formData.capacity_product}
            />
          </div>
          <TextArea
            name="description"
            className="w-full focus:border-2 focus:border-blue-100"
            placeholder="Deskripsi secara singkat produk anda (proses produksi,bahan baku,dll)"
            rows="5"
            onChange={(e) => onChange(e)}
            value={formData.description}
          ></TextArea>
          <div className="flex justify-end">
            <button
              onClick={() => setProductModal(false)}
              className="bottom-0 right-0 p-2 text-white bg-blue-100 "
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopUp;

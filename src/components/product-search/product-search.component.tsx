import React from "react";
import SearchIcon from "@material-ui/icons/Search";
function ProductSearch({ onSearch }) {
  return (
    <div className="relative flex">
      {/* <SearchIcon className="absolute bottom-4 left-2" /> */}
      <input
        placeholder="Cari Produk"
        className="w-full p-2 outline-none"
        onChange={(e) => onSearch(e)}
        style={{ border: "1px solid #5996ab" }}
      />
      <button
        type="submit"
        className="w-1/6 p-2 text-white bg-blue-100 shadow-md "
      >
        Cari
      </button>
    </div>
  );
}

export default ProductSearch;

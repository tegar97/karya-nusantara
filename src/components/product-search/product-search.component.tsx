import React from "react";
import SearchIcon from "@material-ui/icons/Search";
function ProductSearch({ onSearch }) {
  return (
    <div className="relative flex">
      {/* <SearchIcon className="absolute bottom-4 left-2" /> */}
      <input
        placeholder="Cari Produk"
        className="w-full p-2 shadow-md outline-none"
        onChange={(e) => onSearch(e)}
      />
      <button className="w-1/6 p-2 text-white bg-blue-100 shadow-md ">
        Cari
      </button>
    </div>
  );
}

export default ProductSearch;

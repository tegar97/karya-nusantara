import React from "react";

function Navbar() {
  return (
    <div className="flex ">
      <div>logo</div>
      <div>
        <ul>
          <li>Tentang Karya Nusantara </li>
          <li>Katalog Produk</li>
          <li>Request For Quotation </li>
          <li>Klien Kami</li>
          <li>UKM Mitra</li>
        </ul>
      </div>
      <div>
        <button>MASUK</button>
        <button>Daftar </button>
      </div>
    </div>
  );
}

export default Navbar;

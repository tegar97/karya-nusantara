import React from "react";
import TableBody from "./Table-body";

function Table({ data, setSuccessMessage }) {
  return (
    <table className="w-full overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap ">
      <thead className="bg-gray-50">
        <tr className="text-left text-gray-600 ">
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            Kategori
          </th>
          <th className="px-10 text-sm font-semibold text-blue-100 uppercase group-hover:py-4">
            Produk
          </th>
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            Batas Waktu
          </th>
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            Kisaran Harga
          </th>
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            Spefikasi
          </th>
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            Ajukan Penawaran
          </th>
          {/* <th className="px-10 py-4 text-sm font-semibold text-center uppercase">
      status
    </th> */}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((data) => (
          <TableBody data={data} setSuccessMessage={setSuccessMessage} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

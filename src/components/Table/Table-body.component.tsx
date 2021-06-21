import React from "react";
import { TableRow } from "./Table.styled";

function TableBody({ data, deleteProduct, i }) {
  return (
    <TableRow key={data.ID} className="group">
      <td className="relative px-10 py-4">
        {" "}
        <span className="absolute text-blue-100 opacity-0 left-2 group-hover:opacity-100">
          X
        </span>
        {i + 1}
      </td>
      <td className="px-6 py-4">
        <p className="">tes</p>
      </td>
      <td className="px-6 py-4">
        <p className="">4214</p>
      </td>
      <td className="px-6 py-4 text-center">12412</td>
      {/* <td className="px-6 py-4 text-center">
    <span className="px-2 font-semibold text-green-800 bg-green-200 rounded-full">
      Menunggu
    </span>
  </td> */}
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => deleteProduct(data.id)}
          className="px-3 py-2 ml-3 text-white bg-red-400"
        >
          Hapus
        </button>
      </td>
    </TableRow>
  );
}

export default TableBody;

import React from "react";
import TableDeleteModal from "./Table-delete.modal";
import { TableRow } from "./Table.styled";
import moment from "moment";
import numberWithCommas from "../../util/numberWithComa";

function TableBody({ data, deleteProduct, i }) {
  return (
    <TableRow key={data.id} className="group">
      <td className="relative px-10 py-4">
        {" "}
        <TableDeleteModal id={data.id} deleteProduct={deleteProduct} />
        {i + 1}
      </td>
      <td className="px-6 py-4">
        <p className="">{data.product_name}</p>
      </td>
      <td className="px-6 py-4">
        <p className="">{moment(data.created_at).format("DD/MM/YYYY")}</p>
      </td>
      <td className="px-6 py-4 ">{numberWithCommas(data.capacity_product)}</td>
      {/* <td className="px-6 py-4 text-center">
    <span className="px-2 font-semibold text-green-800 bg-green-200 rounded-full">
      Menunggu
    </span>
  </td> */}
      <td className="px-6 py-4 text-center">
        {data.status == 2 ? (
          <span className="px-3 py-2 ml-3 text-white bg-red-400">Batal</span>
        ) : data.status == 1 ? (
          <span className="px-3 py-2 ml-3 text-white bg-green-400">
            Selesai
          </span>
        ) : (
          <span className="px-3 py-2 ml-3 text-white bg-blue-100">Proses</span>
        )}
      </td>
    </TableRow>
  );
}

export default TableBody;

import React, { useState } from "react";
import { TableRow } from "./Table.styled";
import moment from "moment";
import numberWithCommas from "../../util/numberWithComa";
import convertToRupiah from "../../util/converRupiah";
import AddBid from "../bid-modal/bid-modal";
import DetailProduct from "../detail-product-bid/detail-product-bid";
function TableBody({ data, setSuccessMessage }) {
  return (
    <TableRow key="1" className="group">
      <td className="px-6 py-4">
        <p className="capitalize">{data.productCategory}</p>
      </td>
      <td className="px-6 py-4">
        <p className="capitalize">{data.productName}</p>
      </td>
      <td className="px-6 py-4">
        <p className="capitalize">
          {moment(data.deadline).format("DD/MM/YYYY")}
        </p>
      </td>
      <td className="px-6 py-4 ">
        {" "}
        <p>
          {convertToRupiah(data.low_price)} s/d{" "}
          {convertToRupiah(data.high_Price)}
        </p>
      </td>

      <td className="px-6 py-4 ">
        <DetailProduct data={data} />
      </td>
      <td className="px-6 py-4 ">
        <AddBid data={data} setSuccessMessage={setSuccessMessage} />
      </td>
    </TableRow>
  );
}

export default TableBody;

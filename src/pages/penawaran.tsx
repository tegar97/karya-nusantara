import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddBid from "../components/bid-modal/bid-modal";
import DetailProduct from "../components/detail-product-bid/detail-product-bid";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function converToRupiah(angka) {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp. " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_GOLANG}/api/v1/product`);
  const products = await res.json();

  return {
    props: { products }, // will be passed to the page component as props
  };
}

function Penawaran({ products }) {
  return (
    <div className="px-16 py-20">
      <div className="flex px-4 mt-10">
        <div className="w-full overflow-x-auto overflow-y-auto">
          <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="px-6 py-4 text-sm font-semibold uppercase">#</th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Name Barang
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Kebutuhan Barang
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">
                  Kisarahan Harga
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-center uppercase">
                  status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-center uppercase">
                  Aksi
                </th>

                <th className="px-6 py-4 text-sm font-semibold uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products &&
                products.data.map((p) => (
                  <tr>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">
                      <p className="">{p.ProductName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="">{p.CapacityProduct}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {converToRupiah(p.Price)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 font-semibold text-green-800 bg-green-200 rounded-full">
                        Ready
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <DetailProduct product={p} />

                      <AddBid id={p.ID} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Penawaran;

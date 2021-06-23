import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import TableBody from "./Table-body.component";
import Pagination from "../../components/pagination/pagination.component";

function Table({
  yourProduct,
  setYourProduct,
  page,
  setLasPage,
  setTotalData,
}) {
  const [loading, isLoading] = useState(true);
  const { authenticated, loading: userLoad, user } = useAuthState();

  useEffect(() => {
    isLoading(true);

    const loadYourProduct = async () => {
      try {
        if (!userLoad) {
          await axios
            .get(
              `${process.env.API_LARAVEL}/api/rfq/${user.ID}/?page=${page}`,
              {
                withCredentials: false,
              }
            )
            .then((res) => {
              setTotalData(res.data.data.total);
              setLasPage(res.data.data.last_page);
              setYourProduct(res.data.data.data);
            })
            .catch((error) => console.log(error));
        }
      } catch (error) {
        setYourProduct(false);
      }
    };
    loadYourProduct();

    isLoading(false);
  }, [user, userLoad, page]);

  console.log(yourProduct);

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

  const deleteProduct = async (id) => {
    console.log(id);
    setYourProduct(yourProduct.filter((product) => product.id !== id));
    await axios.delete(`${process.env.API_LARAVEL}/api/rfq/${id}`, {
      withCredentials: false,
    });
  };
  return (
    <table className="w-full overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap ">
      <thead className="bg-gray-50">
        <tr className="text-left text-gray-600 ">
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            No
          </th>
          <th className="px-10 text-sm font-semibold text-blue-100 uppercase group-hover:py-4">
            Name Barang
          </th>
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            Tanggal Pengajuan
          </th>
          <th className="px-10 py-4 text-sm font-semibold text-blue-100 uppercase">
            Jumlah
          </th>
          {/* <th className="px-10 py-4 text-sm font-semibold text-center uppercase">
      status
    </th> */}
          <th className="px-10 py-4 text-sm font-semibold text-center text-blue-100 uppercase">
            Status Pesanan
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {!authenticated && <span>Tidak Ada Data</span>}
        {loading
          ? "Loading ...."
          : !userLoad &&
            authenticated &&
            yourProduct.map((data, i) => (
              <TableBody deleteProduct={deleteProduct} data={data} i={i} />
            ))}
      </tbody>
    </table>
  );
}

export default Table;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "../../context/auth";
import TableBody from "./Table-body.component";

function Table({ yourProduct, setYourProduct }) {
  const [loading, isLoading] = useState(true);
  const { authenticated, loading: userLoad, user } = useAuthState();

  useEffect(() => {
    isLoading(true);

    const loadYourProduct = async () => {
      try {
        if (!userLoad) {
          await axios
            .get(`${process.env.API_LARAVEL}/api/getMyRfq/${user.ID}`, {
              withCredentials: false,
            })
            .then((res) => {
              setYourProduct(res.data.data);
            })
            .catch((error) => console.log(error));
        }
      } catch (error) {
        setYourProduct(false);
      }
    };
    loadYourProduct();

    isLoading(false);
  }, [user, userLoad]);

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
    setYourProduct(yourProduct.filter((product) => product.id !== id));
    await axios.delete(`/v1/product/${id}`);
  };
  return (
    <table className="w-full overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap ">
      <thead className="bg-gray-50">
        <tr className="text-left text-gray-600 ">
          <th className="px-10 py-4 text-sm font-semibold uppercase">No</th>
          <th className="px-10 py-4 text-sm font-semibold uppercase">
            Name Barang
          </th>
          <th className="px-10 py-4 text-sm font-semibold uppercase">
            Kebutuhan Barang
          </th>
          <th className="px-10 py-4 text-sm font-semibold uppercase">
            Kisarahan Harga
          </th>
          {/* <th className="px-10 py-4 text-sm font-semibold text-center uppercase">
      status
    </th> */}
          <th className="px-10 py-4 text-sm font-semibold text-center uppercase">
            Status Pesanan
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {/* {loading ? (
          "Loading ...."
        ) : !yourProduct ? (
          <h1>Tidak Ada Product</h1>
        ) : (
          yourProduct.map((data, i) => (
            <TableBody deleteProduct={deleteProduct} data={data} i={i} />
          ))
        )} */}

        <TableBody deleteProduct={deleteProduct} data={""} i={1} />
        <TableBody deleteProduct={deleteProduct} data={""} i={1} />
      </tbody>
    </table>
  );
}

export default Table;

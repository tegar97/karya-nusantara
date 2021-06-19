import { Container } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddProduct from "../components/add-product/add-product.component";
import RfqTable from "../components/rfq-table/rfq-table";
import EditIcon from "@material-ui/icons/Edit";
import { useAuthState } from "../context/auth";
import { error } from "node:console";
import { NextSeo } from "next-seo";
import Head from "next/head";

// export async function getStaticProps() {
//   const res = await fetch(`http://127.0.0.1:5000/api/v1/me/request/product`);
//   const data = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       product: data,
//     }, // will be passed to the page component as props
//   };
// }
function Bidding({ product }) {
  const [yourProduct, setYourProduct]: any = useState([]);
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
    <>
      <NextSeo
        title="Request Product  "
        description="Request Product dengan harga yang pass"
        canonical="karyanusantara.co.id"
        openGraph={{
          url: "karyanusantara.co.id",
          title: "Request Product",
          description: "Request Product dengan harga yang pass",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "Request Karya Nusantara",
        }}
      />
      <div
        className="py-28 lg:px-14"
        style={{ backgroundColor: "#f5f5f5f5", minHeight: "100vh" }}
      >
        <Container maxWidth="lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-100">
              Ajukan Penawaran Harga
            </h1>
          </div>

          <div className="w-full p-5 mt-20 bg-white">
            <AddProduct
              setYourProduct={setYourProduct}
              yourProduct={yourProduct}
            />
            <div className="block mt-5">
              <span>Riwayat Pengajuan Penawaran Anda</span>

              {/* <table className="p-2 mt-5">
              <th>
                <td className="font-medium">Nama Barang</td>
                <td className="font-medium">Harga</td>
                <td className="font-medium"></td>
              </th>
            </table> */}

              <div className="flex px-4 mt-10">
                <div className="w-full overflow-x-auto overflow-y-auto">
                  <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-gray-600">
                        <th className="px-6 py-4 text-sm font-semibold uppercase">
                          #
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold uppercase">
                          Name Barang
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold uppercase">
                          Kebutuhan Barang
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold uppercase">
                          Kisarahan Harga
                        </th>
                        {/* <th className="px-6 py-4 text-sm font-semibold text-center uppercase">
                        status
                      </th> */}
                        <th className="px-6 py-4 text-sm font-semibold text-center uppercase">
                          Aksi
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold uppercase"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        "Loading ...."
                      ) : !yourProduct ? (
                        <h1>Tidak Ada Product</h1>
                      ) : (
                        yourProduct.map((data, i) => (
                          <tr key={data.ID}>
                            <td className="px-6 py-4">{i + 1}</td>
                            <td className="px-6 py-4">
                              <p className="">{data.product_name}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="">{data.capacity_product}</p>
                            </td>
                            <td className="px-6 py-4 text-center">
                              {data.Price}
                            </td>
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
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Bidding;

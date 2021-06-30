import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DetailProduct from "../components/detail-product-bid/detail-product-bid";
import Pagination from "../components/pagination/pagination.component";
import Table from "../components/penawaran-table/Table";
import { Container } from "@material-ui/core";
import { NextSeo } from "next-seo";

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

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_LARAVEL}/api/offer_ukm`);
  const products = await res.json();

  return {
    props: { products }, // will be passed to the page component as props
  };
}

function Penawaran({ products }) {
  const [page, setPage] = useState();
  const [successMessage, setSuccessMessage] = useState(false);

  return (
    <>
      <NextSeo
        title="Penawaran kerjasama ke Ukm  "
        description="Penawaran kerjasama  ke ukm"
        canonical="karyanusantara.co.id"
        openGraph={{
          url: "karyanusantara.co.id",
          title: "Penawaran kerjasama ke Ukm",
          description: "Penawaran  kerjasama ke ukm",
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
            <h1 className="text-3xl font-bold text-black">Penawaran</h1>
          </div>

          <div
            className="w-full py-5 mt-20 bg-white border-2 border-blue-100"
            style={{ boxShadow: "1.5px 1.5px rgb(89, 150, 171,.8)" }}
          >
            <div className="block mt-5">
              {/* <table className="p-2 mt-5">
          <th>
            <td className="font-medium">Nama Barang</td>
            <td className="font-medium">Harga</td>
            <td className="font-medium"></td>
          </th>
        </table> */}

              <div className="flex flex-col mb-5 ">
                {successMessage && (
                  <span className="block mb-5 -mt-10 text-center text-white bg-green-500">
                    Pengajuan penawaran berhasil
                  </span>
                )}

                <div className="w-full overflow-x-auto overflow-y-auto ">
                  <Table
                    setSuccessMessage={setSuccessMessage}
                    data={products.data.data}
                  />
                  {products.data.data.length > 5 && (
                    <div className="flex flex-row items-center justify-between w-full px-5 mt-5">
                      <div>
                        <span>
                          Showing 1 to {products.data.data.length} of data
                        </span>
                      </div>
                      <div>
                        <Pagination
                          page={page}
                          setPage={setPage}
                          totalPages={products.data.last_page}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Penawaran;

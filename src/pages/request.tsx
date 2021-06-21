import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AddProduct from "../components/add-product/add-product.component";
import RfqTable from "../components/rfq-table/rfq-table";
import EditIcon from "@material-ui/icons/Edit";
import { useAuthState } from "../context/auth";
import { error } from "node:console";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Table from "../components/Table/Table.component";

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
            <h1 className="text-3xl font-bold text-black">Ajukan Penawaran</h1>
          </div>

          <div
            className="w-full py-5 mt-20 bg-white border-2 border-blue-100"
            style={{ boxShadow: "1.5px 1.5px rgb(89, 150, 171,.8)" }}
          >
            <div className="px-5">
              <AddProduct
                setYourProduct={setYourProduct}
                yourProduct={yourProduct}
              />
            </div>
            <div className="block mt-5">
              {/* <table className="p-2 mt-5">
              <th>
                <td className="font-medium">Nama Barang</td>
                <td className="font-medium">Harga</td>
                <td className="font-medium"></td>
              </th>
            </table> */}

              <div className="flex mt-10 ">
                <div className="w-full overflow-x-auto overflow-y-auto ">
                  <Table
                    yourProduct={yourProduct}
                    setYourProduct={setYourProduct}
                  />
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

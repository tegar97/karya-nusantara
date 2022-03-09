import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import moment from "moment";

import Pagination from "../components/pagination/pagination.component";
import { Thumbnail } from "../components/Mitra/mitraPage.styles";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Head from "next/head";
import MitraCardComponent from "../components/Mitra/Mitra-card.componen";

const fetcher = (
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
): any => fetch(...args).then((res) => res.json());

function Mitra() {
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(
    `${process.env.API_LARAVEL}/api/mitras/?page=${page}`,
    fetcher
  );

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="ukmindonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title="Mitra Karya Nusantara"
        description="Kumpulan Cerita Sukses Mitra Karya Nusantara"
        canonical="karyanusantara.co.id/mitra"
        openGraph={{
          url: "karyanusantara.co.id/mitra",
          title: "Mitra Karya Nusantara",
          description: "Kumpulan Cerita Sukses Mitra Karya Nusantara",
          images: [
            {
              url: "/favicon.ico",
              width: 800,
              height: 600,
              alt: "Logo Karya Nusantara",
            },
          ],
          site_name: "Mitra Karya Nusantara",
        }}
      />
      <div className="h-full px-10 py-20 lg:px-28 lg:py-40 container-box">
        <h1 className="text-lg font-bold text-center lg:text-3xl text-grey-100">
          Kumpulan Kisah Inspiratif dari para mitra Karya Nusantara{" "}
        </h1>
        <div className="mt-10">
          {!data ? (
            <SkeletonTheme color="#fffff" highlightColor="#ffff">
              <p>
                <Skeleton count={3} />
              </p>
            </SkeletonTheme>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {data.data.data.map((m) => (
                <MitraCardComponent data={m} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-5">
          {data && data.data.data > 8 && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data && data.data.last_page}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Mitra;

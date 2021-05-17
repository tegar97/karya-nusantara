import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import moment from "moment";

import Pagination from "../components/pagination/pagination.component";
import { Thumbnail } from "../components/Mitra/mitraPage.styles";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Head from "next/head";
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
      <div className="h-full px-10 py-20 lg:px-40 lg:py-40">
        <h1 className="text-xl text-blue-100">Kisah Sukses Mitra Kami</h1>
        <div className="mt-10">
          {!data ? (
            <SkeletonTheme color="#fffff" highlightColor="#ffff">
              <p>
                <Skeleton count={3} />
              </p>
            </SkeletonTheme>
          ) : (
            data.data.data.map((m) => (
              <Link href={`/mitra/${m.slug}`}>
                <div
                  key={m.id}
                  className="flex flex-col mb-10 cursor-pointer lg:flex-row hover:translate-y-10"
                >
                  <div className="lg:w-1/6">
                    <Thumbnail
                      src={`${process.env.API_LARAVEL}/storage/${m.thumbnail}`}
                      alt={`cerita dari ${m.name}`}
                    />
                  </div>
                  <div className="flex flex-col w-full mt-5 lg:mt-0 lg:ml-5">
                    <h2 className="text-xl text-blue-100">{m.title}</h2>
                    <span className="mt-2 mb-2 text-gray-800 text-md">
                      {moment(m.created_at).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                    <div>{m.text_highlight.substring(0, 300) + "....."}</div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="mt-5">
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data && data.data.last_page}
          />
        </div>
      </div>
    </>
  );
}

export default Mitra;

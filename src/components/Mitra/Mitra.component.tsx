import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
): any => fetch(...args).then((res) => res.json());
function OurMitra() {
  const { data, error } = useSWR(
    `${process.env.API_LARAVEL}/api/mitra/`,
    fetcher
  );
  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <>
      <Carousel>
        {!data ? (
          <div>Loading .....</div>
        ) : (
          data.data.map((data) => (
            <div
              key={data.id}
              className="w-full px-5 py-20 pt-10 pb-20 bg-blue-100 lg:px-20 lg:pt-10 lg:pb-24 "
            >
              <h3 className="text-3xl font-medium text-white mb-15 ">
                Cerita Dari Mitra Karya Nusantara
              </h3>
              <div className="grid w-full grid-cols-1 mt-10 lg:grid-cols-4 justify-items-center">
                <div>
                  <img
                    style={{
                      width: "230px",
                      height: "230px",
                      borderRadius: "100%",
                    }}
                    alt={`mitra ${data.name}`}
                    src={`${process.env.API_LARAVEL}/storage/${data.photoMitra}`}
                  />
                </div>
                <div className="w-full p-2 mt-10 text-left lg:ml-20 lg:col-span-3">
                  <div className="h-20 border-b border-white-100">
                    <span className="text-4xl font-bold text-white">
                      {data.name}
                    </span>
                    <div className="mt-2">
                      <span className="mt-5 text-xl text-white">
                        Mitra Karya Nusantara
                      </span>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div
                      className="text-white "
                      dangerouslySetInnerHTML={createMarkup(
                        data.text_highlight.substr(0, 300) + "....."
                      )}
                    ></div>
                    <Link href={`/mitra/${data.slug}`}>
                      <button className="p-2 mt-5 text-left text-white bg-blue-100">
                        Baca selengkapnya cerita dari {data.name}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Carousel>
    </>
  );
}

export default OurMitra;

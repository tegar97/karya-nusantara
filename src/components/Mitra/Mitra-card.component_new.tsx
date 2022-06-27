import Link from 'next/link';
import React from 'react'

function MitraCardNew({data}) {
    return (
      <Link href={`/mitra/${data.slug}`}>
        <div className="flex flex-col border border-gray-300 p-0 rounded-md shadow-sm">
          <img
            src={`${process.env.API_LARAVEL}/storage/${data.photoMitra}`}
            alt={data?.name}
            className="object-cover w-full"
            height={80}
          />
          <div className="py-2 px-2">
            <h4 className="text-md text-blue-100 font-semibold">
              {data?.title}
            </h4>
            <p
              className="text-sm mt-3 mb-6 text-left"
              dangerouslySetInnerHTML={{
                __html: data?.description.slice(0, 150),
              }}
            ></p>
            <p className="text-blue-100 mt-3 justify-start flex items-end justify-items-end">
              Baca selengkapnya
            </p>
          </div>
        </div>
      </Link>
    );
}

export default MitraCardNew
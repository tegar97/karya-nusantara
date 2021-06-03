import Image from "next/image";
import React from "react";
import { ImageArticle } from "../../components/Mitra/mitraPage.styles";
import moment from "moment";
import { NextSeo } from "next-seo";
import Head from "next/head";
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.API_LARAVEL}/api/mitra/`);
  const mitra = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = mitra.data.map((mitra) => ({
    params: { slug: mitra.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${process.env.API_LARAVEL}/api/mitra/${params.slug}`
  );
  const mitra = await res.json();

  // Pass post data to the page via props
  return { props: { mitra }, revalidate: 10 };
}
function Slug({ mitra }) {
  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title={mitra.data[0].title}
        description={mitra.data[0].text_highlight}
        canonical={"karyanusantara.co.id/mitra/" + mitra.data[0].title}
        openGraph={{
          url: `karyanusantara.co.id/mitra/${mitra.data[0].slug}`,
          title: `${mitra.data[0].title}`,
          description: `${mitra.data[0].text_highlight}`,
          images: [
            {
              url: `${process.env.API_LARAVEL}/storage/${mitra.data[0].thumbnail}`,
              width: 800,
              height: 600,
              alt: `photo dari cerita ${mitra.data[0].name} `,
            },
          ],
          site_name: `${mitra.data[0].title}`,
        }}
      />
      <div className="h-full px-10 py-20 lg:px-40 lg:py-40 ds">
        <div className="">
          <div>
            <h1 className="text-lg lg:text-3xl">{mitra.data[0].title}</h1>
            <div className="mt-5">
              <span className="text-gray-800 ">
                {moment(mitra.data[0].created_at).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </span>
            </div>
          </div>
          <div className="mt-10">
            <ImageArticle
              src={`${process.env.API_LARAVEL}/storage/${mitra.data[0].thumbnail}`}
              alt={`photo dari cerita ${mitra.data[0].name} `}
            />
            <div
              className="mt-10"
              dangerouslySetInnerHTML={createMarkup(mitra.data[0].description)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slug;

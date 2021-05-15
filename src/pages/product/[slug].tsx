import React from "react";
import Image from "next/image";
import ProductDetailImage from "../../components/product-detail-image/product-detail-image";
import OrderModal from "../../components/order-modal/Order-Modal.component";
import ProductDetailSpec from "../../product-detail-spec/product-detail-spec";
import convertToRupiah from "../../util/converRupiah";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Head from "next/head";
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.API_LARAVEL}/api/product`);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.data.product.data.map((post) => ({
    params: { slug: post.slug },
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
    `${process.env.API_LARAVEL}/api/productd/${params.slug}`
  );
  const product = await res.json();

  // Pass post data to the page via props
  return { props: { product }, revalidate: 1 };
}
function Slug({ product }) {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm"
        />
      </Head>
      <NextSeo
        title={product.data[0].name}
        description={product.data[0].description}
        canonical={"karyanusantara.co.id/" + `${product.data[0].slug}`}
        openGraph={{
          url: `karyanusantara.co.id/${product.data[0].slug}`,
          title: `${product.data[0].name}`,
          description: `${product.data[0].description}`,
          images: [
            {
              url: `${process.env.API_LARAVEL}/storage/${
                product.data[0].images.split(",")[0]
              }`,
              width: 800,
              height: 600,
              alt: `Gambar ${product.data[0].name}`,
            },
          ],
          site_name: `${product.data[0].name}`,
        }}
      />
      <div style={{ backgroundColor: "#ffff", minHeight: "100vh" }}>
        <div className="h-full px-0 py-0 lg:px-20 lg:py-40">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="grid grid-cols-1">
              <ProductDetailImage product={product} />
            </div>
            <div className="px-5 lg:px-0">
              <h1 className="mt-5 text-3xl font-semibold lg:mt-0">
                {product.data[0].name}
              </h1>
              <div className="mt-5">
                <ProductDetailSpec product={product} />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 grid items-center justify-center w-full grid-cols-2 p-5 bg-white border-2 border-gray-200 shadow-2xl rounded-t-2xl lg:hidden ">
          <Link href="request">
            <button className="p-3 mr-5 text-white bg-yellow-600 rounded-lg ">
              Ajukan Penawaran
            </button>
          </Link>

          <OrderModal product={product} />
        </div>
        <div className="fixed bottom-0 items-center justify-between hidden w-full h-20 px-20 py-10 bg-white border-2 border-gray-200 rounded-t-lg shadow-2xl lg:flex justify-items-center">
          <div>
            <h2 className="mt-5 text-xl font-semibold text-blue-100 lg:mt-0">
              {product.data[0].name}
            </h2>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col mr-10">
              <span className="font-medium text-blue-100 text-md"></span>
            </div>
            <Link href="request">
              <button className="p-3 mr-5 text-white bg-yellow-600 rounded-lg ">
                Ajukan Penawaran
              </button>
            </Link>

            <OrderModal product={product} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slug;

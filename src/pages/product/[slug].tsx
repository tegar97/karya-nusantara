import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductDetailImage from "../../components/product-detail-image/product-detail-image";
import OrderModal from "../../components/order-modal/Order-Modal.component";
import ProductDetailSpec from "../../product-detail-spec/product-detail-spec";
import convertToRupiah from "../../util/converRupiah";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Head from "next/head";
import BorderBottom from "../../components/border-bottom/border-bottom";
import KatalogItems from "../../components/katalog-items/katalog-items";
import { useRouter } from "next/router";

import axios from "axios";
import FormInput from "../../components/input-container/input-container";
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
  return { paths, fallback: true };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${process.env.API_LARAVEL}/api/productd/${params.slug}`
  );
  const resReccomend = await fetch(
    `${process.env.API_LARAVEL}/api/productGetSameCategory/${params.slug}`
  );
  const product = await res.json();
  const productReccomend = await resReccomend.json();

  // Pass post data to the page via props
  return { props: { product, productReccomend }, revalidate: 1 };
}

function Slug({ product, productReccomend }) {
  const router = useRouter();
  const [productRecommend, setProductRecommend]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { slug } = router.query;

  const orderViaWhatsApp = () => {
    const number = "+6281281712428";
    if (!quantity && !description) {
      return setError("Form Wajib di isi");
    }
    const message = `Halo Admin , saya mau membeli ${product.data[0].name}  dengan jumlah ${quantity} dengan keterangan ${description}  `;
    const url =
      "https://api.whatsapp.com/send?phone=" + number + "&text=%20" + message;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    setError("");
    return newWindow;
  };
  // useEffect(() => {
  //   const getRecommendProduct = async () => {
  //     setIsLoading(true);
  //     await axios
  //       .get(`${process.env.API_LARAVEL}/api/productGetSameCategory/${slug}`, {
  //         withCredentials: false,
  //       })
  //       .then((res) => {
  //         // setProductRecommend(res.data);
  //         setIsLoading(false);
  //         setProductRecommend(res.data.data);
  //       });
  //   };

  //   getRecommendProduct();
  // }, []);
  if (!product) return <div>Loading ..</div>;

  console.log(productReccomend);
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={`Jual ${product.data[0].name}, ${product.data[0].name},ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm`}
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
        <div className="h-full px-0 py-0 lg:px-24 lg:p-32 ">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className="grid grid-cols-1 col-span-2">
              <ProductDetailImage product={product} />
            </div>
            <div className="col-span-2 px-5 lg:px-0">
              <h1 className="mt-5 text-3xl font-semibold lg:mt-0">
                {product.data[0].name}
              </h1>
              <h2 className="text-lg text-grey-100">
                {convertToRupiah(product.data[0].low_price)} - s/d &nbsp;
                {convertToRupiah(product.data[0].high_price)}
              </h2>
              <div className="mt-5 ">
                <ProductDetailSpec product={product} />
              </div>
            </div>
            <div className="sticky items-center justify-center hidden p-2 bg-white shadow-lg top-24 lg:flex h-60 lg:flex-col">
              <span className="text-lg font-bold text-blue-100">
                Ajukan Penawaran
              </span>
              <form className="mt-2" onSubmit={orderViaWhatsApp}>
                <div>
                  <label htmlFor="quantity" className="text-sm">
                    Kuantitas
                  </label>
                  <input
                    id="quantity"
                    placeholder="1"
                    type="number"
                    className="p-1 mb-2 focus:border-2 focus:border-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-100 "
                    style={{ border: "1px solid rgba(0,0,0,.4)" }}
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="text-sm">
                    Keterangan
                  </label>
                  <input
                    id="quantity"
                    placeholder="Warna , Ukuran , dll"
                    type="text"
                    className="p-1 mb-2 focus:border-2 focus:border-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-100 "
                    style={{ border: "1px solid rgba(0,0,0,.4)" }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className="flex flex-col items-center justify-center mt-3 mb-3">
                  <Link href="request ">
                    <button
                      type="button"
                      className="px-5 py-1 mb-1 text-sm text-white bg-blue-100 "
                    >
                      Ajukan Penawran
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm text-white"
                    style={{ backgroundColor: "#a4cc3e" }}
                  >
                    Order Via Whatsapp
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="px-5 mt-5 lg:px-0">
            <div className="w-full">
              <span className="text-lg font-bold ">
                Produk lain dari {productReccomend.categoryName.name}
              </span>
              <BorderBottom />
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5 lg:grid-cols-4">
              {productReccomend.data.map((data, i) => (
                <KatalogItems key={i} data={data} />
              ))}
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
        {/* <div className="fixed bottom-0 items-center justify-between hidden w-full h-20 px-20 py-10 bg-white border-2 border-gray-200 rounded-t-lg shadow-2xl lg:flex justify-items-center">
          <div>
            <h2 className="mt-5 text-xl font-semibold text-blue-100 lg:mt-0">
              {product.data[0].name}
            </h2>
          </div>
          <div className="flex flex-row items-center justify-items-center">
            <div className="flex flex-col mr-10 ">
              <span className="text-lg font-medium text-blue-100">
                {convertToRupiah(product.data[0].low_price)} -
                {convertToRupiah(product.data[0].high_price)}
              </span>
            </div>
            <Link href="/request">
              <button className="p-3 mr-5 text-white bg-yellow-600 rounded-lg ">
                Ajukan Penawaran
              </button>
            </Link>

            <OrderModal product={product} />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Slug;

import BreadCrumbs from "../../../components/atom/breadcrumbs/breadcrumbs";
import CostumeButton from "../../../components/atom/button/button";
import DetailProductColumn from "../../../components/atom/details-product-column/detail-product-column";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from "next-share";
import MarketInfoCard from "../../../components/market-info-card/market-info-card";
import Reviews from "../../../components/Reviews/reviews";
import SuccessCartModal from "../../../components/sucess-cart/succes-cart-moda";
import ModalQuantityModal from "../../../components/modal-quantity/modal-quantity";
import ModalQuantityMobileModal from "../../../components/modal-quantity/modal-quantity-mobile";

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(`${process.env.API_V2}/api/umkm/product`);
//   const posts = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.data.data.map((post) => ({
//     params: { slug: post.slug },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true };
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(
//     `${process.env.API_V2}/api/umkm/product/${params}`
//   );
 
//   const product = await res.json();

//   // Pass post data to the page via props
//   return { props: { product }, revalidate: 1 };
// }
function Slug({ }) {
  return (
    <div className="relative">
      <div
        className="w-full fixed bottom-0 bg-white border-t border-gray-300  pl-4  pr-4 pt-6 pb-6 lg:hidden flex justify-between items-center"
        style={{ zIndex: 999 }}
      >
        <span className="text-xl  text-blue-100 font-bold lg:text-xl">
          Rp 25.000
        </span>
        <div className=" flex-row flex">
          <div className="">
            <button className="border border-white-200 text-grey-200 font-bold py-2 px-4 w-full rounded">
              Chat
            </button>
          </div>
          <div className="  ml-2  w-full  ">
            <ModalQuantityMobileModal />
          </div>
        </div>
      </div>
      <div
        className=" relative h-full  py-0 lg:px-20 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
        style={{
          minHeight: "100vh",
        }}
      >
        <BreadCrumbs />
        <div className=" h-full w-full relative border-gray-200 flex-1 border  mt-5 flex flex-col lg:flex-row rounded-lg ">
          <div className="flex flex-col  w-full lg:w-3/5  ">
            <div className="flex flex-col pl-3 lg:pl-6 pr-3 lg:pr-6  pt-3 lg:pt-6  pb-10 lg:pb-40">
              <div className="item">
                <img
                  src="https://bs.moselo.com/images/product_s3/large/sv-8106-2-1594894656342.png"
                  className="product-image "
                />
              </div>
            </div>
            <div className=" border-t border-gray-200 w-full hidden lg:block">
              <div className=" pr-6 pl-6 mt-5">
                <span className="font-bold text-gray-700 lg:text-xl ">
                  Ulasan
                </span>
                <div className="mt-5 ">
                  <Reviews />
                  <Reviews />
                  <Reviews />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:border-gray-200 lg:border-l w-full  flex-1">
            <div className="h-full flex-1  ml-3  lg:pl-6  pr-3 pl-3 lg:pr-6  pt-2 lg:pt-6">
              <div className="flex-col flex">
                <h1 className="font-bold lg:text-2xl text-left">
                  Wellness Sticker Sheet
                </h1>

                <div className="mt-1">
                  <span className="text-sm">
                    By{" "}
                    <a className="text-blue-100 font-bold cursor-pointer">
                      illo factory
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-xl  text-blue-100 font-bold lg:text-xl">
                    Rp 25.000
                  </span>
                </div>
                {/* <div className="mt-2">
                  <span className="text-sm text-blue-100 font-bold lg:text-xl">
                    Rp 25.000
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-black-400">
                    Jumlah
                  </span>
                  <div className="border border-gray-200 w-20 items-center py-1 px-1 rounded-md justify-between  flex flex-row">
                    <button className="w-5 border-r border-gray-200">+</button>
                    <span>1</span>
                    <button className="w-5  border-l border-gray-200">-</button>
                  </div>
                </div> */}
                <div className="mt-4 lg:flex flex-row hidden">
                  <div className="w-2/6">
                    <button className="border border-white-200 text-grey-200 font-bold py-2 px-4 w-full rounded">
                      Chat
                    </button>
                  </div>
                  <div className="w-full flex-1 ml-2 	">
                    {/* <button className="bg-blue-100 hover:opacity-80 text-white font-bold py-2 px-4 w-full rounded outline-none">
                      Order
                    </button> */}
                    {/* <SuccessCartModal /> */}
                    <ModalQuantityModal />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="font-semibold text-black-400">
                    Description
                  </span>

                  <p
                    className="text-gray-700 mt-2 lg:text-sm"
                    style={{ color: "#737373" }}
                  >
                    Wellness Sticker Sheet is here as a reminder for us to slow
                    down a bit & take care of ourselves even when we're super
                    duper busy and stressed af ✨ btw it's pre-cut so you can
                    pee
                  </p>
                </div>
                <div className="mt-5">
                  <span className="font-semibold text-black-400">Details</span>

                  <div className="mt-2 ">
                    <ul className="">
                      <DetailProductColumn
                        columnLeft={"Category"}
                        columnRight={"Alat Pelindung diri"}
                      />
                      <DetailProductColumn
                        columnLeft={"Duration"}
                        columnRight={"1 days"}
                      />
                    </ul>
                  </div>
                </div>
                <div className="mt-5">
                  <span className="font-semibold text-black-400">
                    Pengiriman
                  </span>

                  <div className="mt-4 ">
                    <div className="flex flex-row justify-items-center ">
                      <img
                        src={"/assets/icon/location.svg"}
                        className="lg:w-5"
                      />
                      <span className="text-sm text-gray-700 ml-2">
                        Pengiriman dari{" "}
                        <span className="font-bold">Surabaya</span>
                      </span>
                    </div>
                    <div className="flex flex-row justify-items-center items-start mt-4 ">
                      <img src={"/assets/icon/truck.svg"} className="lg:w-5" />
                      <div className="flex flex-col ml-2">
                        <span className="text-sm text-gray-700 ">
                          Estimasi Harga ongkir
                          <span className="font-bold"> 11 ribu</span>
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                          Ke Cileuny,bandung
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 w-10/12">
                  <span className="font-semibold text-black-400">Share</span>

                  <div className="grid lg:grid-cols-8 grid-cols-8 gap-3 mt-3">
                    <FacebookShareButton
                      url={"https://github.com/next-share"}
                      quote={
                        "next-share is a social share buttons for your next React apps."
                      }
                      hashtag={"#nextshare"}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      className="mr-5"
                      url={"https://github.com/next-share"}
                      title={
                        "next-share is a social share buttons for your next React apps."
                      }
                      separator=":: "
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TwitterShareButton
                      url={"https://github.com/next-share"}
                      title={
                        "next-share is a social share buttons for your next React apps."
                      }
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </div>
                </div>
                <div className="mt-10">
                  <MarketInfoCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slug;

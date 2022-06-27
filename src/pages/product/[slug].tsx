// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(`${process.env.API_V2}/api/umkm/product`);
//   const posts = await res.json();

import DetailProductColumn from "../../components/atom/details-product-column/detail-product-column";
import ModalQuantityModal from "../../components/modal-quantity/modal-quantity";
import ModalQuantityMobileModal from "../../components/modal-quantity/modal-quantity-mobile";
import Reviews from "../../components/Reviews/reviews";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import MarketInfoCard from "../../components/market-info-card/market-info-card";
import convertToRupiah from "../../util/converRupiah";
import { getProfile, refresh } from "../../constant/api/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getOngkirPrice } from "../../constant/api/ongkir";
import Cookie from "js-cookie";
import router, { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Head from "next/head";
import { NextSeo } from "next-seo";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import BreadCrumbs from "../../components/atom/breadcrumbs/breadcrumbs";
import { CircularProgress } from "@material-ui/core";
import NumberFormat from "react-number-format";
import convertToKg from "../../util/convertToKg";
import Image from "next/image";

export async function getServerSideProps({ req, params }) {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.API_V2}/api/umkm/product/${params.slug}`
  );
  const data = await res.json();

  //Get other store product

  //Get user address
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;
  if (!token) {
    return { props: { data, user: null, token: null } };
  }
  try {
    const response = await getProfile(bearerToken);
    const user = response?.data;
    return { props: { data, user, token } };
  } catch (error) {
    const newToken = await refresh(bearerToken);
    Cookie.set("token", newToken.data.access_token, { expires: 1 });
    const redirect = true;
    return {
      props: { data, redirect },
    };
  }

  // Pass data to the page via props
}

function Slug({ data, user, token, redirect }) {
  const [loading, setLoading] = useState(true);
  const [selectImage, setSelectImage] = useState(
    data?.data[0]?.images[0]?.imageName
  );
  const router = useRouter();
  const [shipment, setShipment] = useState([]);
  const [lowerPriceShipment, setLowerPriceShipment] = useState("");
  const [showAllShipment, setShowAllShipment] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [errorOngkir, setErrorOngkir] = useState(false);
  const [variants, setVariants] = useState([]);
  const [currentVariants, setCurrentVariants] = useState({
    productVariantId: '',
    variantOptionId: '',
    variationName: '',
    variationPrice: '',
  });
  const [variantName, setVariantName] = useState(null);
  const myAbortController = new AbortController();

  useEffect(() => {
    if (redirect == true) {
      router.reload();
    }
  }, [redirect]);

  useEffect(() => {
    const umkmCityId = data.data[0]?.umkm?.city_id;
    if (user)
      if (user.address.length > 0) {
        const getStoreAvaiableShipmment =
          data.data[0]?.umkm?.courier.length >= 2
            ? data.data[0]?.umkm?.courier.reduce(
                (accumulator, each, currentIndex) => {
                  return currentIndex >= 2
                    ? accumulator + "," + each.courier?.code
                    : accumulator?.courier?.code + "," + each.courier?.code;
                }
              )
            : data.data[0]?.umkm?.courier[0].courier?.code;
        console.log(getStoreAvaiableShipmment);
        const loadOngkir = async () => {
          setLoading(true);

          const dataOngkir = {
            origin: umkmCityId,
            destination: parseInt(user.address[0].subdistrict_id),
            weight: data.data[0]?.weight,
            key: process.env.KEY_RAJA_ONGKIR,
            courier: getStoreAvaiableShipmment,
            length: data.data[0].length,
            width: data.data[0].width,
            height: data.data[0].height,
            diameter : data.data[0].diamter
          };
          const response = await getOngkirPrice(dataOngkir);
          setShipment(response.data);
          /// Get Lower Price
          const listPrice = [];

          if (response.error) {
            setErrorOngkir(true)
          }

         
          if (response.error == false)
            response?.data?.map((data) => {
              const getShipData = data[Object?.keys(data)?.toString()];
              getShipData[0]?.costs?.map((costData) => {
                listPrice.push(costData.cost[0].value);
              });
              setErrorOngkir(false)

            });
          
         

          setLowerPriceShipment(listPrice.sort()[0]);
          setLoading(false);
        };
        
        loadOngkir();
        if (errorOngkir == true) {
              loadOngkir();

        }
      } else {
        setLoading(false);
      }
    return () => {
      myAbortController.abort();
    };
  }, []);


  const selectVariant = (productVariant, variantOption) => {
    

    if (variants.length !== 0) {
      const filterGate = variants.filter((dataItem) => {
        if (
          dataItem.productVariantId == productVariant.id &&
          dataItem.variantOptionId !== null
        ) {
          return true;
        } else {
          return false;
        }
      });


      if (filterGate.length === 0) {

        
        const data = {
          productVariantId: productVariant.id,
          productVariantName: productVariant.variantName,

          variantOptionId: variantOption.id,
          variationName: variantOption.variantName,
          variationPrice: variantOption.price,
        };
        console.log(data);

        setVariants([...variants, data]);

            if (variantOption?.variantionImg !== "0.png") {
              setSelectImage(variantOption?.variantionImg);
            }
      } else {
        
      }
    } else {
      const data = {
        productVariantId: productVariant.id,
        productVariantName : productVariant.variantName,
        variantOptionId: variantOption.id,
        variationName: variantOption.variantName,
        variationPrice: variantOption.price,
      };
      setVariants([...variants, data]);

      if (variantOption?.variantionImg !== '0.png') {
        setSelectImage(variantOption?.variantionImg);
        
      }
    }

    setCurrentVariants({
      productVariantId: productVariant.id,
      variantOptionId: variantOption.id,

      variationName: variantOption.variantName,
      variationPrice: variantOption.price,
    });

   
  };
  

  // useEffect(() => {

  //   const filterGate = variants.filter((dataItem) => {
  //     if (
  //       dataItem.productVariantId !== currentVariants.productVariantId &&
  //       dataItem.variantOptionId !== currentVariants.variantOptionId
  //     ) {
  //       const groupName = variants.reduce((acc, current) => {
  //         return acc + current.variationName;
  //       }, "");;
  //         setVariantName(groupName);
  //     } else {
  //       return false;
  //     }
  //   })
 
   


  
  // }, [variants]);
  console.log(variants)

  if (loading && token) {
    return (
      <>
        <Head>
          <meta
            name="keywords"
            content={`Jual ${data.data[0].name}, ${data.data[0].name},ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm`}
          />
        </Head>
        <NextSeo
          title={data.data[0].name}
          description={data.data[0].description}
          canonical={"karyanusantara.co.id/" + `${data.data[0].slug}`}
          openGraph={{
            url: `${process.env.API_V2}/storage/images/product/${data?.data[0]?.images[0]?.imageName}`,
            title: `${data.data[0].name}`,
            description: `${data.data[0].description}`,
            images: [
              {
                url: `${process.env.API_V2}/storage/images/product/${data?.data[0]?.images[0]?.imageName}`,
                width: 800,
                height: 600,
                alt: `Gambar ${data.data[0].name}`,
              },
            ],
            site_name: `Jual ${data.data[0].name}`,
          }}
        />
        <div
          className="  relative h-full w-full py-0 lg:px-20 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
          style={{
            minHeight: "100vh",
          }}
        >
          <div className="flex justify-items-center  items-center w-full">
            <CircularProgress className="flex justify-items-center  items-center w-full" />
            ;
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <meta
            name="keywords"
            content={`Jual ${data.data[0].name}, ${data.data[0].name},ukm indonesia, umks indonesia, karya nusantara,jual,beli,ukm`}
          />
          <meta
            name="description"
            content={`Jual ${data.data[0].name},harga ${data.data[0].price},deskripsi ${data.data[0].description}`}
          />
        </Head>
        <NextSeo
          title={data.data[0].name}
          description={data.data[0].description}
          canonical={"karyanusantara.co.id/" + `${data.data[0].slug}`}
          openGraph={{
            url: `${process.env.API_V2}/storage/images/product/${data?.data[0]?.images[0]?.imageName}`,
            title: `${data.data[0].name}`,
            description: `${data.data[0].description}`,
            images: [
              {
                url: `${process.env.API_V2}/storage/images/product/${data?.data[0]?.images[0]?.imageName}`,
                width: 800,
                height: 600,
                alt: `Gambar ${data.data[0].name}`,
              },
            ],
            site_name: `Jual ${data.data[0].name}`,
          }}
        />
        <div className="relative">
          <div
            className="w-full fixed bottom-0 bg-white border-t border-gray-300  pl-4  pr-4 pt-6 pb-6 lg:hidden flex justify-between items-center"
            style={{ zIndex: 999 }}
          >
            <span className="text-xl  text-blue-100 font-bold lg:text-xl">
              {" "}
              <NumberFormat
                value={data.data[0].price}
                prefix="Rp "
                displayType={"text"}
                thousandSeparator={true}
              />
            </span>
            <div className=" flex-row flex">
              <div className="">
                <button className="border border-white-200 text-grey-200 font-bold py-2 px-4 w-full rounded">
                  Chat
                </button>
              </div>
              <div className="  ml-2  w-full  ">
                {data.data[0].stock == 0 ? (
                  <button
                    disabled
                    className="bg-blue-100 opacity-50 hover:opacity-80 text-white font-bold py-2 px-4 w-full rounded outline-none"
                  >
                    out of stock
                  </button>
                ) : (
                  <ModalQuantityMobileModal
                    stock={data.data[0]?.stock}
                    minimumBuy={data?.data[0]?.minimumOrder}
                    price={data?.data[0].price}
                    item={data.data[0]}
                    variants={variants}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className=" relative h-full  py-0 lg:px-20 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
            style={{
              minHeight: "100vh",
            }}
          >
            <BreadCrumbs data={data.data[0]} />
            <div className=" h-full w-full pb-6 relative border-gray-200 flex-1 border  mt-5 flex flex-col lg:flex-row rounded-lg ">
              <div className="flex flex-col  w-full lg:w-3/5  ">
                <div className="flex flex-col pl-3 lg:pl-6 pr-3 lg:pr-6  pt-3 lg:pt-6  pb-10 lg:pb-40">
                  <div className="item">
                    {
                      <img
                        src={` ${process.env.API_V2}/storage/images/product/${
                          selectImage
                            ? selectImage
                            : data?.data[0]?.images[0]?.imageName
                        }`}
                        alt={`Gambar dari product ${data?.data[0].name}`}
                        className="product-image  transition-all object-cover	"
                      />
                    }
                  </div>
                  <Swiper
                    // install Swiper modules
                    spaceBetween={20}
                    className="lg:w-80 mt-5"
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                  >
                    {data?.data[0]?.images.map((img, index) => {
                      return (
                        <SwiperSlide>
                          <img
                            src={`${process.env.API_V2}/storage/images/product/${img["imageName"]}`}
                            className="lg:h-20 lg:w-20 rounded-md object-cover  "
                            onClick={() => setSelectImage(img["imageName"])}
                            alt={`Gambar product dari ${data?.data[0].name}-${index}`}
                            style={{
                              opacity: selectImage === img["imageName"] && 0.4,
                            }}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                <div className=" border-t border-gray-200 w-full hidden lg:block">
                  <div className=" pr-6 pl-6 mt-5">
                    <span className="font-bold text-gray-700 lg:text-xl ">
                      Ulasan
                    </span>

                    <div className="mt-2 ">
                      <span className="font-bold text-gray-600 lg:text-md mb-5 ">
                        {data.data[0].review_avg_stars
                          ? `Total ${parseFloat(
                              data.data[0].review_avg_stars
                            ).toFixed(1)}/5`
                          : "Belum ada ulasan"}
                      </span>
                      <div className="mt-5  overflow-auto max-h-80">
                        {data.data[0].review.map((review, idx) => {
                          return <Reviews key={idx} review={review} />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:border-gray-200 lg:border-l w-full  flex-1">
                <div className="h-full flex-1  ml-3  lg:pl-6  pr-3 pl-3 lg:pr-6  pt-2 lg:pt-6">
                  <div className="flex-col flex">
                    <h1 className="font-bold lg:text-2xl text-left">
                      {/* {variantName !== ""
                        ? data.data[0].name + " - " + variantName
                        : data.data[0].name} */}
                      {data.data[0].name}
                    </h1>

                    <div className="mt-1">
                      <span className="text-sm">
                        By{" "}
                        <Link href={`/mitra/profile/${data.data[0].umkm.slug}`}>
                          <span className="text-blue-100 font-bold cursor-pointer">
                            {data.data[0].umkm.ukmName}
                          </span>
                        </Link>
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-xl  text-blue-100 font-bold lg:text-xl">
                        {" "}
                        {data.data[0].product_variant.length > 0 ? (
                          <NumberFormat
                            value={currentVariants.variationPrice}
                            prefix="Rp "
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        ) : (
                          <NumberFormat
                            value={data.data[0].price}
                            prefix="Rp "
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        )}
                      </span>
                    </div>
                    {/* <div className="mt-2 ">
                      {data.data[0].product_variant.map((productVariant) => {
                        return (
                          <div className="mb-2">
                            <span className="text-gray-700">
                              {productVariant?.variantName}
                            </span>
                            <div className="grid grid-cols-3 mt-2 gap-5">
                              {productVariant?.variant_option?.map(
                                (variantOption) => {
                                  return (
                                    <div
                                      onClick={() =>
                                        selectVariant(
                                          productVariant,
                                          variantOption
                                        )
                                      }
                                      className={`py-1 px-1 flex justify-center text-gray-700  border ${
                                        selectImage ==
                                        variantOption?.variantionImg
                                          ? "border-blue-100"
                                          : "border-grey-400"
                                      }  w-auto cursor-pointer`}
                                    >
                                      {variantOption.variantName}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div> */}
                    <div className="mt-2">
                      {/* {
                        variants?.map(variantData => {
                          return (
                            <DetailProductColumn
                              columnLeft={variantData.productVariantName}
                              columnRight={variantData.variationName}
                            />
                          );
                        })
                      } */}
                      <span></span>
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
                        {data.data[0].stock == 0 ? (
                          <button
                            disabled
                            className="bg-blue-100 opacity-50 hover:opacity-50 text-white font-bold py-2 px-4 w-full rounded outline-none"
                          >
                            out of stock
                          </button>
                        ) : (
                          <ModalQuantityModal
                            stock={data.data[0]?.stock}
                            minimumBuy={data?.data[0]?.minimumOrder}
                            price={data?.data[0].price}
                            user={user}
                            item={data.data[0]}
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-8">
                      <span className="font-semibold text-black-400">
                        Description
                      </span>
                      {data.data[0].description.length > 400 && !showMore ? (
                        <>
                          <p
                            className="text-gray-700 mt-2 lg:text-sm "
                            style={{
                              color: "#737373",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {ReactHtmlParser(
                              data.data[0].description
                                .replace(/\r\n|\r|\n/g, "<br />")
                                .slice(0, 400)
                            )}
                            <span
                              className="text-blue-100 cursor-pointer"
                              onClick={() => setShowMore(true)}
                            >
                              Lihat selengkapnya
                            </span>
                          </p>
                        </>
                      ) : (
                        <p
                          className="text-gray-700 mt-2 lg:text-sm"
                          style={{ color: "#737373" }}
                        >
                          {ReactHtmlParser(
                            data.data[0].description.replace(
                              /\r\n|\r|\n/g,
                              "<br />"
                            )
                          )}
                        </p>
                      )}
                    </div>
                    <div className="mt-5">
                      <span className="font-semibold text-black-400">
                        Details
                      </span>

                      <div className="mt-2 ">
                        <ul className="">
                          <DetailProductColumn
                            columnLeft={"Category"}
                            columnRight={data.data[0]?.category?.categoryName}
                          />

                          <DetailProductColumn
                            columnLeft={"Stock"}
                            columnRight={data.data[0]?.stock}
                          />
                          <DetailProductColumn
                            columnLeft={"Berat"}
                            columnRight={convertToKg(data.data[0]?.weight)}
                          />

                          {data.data[0]?.isPreorder == 1 && (
                            <DetailProductColumn
                              columnLeft={"Pre order"}
                              columnRight={
                                parseInt(data.data[0]?.isPreOrderTime) + "Hari"
                              }
                            />
                          )}
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
                            alt="location ico"
                          />
                          <span className="text-sm text-gray-700 ml-2">
                            Pengiriman dari{" "}
                            <span className="font-bold">
                              {data.data[0]?.umkm?.city_name}
                            </span>
                          </span>
                        </div>
                        {token === null ? (
                          <div className="flex flex-row justify-items-center items-start mt-4 ">
                            <img
                              src={"/assets/icon/truck.svg"}
                              className="lg:w-5"
                              alt="truck icon"
                            />
                            <div className="flex flex-col ml-2">
                              <span className="text-sm text-gray-700 ">
                                Login terlebih dahulu untuk mendapatkan estimasi
                                ongkir
                              </span>
                            </div>
                          </div>
                        ) : user?.address[0] ? (
                          <div className="flex flex-row justify-items-center items-start mt-4 ">
                            <img
                              src={"/assets/icon/truck.svg"}
                              className="lg:w-5"
                              alt="truck icon"
                            />
                            <div className="flex flex-col ml-2">
                              <span className="text-sm text-gray-700 ">
                                Estimasi Harga ongkir mulai dari
                                <span className="font-bold ml-1">
                                  {loading ? (
                                    "Calculate ...."
                                  ) : (
                                    <NumberFormat
                                      value={lowerPriceShipment}
                                      prefix="Rp "
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                  )}
                                </span>
                              </span>
                              <span className="mt-1 text-xs text-gray-500">
                                Ke {user.address[0].subdistrict},
                                {user.address[0].city_name}
                              </span>
                              {showAllShipment ? (
                                loading ? (
                                  <span>Loading ...</span>
                                ) : (
                                  shipment?.map((data, key) => {
                                    const getShipData =
                                      data[Object?.keys(data)?.toString()];
                                    return (
                                      <div className="mt-2" key={key}>
                                        <span className="text-md text-gray-800">
                                          {getShipData[0].name}
                                        </span>
                                        <ul className="flex flex-col">
                                          {getShipData[0].costs.map((cost) => {
                                            return (
                                              <li>
                                                {" "}
                                                <span className="text-sm text-gray-600">
                                                  {cost.service}{" "}
                                                  <span className="text-bold text-gray-800">
                                                    {convertToRupiah(
                                                      cost.cost[0].value
                                                    )}
                                                  </span>
                                                </span>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    );
                                  })
                                )
                              ) : (
                                <span
                                  className="mt-1 text-sm text-blue-100 cursor-pointer"
                                  onClick={() => setShowAllShipment(true)}
                                >
                                  Lihat semua estimasi ongkir
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-row justify-items-center items-start mt-4 ">
                            <img
                              src={"/assets/icon/truck.svg"}
                              className="lg:w-5"
                              alt="truck icon"
                            />

                            <div className="flex flex-col ml-2">
                              <span className="text-sm text-gray-700 ">
                                Tambahkan alamat{" "}
                                <Link href="/member/alamat">
                                  <span className="text-blue-100 cursor-pointer">
                                    disini
                                  </span>
                                </Link>
                              </span>
                              <span className="mt-1 text-xs text-gray-500">
                                untuk melihat estimasi ongkir
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 w-10/12">
                      <span className="font-semibold text-black-400">
                        Share
                      </span>

                      <div className="grid lg:grid-cols-8 grid-cols-8 gap-3 mt-3">
                        <FacebookShareButton
                          url={`${process.env.BASE_URL_PROD}/${router.pathname}`}
                          title={`Beli di ${data?.data[0]?.name} `}
                          hashtag={"#karyanusantara"}
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <WhatsappShareButton
                          className="mr-5"
                          url={"https://github.com/next-share"}
                          title={`Beli di ${data?.data[0]?.name} `}
                          separator=":: "
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <TwitterShareButton
                          url={"https://github.com/next-share"}
                          title={`Beli di ${data?.data[0]?.name} `}
                        >
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                      </div>
                    </div>
                    <div className="mt-10 ">
                      <MarketInfoCard ukmData={data.data[0]?.umkm} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-2xl text-center ">
                Produk lain dari toko{" "}
                <span className="text-blue-100">
                  {data.data[0].umkm.ukmName}
                </span>
              </h2>
              <div className="grid grid-cols-4"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Slug;

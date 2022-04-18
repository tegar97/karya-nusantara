import router from 'next/router'
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';

export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  const bearerToken = `Bearer ${token}`;

  // Fetch data from external API
  const res = await fetch(`${process.env.API_V2}/api/payment/detail/${params.code}`, {
    headers: new Headers({
      Authorization: bearerToken,
    }),
  });
  const data = await res.json();

  if (data.data === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
    }
     if (token === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  //Get other store product

  //Get user address

      return { props: { data, token } };

  }

  // Pass data to the page via props

function PaymentDetail({ data }) {

    const [productSumPrice, setProductSumPrice] = useState(0);
    const [shippmentPrice, setShippmentPrice] = useState(0);
    const [groupBySeller, setGroupBySeller] = useState(0);

    useEffect(() => {
        const getSumProductPrice = data.data.order.reduce((acc, value) => {
            return acc + value.amount;
         
        }, 0)
        const getShippmentPrice = data.data.order.reduce((acc, value) => {
            return acc + value.shipping_amount;
         
        }, 0)

        const groupBySeller = data.data.order.reduce((acc, curr) => {
          (acc[curr.umkm.ukmName] = acc[curr.umkm.ukmName] || []).push(curr);

          return acc;
        }, {});

        // data.data.order.map(data => {
        //     const groupBySeller = data.order_item.reduce((acc, curr) => {
        //       return (acc[curr.product.umkm.ukmName] =
        //         acc[curr.product.umkm.ukmName] || []).push(curr);
        //     });
        //             setGroupBySeller(groupBySeller);
        //     console.log(groupBySeller);
        //    })
         setGroupBySeller(groupBySeller);
            setProductSumPrice(getSumProductPrice);
            setShippmentPrice(getShippmentPrice);

    },[])

  console.log(groupBySeller);
  return (
    <div
      className="w-full"
      style={{ backgroundColor: "#f3f4f5", minHeight: "100vh" }}
    >
      <div className="bg-white w-full px-5 py-5 ">
        <span>Detail Pembayaran</span>
        <div className="mt-5 mb-5">
          <div className="flex justify-between">
            <span>Total Harga</span>
            <span>
              {
                <NumberFormat
                  value={productSumPrice}
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Ongkos kirim</span>
            <span>
              {
                <NumberFormat
                  value={shippmentPrice}
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span>Total Bayar</span>
              <span>{data.data.payment_gateway.gateway_name}</span>
            </div>
            <span>
              {
                <NumberFormat
                  value={data.data.amount}
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white w-full px-5 py-5 mt-5">
        <span>Produk Yang Dibeli</span>
        {Object.keys(groupBySeller).map((ukmName) => {
          return (
            <div className="flex flex-col mt-5">
              <span>{ukmName}</span>
              <div>
                {groupBySeller[ukmName].map((order) => {
                  return (
                    <>
                      {order.order_item.map((product) => {
                        return (
                          <ul className="mb-5">
                            <li className="flex flex-col">
                              <div className="flex flex-row justify-between">
                                <span>{product.product.name}</span>
                                <span>
                                  <NumberFormat
                                    value={product.amount}
                                    prefix="Rp"
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                </span>
                              </div>
                              <span className="text-gray-500 text-sm">
                                {product.quantity} x{" "}
                                <NumberFormat
                                  value={product.product.price}
                                  prefix="Rp"
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              </span>
                            </li>
                          </ul>
                        );
                      })}
                      <div>
                        <div className="flex flex-row justify-between mt-2">
                          <span className="text-gray-500 text-sm">
                            Ongkos kirim
                          </span>
                          <span>
                            <NumberFormat
                              value={order.shipping_amount}
                              prefix="Rp"
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {order.logistic_code} {order.logistic_type}
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



export default PaymentDetail
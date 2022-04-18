import { Button } from '@material-ui/core';
import React, { useEffect,useState } from 'react'
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { getOngkirPrice } from '../../constant/api/ongkir';
import fetcher from '../../util/useSwrFetcher';
import CheckoutItem from './checkout-item';

function CheckoutPageProduct({
  ukmName,
  groupBySeller,
  address,
  setOngkirPrice,
  getOngkirprice,
  getTempOngkir,
  index,
  setOrderList,
  setTriggetNotif,
  orderList,
}) {
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [courierLoad,setCourierLoad] = useState(true)
  const [selectCourier, setSelectCourier] = useState(false);
  const [shipment, setShipment] = useState([]);
  const [AllProductPrice, setAllProductPrice] = useState(0);
  const [myCourier, setMyCourier]: any = useState({
    value: "",
    estimasi: "",
    courier_total: 0,
    courier: "",
    quantity: 0,
  });
  useEffect(() => {
    const getPrice = groupBySeller[ukmName].reduce((total, num) => {
      return total + num.quantity * num.product.price;
    }, 0);
    setAllProductPrice(getPrice)
    setSubTotal(parseInt(getPrice + myCourier.value));

    //GET Ongkir ,logicstic,subtotal and get product

   
  }, [myCourier, subTotal]);

  useEffect(() => {
    const umkmCityId = groupBySeller[ukmName][0].umkm?.city_id;
    const totalWeight = groupBySeller[ukmName].reduce((total, num) => {
      return (
        parseInt(total) + parseInt(num.quantity) * parseInt(num.product.weight)
      );
    }, 0);
    setLoading(true);

    if (address !== null) {
      const getStoreAvaiableShipmment =
        groupBySeller[ukmName][0].umkm.courier.length >= 2
          ? groupBySeller[ukmName][0].umkm.courier.reduce(
              (accumulator, each, currentIndex) => {
                return currentIndex >= 2
                  ? accumulator + "," + each.courier?.code
                  : accumulator?.courier?.code + "," + each.courier?.code;
              }
            )
          : groupBySeller[ukmName][0].umkm.courier[0].courier?.code;

      const loadOngkir = async () => {
        const dataOngkir = {
          origin: umkmCityId,
          destination: parseInt(address?.subdistrict_id),
          weight: totalWeight,
          key: process.env.KEY_RAJA_ONGKIR,
          courier: getStoreAvaiableShipmment,
          
        };
        const response = await getOngkirPrice(dataOngkir);

        if (response.error === true) {
          loadOngkir();
        }
        setShipment(response.data);
      };
      if (address !== undefined) {
        loadOngkir();
        
      }
      setLoading(false);
    }
  }, []);
  let tempCourier = [];

  const selectMyCourier = (e, detaildata) => {
    

    setMyCourier({
      value: e.cost[0].value,
      estimasi: e.cost[0].etd,
      service: e.service,
    });
    // tempValue[index] = e.cost[0].value

    // getTempOngkir.push(e.cost[0].value);

    const data = {
      id: groupBySeller[ukmName][0].id,
      courier_total: e.cost[0].value,
      estimasi: e.cost[0].etd,
      product_id: groupBySeller[ukmName][0].product.id,
      quantity: groupBySeller[ukmName][0].quantity,
      courier: e.service,
      price: parseInt(groupBySeller[ukmName][0].product.price),
    };
    const orderListTemp = {
      store_id: groupBySeller[ukmName][0].umkm_id,
      shipping_amount: e.cost[0].value,
      amount: AllProductPrice,
      logistic_type: e.service,
      logistic_name: detaildata[0].name,
      logistic_code: detaildata[0].code,
      item_list: groupBySeller[ukmName],
    };
    if (getOngkirprice[index]?.id !== groupBySeller[ukmName][0].id) {
     
      setOrderList([...orderList, orderListTemp]);

     
      setOngkirPrice([...getOngkirprice, data]);
      
    } else {
      const update = [...getOngkirprice];
      update[index] = data;

      const update2 = [...orderList];
      update2[index] = orderListTemp;

      setOrderList(update2)
      setOngkirPrice(update);
    }


    getTempOngkir.push(data);
    setTriggetNotif(getOngkirprice);
    setSelectCourier(false);
  };

  const showCourierList = () => {
    if (address === undefined) {
        toast.error('Silahkan tambahkan alamat terlebih dahulu')
    } else {
      setSelectCourier(!selectCourier);
    }
  }

  if (loading) {
    return <h1>loading....</h1>;
  } else {
    return (
      <div className="mt-5 border border-gray-200 shadow-sm px-4 py-4 rounded-lg">
        <div className="flex flex-row  ">
          <div className="flex flex-col w-full ">
            <div className="flex flex-row justify-between w-full items-center border-b border-gray-200 pb-2">
              <div className="flex flex-row">
                <img
                  src={"assets/icon/store.svg"}
                  alt="store icon"
                  className="lg:w-6"
                />
                <span className="ml-2">{ukmName}</span>
              </div>
            </div>
            <div className="flex  flex-col lg:flex-row mt-5 w-full  justify-between items-start ">
              <div className="flex-col flex">
                {groupBySeller[ukmName].map((product) => {
                  return <CheckoutItem key={product.id} product={product} />;
                })}
              </div>

              <div className="relative w-full lg:w-auto  z-10">
                <div className="flex flex-col items-end">
                  {loading ? (
                    <button
                      disabled
                      className="relative  bg-blue-100 hover:opacity-80  py-2 text-white lg:w-60 lg:h-10 w-full rounded outline-none"
                    >
                      <span>Loading ....</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => showCourierList()}
                      className="relative  bg-blue-100 hover:opacity-80  py-2 text-white lg:w-60 lg:h-10 w-full rounded outline-none"
                    >
                      <span>Jasa Pengiriman</span>
                    </button>
                  )}

                  <div className="mt-5 flex flex-col text-right ">
                    <div className="flex flex-row  justify-end">
                      <span className="mr-5">{myCourier?.service}</span>
                      <NumberFormat
                        value={myCourier?.value}
                        prefix="Rp"
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </div>
                    <div className="flex flex-row">
                      {myCourier?.estimasi && (
                        <>
                          <span className="mr-5">Estimasi pengiriman</span>
                          {myCourier?.estimasi === "1-1"
                            ? "1 hari"
                            : myCourier?.estimasi + "Hari"}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {selectCourier && (
                  <div className="top-10 absolute border border-gray-200 w-full  z-20 bg-white max-h-40 overflow-auto">
                    {shipment?.map((data, key) => {
                      const getShipData = data[Object.keys(data).toString()];
                      return (
                        <div className="mt-2" key={key}>
                          <ul>
                            {getShipData[0].costs.map((cost) => {
                              return (
                                <li
                                  onClick={() =>
                                    selectMyCourier(cost, getShipData)
                                  }
                                  className="hover hover:bg-gray-200 cursor-pointer px-1 py-2 border-b border-gray-200 flex justify-between"
                                >
                                  <span className="text-sm text-gray-600">
                                    {getShipData[0].code} {cost.service}{" "}
                                  </span>
                                  <span className="text-sm text-gray-800">
                                    <NumberFormat
                                      value={cost.cost[0].value}
                                      prefix="Rp"
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-3 justify-between">
          <span className="font-bold">Sub total</span>
          <span>
            <NumberFormat
              value={subTotal}
              prefix="Rp"
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default CheckoutPageProduct
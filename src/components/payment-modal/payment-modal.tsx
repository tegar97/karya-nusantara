import React, { FormEvent, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";
import { useRouter } from "next/router";


import { Button, Checkbox } from "@material-ui/core";
import { RadioButtonChecked, RadioButtonUncheckedRounded } from "@material-ui/icons";
import PaymentGatewayChild from "./payment-gateway-child";
import useSWR from "swr";
import NumberFormat from "react-number-format";
import { order } from "../../constant/api/order";
import Cookie from 'js-cookie'
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    height: "90%",
    maxWidth: 800,
    maxHeight: 900,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ffff",
    padding: 0,
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};
const customStylesMobile = {
  content: {
    top: "70%",
    left: "50%",
    right: "auto",
    width: "100%",
    height: "80%",
    maxWidth: 800,
    maxHeight: 400,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ffff",
    borderRadius: "20px 20px 0 0",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const PaymentModal = ({isMobile =false, orderList, grandTotal }) => {
  let subtitle;
  const router = useRouter();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const fetcher = (
    ...args: [input: RequestInfo, init?: RequestInit | undefined]
  ): any => fetch(...args).then((res) => res.json());
  const [codeGateway, setCodeGateway] = useState('');
  const { data, error } = useSWR(
    `${process.env.API_V2}/api/gateway`,
    fetcher
  );
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalIsOpen]);

  function closeModal() {
    setIsOpen(false);
  }


  Modal.setAppElement("#root");

  const pay = async () => {
    const data = {
      order_list: orderList,
      payment_code: codeGateway,
      amount: grandTotal,

    };

    const token = Cookie.get('token');
    const bearer = `Bearer ${token} `

    const response = await order(data, bearer, codeGateway);


    if (response.data.status_code == 201) {
      router.push(`/payment/${response.data.transaction_id}`);
    } else {
      toast.error('gagal melakukan pembayaran')
    }
    
  }

  return (
    <div>
      {isMobile == true ? (
        <Button
          onClick={openModal}
          className={`w-full lg:hidden  bg-blue-100 mt-5 px-2 py-2 focus:outline-none  text-white outline-none rounded-md border-transparent focus:border-transparent focus:ring-0 hover:opacity-90 hover:bg-blue-100 `}
        >
          Pilih pembayaran
        </Button>
      ) : (
        <Button
          onClick={openModal}
          className={`w-full lg:block hidden bg-blue-100 mt-5 px-2 py-2 focus:outline-none  text-white outline-none rounded-md border-transparent focus:border-transparent focus:ring-0 hover:opacity-90 hover:bg-blue-100 `}
        >
          Pilih pembayaran
        </Button>
      )}

      <Modal
        isOpen={modalIsOpen}
        style={isMobile ? customStylesMobile : customStyles}
        onRequestClose={closeModal}
        contentLabel="Quantity Modal"
      >
        {!data ? (
          <h1>Loading ...</h1>
        ) : (
          <div className="relative w-full  h-full ">
            <div className=" w-full  h-full p-0 ">
              <div className=" py-5 px-5 flex justify-between">
                <span>Pilih Pembayaran</span>
                <div className="  ">
                  <button onClick={closeModal} className="text-blue-100 ">
                    X
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <ul className=" overflow-auto lg:h-96 h-60">
                  {data.data.map((data) => {
                    return (
                      <PaymentGatewayChild
                        setCodeGateway={setCodeGateway}
                        data={data}
                      />
                    );
                  })}
                
                </ul>
              </div>
            </div>
            <div className="absolute w-full py-3 px-3 bottom-0 border-t border-gray-200 bg-white ">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center">
                  <span>Total Bayar</span>
                  <NumberFormat
                    value={grandTotal}
                    prefix="Rp"
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </div>
                <Button onClick={pay}>Bayar</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentModal;

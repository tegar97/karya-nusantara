import React, { FormEvent, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-modal";
import { useRouter } from "next/router";

import { Button, Checkbox } from "@material-ui/core";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import useSWR from "swr";

import { toast } from "react-toastify";
import TimeLine from "./timeline";
import { track } from "../../constant/api/ongkir";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",
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

const TrackModal = ({ resi, logistic_code, logistic_type }) => {
  let subtitle;
  const router = useRouter();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const fetcher = (
    ...args: [input: RequestInfo, init?: RequestInit | undefined]
  ): any => fetch(...args).then((res) => res.json());
  const [codeGateway, setCodeGateway] = useState("");
  const [istrack, setIsTrack] = useState(false);
    const [trackingData, setIsTrackingData] = useState({});
    
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setLoading(true);
    const loadtracking = async () => {
      const data = {
        courier: logistic_code,
        waybill: resi,
      };
      const response = await track(data);

      loadtracking();

      if (response.error !== false) {
        setLoading(false);
      }
    };
  }, [modalIsOpen]);

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

  const trackPaket = async () => {
    const data = {
      courier: logistic_code,
      waybill: resi,
    };
    const response = await track(data);
    setIsTrack(true);
    setIsTrackingData(response.data);
  };
  Modal.setAppElement("#root");

  return (
    <div>
      <Button
        onClick={openModal}
        className="w-full bg-blue-100 mt-5 px-2 py-2 focus:outline-none  text-white outline-none rounded-md border-transparent focus:border-transparent focus:ring-0 hover:opacity-90 hover:bg-blue-100 "
      >
        Lacak Paket
      </Button>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Quantity Modal"
      >
        {!loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div className="relative w-full  h-full p-0">
            <div className="py-2 px-2 border-b border-gray-400">
              <span className="text-lg text-gray-800">Lacak paket</span>

              <div>
                <ul>
                  <li className="grid grid-cols-6 mt-3 gap-10">
                    <span>Kurir</span>{" "}
                    <span className="col-span-4">
                      : <span className="ml-2">{logistic_code}</span>
                    </span>{" "}
                  </li>
                  <li className="grid grid-cols-6 mt-3 gap-10 ">
                    <span>Service </span>{" "}
                    <span className="col-span-4">
                      : <span className="ml-2">{logistic_type}</span>
                    </span>{" "}
                  </li>
                  <li className="grid grid-cols-6 mt-3 gap-10">
                    <span>Resi </span>{" "}
                    <span className="col-span-4">
                      : <span className="ml-2">{resi}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              {logistic_code == "jne" ||
              logistic_code == "tiki" ||
              logistic_code == "pahala" ||
              logistic_code == "pandu" ? (
                <div className="mt-5">
                  <span>
                    Maaf lacak otomatis tidak tersedia untuk pilihan kurir yang
                    anda pilih
                  </span>
                </div>
              ) : (
                <div className="mt-5  py-2 px-2">
                  {!istrack && (
                    <button
                      className="bg-blue-100 text-white px-2 py-2"
                      onClick={trackPaket}
                    >
                      Track paket
                    </button>
                  )}
                  <div style={{ width: "70%" }}>
                    {istrack && <TimeLine trackingData={trackingData} />}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TrackModal;

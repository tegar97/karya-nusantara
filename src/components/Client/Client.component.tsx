import React from "react";
import { HeadingSecondary } from "../About/About.styled";
import ClientCard from "./Client-Card.component";

function Client() {
  return (
    <div className="mt-4 p-9 lg:px-20">
      <div className="grid items-center grid-cols-5 ">
        <div className="col-span-1 lg:col-span-2 lg:w-full">
          <div
            className="w-full lg:w-12/13"
            style={{
              background: "#5996ab",
              padding: "0.8px",
            }}
          ></div>
        </div>
        <h2 className="w-full col-span-3 text-3xl font-bold text-center lg:col-span-1 lg:-col-span-1 lg:text-4xl text-grey-100 hover:text-blue-100">
          Klien Kami
        </h2>
        <div className="flex justify-end col-span-1 lg:col-span-2 lg:w-full">
          <div
            className="w-full lg:w-12/13"
            style={{
              background: "#5996ab",
              padding: "0.8px",
            }}
          ></div>
        </div>
      </div>
      <div className="py-5 lg:p-10">
        <ClientCard></ClientCard>
      </div>

      {/* <div
        className="w-full mt-5"
        style={{
          background: "#5996ab",
          padding: "0.8px",
        }}
      ></div> */}
    </div>
  );
}

export default Client;

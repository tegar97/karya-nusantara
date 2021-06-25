import React from "react";
import { HeadingSecondary } from "../About/About.styled";
import ClientCard from "./Client-Card.component";

function Client() {
  return (
    <div className="mt-4 p-9 lg:px-20">
      <div className="grid items-center grid-cols-5 p">
        <div className="col-span-2 lg:w-full">
          <div
            className="w-10/12 lg:w-12/13"
            style={{
              background: "#5996ab",
              padding: "0.8px",
            }}
          ></div>
        </div>
        <h2 className="w-full text-3xl font-bold text-center lg:text-4xl text-grey-100 hover:text-blue-100">
          Klien Kami
        </h2>
        <div className="flex justify-end col-span-2 lg:w-full">
          <div
            className="w-10/12 lg:w-12/13"
            style={{
              background: "#5996ab",
              padding: "0.8px",
            }}
          ></div>
        </div>
      </div>
      <div className="p-10">
        <ClientCard></ClientCard>
      </div>

      <div
        className="w-full mt-5"
        style={{
          background: "#5996ab",
          padding: "0.8px",
        }}
      ></div>
    </div>
  );
}

export default Client;

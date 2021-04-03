import React from "react";
import { HeadingSecondary } from "../About/About.styled";
import ClientCard from "./Client-Card.component";

function Client() {
  return (
    <div className="mt-4 p-9">
      <HeadingSecondary className="mb-10 text-center text-blue-100">
        Klien Kami
      </HeadingSecondary>
      <ClientCard></ClientCard>
    </div>
  );
}

export default Client;

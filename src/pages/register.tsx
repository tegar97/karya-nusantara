import { Container } from "@material-ui/core";
import Image from "next/image";
import React from "react";
import { RegisterContainer } from "../components/Register/Register.styles";
import RegisterBox from "../components/Register/RegisterBox.component";

function register() {
  return (
    <Container
      className="flex items-center justify-center"
      style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <RegisterBox />
    </Container>
  );
}

export default register;
import { Card, CardContent, Container, Paper } from "@material-ui/core";
import React, { useState } from "react";
import LoginModal from "../Login-Modal/Login-Modal.component";
import RegisterKonsumen from "../register-konsumen/Register-konsumen";
import { RegisterContainer, RegisterBoxContainer } from "./Register.styles";
function RegisterBox() {
  const [roleClick, setRoleClick] = useState(false);
  const [role, setRole] = useState(null);

  const RoleCustumer = () => {
    setRoleClick(true);
    setRole("konsumen");
  };
  const Roleumkm = () => {
    setRoleClick(true);
    setRole("konsumen");
  };

  const RemoveRole = () => {
    setRoleClick(false);
    setRole(null);
  };
  return (
      <Paper>
          <h1>Register</h1>
      </Paper>
  );
}

export default RegisterBox;

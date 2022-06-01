import React from "react";
import { Button } from "antd";

export const EditButton = ({ setVisible }) => (
  <Button
    style={{ color: "#eb2f96", borderColor: "white", width: "70px" }}
    onClick={setVisible}
  >
    Editar
  </Button>
);

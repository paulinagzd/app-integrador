import React from "react";
import { Button } from "antd";

export const DetailButton = ({ setVisible }) => (
  <Button
    style={{ color: "gray", borderColor: "white", width: "70px" }}
    onClick={() => {
      setVisible(true);
    }}
  >
    Detalle
  </Button>
);
import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const TopButtons = ({ setVisible, type, setDeleteWarning }) => (
  <span>
    <Button
      size="small"
      shape="round"
      style={{
        color: "#eb2f96",
        borderColor: "white",
        marginBottom: "10px",
      }}
      icon={<PlusOutlined />}
      onClick={() => {
        setVisible(true);
      }}
    >
      Agregar {type}
    </Button>
    {/* <Button
      size="small"
      shape="square"
      style={{
        color: "white",
        backgroundColor: "#cf1322",
        borderColor: "black",
        marginLeft: "5px",
        marginBottom: "10px",
      }}
      onClick={() => {
        setDeleteWarning(true);
      }}
    >
      Borrar {type}
    </Button> */}
  </span>
);
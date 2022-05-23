import React, { useContext } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ModalButtonContext } from "./ModalPage.jsx";

export default function ModalButton() {
  const { action, setVisible, setDeleteWarning, type} =
    useContext(ModalButtonContext);
  
  const buttonType = () => {
    switch (action) {
      case "edit":
        return (
          <Button
            style={{ color: "#eb2f96", borderColor: "white", width: "70px" }}
            onClick={() => {
              setVisible(true);
            }}
          >
            Editar
          </Button>
        );
      case "detail":
        return (
          <Button
            style={{ color: "gray", borderColor: "white", width: "70px" }}
            onClick={() => {
              setVisible(true);
            }}
          >
            Detalle
          </Button>
        );
      default:
        return (
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
            <Button
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
            </Button>
          </span>
        );
    }
  };

  return buttonType();
}

import { Slide, Snackbar, Alert } from "@mui/material";
import React from "react";
import { useAlert } from "../Context/AlertContext";

const AlertBar = () => {
  const { alert, setAlert } = useAlert();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({
      open: false,
      type: "",
      message: "",
    });
  };
  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Slide in={alert.open}>
          <Alert severity={alert.type} onClose={handleClose}>
            {alert.message}
          </Alert>
        </Slide>
      </Snackbar>
    </div>
  );
};

export default AlertBar;

import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useAppContext } from "../../context/appContext";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SimpleSnackbar() {
  const { snackbarOpen, setSnackbarOpen } = useAppContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Alert onClose={handleClose} severity="success">
          Meet ID copied!
        </Alert>
      </Snackbar>
    </div>
  );
}

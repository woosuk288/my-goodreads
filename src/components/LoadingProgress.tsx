import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingProgress = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 100px)" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default LoadingProgress;

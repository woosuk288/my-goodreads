import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { HEADER_HEIGHT } from "@/constants/values";

const LoadingProgress = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: `calc(100vh - ${HEADER_HEIGHT})` }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default LoadingProgress;

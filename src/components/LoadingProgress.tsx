import React from "react";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { HEADER_HEIGHT } from "@/constants/values";

interface Props {
  circularProgressProps?: CircularProgressProps;
}
const LoadingProgress = ({ circularProgressProps }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: `calc(100vh - ${HEADER_HEIGHT})` }}>
      <CircularProgress color="secondary" {...circularProgressProps} />
    </Box>
  );
};

export default LoadingProgress;

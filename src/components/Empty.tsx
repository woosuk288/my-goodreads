"use client";

import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Empty({ message }: { message: string }) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 106px)",
        gap: 2,
      }}
    >
      <Typography variant="h2" component="div" fontSize="1.5rem" fontWeight={500} gutterBottom>
        {message ?? "데이터를 찾을 수가 없네요."}
      </Typography>
      {/* <Button variant="contained" color="primary" onClick={() => reset()}>
        Try again
      </Button> */}
      <Button variant="outlined" onClick={() => router.back()} sx={{ width: "120px" }}>
        Back
      </Button>
    </Box>
  );
}

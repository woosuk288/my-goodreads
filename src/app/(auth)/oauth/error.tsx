"use client";

import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h2" component="div" fontSize="1.5rem" fontWeight={500} gutterBottom>
        Something went wrong!
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

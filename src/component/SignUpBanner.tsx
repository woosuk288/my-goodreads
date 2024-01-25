import { Box, Button, IconButton, Typography } from "@mui/material";
import { SIGNUP_PATH } from "../constants/routes";
import CloseIcon from "@mui/icons-material/Close";

export default function SignUpBanner() {
  return (
    <div>
      <Box className="site_banner" bgcolor="primary.light">
        <Box className="site_banner_content" position="relative" textAlign="center" padding="24px 32px">
          <Typography component="h2" fontWeight="bold">
            Join Goodreads
          </Typography>
          <Typography component="h3" color="text.secondary" marginBottom="12px">
            and meet your next favorite book!
          </Typography>
          <Button variant="outlined" href={SIGNUP_PATH} sx={{ textTransform: "capitalize" }}>
            Sign Up Now
          </Button>
          <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}

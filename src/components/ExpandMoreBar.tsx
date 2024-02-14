import { useState } from "react";

import { Box, Button, SxProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const sxExpandMoreBar: SxProps = {
  position: "relative",
  ".expand_more_bar__overlay": {
    position: "absolute",
    bottom: "0",
    width: "100%",
    paddingTop: "24px",
    background: "linear-gradient(to bottom,rgba(255,255,255,0),#fff 16px)",
  },
  ".expand_more_bar__overlay--open": {
    position: "static",
  },
};

interface IExpandMoreBar {
  show: boolean;
  onShowMore: () => void;
}
export default function ExpandMoreBar({ show, onShowMore }: IExpandMoreBar) {
  return (
    <Box sx={sxExpandMoreBar}>
      <div className={`expand_more_bar__overlay${show && "--open"}`}>
        <Button
          type="button"
          sx={{ marginLeft: "-8px", color: "primary.dark", fontWeight: 600 }}
          onClick={onShowMore}
          endIcon={<ExpandMoreIcon sx={{ transform: show ? "rotate(-180deg)" : "none" }} />}
        >
          {show ? "숨기기" : "더 보기"}
        </Button>
      </div>
    </Box>
  );
}

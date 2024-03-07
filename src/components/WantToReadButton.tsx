import React, { useState } from "react";
import NextLink from "next/link";

import useSWRMutation from "swr/mutation";

import DoneIcon from "@mui/icons-material/Done";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, CircularProgress, SxProps } from "@mui/material";

import { updateBookFromShelf } from "@/lib/firebase/firestore";
import { extractISBN } from "@/lib/utils";
import { API_PROFILE, LOGIN_PATH } from "@/constants/routes";
import { READ_STATUS, READ_STATUS_TEXT } from "@/constants/values";
import { useAuth } from "./AuthProvider";

interface Props {
  kakaoBook: IKakaoBook;
  currentReadStatus: IBookReadStatus;
}
const WantToReadButton = ({ kakaoBook, currentReadStatus }: Props) => {
  const authState = useAuth();
  const isbn = extractISBN(kakaoBook.isbn);

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  React.useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  const readStatusdrawerUrl =
    currentUrl + `${currentUrl?.includes("?") ? "&" : "?"}isbn=${isbn}&currentReadStatus=${currentReadStatus}&read-status-drawer=true`;

  const { trigger: updateBookStatusTrigger, isMutating } = useSWRMutation(API_PROFILE, (key, { arg }) =>
    updateBookFromShelf(isbn, "want", kakaoBook, currentReadStatus)
  );

  const handleAddBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateBookStatusTrigger();
  };

  return (
    <Box sx={sxWantToReadButton}>
      {authState.state === "loading" || (authState.state === "loaded" && authState.isLoggedIn === false) ? (
        <Button
          type="submit"
          className="wtr_button"
          variant="contained"
          color="secondary"
          endIcon={<ExpandMoreIcon />}
          href={LOGIN_PATH}
          style={{ pointerEvents: authState.state === "loading" ? "none" : "auto" }}
          component={NextLink}
        >
          읽고싶어요
        </Button>
      ) : currentReadStatus === READ_STATUS.unread ? (
        <Box component="form" onSubmit={handleAddBookSubmit}>
          <Button
            type="submit"
            className="wtr_button btn_drawer_border"
            variant="contained"
            color="secondary"
            // disabled={isPending}
            endIcon={
              isMutating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <NextLink href={readStatusdrawerUrl} passHref legacyBehavior>
                  <ExpandMoreIcon />
                </NextLink>
              )
            }
          >
            읽고싶어요
          </Button>
        </Box>
      ) : (
        <NextLink href={readStatusdrawerUrl} passHref legacyBehavior>
          <Button
            className="wtr_button btn_read_status btn_drawer_border"
            variant="contained"
            startIcon={<DoneIcon />}
            endIcon={isMutating ? <CircularProgress size={20} color="inherit" /> : <ExpandMoreIcon color="action" />}
            disabled={isMutating}
            type="button"
          >
            {READ_STATUS_TEXT[currentReadStatus]}
            {/* {readStatus === READ_STATUS.read ? '읽음' : {readStatus === READ_STATUS.reading ? '읽는 중' } */}
          </Button>
        </NextLink>
      )}
    </Box>
  );
};

export default WantToReadButton;

const sxWantToReadButton: SxProps = {
  textAlign: "center",

  ".wtr_button": {
    width: "160px",
    justifyContent: "flex-start",
    padding: "0 4px 0 16px",

    "> .MuiButton-endIcon": {
      padding: "8px 10px",
      marginLeft: "auto",
      cursor: "pointer",
    },
    "&.btn_drawer_border > .MuiButton-endIcon": {
      borderLeft: "1px solid #555",
    },
    "&.btn_read_status": {
      bgcolor: "primary.light",
      color: "#333333",
    },
  },
};

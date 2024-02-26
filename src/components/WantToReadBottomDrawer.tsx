import React, { useState } from "react";
import NextLink from "next/link";
import useSWRMutation from "swr/mutation";

import DoneIcon from "@mui/icons-material/Done";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Box, Button, CircularProgress, Drawer, List, ListItem, ListItemButton, SxProps, Theme } from "@mui/material";

import { updateBookFromShelf } from "@/lib/firebase/firestore";
import { extractISBN } from "@/lib/utils";
import { LOGIN_PATH } from "@/constants/routes";
import { READ_STATUS, READ_STATUS_TEXT } from "@/constants/values";
import { AuthState } from "@/types/exportType";

interface Props {
  kakaoBook: IKakaoBook;
  readStatus: IBookReadStatus;
  authState: AuthState;
}
const WantToReadBottomDrawer = ({ kakaoBook, readStatus, authState }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { trigger: updateBookStatusTrigger, isMutating } = useSWRMutation(
    "user",
    (key, { arg }: { arg: { bookId: string; status: IBookReadStatus; booInfo?: IKakaoBook } }) =>
      updateBookFromShelf(arg.bookId, arg.status, arg.booInfo)
  );

  const toggleDrawer = (status: boolean) => () => {
    setOpen(status);
  };

  const handleAddBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("handleAddBookSubmit");
    await updateBookStatusTrigger({ bookId: extractISBN(kakaoBook.isbn), status: "want", booInfo: kakaoBook });
  };

  const handleUpdateReadStatus = (status: IBookReadStatus) => async () => {
    setOpen(false);
    await updateBookStatusTrigger({ bookId: extractISBN(kakaoBook.isbn), status });
  };

  return (
    <Box sx={sxWantToReadBottomDrawer}>
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
      ) : readStatus === READ_STATUS.unread ? (
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
                <ExpandMoreIcon
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDrawer(true)();
                  }}
                />
              )
            }
          >
            읽고싶어요
          </Button>
        </Box>
      ) : (
        <Button
          className="wtr_button btn_read_status btn_drawer_border"
          variant="contained"
          startIcon={<DoneIcon />}
          endIcon={isMutating ? <CircularProgress size={20} color="inherit" /> : <ExpandMoreIcon color="action" />}
          onClick={toggleDrawer(true)}
          disabled={isMutating}
        >
          {READ_STATUS_TEXT[readStatus]}
          {/* {readStatus === READ_STATUS.read ? '읽음' : {readStatus === READ_STATUS.reading ? '읽는 중' } */}
        </Button>
      )}

      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        // transitionDuration={500}
      >
        {/* Bottom Sheet 내용 */}
        {/* Your Bottom Sheet Content Goes Here */}
        <List sx={slideUpMenuList}>
          <ListItemButton component="li" selected={readStatus === "want"} onClick={handleUpdateReadStatus("want")}>
            읽고 싶어요
          </ListItemButton>
          <ListItemButton component="li" selected={readStatus === "reading"} onClick={handleUpdateReadStatus("reading")}>
            현재 읽는 중
          </ListItemButton>
          <ListItemButton component="li" selected={readStatus === "read"} onClick={handleUpdateReadStatus("read")}>
            읽음
          </ListItemButton>
          <ListItemButton component="li" onClick={handleUpdateReadStatus("unread")}>
            책장에서 빼기
          </ListItemButton>
          <ListItem component="li">
            <Button startIcon={<LibraryBooksIcon />} component={NextLink} href="#">
              전체 책장 보기
              {/* <Link href='#' color="secondary">전체 책장 보기</Link> */}
            </Button>
            <Button color="secondary" startIcon={<CloseIcon />}>
              닫기
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default WantToReadBottomDrawer;

const sxWantToReadBottomDrawer: SxProps = {
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

const slideUpMenuList: SxProps<Theme> = (theme) => ({
  paddingBottom: "0",
  backgroundColor: theme.palette.primary.light,

  "> li": {
    height: "48px",
    justifyContent: "center",
    color: "#000000",
    boxShadow: "0 -1px 0 0 #bfbfbc",
    ":first-child": {
      boxShadow: "0 -3px 4px rgba(0,0,0,0.2)",
    },
    ":last-child": {
      justifyContent: "space-between",
      "> .MuiButtonBase-root": {
        padding: "4px 0",
        color: "#000000",
      },
    },
  },
  "> li.Mui-selected": {
    backgroundColor: "#e3e4dd",
    boxShadow: "inset 0 0 4px rgba(0,0,0,0.6)",
    fontWeight: "bold",
  },
});

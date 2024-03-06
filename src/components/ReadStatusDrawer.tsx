"use client";
import { useSearchParams, usePathname, useRouter, notFound, useParams } from "next/navigation";
import NextLink from "next/link";
import { useAuth } from "./AuthProvider";
import { Button, Drawer, List, ListItem, ListItemButton, SxProps, Theme } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import useSWRMutation from "swr/mutation";
import { updateBookFromShelf } from "@/lib/firebase/firestore";
import { API_PROFILE } from "@/constants/routes";
import { fetchKakaoBooks } from "@/lib/kakaobook";
import { mutate } from "swr";

function ReadStatusDrawer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isbn = searchParams.get("isbn");
  const currentReadStatus = searchParams.get("currentReadStatus") as IBookReadStatus | null;
  const open = searchParams.get("read-status-drawer");

  if (open && (!isbn || !currentReadStatus)) {
    notFound();
  }

  const { trigger: updateBookStatusTrigger, isMutating } = useSWRMutation(
    API_PROFILE,
    (key, { arg }: { arg: { nextReadStatus: IBookReadStatus; kakaoBook: IKakaoBook } }) =>
      updateBookFromShelf(isbn!, arg.nextReadStatus, arg.kakaoBook, currentReadStatus!)
  );

  const { state, isLoggedIn, user } = useAuth();

  const handleDrawerClose = () => {
    router.back();
  };

  const handleUpdateReadStatus = (nextReadStatus: IBookReadStatus) => async () => {
    if (nextReadStatus === "unread" && !confirm("이 도서를 책장에서 제거하신다면 관련된 평점, 리뷰, 읽기 활동도 같이 삭제됩니다.")) {
      return;
    }

    const kakaoBookResponse = await fetchKakaoBooks({ query: isbn!, target: "isbn", size: 1 });
    if (kakaoBookResponse.meta.total_count === 0) throw Error("도서를 조회할 수 없습니다.");

    await updateBookStatusTrigger({ nextReadStatus, kakaoBook: kakaoBookResponse.documents[0] });
    // udpate   후 캐싱처리
    mutate((key) => typeof key === "string" && key.startsWith(API_PROFILE), undefined, { revalidate: true });

    router.back();
  };

  return (
    <Drawer
      anchor="bottom"
      open={!!open}
      onClose={handleDrawerClose}
      // transitionDuration={500}
    >
      {/* Bottom Sheet 내용 */}
      {/* Your Bottom Sheet Content Goes Here */}
      <List sx={sxSlideUpMenuList}>
        <ListItemButton component="li" selected={currentReadStatus === "want"} onClick={handleUpdateReadStatus("want")}>
          읽고 싶어요
        </ListItemButton>
        <ListItemButton component="li" selected={currentReadStatus === "reading"} onClick={handleUpdateReadStatus("reading")}>
          현재 읽는 중
        </ListItemButton>
        <ListItemButton component="li" selected={currentReadStatus === "read"} onClick={handleUpdateReadStatus("read")}>
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
          <Button color="secondary" startIcon={<CloseIcon />} onClick={handleDrawerClose}>
            닫기
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}
export default ReadStatusDrawer;

const sxSlideUpMenuList: SxProps<Theme> = (theme) => ({
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

"use client";

import { Box, Button, List, ListItem, SxProps, Typography } from "@mui/material";
import SearchBookItem from "./SearchBookItem";
import { useState, useTransition } from "react";
import { getKakaoBooks } from "@/actions/getKakaoBooks";
import { extractISBN } from "@/lib/utils";
import useUserSession from "@/hooks/useUserSession";

const sxSearchBookList: SxProps = {
  "li.MuiCard-root:last-child": {
    boxShadow: "none",
  },

  ".load_more_wrapper": {
    padding: "12px",
  },
};

interface Props {
  query: string;
  kakaoBooksResult: IKakaoBookApiResponse;
}

const PAGE_OFFSET = 2;
const SIZE_PER_PAGE = 10;
export default function SearchBookList({ query, kakaoBooksResult }: Props) {
  const booksRead = ["9788947547567"];
  const { loadedUser } = useUserSession();
  // const userProfile = currentUser && (await getProfile());

  const initialKakaoBooks = kakaoBooksResult.documents;
  const [nextPage, setNextPage] = useState(PAGE_OFFSET);
  const [kakaoBooks, setKakaoBooks] = useState(initialKakaoBooks);
  const [isPending, startTransition] = useTransition();

  const loadMoreBooks = async () => {
    const nextkakaoBooksResult = await getKakaoBooks({ query, page: nextPage, size: SIZE_PER_PAGE });
    setKakaoBooks([...kakaoBooks, ...nextkakaoBooksResult.documents]);
    setNextPage(nextPage + 1);
  };

  return (
    <Box sx={sxSearchBookList}>
      <Typography component="h2" fontWeight={500} padding="12px">
        "{query}" 검색 시 {kakaoBooksResult.meta.pageable_count.toLocaleString()}개의 결과
      </Typography>

      <ul>
        {kakaoBooks.map((doc) => (
          <SearchBookItem
            kakaoBook={doc}
            key={doc.isbn + doc.datetime}
            readStatus={!!booksRead?.includes(extractISBN(doc.isbn))}
            isLoggedIn={!!loadedUser}
          />
        ))}
      </ul>

      <div className="load_more_wrapper">
        {kakaoBooksResult.meta.is_end === false && (
          <Button
            fullWidth
            sx={{ bgcolor: "primary.light", color: "#181818", ":hover": { bgcolor: "primary.light" }, boxShadow: 1 }}
            onClick={() => startTransition(loadMoreBooks)}
            disabled={isPending}
          >
            {isPending ? "불러오는 중..." : "더 보기"}
          </Button>
        )}
      </div>
    </Box>
  );
}

"use client";

import { Box, Button, SxProps, Typography } from "@mui/material";
import SearchBookItem from "./SearchBookItem";
import { useState, useTransition } from "react";
import { getKakaoBooks } from "@/actions/getKakaoBooks";
import { extractISBN, getReadStatus } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import useSWR from "swr";
import { getProfile } from "@/lib/firebase/firestore";
import { API_PROFILE } from "@/constants/routes";

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
  const { state, isLoggedIn } = useAuth();
  const { data: userData } = useSWR(state === "loaded" && isLoggedIn ? API_PROFILE : null, getProfile);

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
            key={doc.isbn + doc.datetime}
            kakaoBook={doc}
            currentReadStatus={getReadStatus(extractISBN(doc.isbn), userData)}
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

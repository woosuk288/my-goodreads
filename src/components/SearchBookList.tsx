"use client";

import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

import { Box, Button, SxProps, Typography } from "@mui/material";

import SearchBookItem from "./SearchBookItem";
import { extractISBN, getReadStatus } from "@/lib/utils";
import { useAuth } from "./AuthProvider";

import { getProfile } from "@/lib/firebase/firestore";
import { API_KAKAOBOOK, API_PROFILE } from "@/constants/routes";
import { fetchKakaoBooks } from "@/lib/kakaobook";

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

export default function SearchBookList({ query, kakaoBooksResult }: Props) {
  const { state, isLoggedIn } = useAuth();
  const { data: userData } = useSWR(state === "loaded" && isLoggedIn ? API_PROFILE : null, getProfile);

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.meta.is_end) return null; // 끝에 도달
      return [API_KAKAOBOOK, query, pageIndex + 1]; // SWR 키
    },
    ([_, query, page]) => {
      return fetchKakaoBooks({ query, page });
    },
    { fallbackData: [kakaoBooksResult] }
  );

  const loadMoreBooks = () => setSize(size + 1);

  return (
    <Box sx={sxSearchBookList}>
      <Typography component="h2" fontWeight={500} padding="12px">
        "{query}" 검색 시 {kakaoBooksResult.meta.pageable_count.toLocaleString()}개의 결과
      </Typography>

      <ul>
        {data?.map((result) =>
          result.documents.map((doc) => (
            <SearchBookItem
              key={doc.isbn + doc.datetime}
              kakaoBook={doc}
              currentReadStatus={getReadStatus(extractISBN(doc.isbn), userData)}
              hideElements={{ ratingEl: false }}
            />
          ))
        )}
      </ul>

      <div className="load_more_wrapper">
        {kakaoBooksResult.meta.is_end === false && (
          <Button
            fullWidth
            sx={{ bgcolor: "primary.light", color: "#181818", ":hover": { bgcolor: "primary.light" }, boxShadow: 1 }}
            onClick={loadMoreBooks}
            disabled={isLoading}
          >
            {isLoading ? "불러오는 중..." : "더 보기"}
          </Button>
        )}
      </div>
    </Box>
  );
}

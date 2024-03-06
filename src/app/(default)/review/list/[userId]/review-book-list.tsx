"use client";

import { useAuth } from "@/components/AuthProvider";
import BookPageHeading from "@/components/BookPageHeading";
import LoadingProgress from "@/components/LoadingProgress";
import SearchBookItem from "@/components/SearchBookItem";
import { API_PROFILE, API_SHELVES } from "@/constants/routes";
import { READ_STATUS_TEXT } from "@/constants/values";
import { getBooksFromShelf, getProfile } from "@/lib/firebase/firestore";
import { getReadStatus } from "@/lib/utils";
import { Box } from "@mui/material";
import useSWR from "swr";

interface Props {
  uid: string;
  readStatus: IBookReadStatus;
  profile: IUser;
}
function ReviewBookList({ uid, readStatus }: Props) {
  const { state, isLoggedIn } = useAuth();
  const { data: profileData } = useSWR(API_PROFILE, getProfile);
  const { data: booksData, isLoading } = useSWR(`${API_SHELVES}/${uid}?shelf=${readStatus}`, () => getBooksFromShelf(uid, readStatus));

  if (isLoading) return <LoadingProgress />;

  return (
    <Box sx={{ padding: "12px 0", ".heading_wrapper": { marginBottom: "16px" } }}>
      <div className="heading_wrapper">
        <BookPageHeading title={`내 서재: ${READ_STATUS_TEXT[readStatus]}`} component="h1" />
      </div>
      <ul>
        {booksData?.docs.map((doc) => (
          <SearchBookItem
            key={doc.id}
            kakaoBook={doc.data().kakaoBook}
            currentReadStatus={getReadStatus(doc.id, profileData)}
            authState={{ state, isLoggedIn }}
          />
        ))}
      </ul>
    </Box>
  );
}
export default ReviewBookList;

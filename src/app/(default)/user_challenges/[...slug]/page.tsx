import { getBooksFromShelf, getChallenge } from "@/lib/firebase/firestore";
import UserChallengesMain from "./user_challenges-main";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CHALLENGES_PATH } from "@/constants/routes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Challenges",
};

export default async function page({ params }: { params: { slug: Array<string> } }) {
  const uid = params.slug[0];
  const year = params.slug[1];
  const challegeSnap = await getChallenge(uid, year);
  const thisYearReadBooksSnap = await getBooksFromShelf(uid, "read", year);

  if (!uid || !year) notFound();
  if (!challegeSnap.exists()) redirect(CHALLENGES_PATH);

  return (
    <>
      <UserChallengesMain
        challege={{ id: challegeSnap.id, ...challegeSnap.data() }}
        thisYearReadBooks={thisYearReadBooksSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))}
      />
    </>
  );
}

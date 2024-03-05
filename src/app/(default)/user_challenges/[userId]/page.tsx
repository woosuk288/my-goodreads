import { getChallenge } from "@/lib/firebase/firestore";
import UserChallengesMain from "./user_challenges-main";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Challenges",
};

export default async function page({ params, searchParams }: { params: { uid: string }; searchParams: { year: string } }) {
  const challegeSnap = await getChallenge(params.uid, searchParams.year);

  return <UserChallengesMain />;
}

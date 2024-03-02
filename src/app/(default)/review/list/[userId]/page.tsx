import { notFound } from "next/navigation";
import ReviewList from "./review-list";
import { getProfileById } from "@/lib/firebase/firestore";

export default async function page({ params }: { params: { userId: string } }) {
  const profile = await getProfileById(params.userId);

  if (!profile) notFound();

  return (
    <div>
      <ReviewList profile={profile} />
    </div>
  );
}

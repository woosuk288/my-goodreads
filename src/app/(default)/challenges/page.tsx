import SignUpBanner from "@/components/SignUpBanner";
import { Metadata } from "next";
import ChallengesMain from "./challenges-main";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Challenges",
};

export default function page() {
  return (
    <div>
      <SignUpBanner />
      <ChallengesMain />
    </div>
  );
}

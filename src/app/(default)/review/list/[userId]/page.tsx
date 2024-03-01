import { notFound } from "next/navigation";
import ReviewList from "./review-list";

export default function page() {
  return (
    <div>
      <ReviewList />
    </div>
  );
}

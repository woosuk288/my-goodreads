import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
};

// Import your Client Component
import HomeMain from "./home-main";
import { fetchPopularBooks } from "@/lib/data4library";
import { getFormattedPreviousDate } from "@/lib/utils";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  console.log("posts : ", posts.length);
  return posts;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const popularBooks = await fetchPopularBooks({ pageNo: 1, pageSize: 10, startDt: getFormattedPreviousDate("month") });
  // Forward fetched data to your Client Component
  return <HomeMain popularBooksResponse={popularBooks} />;
}

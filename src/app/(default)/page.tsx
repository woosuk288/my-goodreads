import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
};

// Import your Client Component
import HomeMain from "./home-main";
import { fetchHotTrendBooks, fetchPopularBooks } from "@/lib/data4library";
import { getCurrentDate, getFormattedPreviousDate } from "@/lib/utils";
import { fetchAladinItemList } from "@/lib/aladin";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  console.log("posts : ", posts.length);
  return posts;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const popularBooksReponse = await fetchPopularBooks({
    from_age: 20,
    to_age: 40,
    pageNo: 1,
    pageSize: 30,
    startDt: getFormattedPreviousDate("month"),
  });
  const newSepcialBooksResponse = await fetchAladinItemList({
    QueryType: "ItemNewSpecial",
    MaxResults: 30,
    Start: 1,
    SearchTarget: "Book",
    Version: "20131101",
    Cover: "Big",
  });
  const bloggerBestSellerResponse = await fetchAladinItemList({
    QueryType: "Bestseller",
    MaxResults: 30,
    Start: 1,
    SearchTarget: "Book",
    Version: "20131101",
    Cover: "Big",
  });
  // const hotTrendBooksResponse = await fetchHotTrendBooks({ startDt: getCurrentDate() });
  // Forward fetched data to your Client Component
  return (
    <HomeMain
      popularBooksResponse={popularBooksReponse}
      newSepcialBooksResponse={newSepcialBooksResponse}
      bloggerBestSellerResponse={bloggerBestSellerResponse}
      // hotTrendBooksResponse={hotTrendBooksResponse}
    />
  );
}

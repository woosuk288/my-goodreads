import { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Goodreads | Meet your next favorite book",
  description:
    "Find and read more books you’ll love, and keep track of the books you want to read. Be part of the world’s largest community of book lovers on Goodreads.",
};

// Import your Client Component
import HomeMain from "./home-main";
import { fetchHotTrendBooks, fetchPopularBooks } from "@/lib/data4library";
import { getCurrentDate, getFormattedPreviousDate } from "@/lib/utils";
import { fetchAladinItemList } from "@/lib/aladin";

// async function getPosts() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await res.json();
//   console.log("posts : ", posts.length);
//   return posts;
// }

export default async function Page() {
  // Fetch data directly in a Server Component
  const popularBooksPromise = fetchPopularBooks({
    from_age: 20,
    to_age: 40,
    pageNo: 1,
    pageSize: 30,
    startDt: getFormattedPreviousDate("month"),
  });
  const newSepcialBooksPromise = fetchAladinItemList({
    QueryType: "ItemNewSpecial",
    MaxResults: 30,
    Start: 1,
    SearchTarget: "Book",
    Version: "20131101",
    Cover: "Big",
  });
  const bloggerBestSellerPromise = fetchAladinItemList({
    QueryType: "Bestseller",
    MaxResults: 30,
    Start: 1,
    SearchTarget: "Book",
    Version: "20131101",
    Cover: "Big",
  });
  const [popularBooksResponse, newSepcialBooksResponse, bloggerBestSellerResponse] = await Promise.all([
    popularBooksPromise,
    newSepcialBooksPromise,
    bloggerBestSellerPromise,
  ]);

  // const hotTrendBooksResponse = await fetchHotTrendBooks({ startDt: getCurrentDate() });
  // Forward fetched data to your Client Component
  return (
    <HomeMain
      popularBooksResponse={popularBooksResponse}
      newSepcialBooksResponse={newSepcialBooksResponse}
      bloggerBestSellerResponse={bloggerBestSellerResponse}
      // hotTrendBooksResponse={hotTrendBooksResponse}
    />
  );
}

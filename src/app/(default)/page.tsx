import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

// Import your Client Component
import HomeMain from "./home-main";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  console.log("posts : ", posts);
  return posts;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return <HomeMain />;
}

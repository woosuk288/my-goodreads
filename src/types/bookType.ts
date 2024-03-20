type IBookReadStatus = "want" | "reading" | "read" | "unread";

interface IBook {
  numRatings: number;
  sumRating: number;
  avgRating: number;
  numReviews: number;
}

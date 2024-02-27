interface IRating {
  bookId: string;
  rating?: number | null;
  reviewText?: string;
  isSpoiler?: boolean;
  uid: string;
}

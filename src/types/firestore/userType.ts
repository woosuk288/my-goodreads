interface IUser {
  username: string;
  email: string;
  photoURL: string;
  booksWant?: Array<string>;
  booksReading?: Array<string>;
  booksRead?: Array<string>;
  reviews?: Array<string>;
}

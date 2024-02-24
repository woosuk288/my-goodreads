import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  arrayUnion,
  setDoc,
  deleteDoc,
  DocumentData,
  CollectionReference,
  arrayRemove,
  writeBatch,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase/firebase";

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

const COL_USERS = createCollection<IUser>("users");
const COL_BOOKS = createCollection<IKakaoBook>("books");
const COL_SHELVS = createCollection<IKakaoBookTest>("shelves");
const COL_REVIEWS = "reviews";
const COL_SHELF_BOOKS = (shelfId: string) => createCollection<IKakaoBook>("shelves/" + shelfId + "/books");

/**
 * 로그인시 관리자단 유저 있는지 확인해서 users에 문서 추가
 */

/**
 * 사용자 기본 정보 가져오기
 */
export async function getProfile(): Promise<IUser | undefined> {
  const userRef = doc(COL_USERS, auth.currentUser?.uid);
  const user = await getDoc(userRef);
  return user.data();
}

/**
 * 책 읽기 상태 CRUD
 */
export async function updateBookFromShelf(bookId: string, bookStatus: IBookReadStatus, bookInfo?: IKakaoBook) {
  const userRef = doc(COL_USERS, auth.currentUser?.uid);

  const bookShelvRef = doc(COL_SHELF_BOOKS(auth.currentUser?.uid!), bookId);
  const batch = writeBatch(db);

  if (bookStatus === "want") {
    batch.update(userRef, { booksWant: arrayUnion(bookId), booksReading: arrayRemove(bookId), booksRead: arrayRemove(bookId) });
    batch.set(bookShelvRef, bookInfo, { merge: true });
    await batch.commit();
  } else if (bookStatus === "reading") {
    await updateDoc(userRef, { booksWant: arrayRemove(bookId), booksReading: arrayUnion(bookId), booksRead: arrayRemove(bookId) });
  } else if (bookStatus === "read") {
    await updateDoc(userRef, { booksWant: arrayRemove(bookId), booksReading: arrayRemove(bookId), booksRead: arrayUnion(bookId) });
  }
  //unread (삭제)
  else {
    batch.update(userRef, { booksWant: arrayRemove(bookId), booksReading: arrayRemove(bookId), booksRead: arrayRemove(bookId) });
    batch.delete(bookShelvRef);
    await batch.commit();
  }
  //TODO: shelves 여러개 일 때 하위컬렉션에서 찾아서 전부 삭제
}

/**
 * 책장에 책 추가
 * 컬렉션 - shelves
 * 문서 ID - 고유 id 생성 (책장 없으면 책 전체 조회)
 */

// export async function getRestaurants(filters = {}) {
//   let q = query(collection(db, "restaurants"));

//   q = applyQueryFilters(q, filters);
//   const results = await getDocs(q);
//   return results.docs.map((doc) => {
//     return {
//       id: doc.id,
//       ...doc.data(),
//       // Only plain objects can be passed to Client Components from Server Components
//       timestamp: doc.data().timestamp.toDate(),
//     };
//   });
// }

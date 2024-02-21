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
const COL_SHELF_BOOKS = (shelfId: string) => createCollection<IKakaoBook>("shelvs" + shelfId + "books");

/**
 * 로그인시 관리자단 유저 있는지 확인해서 users에 문서 추가
 */

/**
 * 사용자 기본 정보 가져오기
 */
export async function getProfile(): Promise<IUser | undefined> {
  const userRef = doc(COL_USERS);
  const user = await getDoc(userRef);
  return user.data();
}

/**
 * 책 읽기 목록에 추가
 */

export async function addBookToShelf(bookId: string, bookInfo: IKakaoBook) {
  if (!auth.currentUser) return;

  const userRef = doc(COL_USERS, auth.currentUser.uid);
  await updateDoc(userRef, { booksRead: arrayUnion(bookId) });
  const bookShelvRef = doc(COL_SHELF_BOOKS(auth.currentUser.uid), bookId);
  // const bookShelvRef = doc(COL_SHELVS, auth.currentUser.uid, COL_BOOKS, bookId);
  await setDoc(bookShelvRef, bookInfo, { merge: true });
}

export async function removeBookFromShelf(bookId: string) {
  if (!auth.currentUser) return;

  const userRef = doc(COL_USERS, auth.currentUser.uid);
  await updateDoc(userRef, { booksRead: arrayUnion(bookId) });

  // const bookShelvRef = doc(COL_SHELVS, auth.currentUser.uid, COL_BOOKS, bookId);
  // await deleteDoc(bookShelvRef);
  //TODO: shelves 여러개 일 때 하위컬렉션에서 찾아서 전부 삭제

  console.log("delete 완료");
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

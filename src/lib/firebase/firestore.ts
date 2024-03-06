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
  limit,
  Transaction,
  DocumentReference,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase/firebase";

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

const COL_USERS = createCollection<IUser>("users");
const COL_BOOKS = createCollection<IBook>("books");
// const COL_SHELVS = createCollection<IShelf>("shelves");
// const COL_REVIEWS = createCollection<IRating>("reviews");
const COL_SHELF_BOOKS = (shelfId: string) => createCollection<IShelfBook>("shelves/" + shelfId + "/books");
const COL_BOOK_RATINGS = (bookId: string) => createCollection<IRating>("books/" + bookId + "/ratings");
const COL_CHALLENGES = createCollection<IChallenge>("challenges");

// auth middleware?
const authUser = () => {
  if (!auth.currentUser) throw Error("로그인이 필요합니다.");
  return auth.currentUser;
};
const createdAt = () => ({ createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
const updatedAt = () => ({ updatedAt: serverTimestamp() });

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

// TODO: private 분리
export async function getProfileById(uid: string): Promise<IUser | undefined> {
  const userRef = doc(COL_USERS, uid);
  const user = await getDoc(userRef);
  return user.data();
}

/**
 * 책 읽기 상태 CRUD
 */
export async function getBooksFromShelf(uid: string, readStatus: IBookReadStatus) {
  const q = query(COL_SHELF_BOOKS(uid), where("readStatus", "==", readStatus), limit(10));

  const result = await getDocs(q);

  return result;
}
export async function updateBookFromShelf(
  bookId: string,
  readStatus: IBookReadStatus,
  kakaoBook: IKakaoBook,
  currentReadStatus: IBookReadStatus
) {
  const userRef = doc(COL_USERS, auth.currentUser?.uid);

  const bookShelvRef = doc(COL_SHELF_BOOKS(auth.currentUser?.uid!), bookId);
  const batch = writeBatch(db);

  const bookshelfData = {
    kakaoBook,
    readStatus,
    ...(currentReadStatus === "unread" ? createdAt() : updatedAt()),
  };

  if (readStatus === "want") {
    batch.update(userRef, {
      booksWant: arrayUnion(bookId),
      booksReading: arrayRemove(bookId),
      booksRead: arrayRemove(bookId),
      ...updatedAt(),
    });
    batch.set(bookShelvRef, bookshelfData, { merge: true });
  } else if (readStatus === "reading") {
    batch.update(userRef, { booksWant: arrayRemove(bookId), booksReading: arrayUnion(bookId), booksRead: arrayRemove(bookId) });
    batch.set(bookShelvRef, bookshelfData, { merge: true });
  } else if (readStatus === "read") {
    batch.update(userRef, { booksWant: arrayRemove(bookId), booksReading: arrayRemove(bookId), booksRead: arrayUnion(bookId) });
    batch.set(bookShelvRef, bookshelfData, { merge: true });
  }
  //unread (삭제)
  else {
    await updateRating(bookId, null);
    batch.update(userRef, {
      booksWant: arrayRemove(bookId),
      booksReading: arrayRemove(bookId),
      booksRead: arrayRemove(bookId),
      ...updatedAt(),
    });
    batch.delete(bookShelvRef);
    const ratingDocRef = doc(COL_BOOK_RATINGS(bookId), auth.currentUser?.uid);
    batch.delete(ratingDocRef);
  }
  await batch.commit();
  //TODO: shelves 여러개 일 때 하위컬렉션에서 찾아서 전부 삭제
}

/**
 * 책장에 책 추가
 * 컬렉션 - shelves
 * 문서 ID - 고유 id 생성 (책장 없으면 책 전체 조회)
 */

/**
 * 리뷰(review)
 */
export async function getReviewById(reviewId: string) {}

/**
 * TODO: 리뷰 작성할 때만 가지고 오는거니 bookId만 사용해도 되려나?
 */
export async function getReviewByBookAndUser(bookId: string, uid: string): Promise<IRating | null> {
  const q = query(COL_BOOK_RATINGS(bookId), where("uid", "==", uid), limit(1));

  const results = await getDocs(q);
  if (results.empty) {
    return null;
  }

  return results.docs[0].data();
}

/**
 * 책 평가하기
 * TODO: 계산 로직 테스트 검증? (평점 주기 -> null -> 평점 다시주기)
 */

export async function updateRating(bookId: string, rating: number | null) {
  const uid = auth.currentUser?.uid;
  const bookDocRef = doc(COL_BOOKS, bookId);
  const ratingDocRef = doc(COL_BOOK_RATINGS(bookId), uid);

  await runTransaction(db, async (transaction) => {
    const bookSnap = await transaction.get(bookDocRef);
    const ratingSnap = await transaction.get(ratingDocRef);

    const bookData = bookSnap.data();
    let newNumRatings = bookData?.numRatings ? bookData.numRatings + 1 : 1;
    let newSumRating = (bookData?.sumRating || 0) + Number(rating);
    // rating이 기존에 있었으면 누적안되도록 이전 평점 빼주기
    if (ratingSnap.exists()) {
      const prevRating = ratingSnap.data().rating;
      if (rating === null) {
        // 평점 취소 case
        newNumRatings = newNumRatings - 2;
      } else if (prevRating !== null) {
        newNumRatings = newNumRatings - 1;
      }
      newSumRating = newSumRating - (prevRating ?? 0);
    }
    const newAverage = newNumRatings === 0 ? 0 : newSumRating / newNumRatings;

    transaction.set(
      bookDocRef,
      {
        numRatings: newNumRatings,
        sumRating: newSumRating,
        avgRating: newAverage,
        ...(bookSnap.exists() ? createdAt() : updatedAt()),
      },
      { merge: true }
    );

    transaction.set(
      ratingDocRef,
      {
        bookId,
        rating,
        uid: auth.currentUser?.uid,
        ...(ratingSnap.exists() ? createdAt() : updatedAt()),
        // timestamp: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    );
  });
}

/**
 * 리뷰 작성하기
 *
 */
export async function addReviewToBook(bookId: string, reviewText: string, isSpoiler?: boolean) {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("No user ID has been provided.");
  }
  if (!bookId) {
    throw new Error("No restaurant ID has been provided.");
  }

  if (!reviewText) {
    throw new Error("A valid review has not been provided.");
  }

  try {
    const ratingDocRef = doc(COL_BOOK_RATINGS(bookId), uid);
    await setDoc(
      ratingDocRef,
      {
        bookId,
        reviewText,
        isSpoiler,
        uid,
        ...updatedAt(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("There was an error adding the rating to the restaurant", error);
    throw error;
  }
}

/**
 * 리뷰 삭제하기
 */

export async function deleteReviewFromBook(bookId: string) {
  const ratingDocRef = doc(COL_BOOK_RATINGS(bookId), auth.currentUser?.uid);
  await setDoc(ratingDocRef, { reviewText: "" }, { merge: true });
}

/**
 * 도전(challenge)
 */

export async function updateChallenge(readingGoal: number, year: string) {
  try {
    const challegeRef = doc(COL_CHALLENGES, authUser().uid + year);
    return setDoc(challegeRef, { year, readingGoal, uid: authUser().uid, ...updatedAt() }, { merge: true });
  } catch (error) {
    console.error("There was an error updating the goal to the challenge", error);
    throw error;
  }
}

export async function getChallenge(uid: string, year: string) {
  const challegeRef = doc(COL_CHALLENGES, uid + year);
  return getDoc(challegeRef);
}

export async function deleteChallege(year: string) {
  const challegeRef = doc(COL_CHALLENGES, authUser().uid + year);
  return deleteDoc(challegeRef);
}

// export async function getChallenge(uid: string, year: string) {
//   const q = query(COL_CHALLENGES, where('uid', '==', uid), where('year', '==', year), limit(1))
//   const result = await getDocs(q)

//   return result.docs[0]

// }

// const updateWithRating = async (
//   transaction: Transaction,
//   docRef: DocumentReference,
//   newRatingDocument: DocumentReference,
//   review: IRating
// ) => {
//   const restaurant = await transaction.get(docRef);
//   const data = restaurant.data();
//   const newNumRatings = data?.numRatings ? data.numRatings + 1 : 1;
//   const newSumRating = (data?.sumRating || 0) + Number(review.rating);
//   const newAverage = newSumRating / newNumRatings;

//   transaction.update(docRef, {
//     numRatings: newNumRatings,
//     sumRating: newSumRating,
//     avgRating: newAverage,
//   });

//   transaction.set(newRatingDocument, {
//     ...review,
//     timestamp: Timestamp.fromDate(new Date()),
//   });
// };

// export async function addReviewToBook(bookId: string, review: IRating) {
//   // 현재는 일단 안씀
//   if (!bookId) {
//     throw new Error("No restaurant ID has been provided.");
//   }

//   if (!review) {
//     throw new Error("A valid review has not been provided.");
//   }

//   try {
//     const docRef = doc(COL_BOOKS, bookId);
//     const newRatingDocument = doc(COL_BOOK_RATINGS(bookId));

//     // corrected line
//     await runTransaction(db, (transaction) => updateWithRating(transaction, docRef, newRatingDocument, review));
//   } catch (error) {
//     console.error("There was an error adding the rating to the restaurant", error);
//     throw error;
//   }
// }

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

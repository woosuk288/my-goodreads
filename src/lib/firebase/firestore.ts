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
  DocumentSnapshot,
  increment,
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
  if (!auth.currentUser) throw new Error("로그인이 필요합니다.");
  return auth.currentUser;
};
const createdAt = () => ({ createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
const updatedAt = () => ({ updatedAt: serverTimestamp() });

interface IReadDoc {
  updatedAt?: any;
  createdAt?: any;
  [x: string]: any;
}
export async function getPlainObject<T extends IReadDoc>(docRef: DocumentReference<T, DocumentData>) {
  const doc = await getDoc(docRef);

  if (doc.exists() && doc.data()) {
    const docData = doc.data();
    const updatedAt =
      typeof docData.updatedAt === "object" && docData.updatedAt?.toDate ? docData.updatedAt.toDate().toISOString() : docData.updatedAt;

    const createdAt = typeof doc.data().createdAt === "object" ? doc.data()?.createdAt?.toDate().toISOString() : doc.data().createdAt;

    return {
      ...doc.data(),
      id: doc.id,
      ...(updatedAt && { updatedAt }),
      ...(createdAt && { createdAt }),
    };
  } else {
    return undefined;
  }
}

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
  return getPlainObject(userRef);
}

/**
 * 책 읽기 상태 CRUD
 */
export async function getBooksFromShelf(uid: string, readStatus: IBookReadStatus, year?: string) {
  let q = query(COL_SHELF_BOOKS(uid), where("readStatus", "==", readStatus), limit(10));
  if (year) {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);
    q = query(q, where("updatedAt", ">=", startDate), where("updatedAt", "<=", endDate), orderBy("updatedAt", "desc"));
  }

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
  const d = getDocs(q);

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
    const ratingData = ratingSnap.data();

    let newNumRatings = bookData?.numRatings ?? 0;
    let newSumRating = bookData?.sumRating ?? 0;

    // 생성 case
    if ((ratingData?.rating ?? null) === null && rating) {
      newNumRatings += 1;
      newSumRating += Number(rating);
    }
    // 수정 case
    else if (ratingData?.rating && rating) {
      newSumRating = newSumRating - Number(ratingData.rating) + Number(rating);
    }
    // 삭제 case
    else if (ratingData?.rating && rating === null) {
      newNumRatings -= 1;
      newSumRating = newSumRating - Number(ratingData.rating);
    } else {
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
export async function updateReviewFromBook(bookId: string, reviewText: string, isSpoiler?: boolean) {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("No user ID has been provided.");
  }
  if (!bookId) {
    throw new Error("No restaurant ID has been provided.");
  }

  const hasLike = false; // TODO: like, comment 있으면 경고 or 삭제 불가

  if (!reviewText && hasLike) {
    throw new Error("A valid review has not been provided.");
  }

  try {
    const bookDocRef = doc(COL_BOOKS, bookId);
    const ratingDocRef = doc(COL_BOOK_RATINGS(bookId), uid);

    await runTransaction(db, async (transaction) => {
      const bookSnap = await transaction.get(bookDocRef);
      const ratingSnap = await transaction.get(ratingDocRef);
      const bookData = bookSnap.data();
      const ratingData = ratingSnap.data();

      const previousReviewCount = bookData?.numReviews;

      const previousReviewText = ratingData?.reviewText?.trim();
      const currentReviewText = reviewText.trim();

      // 생성
      if (!previousReviewText && currentReviewText) {
        transaction.update(bookDocRef, {
          numReviews: increment(1),
          ...(bookSnap.exists() ? createdAt() : updatedAt()),
        });

        transaction.set(
          ratingDocRef,
          {
            bookId,
            reviewText,
            isSpoiler,
            uid,
            ...(ratingSnap.exists() ? createdAt() : updatedAt()),
          },
          { merge: true }
        );
      }
      // 수정
      else if (previousReviewText && currentReviewText) {
        transaction.set(
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
      }
      // 삭제
      else if (previousReviewText && !currentReviewText) {
        transaction.update(bookDocRef, {
          numReviews: increment(-1),
          ...updatedAt(),
        });
        transaction.set(
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
      } else {
        throw new Error("else case");
      }
    });
  } catch (error) {
    console.error("There was an error adding the rating to the book", error);
    throw new Error("There was an error adding the rating to the book");
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

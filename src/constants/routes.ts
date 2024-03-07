export const HOME_PATH = "/";

export const LOGIN_PATH = "/login";
export const SIGNIN_EMAIL_PATH = "/signin-email";
export const SIGNUP_EMAIL_PATH = "/signup-email";

export const SEARCH_PATH = "/search";
export const BOOK_PATH = "/book";

export const REVIEW_EDIT_PATH = "/review/edit";
export const REVIEW_LIST_PATH = "/review/list";

export const CHALLENGES_PATH = "/challenges";
export const USER_CHALLENGES_PATH = "/user_challenges";

/**
 * SERVER ???
 */

export const API_PROFILE = "/api/profile";
export const API_PROFILE_BY_ID = (uid: string) => "/api/profile/" + uid;
export const API_SHELVES = "/api/shelves";
export const API_CHALLENGE_BY_ID = (uid: string) => "/api/challenge/" + uid;
export const API_RATING = "/api/rating";

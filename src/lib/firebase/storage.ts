import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { storage } from "./firebase";
import { authUser, getProfile } from "./firestore";
import { extractStoragePath } from "../utils";

export const uploadProfilePhoto = async (dataURL: string) => {
  const filePath = "images/profiles/" + authUser().uid;
  const storageRef = ref(storage, filePath);

  try {
    const snapshot = await uploadString(storageRef, dataURL, "data_url");

    const url = await downloadImageURL(filePath);
    if (!url) {
      throw new Error("파일이 존재하지 않습니다.");
    }
    return url;
  } catch (error) {
    throw new Error("파일 업로드 중 오류가 발생!");
  }
};

export const downloadImageURL = async (filePath: string) => {
  // Create a reference to the file we want to download
  const storage = getStorage();
  const starsRef = ref(storage, filePath);

  // Get the download URL
  return getDownloadURL(starsRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      return url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
};

export const deleteFileFromPath = async (urlPath: string) => {
  const filePath = extractStoragePath(urlPath);

  const storageRef = ref(storage, filePath);

  try {
    await deleteObject(storageRef);
  } catch (error) {
    throw new Error("파일을 처리하는 중 오류 발생!");
  }
};

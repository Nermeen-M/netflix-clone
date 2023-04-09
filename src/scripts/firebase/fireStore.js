import {
  doc,
  collection,
  getDoc,
  setDoc,
  collectionGroup,
  query,
} from "firebase/firestore";
import { addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

import { database } from "./firebaseSetup";

export async function createDocument(path, data) {
  let result = { status: false, payload: null, message: "" };

  try {
    const reference = collection(database, path);
    const document = await addDoc(reference, data);
    const payload = document.id;

    result = { status: true, payload: payload, message: "Document created" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

export async function createDocumentWithManualId(collectionName, id, data) {
  let result = { status: false, payload: null, message: "" };
  try {
    const reference = collection(database, collectionName);
    const document = doc(reference, id);

    await setDoc(document, data);

    result = {
      status: true,
      payload: id,
      message: "Document created with manual ID",
    };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

export async function readDocument(path, id) {
  let result = { status: false, payload: null, message: "" };

  try {
    const reference = doc(database, path, id);
    const document = await getDoc(reference);
    const payload = { id: document.id, ...document.data() };

    result = { status: true, payload: payload, message: "Document read" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

export async function readDocuments(path) {
  let result = { status: false, payload: null, message: "" };

  try {
    const reference = collection(database, path);
    const snap = await getDocs(reference);
    const data = snap.docs.map((item) => ({ id: item.id, ...item.data() }));

    result = { status: true, payload: data, message: "Documents read" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

export async function updateDocument(path, id, data) {
  let result = { status: false, payload: null, message: "" };

  try {
    const reference = doc(database, path, id);
    await updateDoc(reference, data);

    result = { status: true, payload: null, message: `Document ${id} updated` };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

export async function deleteDocument(path, id) {
  let result = { status: false, payload: null, message: "" };

  try {
    const reference = doc(database, path, id);
    await deleteDoc(reference);

    result = { status: true, payload: null, message: `Document ${id} deleted` };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

export async function readCollectionGroup(path) {
  let result = { status: false, payload: null, message: "" };

  try {
    const reference = collectionGroup(database, path);
    const snap = await getDocs(reference);
    const data = snap.docs.map((item) => ({ id: item.id, ...item.data() }));

    result = { status: true, payload: data, message: "Documents read" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

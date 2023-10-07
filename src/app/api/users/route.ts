import app from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function POST(req: Request) {
  const db = getFirestore(app);
  const userData = await req
    .json()
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return Response.json({ status: 400, error: e });
    });
  try {
    await setDoc(doc(db, "users", userData.uid), userData);
    return Response.json({ status: 200 });
  } catch (e) {
    return Response.json({ status: 404, error: e });
  }
}

export async function GET(req: Request) {
  const db = getFirestore(app);
  const uid = req.headers.get("uid");

  try {
    if (uid) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return Response.json(docSnap.data());
      } else {
        return Response.json({ status: 404, error: "No such user!" });
      }
    }
  } catch (e) {
    return Response.json({ status: 400, error: e });
  }
}

export async function PUT(req: Request) {
  const db = getFirestore(app);
  // const uid = req.headers.get("uid");
  const userData = await req
    .json()
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return Response.json({ status: 400, error: e });
    });
  try {
    const docRef = doc(db, "users", userData.uid);
    await updateDoc(docRef, { ...userData });
    return Response.json({ status: 200 });
  } catch (e) {
    return Response.json({ status: 404, error: e });
  }
}

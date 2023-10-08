import { useAuthContext } from "@/app/AuthContext";
import { useGlobalContext } from "@/app/GlobalContext";
import app from "@/firebaseConfig";
import axios from "axios";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SingleChat = ({ avatar, name, userUid, unreadCount }) => {
  const router = useRouter();
  const { app } = useGlobalContext();
  const [user, setUser] = useState(null);
  const { currentUser } = useAuthContext();
  // let config = {
  //   method: "get",
  //   url: "http://localhost:3000/api/users",
  //   headers: {
  //     uid: userUid,
  //   },
  // };

  // axios
  //   .request(config)
  //   .then((response) => {
  //     setUser(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // const db = getFirestore(app);
  // const handleSelect = async () => {
  //   //check whether the group(chats in firestore) exists, if not create
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //   try {
  //     const res = await getDoc(doc(db, " ", combinedId));
  //     console.log(combinedId);
  //     console.log(res);

  //     if (!res.exists()) {
  //       console.log("not exists");

  //       //create a chat in chats collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       //create user chats
  //       await updateDoc(doc(db, "userChats", currentUser.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoURL: user.photoUrl,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "userChats", user.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           photoURL: currentUser.photoUrl,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //     console.log(user.uid);

  //     router.push(`/inbox/${combinedId}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <button
        onClick={()=>{
          router.push(`/inbox/someone`)
        }}
        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
      >
        <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
          {avatar}
        </div>
        <div className="ml-2 text-sm font-semibold">{name}</div>
        {unreadCount > 0 && (
          <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
            {unreadCount}
          </div>
        )}
      </button>
    </>
  );
};
export default SingleChat;

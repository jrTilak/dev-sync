"use client";
import { useGlobalContext } from "@/app/GlobalContext";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import ChatList from "./ChatList";
import SentMessage from "./SentMessage";
import ReceivedMessages from "./ReceivedMessages";
import MessagaeForm from "./MessageForm";
import { useAuthContext } from "@/app/AuthContext";
import { usePathname } from "next/navigation";

const Inbox = () => {
  const path = usePathname();

  const { app, userDetails } = useGlobalContext();
  const { isUserLoggedIn } = useAuthContext();
  const db = getFirestore(app);
  // const startChat = async () => {
  //   try {
  //     await setDoc(doc(db, "userChats", userDetails.uid), {});
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   if (isUserLoggedIn) {
  //     startChat();
  //   }
  // }, []);

  const chatHistory = {
    unreadCount: 2,
    chats: [
      {
        avatar: "H",
        name: "Henry Boyd",
        lastMessage: "Hey, how's it going?",
        isSeen: false,
        unreadCount: 0,
        uid: "V79ORfR32yekqC0Hdv74QUkm4FI2",
      },
      {
        avatar: "A",
        name: "Anurag Dahal",
        lastMessage: "Hey, how's it going?",
        isSeen: false,
        unreadCount: 1,
        uid: "anuragdahal",

      }
      
    ],
  };

  const messages = [
    {
      sender: "B",
      message: "Hey How are you today?",
      isSeen: true,
    },
    {
      sender: "B",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis.",
      isSeen: true,
    },
    {
      sender: "A",
      message: "I'm ok what about you?",
      isSeen: false,
    },
    {
      sender: "A",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing. ?",
      isSeen: false,
    },
    {
      sender: "A",
      message: "Lorem ipsum dolor sit amet !",
      isSeen: false,
    },
    {
      sender: "B",
      message: "hello my name is Anurag Dahal",
      isSeen: false,
    },
    {
      sender: "A",
      message: "Hi I am maria Stark",
      isSeen: false,
    },
  ];
  const username = "A";
  if (!isUserLoggedIn) {
    return <div>User not Loggedin</div>;
  }
  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <ChatList chatHistory={chatHistory} />
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              {path.toLowerCase() === "/inbox" ? (
                <div className="flex justify-center mx-auto">
                <h1>Open a chat..😒</h1>
                </div>
              ) : (
                <>
                  <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col gap-3 h-full">
                      {messages.map((message, index) => {
                        return (
                          <>
                            {message.sender === username ? (
                              <SentMessage
                                key={index}
                                avatar={message.sender}
                                sender={message.sender}
                                message={message.message}
                                isSeen={message.isSeen}
                              />
                            ) : (
                              <ReceivedMessages
                                key={index}
                                avatar={message.sender}
                                sender={message.sender}
                                message={message.message}
                              />
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <MessagaeForm />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Inbox;

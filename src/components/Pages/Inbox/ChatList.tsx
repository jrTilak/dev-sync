import React from "react";
import SingleChat from "./SingleChat";

interface ChatListProps {
  chatHistory: {
    unreadCount: number;
    chats: {
      uid: string;
      avatar: string;
      name: string;
      unreadCount: number;
    }[];
  };
}
const ChatList: React.FC<ChatListProps> = ({ chatHistory }) => {
  return (
    <>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {chatHistory.unreadCount}
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {chatHistory.chats.map((chat, index) => {
            return (
              <SingleChat
                userUid={chat.uid}
                key={index}
                avatar={chat.avatar}
                name={chat.name}
                unreadCount={chat.unreadCount}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChatList;

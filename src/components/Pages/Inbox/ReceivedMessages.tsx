import React from "react";

const ReceivedMessages = ({ message, avatar,sender }) => {
  return (
    <>
      <div className="w-[90%]">
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {avatar}
          </div>
          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
            <div>{message}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceivedMessages;

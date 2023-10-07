import React from "react";

const SentMessage = ({ avatar, message, isSeen, sender }) => {
  return (
    <>
      <div className="w-[90%]">
        <div className="flex items-center justify-start flex-row-reverse">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {avatar}
          </div>
          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
            <div>{message}</div>
            {isSeen && (
              <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                seen
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SentMessage;

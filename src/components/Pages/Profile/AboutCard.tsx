"use client";
import { useAuthContext } from "@/app/AuthContext";

const AboutCard = () => {
  const { currentUser } = useAuthContext();
  const { username } = currentUser;
  return (
    <div className="min-h-[10vh] border-2 p-4 rounded-lg max-w-[46rem]">
      <div className="text-sm font-extralight font-mono">
        {username || "username"}/ABOUT.md
      </div>
      <hr />
      <div className="mt-4">
      {currentUser.about || "Nothing to show here, yet!"}

      </div>
    </div>
  );
};
export default AboutCard;

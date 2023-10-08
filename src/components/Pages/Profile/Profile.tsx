"use client";
import ProfileCard from "@/components/Pages/Profile/ProfileCard";
import ProfileReadme from "@/components/Pages/Profile/ProfileReadme";
import AboutCard from "@/components/Pages/Profile/AboutCard";
import ProjectList from "@/components/shared/List/ProjectList";
import { useAuthContext } from "@/app/AuthContext";

const page = () => {
  const { isUserLoggedIn } = useAuthContext();
  return (
    <>
      {isUserLoggedIn ? (
        <div>
          <div className="flex items-center flex-col lg:flex-row justify-center min-h-[80vh] gap-4 p-10">
            <ProfileCard isMyProfile={true} />
            <div className="flex flex-col gap-4">
              <ProfileReadme />
              <AboutCard />
            </div>
          </div>
          <div>
            <ProjectList
              title="Projects"
              limit={3}
              type="open source project"
            />
          </div>
        </div>
      ) : (
        <div className="h-[90vh] w-screen mx-[40vw] flex items-center">
          Login to view your profile
        </div>
      )}
    </>
  );
};
export default page;

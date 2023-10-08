"use client"
import { useAuthContext } from "@/app/AuthContext";
import Create from "@/components/Pages/Projects/Create";

const page = () => {
  const {isUserLoggedIn} = useAuthContext();
  return (
    <>
    {
      isUserLoggedIn ? <Create /> : <div className="h-[90vh] w-screen mx-[40vw] flex items-center">Login to publish your projects</div>
    }
    </>
  )
};
export default page;

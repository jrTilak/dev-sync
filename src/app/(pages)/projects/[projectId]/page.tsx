"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
const page = () => {
  const pathname = usePathname();
  const projectID = pathname.split("/")[2];
  const [projectDetails, setProjectDetails] = useState({
    skillsNeeded: [
      {
        value: "",
        label: "",
      },
    ],
    owner: "",
    img: "",
    description: "",
    type: {
      value: "",
      label: "",
    },
    title: "",
    sourceLink: "",
    date: "",
    metaDesc: "",
    level: {
      label: "",
      value: "",
    },
  });
  let config = {
    method: "get",
    url: "http://localhost:3000/api/projects",
    headers: {
      projectId: projectID,
    },
  };

  axios
    .request(config)
    .then((response) => {
      setProjectDetails((prev)=>{
        return {...prev , ...response.data}});
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                {projectDetails.title}
              </h2>
              <Link href={projectDetails.sourceLink}>Link</Link>
              <a
                href="#"
                className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
              >
                {projectDetails.type.value}
              </a>
              <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                <div className="p-4 border-t border-b md:border md:rounded">
                  <div className="flex py-2">
                    <img
                      src="https://randomuser.me/api/portraits/men/97.jpg"
                      className="h-10 w-10 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {" "}
                        Mike Sullivan{" "}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/profile/${projectDetails.owner}`}
                    className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded"
                  >
                    Follow
                    <i className="bx bx-user-plus ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            <img
              src={projectDetails.img}
              className="w-full object-cover lg:rounded"
              style={{ height: "28em" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
              <p>{projectDetails.description}</p>
            </div>
          </div>
        </main>
        {/* <!-- main ends here --> */}
      </div>
    </>
  );
};

export default page;

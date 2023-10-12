"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Rating from "./Rating";
const ProjectId = () => {
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
    url: "https://dev-sync-khaki.vercel.app/api/projects",
    headers: {
      projectId: projectID,
    },
  };

  axios
    .request(config)
    .then((response) => {
      setProjectDetails((prev) => {
        return { ...prev, ...response.data };
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 dark:bg-gray-800 dark:text-gray-50">
        <div className="w-full mx-auto space-y-4 text-center">
          <p className="text-xs font-semibold tracki uppercase">Python</p>
          <h1 className="text-4xl font-bold leadi md:text-5xl">Django</h1>
          <h2 className="text-base font-bold leadi ">
            Django is a high-level, open-source Python web framework that
            empowers developers to build robust and dynamic web applications
            with speed and efficiency. Known for its philosophy, Django offers a
            comprehensive set of tools and libraries for handling common web
            development tasks such as database management, URL routing, and user
            authentication.
          </h2>
          <p className="text-sm dark:text-gray-400">
            by{" "}
            <a
              rel="noopener noreferrer"
              href="#"
              target="_blank"
              className="underline dark:text-violet-400"
            >
              <span itemProp="name">jrTilak </span>
            </a>
            on
            <time dateTime="2021-02-12 15:34:18-0200">Oct 8th 2023</time>
          </p>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/devsync-2c91e.appspot.com/o/projects%2Fdjango-logo-negative.1d528e2cb5fb.png?alt=media&token=c063141a-c5e0-4529-bb88-93f5b4132386&_gl=1*55m8va*_ga*MjAwMjA4OTE2MC4xNjk2MzEyNDk4*_ga_CW55HF8NVT*MTY5Njc0ODc4Mi4zMS4xLjE2OTY3NTA1ODAuNS4wLjA."
          alt=""
          className="object-cover w-full h-64 mx-auto rounded-lg shadow-lg"
        />
        <div className="dark:text-gray-100">
          <p>
            Django is a high-level, open-source Python web framework that
            empowers developers to build robust and dynamic web applications
            with speed and efficiency. Known for its philosophy, Django offers a
            comprehensive set of tools and libraries for handling common web
            development tasks such as database management, URL routing, and user
            authentication. Its clean and pragmatic design, based on the
            Model-View-Controller (MVC) architectural pattern (or
            Model-View-Template, as Django refers to it), encourages the
            creation of well-structured and maintainable code. Django also
            emphasizes security, helping developers protect their applications
            from common web vulnerabilities. With a vibrant community, extensive
            documentation, and a wealth of third-party packages, Django remains
            a popular choice for developers seeking a powerful and reliable
            framework to bring their web projects to life.
          </p>
        </div>
        <Rating />
      </article>
    </>
  );
};
export default ProjectId;

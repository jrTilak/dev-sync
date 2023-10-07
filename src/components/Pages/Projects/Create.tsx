"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/GlobalContext";
import getCurrentDateString from "@/utils/getCurrentDateString";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAuthContext } from "@/app/AuthContext";

const Create = () => {
  const router = useRouter();
  const { app } = useGlobalContext();
  const [imgUrl, setImgUrl] = useState("");
  const [imgInFirebaseUrl, setImgInFirebaseUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Track upload completion
  const animatedComponents = makeAnimated();
  const { currentUser } = useAuthContext();
  const [formData, setFormData] = useState({
    description: "",
    img: "",
    level: {},
    metaDesc: "",
    owner: currentUser.uid,
    skillsNeeded: [],
    sourceLink: "",
    type: "",
    title: "",
    date: getCurrentDateString(),
  });

  const createProject = async () => {
    try {
      await uploadImg();
      const response = await axios.post("/api/projects", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function getCurrentDateWithMilliseconds() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const minute = currentDate.getMinutes().toString().padStart(2, "0");
    const second = currentDate.getSeconds().toString().padStart(2, "0");
    const millisecond = currentDate
      .getMilliseconds()
      .toString()
      .padStart(3, "0");

    const formattedDate = `${year}_${month}_${day}_${hour}_${minute}_${second}_${millisecond}`;
    return formattedDate;
  }

  const uploadImg = async () => {
    if (imgUrl) {
      const storage = getStorage();
      const imgRef = ref(
        storage,
        `projects/${currentUser.uid}_${getCurrentDateWithMilliseconds()}`
      );

      try {
        await uploadBytes(imgRef, imgUrl);
        // Get the download URL for the uploaded image
        await getDownloadURL(imgRef).then((url) => {
          console.log("url", url);
          setFormData((prev) => {
            return {
              ...prev,
              img: url,
            };
          });
          setImgInFirebaseUrl(url);
        });
        // console.log(downloadURL);
        // console.log("Uploaded a blob or file!", downloadURL);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      img: imgInFirebaseUrl,
    }));
  }, [imgInFirebaseUrl]);

  const difficulty = [
    {
      value: "Expert",
      label: "Expert",
    },
    {
      value: "Medium",
      label: "Medium",
    },
    {
      value: "Beginner",
      label: "Beginner",
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLevelChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      level: e,
    }));
  };

  const onTypeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      type: e,
    }));
  };

  const onSkillsNeededChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      skillsNeeded: e,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    await createProject();
    setIsUploading(false);
    console.log(formData);
  };

  return (
    <>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        Create a new Project
      </div>
      <div className="editor flex flex-col gap-4 mx-auto w-10/12  text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          onChange={handleFormChange}
          className="title bg-gray-100 border border-gray-300 p-2 outline-none"
          spellcheck="false"
          placeholder="Title"
          type="text"
          name="title"
        />
        <input
          onChange={handleFormChange}
          className="title bg-gray-100 border border-gray-300 p-2 outline-none"
          spellcheck="false"
          placeholder="URL of repo or source..."
          type="text"
          name="sourceLink"
        />
        <textarea
          onChange={handleFormChange}
          className="metaDescription bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
          spellcheck="false"
          placeholder="Short summary..."
          name="metaDesc"
        ></textarea>
        <div>
          <label
            htmlFor="interests"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Level
          </label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={difficulty}
            name="level"
            onChange={onLevelChange}
            id="interests"
            value={formData.level || ""}
            className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div>
          <label
            htmlFor="interests"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Type
          </label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={difficulty}
            name="level"
            onChange={onTypeChange}
            id="interests"
            value={formData.type || ""}
            className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div>
          <label
            htmlFor="interests"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Skills
          </label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={difficulty}
            name="skillesNeeded"
            onChange={onSkillsNeededChange}
            id="interests"
            value={formData.skillsNeeded || ""}
            className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <textarea
          onChange={handleFormChange}
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellcheck="false"
          placeholder="Description..."
          name="description"
        ></textarea>
        <div className="icons flex text-gray-500 m-2">
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setImgUrl(e.target.files[0]);
            }}
            accept="image/*"
          />
          <label htmlFor="file"></label>

          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          </div>
        </div>
        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <button
            onClick={handleFormSubmit}
            className={`btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500`}
          >
            {isUploading ? "Uploading..." : "Post"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;

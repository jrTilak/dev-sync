"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/GlobalContext";
import getCurrentDateString from "@/utils/getCurrentDateString";
import axios from "axios";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Create = () => {
  const router = useRouter();
  const { app } = useGlobalContext();
  const [imgUrl, setImgUrl] = useState("");
  const [imgInFirebaseUrl, setImgInFirebaseUrl] = useState("");
  const animatedComponents = makeAnimated();

  const [formData, setFormData] = useState({
    description: "",
    difficulty: [],
    img: "",
    metsDesc: "",
    owner: "",
    skillsNeeded: [],
    sourceLink: "",
    type: "",
    title: "",
  });
  const createProject = async () => {
    axios
      .post("http://localhost:3000/api/projects", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return;
      });
  };
  const uploadImg = async () => {
    if (imgUrl) {
      const storage = getStorage(app);
      const imgRef = ref(
        storage,
        // `projects/${JSON.stringify(imgUrl)}_${getCurrentDateString()}` //todo : rename file
        `projects/${JSON.stringify(imgUrl)}_${getCurrentDateString()}` //todo : rename file
      );
      try {
        uploadBytes(imgRef, imgUrl).then((snapshot) => {
          const url = snapshot.ref.fullPath;
          console.log("Uploaded a blob or file!", url);
          setImgInFirebaseUrl(url);
        });
      } catch (e) {
        console.log(e);
        return;
      }
    }
  };

  useEffect(() => {
    formData.img = imgInFirebaseUrl;
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
    setFormData((prev) => ({
      ...prev,
      ...{ [e.target.name]: e.target.value },
    }));
  };

  const onLevelChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ...{ level: e },
    }));
  };
  const onTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ...{ type: e },
    }));
  };
  const onDifficultyChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ...{ type: e },
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
        />
        <input
          onChange={handleFormChange}
          className="title bg-gray-100 border border-gray-300 p-2 outline-none"
          spellcheck="false"
          placeholder="URL of repo or source..."
          type="text"
        />
        <textarea
          onChange={handleFormChange}
          className="metaDescription bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
          spellcheck="false"
          placeholder="Short summary..."
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
            name="interests"
            onChange={onLevelChange}
            id="interests"
            // value={formData.difficulty || ""}
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
            name="interests"
            onChange={onTypeChange}
            id="interests"
            // value={formData.difficulty || ""}
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
            name="interests"
            onChange={onDifficultyChange}
            id="interests"
            // value={formData.difficulty || ""}
            className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <textarea
          onChange={handleFormChange}
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellcheck="false"
          placeholder="Description..."
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
          <label
            htmlFor="file"
            onClick={() => {
              uploadImg();
            }}
          ></label>

          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          </div>
        </div>
        {/* buttons */}
        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <div
            onClick={handleFormSubmit}
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            Post
          </div>
        </div>
      </div>
    </>
  );
};
export default Create;

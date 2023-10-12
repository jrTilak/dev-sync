"use client";
import { useGlobalContext } from "@/app/GlobalContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import skills from "./skills.json";
import { useAuthContext } from "@/app/AuthContext";

const DetailsForm = () => {
  const { currentUser } = useAuthContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState(currentUser);
  const animatedComponents = makeAnimated();
  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);

  const handleFormChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...{ [e.target.name]: e.target.value },
    }));
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setIsUpdating(true);
    let data = JSON.stringify(formData);
    let config = {
      method: "put",
      url: "https://dev-sync-khaki.vercel.app/api/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsUpdating(false);
      })
      .catch((error) => {
        console.log(error);
        setIsUpdating(false);
      });
  };

  const onSkillsChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...{ skills: e },
    }));
  };
  const onInterestsChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...{ interests: e },
    }));
  };

  return (
    <>
      <div className="flex items-center justify-center py-6">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="flex gap-4">
              <div className="mb-5 w-1/2 ">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Full Name
                </label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="your name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5 w-1/2">
                <label
                  htmlFor="username"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Username
                </label>
                {currentUser.loginMethod === "github" ? (
                  <input
                    onChange={handleFormChange}
                    type="text"
                    name="username"
                    id="username"
                    disabled={true}
                    value={formData.username || ""}
                    placeholder="username"
                    className="w-full cursor-not-allowed rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                ) : (
                  <input
                    onChange={handleFormChange}
                    type="text"
                    name="username"
                    id="username"
                    autoFocus={true}
                    value={formData.username || ""}
                    placeholder="username"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                )}
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                disabled={true}
                value={formData.email || ""}
                placeholder="username@mail.com"
                className="w-full cursor-not-allowed rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="skills"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Skills
              </label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={skills}
                name="skills"
                onChange={onSkillsChange}
                id="skills"
                value={formData.skills || ""}
                className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="interests"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Interests
              </label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={skills}
                name="interests"
                onChange={onInterestsChange}
                id="interests"
                value={formData.interests || ""}
                className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* <div className="flex flex-col mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Interseted on:
              </label>
              <div>
                <div>
                  <input
                    id="checkbox-1"
                    aria-describedby="checkbox-2"
                    type="checkbox"
                    className="bg-gray-50  border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                  />
                  <label
                    htmlFor="checkbox-1"
                    className="text-sm ml-3 font-medium text-gray-900"
                  >
                    Open Science Projects
                  </label>
                </div>
                <div>
                  <input
                    id="checkbox-2"
                    aria-describedby="checkbox-2"
                    type="checkbox"
                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                  />
                  <label
                    htmlFor="checkbox-2"
                    className="text-sm ml-3 font-medium text-gray-900"
                  >
                    Open Source Projects
                  </label>
                </div>
              </div>
            </div> */}
            <div className="mb-5">
              <label
                htmlFor="bio"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Bio/Tagline
              </label>
              <input
                onChange={handleFormChange}
                type="text"
                name="bio"
                id="bio"
                value={formData.bio || ""}
                placeholder="eg: React.js Developer"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="about"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                About
              </label>
              <textarea
                onChange={handleFormChange}
                rows={4}
                name="about"
                id="about"
                placeholder="Tell about yourself.."
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <Link
                href="/"
                className="hover:shadow-form hover:underline rounded-md  py-3 px-8 text-base font-semibold text-black outline-none"
              >
                Skip
              </Link>
              <button
                onClick={handleFormSubmit}
                className="hover:shadow-form min-w-[80px] rounded-md bg-[#6A64F1] py-3 px-4 text-base font-semibold text-white outline-none"
              >
                {isUpdating ? (
                  <>
                    <svg
                      className="animate-spin mx-auto h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12z"
                      ></path>
                    </svg>
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default DetailsForm;

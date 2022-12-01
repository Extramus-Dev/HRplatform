import { Add, Circle, MoreHoriz, SystemUpdateAlt } from "@mui/icons-material";
import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../../components/Utils/LoadingState.jsx";
import StudentCountModal from "../../components/Modal/StudentCountModal.jsx";
import useTableSearch from "../../hooks/useTableSearch";

export default function ApplicantsList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const token = cookie.get("token");
  const [scModal, setScModal] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    setOpen(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/student`,
          { params: { token: token } },
          config
        );
        setData(data);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, []);

  const [searchedVal, setSearchedVal] = useState("");
  const { filteredData } = useTableSearch({ data, searchedVal });

  return (
    <section className="relative w-full sm:static">
      <LoadingState open={open} />
      <div className="w-full mb-12">
        <div className="relative sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-3 border-0 bg-white">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center">
                <div className="relative sm:static w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-2xl">Students</h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-between rounded-t px-4 pt-4 mb-4 pb-6 border-b-2 border-gray-400">
                <div className="flex gap-4 text-xs">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-green-500" />
                      The student has been Accepted
                    </div>
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-gray-500" />
                      The student has been Rejected or haven't been answered
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-blue-500" />
                      The student's application is beeing processed
                    </div>
                    <div className="flex gap-2 items-center">
                      <Circle className="text-xs text-yellow-400" />
                      The student has finished his/her internship
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/import-list">
                <span className="gap-1 h-7 hover:bg-gray-200 group flex items-center rounded-md bg-gray-300 text-gray-500 text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                  <SystemUpdateAlt className="text-sm" />
                  CSV Import
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-row-reverse mt-4 mb-2">
            <div className="flex flex-row-reverse bg-white mr-5 mt-0 mb-4 ml-auto ">
              {/* search */}
              <form>
                <label
                  htmlFor="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearchedVal(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-row gap-6 ml-9 h-8 border-b-2 text-lg border-black">
              <button
                className="rounded-xl text-lg font-bold hover:bg-slate-200"
                onClick={(e) => {
                  setScModal(true);
                  setType("onGoingInterns");
                }}
              >
                Ongoing
              </button>
              <button
                className="rounded-xl text-lg font-bold hover:bg-slate-200"
                onClick={(e) => {
                  setScModal(true);
                  setType("finishedInterns");
                }}
              >
                Finished
              </button>
            </div>
          </div>
          {scModal && <StudentCountModal setScModal={setScModal} type={type} />}
          {/* Table */}
          
        </div>
      </div>
    </section>
  );
}

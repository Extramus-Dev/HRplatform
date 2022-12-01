import { Add, Circle, MoreHoriz, SystemUpdateAlt } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { BsPeopleFill } from "react-icons/bs";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "reactjs-popup";
import * as React from "react";
import { useState, useEffect } from "react";
import StudentCountModal from "../../components/Modal/StudentCountModal.jsx";
import EndInternshipModal from "../../components/Modal/EndInternshipModal.jsx";
import { Tooltip, Button } from "@material-tailwind/react";
import axios from "axios";
import cookie from "js-cookie";
import LoadingState from "../../components/Utils/LoadingState.jsx";
import useTableSearch from "../../hooks/useTableSearch.js";

export default function InternList() {
  // student count modal
  const [scModal, setScModal] = useState(false);
  // End Internship modal
  const [eiModal, setEiModal] = useState(false);
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const token = cookie.get("token");
  const [searchedVal, setSearchedVal] = useState("");

  const { filteredData } = useTableSearch({ data, searchedVal });


  useEffect(() => {
    setLoading(true);
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/api/intern`,
          { params: { token: token } },
          config
        );
        setData(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);
  return (
    <section className="relative w-full sm:static">
      <LoadingState open={isloading} />
      <div className="w-full mb-12">
        <div className="relative sm:static flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-3 border-0 bg-white">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center">
                <div className="relative sm:static w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-2xl">Interns List</h3>
                </div>
              </div>
              <button className="mr-16 text-sm text-blue-300 hover:text-blue-500  ">
                View All
              </button>
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
            <div className="flex flex-row gap-6 ml-9 h-8 border-b-2 text-lg border-black ">
              <button
                onClick={(e) => setScModal(true)}
                className="rounded-xl text-lg font-bold hover:bg-slate-200"
              >
                Statistics
              </button>
            </div>
          </div>
          {scModal && (
            <StudentCountModal
              setScModal={setScModal}
              type={"onGoingInterns"}
            />
          )}
          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            {data.length === 0 ? (
              <div
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap 
                  p-4 flex items-center"
              >
                The Interns list is empty at the moment!
                <div className="text-blue-600/75 pl-1">
                  <Link href="/applicants/list"> Add a new intern</Link>
                </div>
              </div>
            ) : (
              <table className="items-center w-full border-collapse bg-white">
                {/* Table Head */}
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Full Name
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Start Date
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      End Date
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Duration In Weeks
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Department
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Position
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y">
                  {filteredData.map((student) => (
                    <tr key={student.intern.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        <span className="ml-3 font-bold">
                          {student.firstName} {student.lastName}{" "}
                        </span>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.intern.startDate}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.intern.endDate}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.intern.durationInWeeks}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.intern.department}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {student.intern.position}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        Ongoing
                      </td>

                      <Popup
                        contentStyle={{
                          background: "transparent",
                          borderRadius: "1rem",
                        }}
                        trigger={
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            <Tooltip
                              className="bg-transparent text-black mt-3"
                              content="More Actions"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                            >
                              <Button
                                variant="gradient"
                                className="text-black bg-transparent scale-100 hover:scale-125 p-0 cursor-pointer text-xl"
                              >
                                <MoreHoriz />
                              </Button>
                            </Tooltip>
                          </td>
                        }
                        position="bottom"
                      >
                        <div className="h-48 w-52 ml-5...">
                          <div className="flex flex-col ml-8 ">
                            <div>
                              <Link href="/applicants/edit">
                                <button className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white  text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]">
                                  Edit
                                </button>
                              </Link>
                            </div>

                            <div>
                              <button
                                onClick={(e) => setEiModal(true)}
                                type="submit"
                                className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
                              >
                                End Internship
                              </button>

                              {eiModal && (
                                <EndInternshipModal
                                  intern={student.intern}
                                  setEiModal={setEiModal}
                                />
                              )}
                            </div>
                            <div>
                            <button
                                onClick={(e) => setEiModal(true)}
                                type="submit"
                                className="w-28 inline-flex justify-center py-2 px-4  shadow-sm text-sm font-medium border-solid border-2 border-white text-white bg-[#0B3768]  hover:bg-white hover:text-[#0B3768]"
                              >
                                Departure
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* </div> */}
                      </Popup>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  Backdrop,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { confirmAlert } from "react-confirm-alert";
import SaveIcon from "@mui/icons-material/Save";
import "react-confirm-alert/src/react-confirm-alert.css";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; //if you want to use something cool :)
import { useState, useEffect } from "react";
import reactSelect from "react-select";
import { CheckCircle } from "@mui/icons-material";
import EditAttendance from "../../components/Modal/EditAttendance";
import axios from "axios";
import cookie from "js-cookie";
import useTableSearch from "../../hooks/useTableSearch";

function Attendence() {
  //  const notify =() => toast ("Please check if everything before saving!");
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [intern, setIntern] = useState();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertIncludedDate, setOpenAlertIncludedDate] = useState(false);
  const [editAttendanceModel, setAttendanceEditModel] = useState(false);
  const [dateIncluded, setDateIncluded] = useState(false);
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

  const save = (intern) => {
    setOpenAlert(false);
    setOpenAlertIncludedDate(false);
    setIntern(intern);
    if (!dateIncluded) {
      if (status && date) {
        setOpen(false);
        confirmAlert({
          message: "Are you sure you want to save ?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                setOpen(true);
                intern.attendance.statusOfTheDay = status;
                intern.attendance[status].count++;
                intern.attendance[status].dates.push(date);
                intern.token = token;
                const JSONintern = JSON.stringify(intern);
                const endpoint = `/api/intern/${intern._id}`;
                const options = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: JSONintern,
                };
                await fetch(endpoint, options);
                setOpen(false);
              },
            },
            {
              label: "No",
            },
          ],
        });
        setStatus("");
        setDate("");
      } else {
        setOpenAlert(true);
      }
    } else setOpenAlertIncludedDate(true);
  };
  const clicked = () => {
    setAttendanceEditModel(true);
  };

  const disableStatus = (intern, dt) => {
    if (
      intern.attendance.present.dates.includes(dt) ||
      intern.attendance.late.dates.includes(dt) ||
      intern.attendance.dayOff.dates.includes(dt) ||
      intern.attendance.excusedLeave.dates.includes(dt) ||
      intern.attendance.sick.dates.includes(dt) ||
      intern.attendance.unexcusedleave.dates.includes(dt)
    )
      setDateIncluded(true);
    else setDateIncluded(false);
  };

  if (isloading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  if (!data) return <p>No profile data</p>;

  return (
    <section className="relative w-full">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full mb-12">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          {/* Title Container */}
          <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Intern Attendance</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/interns/monthAttendance">
                <span className="hover:bg-green-400 group flex items-center rounded-md bg-green-500 text-white text-xs font-light pl-2 pr-3 py-2 shadow-sm cursor-pointer">
                  <EventAvailableIcon className="text-m py-1" />
                  Month Attendance
                </span>
              </Link>
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
          </div>
          <Collapse in={openAlert}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Choose Date/Status for the student !
            </Alert>
          </Collapse>
          <Collapse in={openAlertIncludedDate}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlertIncludedDate(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Status already set for the select date !
            </Alert>
          </Collapse>
          {/* Table */}
          <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full border-collapse bg-white">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    INTERN
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DATE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    SITUATION
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    PRESENT
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    LATE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DAY OFF
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    EXCUSED LEAVE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    SICK
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    UNEXCUSED LEAVE
                  </th>
                  <th className="px-5 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ACTION
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {data.length == 0 ? (
                  <tr className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    The interns list is empty
                  </tr>
                ) : (
                  filteredData.map((student) => (
                    <tr key={student.intern._id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center mt-3">
                        <div className="font-bold">
                          {" "}
                          {student.firstName} {student.lastName}
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <input
                          type="date"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onInput={(e) => {
                            setDate(e.target.value);
                            disableStatus(student.intern, e.target.value);
                            setStatus("");
                          }}
                        ></input>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <select
                          id="country"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          onClick={(e) => setStatus(e.target.value)}
                        >
                          <option value="">-</option>
                          <option value="present">Present</option>
                          <option value="late">Late</option>
                          <option value="dayOff">Day off</option>
                          <option value="excusedLeave">Excused leave</option>
                          <option value="sick">Sick</option>
                          <option value="unexcusedleave">
                            Unexecused leave
                          </option>
                        </select>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.present.count}</div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.late.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.dayOff.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>
                            {student.intern.attendance.excusedLeave.count}
                          </div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>{student.intern.attendance.sick.count}</div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div>
                            {student.intern.attendance.unexcusedleave.count}
                          </div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-r">
                            <div>
                              <button
                                onClick={() => save(student.intern)}
                                title="Save"
                              >
                                <CheckCircle className="h-6 fill-[#0b3768] hover:fill-[#15803d]" />
                              </button>
                            </div>
                            <button title="Edit">
                              <SaveIcon
                                className="h-6 fill-[#0b3768] hover:fill-[#15803d]"
                                onClick={(e) =>
                                  setAttendanceEditModel(student.intern._id)
                                }
                              />
                              {editAttendanceModel === student.intern._id && (
                                <EditAttendance
                                  intern={student.intern}
                                  setModel={setAttendanceEditModel}
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Attendence;

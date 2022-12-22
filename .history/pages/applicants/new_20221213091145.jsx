import { DocumentReview } from "../../components/DocumentReview";
import countryList from "react-select-country-list";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Popup from "reactjs-popup";
import mongoose from "mongoose";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import axios from "axios";
import cookie from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import LoadingState from "../../components/Utils/LoadingState";

export default function ApplicantsNew() {
  const router = useRouter();

  //Loading model useState
  const [open, setOpen] = useState(false);

  // get dprtmnts from DB
  const [dbDepartment, setDbDepartment] = useState([]);

  // get positions from DB when choosing positions
  const [positions, setPositions] = useState([]);

  //Modals state
  const [addDeprtmntModal, setAddDeprtmntModal] = useState(false);
  const [addPositionModal, setAddPositionModal] = useState(false);

  const token = cookie.get("token");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const docs = [
    "Curriculum Vitae",
    "Motivation Letter",
    "Arrival Tickets",
    "Learning Agreement",
    "Acceptance Letter",
  ];

  // Get departments from DB
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
          `/api/department`,
          { params: { token: token } },
          config
        );
        setDbDepartment(data);
        setPositions(data[0].positions);
        setOpen(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
      }
    };
    asyncRequest();
  }, []);

  // get countries list from react-select-country-list
  const countries = useMemo(() => countryList().getLabels(), []);

  // New applicant
  const submitData = async (data) => {
    setOpen(true);
    const applicantId = new mongoose.Types.ObjectId();
    const studentId = new mongoose.Types.ObjectId();
    data.student._id = studentId;
    data.student.applicant = applicantId;
    data.applicant._id = applicantId;
    data.applicant.student = studentId;
    const JSONdstudent = JSON.stringify(data.student);
    const JSONapplicant = JSON.stringify(data.applicant);
    const endpointstudent = "/api/student";
    const endpointapplicant = "/api/applicant";
    const optionsStudent = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONdstudent,
    };
    const optionApplicant = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONapplicant,
    };
    console.log(JSONdstudent);
    console.log(JSONapplicant);
    await fetch(endpointstudent, optionsStudent);
    await fetch(endpointapplicant, optionApplicant);
    router.push("/applicants/list");
  };

  const addNewDepartment = async (e) => {
    e.preventDefault();
    setOpen(true);
    const department = e.target.newdepartment.value;
    await fetch("/api/department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ department, token }),
    });
    await updateDepartment();
    setAddDeprtmntModal(false);
  };

  // Refresh Departments/positions in DOM
  const updateDepartment = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/department`,
        { params: { token: token } },
        config
      );
      setDbDepartment(data);
      setPositions(data[0].positions);
      setOpen(false);
    } catch (e) {
      console.error(e);
      setOpen(false);
    }
  };

  const addNewPosition = async (e) => {
    e.preventDefault();
    const pos = e.target.newPosition.value;
    const dprtmntId = e.target.newPosDepartment.value;
    setOpen(true);
    await fetch(`/api/department/${dprtmntId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ pos, token }),
    });
    await updateDepartment();
    setAddPositionModal(false);
  };
  return (
    <div>
      <LoadingState open={open} />
      <section className="relative w-full">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full rounded">
            {/* Title Container */}
            <div className="flex justify-between rounded-t px-4 py-3 border-b-2 border-gray-300">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-2xl">Create Applicant</h3>
                </div>
              </div>
            </div>

            {/* Forms Container */}
            <div>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(submitData)}
              >
                {/* Top  */}
                <div className="flex gap-6">
                  {/* Section */}
                  {/* Personal Details */}
                  <div className="flex flex-[1] flex-col gap-4 px-4 py-5">
                    <div className="mb-2 font-semibold">Personal Details</div>
                    {/* Photo */}
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm">Photo</label>
                      <div className="flex items-center">
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button
                          type="button"
                          onClick={() => alert("Upload Photo")}
                          className="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    {/* First Name and Last Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="first-name" className="block text-sm">
                        First name
                      </label>
                      <input
                        {...register("student.firstName", {
                          required: "First name is required",
                        })}
                        type="text"
                        autoComplete="given-name"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.firstName?.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="last-name" className="block text-sm">
                        Last name
                      </label>
                      <input
                        {...register("student.lastName", {
                          required: "Last name is required",
                        })}
                        type="text"
                        autoComplete="family-name"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.lastName?.message}
                      </p>
                    </div>

                    {/* Sex */}
                    <fieldset className="flex flex-col gap-2">
                      <legend className="block text-sm">Sex</legend>
                      <div className="flex mt-1 gap-4">
                        <div className="flex items-center">
                          <input
                            {...register("student.sex")}
                            type="radio"
                            value="Male"
                            defaultChecked
                            className="focus:ring-blue-500 text-blue-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-2 block text-sm"
                          >
                            Male
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value="Female"
                            className="focus:ring-blue-500 text-blue-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-2 block text-sm"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </fieldset>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="birthday" className="block text-sm">
                        Date of Birth
                      </label>
                      <Controller
                        control={control}
                        name="student.dateOfBirth"
                        rules={{
                          required: "Please, enter a birth date",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              value={value || null}
                              onChange={(date) => {
                                onChange(date?.isValid ? date : null);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.dateOfBirth?.message}
                      </p>
                    </div>

                    {/* Nationality */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="Nationality" className="block text-sm">
                        Nationality
                      </label>
                      <Controller
                        control={control}
                        name="student.nationality"
                        rules={{
                          required: "Please, enter the nationality",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <select
                            onChange={onChange}
                            autoComplete="Nationality"
                            className="flex flex-[1] flex-col border block w-full border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="">Select...</option>
                            {countries.map((country) => (
                              <option value={value}>{country}</option>
                            ))}
                          </select>
                        )}
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.nationality?.message}
                      </p>
                    </div>
                  </div>
                  {/* Section */}
                  {/* Contact Details */}
                  <div className="flex flex-[1] flex-col gap-4 px-4 py-5">
                    <div className="mb-2 font-semibold">Contact Details</div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="block text-sm">
                        Email
                      </label>
                      <input
                        {...register("student.email", {
                          required: "Please, enter the email",
                        })}
                        type="text"
                        autoComplete="email"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.email?.message}
                      </p>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm">Phone Number</label>
                      <input
                        {...register("student.phoneNumber", {
                          required: "Please, enter the phone number",
                        })}
                        type="text"
                        autoComplete="phone"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.phoneNumber?.message}
                      </p>
                    </div>

                    {/* University */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="university" className="block text-sm">
                        University
                      </label>
                      <input
                        {...register("student.university", {
                          required: "Please, enter the university",
                        })}
                        type="text"
                        autoComplete="university"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.university?.message}
                      </p>
                    </div>

                    {/* Departing Country */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="departingCountry"
                        className="block text-sm"
                      >
                        Departing Country
                      </label>

                      <Controller
                        control={control}
                        name="student.departingCountry"
                        rules={{
                          required: "Please, enter the departing country",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <select
                            onChange={onChange}
                            autoComplete="departingCountry"
                            className="flex flex-[1] flex-col border block w-full border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="">Select...</option>
                            {countries.map((country) => (
                              <option value={value}>{country}</option>
                            ))}
                          </select>
                        )}
                      />
                      <p className="text-sm font-thin text-red-600">
                        {errors.student?.departingCountry?.message}
                      </p>
                    </div>
                  </div>

                  {/* Section */}
                  {/* Internship Details */}
                  <div className="flex flex-[1] flex-col gap-4 px-4 py-5">
                    <div className="mb-2 font-semibold">
                      Application Details
                    </div>

                    <div className="flex gap-4">
                      {/* Applied on */}
                      <div className="flex flex-[1] flex-col gap-2">
                        <label htmlFor="applied-on" className="block text-sm">
                          Applied on
                        </label>
                        <Controller
                          control={control}
                          name="applicant.applicationDate"
                          rules={{
                            required: "Please, enter the application date",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={value || null}
                                onChange={(date) => {
                                  onChange(date?.isValid ? date : null);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        />
                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.applicationDate?.message}
                        </p>
                      </div>

                      {/* Interview Date */}
                      <div className="flex flex-[1] flex-col gap-2">
                        <label htmlFor="applied-on" className="block text-sm">
                          HR Interview Date
                        </label>
                        <Controller
                          control={control}
                          name="applicant.hrInterviewDate"
                          rules={{
                            required: "Please, enter the HR interview date",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={value || null}
                                onChange={(date) => {
                                  onChange(date?.isValid ? date : null);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        />
                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.hrInterviewDate?.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4	">
                      {/* CEO Interview Date */}
                      <div className="flex flex-[1] flex-col gap-2">
                        <label
                          htmlFor="ceo-interview"
                          className="block text-sm"
                        >
                          CEO Interview Date
                        </label>
                        <Controller
                          control={control}
                          name="applicant.ceoInterviewDate"
                          rules={{
                            required: "Please, enter the CEO interview date",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={value || null}
                                onChange={(date) => {
                                  onChange(date?.isValid ? date : null);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        />
                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.ceoInterviewDate?.message}
                        </p>
                      </div>
                    </div>

                    {/* Department */}
                    <div className="mb-2 font-semibold flex gap-4 pt-3">
                      Internship Details
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="department" className="block text-sm">
                          Department
                        </label>
                        <select
                          {...register("applicant.department", {
                            required: "Please, select a department",
                          })}
                          id="department"
                          autoComplete="department"
                          className="block w-48 py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          onChange={(e) => {
                            setPositions(
                              dbDepartment[e.target.selectedIndex].positions
                            );
                          }}
                        >
                          {dbDepartment.map((department) => (
                            <option
                              value={department.department}
                              key={department._id}
                              disabled={department.positions.length == 0}
                            >
                              {department.department}
                            </option>
                          ))}
                        </select>

                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.department?.message}
                        </p>
                      </div>
                      {/* Button new department */}

                      <div className="flex flex-col gap-2">
                        <Button
                          className="w-48 mt-7 inline-flex text justify-center py-2 px-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={(e) => setAddDeprtmntModal(true)}
                        >
                          Add new department
                        </Button>
                      </div>
                    </div>

                    {/* Position */}
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="position" className="block text-sm">
                          Position
                        </label>
                        {positions?.length == 0 ? (
                          <div className="text-red-600/75">
                            No positions available for this department
                          </div>
                        ) : (
                          <select
                            {...register("applicant.position", {
                              required: "Please, select a position",
                            })}
                            autoComplete="Position"
                            className="block w-48 py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="">Select...</option>
                            {positions.map((position) => (
                              <option value={position} key={position}>
                                {position}
                              </option>
                            ))}
                          </select>
                        )}
                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.position?.message}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          className="w-48 mt-7 inline-flex text justify-center py-2 px-1 border border-transparent
                         shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={(e) => setAddPositionModal(true)}
                        >
                          Add new position
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {/* Arrival Date */}
                      <div className="flex flex-[1] flex-col gap-2">
                        <label htmlFor="arrival-date" className="block text-sm">
                          Start Date
                        </label>
                        <Controller
                          control={control}
                          name="applicant.startDate"
                          rules={{
                            required: "Please, enter the start date",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={value || null}
                                onChange={(date) => {
                                  onChange(date?.isValid ? date : null);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        />
                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.startDate?.message}
                        </p>
                      </div>

                      {/* Departure Date */}
                      <div className="flex flex-[1] flex-col gap-2">
                        <label
                          htmlFor="departure-date"
                          className="block text-sm"
                        >
                          End Date
                        </label>
                        <Controller
                          control={control}
                          name="applicant.endDate"
                          rules={{
                            required: "Please, enter the end date",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={value || null}
                                onChange={(date) => {
                                  onChange(date?.isValid ? date : null);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        />
                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.endDate?.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {/* Departure city */}
                      <div className="flex flex-[1] flex-col gap-2">
                        <label htmlFor="arrival-date" className="block text-sm">
                          Arrival City
                        </label>
                        <select
                          {...register("applicant.arrivalCity")}
                          autoComplete="arrivalCity"
                          className="flex flex-[1] flex-col border block w-full border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>Terranova da Sibari</option>
                          <option>Bivo Cantinella</option>
                          <option>Sibari</option>
                          <option>Spezzano Albanese Terme</option>
                        </select>
                      </div>

                      {/* Who Pıcked By */}
                      <div className="flex flex-[1] flex-col gap-2">
                        <label
                          htmlFor="departure-date"
                          className="block text-sm"
                        >
                          Picked up By
                        </label>
                        <input
                          {...register("applicant.pickUpBy")}
                          type="text"
                          autoComplete="given-name"
                          placeholder="Francesco di Marco"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    {/* Application Progress */}
                    <div className="flex gap-4">
                      <div className="flex flex-[1] flex-col gap-2">
                        <label
                          htmlFor="departure-date"
                          className="block text-sm"
                        >
                          Arrival Time
                        </label>
                        <input
                          {...register("applicant.arrivalTime")}
                          type="time"
                          autoComplete="given-name"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex flex-[1] flex-col gap-2">
                        <label htmlFor="Progress" className="block text-sm">
                          Progress
                        </label>
                        <select
                          {...register("applicant.progress", {
                            required: "Please, enter the currrent progress",
                          })}
                          className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>New Candidate</option>
                          <option>HR Interview</option>
                          <option>CEO Interview</option>
                          <option>Completing Documents</option>
                          <option>Completed</option>
                        </select>
                        <p className="text-sm font-thin text-red-600">
                          {errors.applicant?.progress?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom  */}
                <div className="flex gap-12 p-4">
                  <div className="flex-[1] flex flex-col">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Interview Notes
                    </label>
                    <div className="mt-1">
                      <textarea
                        {...register("applicant.interviewNotes")}
                        rows={2}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Notes for or during the interview.
                    </p>
                  </div>
                  <div className="flex-[1] flex flex-col">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Rejection Reasons
                    </label>
                    <div className="mt-1">
                      <textarea
                        {...register("applicant.rejectionReasons")}
                        rows={2}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of why the candidate is rejected.
                    </p>
                  </div>
                </div>

                {/*<div className="flex p-4">
                  <div className="flex flex-col w-1/3 gap-2">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-semibold"
                    >
                      Google Drive Integration
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        http://
                      </span>
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="drive.google.com/"
                      />
                    </div>
                  </div>
                        </div>*/}

                <div className="flex p-4">
                  <div className="flex flex-col w-full gap-4">
                    <div className="block text-sm font-semibold">
                      Application Documents
                    </div>
                    <div className="flex gap-6 justify-start">
                      {docs.map((docs, i) => (
                        <DocumentReview register={register} title={docs} />
                      ))}
                    </div>
                    {/**
                     * <div className="flex gap-6 justify-start">
                      <DocumentReview title="Grant" />
                      <div className="flex w-48 flex-col gap-2">
                        <label htmlFor="cv" className="block text-sm">
                          Extramus email
                        </label>
                        <select
                          name="cv"
                          id="cv"
                          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>Do it</option>
                          <option>It&apos;s done </option>
                        </select>
                      </div>
                      <div className="flex w-48 flex-col gap-2">
                        <label htmlFor="cv" className="block text-sm">
                          Extramus Folder
                        </label>
                        <select
                          name="cv"
                          id="cv"
                          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>Do it</option>
                          <option>It&apos;s done</option>
                        </select>
                      </div>
                    </div>
                     * 
                     */}
                  </div>
                </div>

                <div className="flex p-4 gap-4">
                  <button
                    type="submit"
                    value="Cancel"
                    className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-500 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    value="Save"
                    className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
                {/*<Collapse in={openAlert}>
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
                    Make sure to fill all the dates !
                  </Alert>
                  </Collapse>*/}
              </form>

              {addDeprtmntModal && (
                <div
                  tabindex="-1"
                  class="h-screen flex justify-center items-center overflow-y-auto overflow-x-hidden 
                          fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full"
                >
                  <div class="relative w-full max-w-md h-full md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={(e) => setAddDeprtmntModal(false)}
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                      <div class="py-6 px-6 lg:px-8 border border-gray-300">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                          Add a new department
                        </h3>
                        <form class="space-y-6" onSubmit={addNewDepartment}>
                          <div>
                            <input
                              id="newdepartment"
                              type="text"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder="IT / Accounting / HR ..."
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Add new department
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {addPositionModal && (
                <div
                  tabindex="-1"
                  class="h-screen flex justify-center items-center overflow-y-auto overflow-x-hidden 
                          fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full"
                >
                  <div class="relative w-full max-w-md h-full md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={(e) => setAddPositionModal(false)}
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                      <div class="py-6 px-6 lg:px-8 border border-gray-300">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                          Add a new position
                        </h3>
                        <form class="space-y-6" onSubmit={addNewPosition}>
                          <div>
                            <label
                              for="email"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Department
                            </label>
                            <select
                              id="newPosDepartment"
                              name="department"
                              autoComplete="department"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            >
                              {dbDepartment.map((department) => (
                                <option
                                  key={department._id}
                                  value={department._id}
                                >
                                  {department.department}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Position
                            </label>
                            <input
                              id="newPosition"
                              type="text"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder="New position.."
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Add new position
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
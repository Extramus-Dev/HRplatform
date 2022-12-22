import { DocumentReview } from "../../components/DocumentReview";
import countryList from "react-select-country-list";
import { useState, useMemo } from "react";
import Select from "react-select";
import Popup from "reactjs-popup";
import { Cancel, Verified } from "@mui/icons-material";
import { AutoFixHigh } from "@mui/icons-material";
import { Tooltip, Button } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import cookie from "js-cookie";

export default function ApplicantsNew() {
  const [nationalityValue, setNationality] = useState("");
  const [departingCountryValue, setDepartingCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const token = cookie.get("token");
  const updateNationality = (nationality) => {
    setNationality(nationality);
  };
  const updateDepartingCountry = (departingCountry) => {
    setDepartingCountry(departingCountry);
  };
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsData = [
    {
      label: (
        <div className=" text-green-500 ml-0 rounded-full py-3 ">
          Add Department
        </div>
      ),
      content: (
        <div className=" p-0 rounded-xl ">
          <div className="flex flex-col gap-2">
            <label htmlFor="newD" className="block text-sm text-black mt-2">
              Introduce New Department
            </label>
            <input
              type="text"
              name="newD"
              id="newD"
              required
              autoComplete="given-name"
              className="focus:ring-gray-400 focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mt-2"
            />
          </div>
          <div className="flex p-4 gap-4 mt-4">
            <button
              type="submit"
              className="w-24 mr-4 inline-flex justify-center py-2 px-4 border-2 border-gray-500 scale-100 shadow-sm text-sm font-medium rounded-md bg-gray-500 text-white hover:scale-110"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-green-500 text-white hover:scale-110"
            >
              Add
            </button>
          </div>
        </div>
      ),
    },
    {
      label: (
        <div className="py-3 text-red-500 ml-0 rounded-full ">
          Delete Department
        </div>
      ),
      content: (
        <div className=" p-0 rounded-xl ">
          <div className="flex flex-col gap-2">
            <label htmlFor="delD" className="block text-sm mt-2">
              Select Department
            </label>
            <select
              id="delD"
              name="delD"
              className="focus:ring-gray-400 focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mt-2"
            >
              <option>Backend Developer</option>
              <option>DevOps</option>
              <option>data Analyst</option>
            </select>
          </div>
          <div className="flex p-4 gap-4 mt-4">
            <button
              type="submit"
              className="w-24 mr-4 inline-flex justify-center py-2 px-4 border-2 border-gray-500 scale-100 shadow-sm text-sm font-medium rounded-md bg-gray-500 text-white hover:scale-110"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-red-500 text-white hover:scale-110"
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];
  const tabsData2 = [
    {
      label: (
        <div className=" text-green-500 ml-0 rounded-full py-3 ">
          Add Position
        </div>
      ),
      content: (
        <div className=" p-0 rounded-xl ">
          <div className="flex flex-col gap-2">
            <label htmlFor="delD" className="block text-sm mt-2">
              Select Department
            </label>
            <select
              id="delD"
              name="delD"
              className="focus:ring-gray-400 focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mt-2"
            >
              <option>Backend Developer</option>
              <option>DevOps</option>
              <option>data Analyst</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newD" className="block text-sm text-black mt-4">
              Introduce New Position
            </label>
            <input
              type="text"
              name="newD"
              id="newD"
              required
              autoComplete="given-name"
              className="focus:ring-gray-400 focus:border-black block w-full shadow-sm text-xs border-gray-300 rounded-md mt-2"
            />
          </div>
          <div className="flex p-4 gap-4 mt-4">
            <button
              type="submit"
              className="w-24 mr-4 inline-flex justify-center py-2 px-4 border-2 border-gray-500 scale-100 shadow-sm text-sm font-medium rounded-md bg-gray-500 text-white hover:scale-110"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-green-500 text-white hover:scale-110"
            >
              Add
            </button>
          </div>
        </div>
      ),
    },
    {
      label: (
        <div className="py-3 text-red-500 ml-0 rounded-full ">
          Delete Position
        </div>
      ),
      content: (
        <div className=" p-0 rounded-xl ">
          <div className="flex flex-col gap-2">
            <label htmlFor="delD" className="block text-sm mt-2">
              Select Department
            </label>
            <select
              id="delD"
              name="delD"
              className="focus:ring-gray-400 focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mt-2"
            >
              <option>Backend Developer</option>
              <option>DevOps</option>
              <option>data Analyst</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newD" className="block text-sm text-black mt-4">
              Introduce Position
            </label>
            <input
              type="text"
              name="newD"
              id="newD"
              required
              autoComplete="given-name"
              className="focus:ring-gray-400 focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mt-2"
            />
          </div>
          <div className="flex p-4 gap-4 mt-4">
            <button
              type="submit"
              className="w-24 mr-4 inline-flex justify-center py-2 px-4 border-2 border-gray-500 scale-100 shadow-sm text-sm font-medium rounded-md bg-gray-500 text-white hover:scale-110"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-red-500 text-white hover:scale-110"
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      dateOfBirth: event.target.dateOfBirth.value,
      sex: event.target.sex.value,
      phoneNumber: event.target.phoneNumber.value,
      university: event.target.university.value,
      nationality: nationalityValue.label,
      departingCountry: departingCountryValue.label,
      applicant: {
        applicationDate: event.target.applicationDate.value,
        arrivalDate: event.target.arrivalDate.value,
        departureDate: event.target.departureDate.value,
        progress: event.target.progress.value,
        department: event.target.department.value,
        position: event.target.position.value,
        hrInterviewDate: event.target.hrInterviewDate.value,
        interviewNotes: event.target.interviewNotes.value,
        rejectionReasons: event.target.rejectionReasons.value,
        ceoInterview: event.target.ceoInterview.value,
        status: event.target.status.value,
      },
      token:token,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/student";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);

    const result = await response.json();
    console.log(result);
    alert(`New student with name: - ${data.firstName} - created`);
  };

  return (
    <section className="relative w-full">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded">
          {/* Title Container */}
          <div className="flex justify-between rounded-t px-4 py-3 border-b-2 border-gray-300">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-2xl">Edit Person </h3>
              </div>
            </div>
          </div>

          {/* Forms Container */}
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                      type="text"
                      name="first-name"
                      id="firstName"
                      required
                      autoComplete="given-name"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="last-name" className="block text-sm">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="lastName"
                      required
                      autoComplete="family-name"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Sex */}
                  <fieldset className="flex flex-col gap-2">
                    <legend className="block text-sm">Sex</legend>
                    <div className="flex mt-1 gap-4">
                      <div className="flex items-center">
                        <input
                          id="sex"
                          name="gender"
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
                          id="sex"
                          name="gender"
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
                    <label htmlFor="email-address" className="block text-sm">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date-of-birth"
                      required
                      id="dateOfBirth"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Nationality" className="block text-sm">
                      Nationality
                    </label>
                    <Select
                      instanceId="Nationality"
                      options={options}
                      value={nationalityValue}
                      onChange={updateNationality}
                    />
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
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="block text-sm">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phoneNumber"
                      autoComplete="phone"
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* University */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="university" className="block text-sm">
                      University
                    </label>
                    <input
                      type="text"
                      name="university"
                      id="university"
                      autoComplete="university"
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Departing Country */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="departingCountry" className="block text-sm">
                      Departing Country
                    </label>
                    <Select
                      instanceId="departingCountry"
                      options={options}
                      value={departingCountryValue}
                      onChange={updateDepartingCountry}
                    />
                  </div>
                </div>

                {/* Section */}
                {/* Internship Details */}
                <div className="flex flex-[1] flex-col gap-4 px-4 py-5">
                  <div className="mb-2 font-semibold">Application Details</div>

                  <div className="flex gap-4">
                    {/* Applied on */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="applied-on" className="block text-sm">
                        Applied on
                      </label>
                      <input
                        type="date"
                        name="applied-on"
                        id="applicationDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Interview Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="applied-on" className="block text-sm">
                        HR Interview Date
                      </label>
                      <input
                        type="date"
                        name="interview-date"
                        id="hrInterviewDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {/* CEO Interview Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="ceo-interview" className="block text-sm">
                        CEO Interview Date
                      </label>
                      <input
                        type="date"
                        name="ceo-interview"
                        id="ceoInterview"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="department" className="block text-sm">
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        autoComplete="department"
                        className="block w-80 py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Human Resources</option>
                        <option>ICT</option>
                        <option>Business Analyst</option>
                      </select>
                    </div>
                    {/* Button new department */}

                    <Popup
                      contentStyle={{
                        background: "white",
                        borderRadius: "1rem",
                        borderWidth: 2,
                        borderColor: "rgb(209 213 219)",
                      }}
                      className="mr-10 "
                      trigger={
                        <div className="flex flex-col gap-2">
                          <Tooltip
                            className="bg-transparent text-black text-xs mt-3 ml-3"
                            content="Add/Delete Departments"
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                          >
                            <Button
                              type="submit"
                              className="w-16 mt-5 inline-flex justify-center py-2 px-1 text-black scale-100 bg-transparent text-2xl hover:scale-125"
                            >
                              <AutoFixHigh />
                            </Button>
                          </Tooltip>
                        </div>
                      }
                      position="left"
                    >
                      {/* <div className="m-1 p-2 w-64 px-0"> */}
                      {/* <div> */}
                      {/* <h6 className="font-semibold text-xl text-white pt-2 pb-4 pl-3">Add New Department</h6> */}
                      {/* <div className="flex flex-row mx-2 mt-2 mb-4"> */}
                      {/* <input type="text" class="rounded border-none bg-[#fafbfc] text-black h-10 w-52 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm" placeholder="Introduce new department" required /> */}
                      {/* </div> */}
                      {/* </div> */}
                      {/* <div className=" w-80 h-72">
	<Tabs >
      <TabsHeader >
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
			{label}
            
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel  key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
	</div>
	 */}
                      <div className="w-80 h-64">
                        <div className="space-x-3 border-b ">
                          {/* Loop through tab data and render button for each. */}
                          {tabsData.map((tab, idx) => {
                            return (
                              <button
                                key={idx}
                                className={` border-b-2 text-sm duration-150 ml-3 mr-1 px-4 ${
                                  idx === activeTabIndex
                                    ? "bg-gray-200  rounded-xl border-gray-400"
                                    : " hover:border-gray-200"
                                }`}
                                // Change the active tab on click.
                                onClick={() => setActiveTabIndex(idx)}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>
                        {/* Show active tab content. */}
                        <div className="py-4 p-3 mt-1">
                          <p>{tabsData[activeTabIndex].content}</p>
                        </div>
                      </div>
                    </Popup>
                  </div>

                  {/* Position */}
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="department" className="block text-sm">
                        Position
                      </label>
                      <select
                        id="position"
                        name="position"
                        autoComplete="Position"
                        className="block w-80 py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Backend Developer</option>
                        <option>DevOps</option>
                        <option>data Analyst</option>
                      </select>
                    </div>
                    <Popup
                      contentStyle={{
                        background: "white",
                        borderRadius: "1rem",
                        borderWidth: 2,
                        borderColor: "rgb(209 213 219)",
                      }}
                      trigger={
                        <div className="flex flex-col gap-2">
                          <Tooltip
                            className="bg-transparent text-black text-xs mt-3 ml-3"
                            content="Add/Delete Positions"
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                          >
                            <Button
                              type="submit"
                              className="w-16 mt-5 inline-flex justify-center py-2 px-1 text-black scale-100 bg-transparent text-2xl hover:scale-125"
                            >
                              <AutoFixHigh />
                            </Button>
                          </Tooltip>
                        </div>
                      }
                      position="left"
                    >
                      <div className="w-80 h-80">
                        <div className="space-x-3 border-b ">
                          {/* Loop through tab data and render button for each. */}
                          {tabsData2.map((tab, idx) => {
                            return (
                              <button
                                key={idx}
                                className={` border-b-2 text-sm duration-150 ml-4 mr-1 px-5${
                                  idx === activeTabIndex
                                    ? "bg-gray-200  rounded-xl border-gray-400"
                                    : " hover:border-gray-200"
                                }`}
                                // Change the active tab on click.
                                onClick={() => setActiveTabIndex(idx)}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>
                        {/* Show active tab content. */}
                        <div className="py-4 p-3 mt-1">
                          <p>{tabsData2[activeTabIndex].content}</p>
                        </div>
                      </div>
                    </Popup>
                  </div>

                  <div className="flex gap-4">
                    {/* Arrival Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="arrival-date" className="block text-sm">
                        Arrival Date
                      </label>
                      <input
                        type="date"
                        name="arrival-date"
                        id="arrivalDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Departure Date */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="departure-date" className="block text-sm">
                        Departure Date
                      </label>
                      <input
                        type="date"
                        name="departure-date"
                        id="departureDate"
                        required
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Application Progress */}
                  <div className="flex gap-4">
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="Progress" className="block text-sm">
                        Progress
                      </label>
                      <select
                        id="progress"
                        name="Progress"
                        className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>New Candidate</option>
                        <option>HR Interview</option>
                        <option>CEO Interview</option>
                        <option>Completing Documents</option>
                        <option>Completed</option>
                      </select>
                    </div>
                    {/* Application Status */}
                    <div className="flex flex-[1] flex-col gap-2">
                      <label htmlFor="status" className="block text-sm">
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Accepted</option>
                        <option>On Progress</option>
                        <option>No Answer</option>
                        <option>On Board</option>
                        <option>Rejected</option>
                      </select>
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
                      id="interviewNotes"
                      name="interview-notes"
                      rows={2}
                      required
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
                      id="rejectionReasons"
                      name="rejectio-reasons"
                      rows={2}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description of why the candidate is rejected.
                  </p>
                </div>
              </div>

              <div className="flex p-4">
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
              </div>

              <div className="flex p-4">
                <div className="flex flex-col w-full gap-4">
                  <div className="block text-sm font-semibold">
                    Application Documents
                  </div>
                  <div className="flex gap-6 justify-start">
                    <div className="flex w-48 flex-col gap-2">
                      <label htmlFor="cv" className="block text-sm">
                        Curriculum Vitae
                      </label>
                      <select
                        name="cv"
                        id="cv"
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Have</option>
                        <option>Don't have</option>
                      </select>
                    </div>

                    <DocumentReview title="Learning Agreement" />
                    <DocumentReview title="Acceptance Letter" />
                    <div className="flex w-48 flex-col gap-2">
                      <label htmlFor="cv" className="block text-sm">
                        Accommodation Letter
                      </label>
                      <select
                        name="cv"
                        id="cv"
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Send</option>
                        <option>Don't send</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-6 justify-start">
                    <DocumentReview title="Arrival Tickets" />
                    <DocumentReview title="Intern Development Plan" />
                    <DocumentReview title="Confidentiality Letter" />
                    <DocumentReview title="Identification" />
                  </div>
                  <div className="flex gap-6 justify-start">
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
                        <option>It's done </option>
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
                        <option>It's done</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex p-4 gap-4">
                <button
                  type="submit"
                  onClick={() => setSubmitStatus("Cancel")}
                  className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-500 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => setSubmitStatus("Save")}
                  className="w-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

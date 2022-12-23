import { UploadFileOutlined, Verified } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
export default function DashboardView() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const token = cookie?.get("token");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [internId, setInternId] = useState("");

  const [Group, setGroup] = useState("");
  const [swapGroup1, setSwapGroup1] = useState("");
  const [swapGroup2, setSwapGroup2] = useState("");

  const [mondayStartTime, setMondayStartTime] = useState("");
  const [mondayEndTime, setMondayEndTime] = useState("");

  const [tuesdayStartTime, setTuesdayStartTime] = useState("");
  const [tuesdayEndTime, setTuesdayEndTime] = useState("");

  const [wednesdayStartTime, setWednesdayStartTime] = useState("");
  const [wednesdayEndTime, setWednesdayEndTime] = useState("");

  const [thursdayStartTime, setThursdayStartTime] = useState("");
  const [thursdayEndTime, setThursdayEndTime] = useState("");

  const [fridayStartTime, setFridayStartTime] = useState("");
  const [fridayEndTime, setFridayEndTime] = useState("");

  const clearFields = () => {
    setGroup("");
    setMondayStartTime("");
    setMondayEndTime("");
    setTuesdayStartTime("");
    setTuesdayEndTime("");
    setWednesdayStartTime("");
    setWednesdayEndTime("");
    setThursdayStartTime("");
    setThursdayEndTime("");
    setFridayStartTime("");
    setFridayEndTime("");
    setName("");
    setSurname("");
    setInternId("");
    setSwapGroup1("");
    setSwapGroup2("");
  };

  const handleAddSchedule = async () => {
    try {
      setOpen(true);
      const scheduleGroup = {
        Group: Group,
        Schedule: {
          monday: { startTime: mondayStartTime, endTime: mondayEndTime },
          tuesday: { startTime: tuesdayStartTime, endTime: tuesdayEndTime },
          wednesday: {
            startTime: wednesdayStartTime,
            endTime: wednesdayEndTime,
          },
          thursday: { startTime: thursdayStartTime, endTime: thursdayEndTime },
          friday: { startTime: fridayStartTime, endTime: fridayEndTime },
        },
        token: token,
      };

      const JSONGroup = JSON.stringify(scheduleGroup);
      const endpointWeeklySchedule = "/api/weeklySchedule";
      const optionsWeeklySchedule = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSONGroup,
      };
      await fetch(endpointWeeklySchedule, optionsWeeklySchedule);
      alert("Group Added successfully");
    } catch (e) {
      alert("Group Couldn't Added");
      console.error(e);
    }
  };

  const handleRemoveSchedule = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.delete(
        `/api/weeklySchedule`,
        { params: { token: token, Group: Group } },
        config
      );
      setLoading(false);
      clearFields();
      alert("Removed");
    } catch (e) {
      alert("not Removed");
      console.error(e);
      setLoading(false);
    }
  };
  const handleEditSchedule = async (event) => {
    setLoading(true);
    const scheduleGroup = {
      Group: Group,
      Schedule: {
        monday: { startTime: mondayStartTime, endTime: mondayEndTime },
        tuesday: { startTime: tuesdayStartTime, endTime: tuesdayEndTime },
        wednesday: { startTime: wednesdayStartTime, endTime: wednesdayEndTime },
        thursday: { startTime: thursdayStartTime, endTime: thursdayEndTime },
        friday: { startTime: fridayStartTime, endTime: fridayEndTime },
      },
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.put(
        `/api/weeklySchedule`,
        { params: { token: token, scheduleGroup: scheduleGroup } },
        config
      );
      setLoading(false);
      alert("Updated.");
    } catch (e) {
      alert("not Updated.");
      console.error(e);
      setLoading(false);
    }
  };
  const handleSwapSchedule = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/weeklySchedule/swapGroup`,
        {
          params: {
            token: token,
            swapGroup1: swapGroup1,
            swapGroup2: swapGroup2,
          },
        },
        config
      );

      setData(data);
      setLoading(false);

      setSwapGroup1("");
      setSwapGroup2("");

      alert("Swap Successfully");
    } catch (e) {
      alert("Match Couldn't found");
      console.error(e);
      setLoading(false);
    }
  };
  const handleMatchGroup = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/weeklySchedule/matchGroup`,
        { params: { token: token, Group: Group } },
        config
      );
      setData(data);
      setLoading(false);

      clearFields();

      // Defination
      setGroup(data.Group);
      setMondayStartTime(data.Schedule.monday.startTime);
      setMondayEndTime(data.Schedule.monday.endTime);
      setTuesdayStartTime(data.Schedule.tuesday.startTime);
      setTuesdayEndTime(data.Schedule.tuesday.endTime);
      setWednesdayStartTime(data.Schedule.wednesday.startTime);
      setWednesdayEndTime(data.Schedule.wednesday.endTime);
      setThursdayStartTime(data.Schedule.thursday.startTime);
      setThursdayEndTime(data.Schedule.thursday.endTime);
      setFridayStartTime(data.Schedule.friday.startTime);
      setFridayEndTime(data.Schedule.friday.endTime);
      // Defination
      alert("Match found");
    } catch (e) {
      alert("Match Couldn't found");
      console.error(e);
      setLoading(false);
    }
  };
  const handleMatchIntern = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/weeklySchedule/matchIntern`,
        { params: { token: token, firstName: name, lastName: surname } },
        config
      );
      setData(data);
      setLoading(false);

      // Defination
      setInternId(data);
      // Defination
      alert("Match found");
    } catch (e) {
      alert("Match Couldn't found");
      console.error(e);
      setLoading(false);
    }
  };
  const handleAddInternToGroup = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/weeklySchedule/internOperations`,
        { params: { token: token, internId: internId, Group: Group } },
        config
      );
      setData(data);
      setLoading(false);

      // Defination

      // Defination
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  const handleChangeInternToGroup = async (event) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/weeklySchedule/internOperations`,
        { params: { token: token, internId: internId, Group: Group } },
        config
      );
      setData(data);
      setLoading(false);

      // Defination

      // Defination
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between rounded-t mb-0 px-4 py-6 border-0 bg-white">
        <div className="flex flex-wrap items-center">
          <div className="flex justify-between  space-x-4 ">
            <h3 className="font-semibold text-2xl">Weekly Schedule</h3>
            {/* Add/edit/remove New Schedule */}
            <Popup
              onClose={(e) => {
                clearFields();
              }}
              contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }}
              trigger={
                <button className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3">
                  <div className="buttonImage text-[#2F80ED] bg-sky-100 flex items-center justify-center h-12 w-12 rounded-full">
                    <UploadFileOutlined />
                  </div>
                  <div className="buttonText mb-1">
                    Add/Edit/Remove Schedule Group
                    <p className="text-xs">
                      Start adding schedule to inform another employee
                    </p>
                  </div>
                </button>
              }
              position="bottom"
            >
              {/* Edit/new/remove group POST */}
              <div className="m-2 p-4">
                <form>
                  <div>
                    <h6 className="font-semibold text-xl text-white pt-2 pb-4">
                      Schedule Group
                    </h6>
                    <div className="flex flex-row mx-2 mt-2 mb-4">
                      <h2 className="font-semibold text-l text-white ">
                        Group Name:{" "}
                      </h2>
                      <input
                        value={Group}
                        id="Group"
                        type="text"
                        onChange={(e) => {
                          setGroup(e.target.value);
                        }}
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                        placeholder="Type the group name..."
                        required
                      />
                      <Button
                        className="rounded border-none bg-[#e0f2fe] text-black h-7  ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                        variant="contained"
                        onClick={handleMatchGroup}
                        color="secondary"
                      >
                        Match Variables
                      </Button>
                    </div>
                  </div>

                  {/* INFORMATION BOX */}

                  <div className="flex flex-col">
                    <div className="pb-2 pt-6 ">
                      <input
                        value={mondayStartTime}
                        id="MondayStartTime"
                        onChange={(e) => {
                          setMondayStartTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type monday startTime... ( 08:00 ) "
                        required
                      />
                      <input
                        value={mondayEndTime}
                        id="MondayEndTime"
                        onChange={(e) => {
                          setMondayEndTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type monday EndTime... (13:00 ) "
                        required
                      />
                    </div>
                    <div className="pb-2  ">
                      <input
                        value={tuesdayStartTime}
                        id="tuesdayStartTime"
                        onChange={(e) => {
                          setTuesdayStartTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type tuesday StartTime... ( 08:00 ) "
                        required
                      />
                      <input
                        value={tuesdayEndTime}
                        id="tuesdayEndTime"
                        onChange={(e) => {
                          setTuesdayEndTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type tuesday EndTime... ( 13:00 ) "
                        required
                      />
                    </div>
                    <div className="pb-2  ">
                      <input
                        value={wednesdayStartTime}
                        id="wednesdayStartTime"
                        onChange={(e) => {
                          setWednesdayStartTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type wednesday StartTime... ( 08:00 ) "
                        required
                      />
                      <input
                        value={wednesdayEndTime}
                        id="wednesdayEndTime"
                        onChange={(e) => {
                          setWednesdayEndTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type wednesday EndTime... ( 13:00 ) "
                        required
                      />
                    </div>
                    <div className="pb-2  ">
                      <input
                        value={thursdayStartTime}
                        id="thursdayStartTime"
                        onChange={(e) => {
                          setThursdayStartTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type thursday StartTime... ( 08:00 ) "
                        required
                      />
                      <input
                        value={thursdayEndTime}
                        id="thursdayEndTime"
                        onChange={(e) => {
                          setThursdayEndTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type thursday EndTime... ( 13:00 ) "
                        required
                      />
                    </div>
                    <div className="pb-2  ">
                      <input
                        value={fridayStartTime}
                        id="fridayStartTime"
                        onChange={(e) => {
                          setFridayStartTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type friday StartTime... ( 08:00 ) "
                        required
                      />
                      <input
                        value={fridayEndTime}
                        id="fridayEndTime"
                        onChange={(e) => {
                          setFridayEndTime(e.target.value);
                        }}
                        type="text"
                        className="rounded border-none bg-[#e0f2fe] text-black h-7 w-80 ml-2 placeholder:italic placeholder:text-text-#0B3768 placeholder:text-sm"
                        placeholder="Type friday EndTime... ( 13:00 ) "
                        required
                      />
                    </div>
                  </div>

                  {/* BUTTOM PART */}
                  <div className="flex flex-row pt-20">
                    <div className="pl-20 space-x-4 ">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleAddSchedule}
                      >
                        Add
                      </Button>
                      <Button variant="contained" onClick={handleEditSchedule}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={handleRemoveSchedule}
                        color="error"
                      >
                        Delete
                      </Button>

                      {/* <Button variant="contained" onClick={handleSwapSchedule}>
                        Swap group hours
                      </Button> */}
                    </div>
                  </div>
                </form>
              </div>
            </Popup>

            {/* Swap Schedule Groups */}
            <Popup
              onClose={(e) => {
                clearFields();
              }}
              contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }}
              trigger={
                <button className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3">
                  <div className="buttonImage text-[#2F80ED] bg-sky-100 flex items-center justify-center h-12 w-12 rounded-full">
                    <UploadFileOutlined />
                  </div>
                  <div className="buttonText mb-1">SWAP Groups Hours</div>
                </button>
              }
              position="bottom"
            >
              <div className="m-2 p-4">
                <form>
                  <div>
                    <h6 className="font-semibold text-m text-white pt-2 pb-4">
                      Which groups do you want to swap with each other
                    </h6>
                  </div>
                  <input
                    value={swapGroup1}
                    id="swapGroup1"
                    onChange={(e) => {
                      setSwapGroup1(e.target.value);
                    }}
                    className="m-1 p-2"
                    placeholder="Group 1: "
                    type="text"
                  />
                  <input
                    value={swapGroup2}
                    id="swapGroup2"
                    onChange={(e) => {
                      setSwapGroup2(e.target.value);
                    }}
                    className="m-1 p-2"
                    placeholder="Group 2: "
                    type="text"
                  />
                  <div>
                    <Button
                      variant="contained"
                      className="font-semibold text-m text-white pt-2 pb-4"
                      onClick={handleSwapSchedule}
                    >
                      Swap
                    </Button>
                  </div>
                </form>
              </div>
            </Popup>

            {/* add/edit/remove interns group */}
            <Popup
              onClose={(e) => {
                clearFields();
              }}
              contentStyle={{ background: "#0B3768", borderRadius: "0.25rem" }}
              trigger={
                <button className="bg-white flex w-[25rem] p-3 rounded-md border-2 items-center justify-start gap-3">
                  <div className="buttonImage text-[#2F80ED] bg-sky-100 flex items-center justify-center h-12 w-12 rounded-full">
                    <UploadFileOutlined />
                  </div>
                  <div className="buttonText mb-1">
                    Add/Edit/Remove Interns to groups
                  </div>
                </button>
              }
              position="bottom"
            >
              {/* NEW POST */}
              <div className="m-2 p-4">
                <form>
                  <div>
                    <h6 className="font-semibold text-xl text-white pt-2 pb-4">
                      Intern Group
                    </h6>
                    <div className="flex flex-col mx-2 mt-2 mb-4">
                      <div className="flex flex-row mx-2 mt-2 mb-4">
                        <h2 className="font-semibold text-l text-white ">
                          .....Name:{" "}
                        </h2>
                        <input
                          id="internName"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          type="text"
                          className="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                          placeholder="Type the Intern name..."
                          required
                        />
                      </div>

                      <div className="flex flex-row mx-2 mt-2 mb-4">
                        <h2 className="font-semibold text-l text-white ">
                          surname:{" "}
                        </h2>
                        <input
                          id="internSurname"
                          onChange={(e) => {
                            setSurname(e.target.value);
                          }}
                          type="text"
                          className="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                          placeholder="Type the Intern Surname ..."
                          required
                        />
                      </div>
                      <div className="flex flex-row mx-2 mt-2 mb-4">
                        <h2 className="font-semibold text-l text-white ">
                          Intern ID:{" "}
                        </h2>
                        <input
                          className="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                          type="text"
                          value={internId}
                          variant="outlined"
                          placeholder="Intern ID"
                          inputProps={{ readOnly: true }}
                        />
                      </div>

                      <Button
                        className="rounded border-none bg-[#e0f2fe] text-black h-7  ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                        variant="contained"
                        onClick={handleMatchIntern}
                        color="secondary"
                      >
                        Match Variables
                      </Button>
                    </div>
                  </div>

                  {/* INFORMATION BOX */}
                  <div className="flex flex-row mx-2 mt-2 mb-4">
                    <h2 className="font-semibold text-l text-white ">
                      {" "}
                      Group Name :{" "}
                    </h2>
                    <input
                      id="GroupIntern"
                      type="text"
                      onChange={(e) => {
                        setGroup(e.target.value);
                      }}
                      className="rounded border-none bg-[#e0f2fe] text-black h-7 w-72 ml-2 placeholder:italic placeholder:text-#0B3768 placeholder:text-sm"
                      placeholder="Group Name ..."
                      required
                    />
                  </div>
                  {/* BUTTOM PART */}
                  <div className="flex flex-row pt-20">
                    <div className="pl-20 space-x-4 ">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleAddInternToGroup}
                      >
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleChangeInternToGroup}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Popup>
          </div>
        </div>
      </div>
      {/* TABLE */}
      <div className="block w-full overflow-x-auto ">
        <table className="items-center w-full border-collapse bg-white">
          asd
          {/* Table Head */}
          <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                First Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Last Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Group
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

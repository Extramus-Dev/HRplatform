import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import LoadingState from "../Utils/LoadingState";
import axios from "axios";
import cookie from "js-cookie";

const departmanColor = (department) => {
  switch (department) {
    case "The Information And Communications Technology":
      return "text-blue-400";
    case "Human Resources":
      return "text-green-400";
    case "Digital Marketing":
      return "text-pink-400";
    case "Business & Data Analysis":
      return "text-orange-400";
    case "Project Management":
      return "text-purple-400";
    case "Language Teaching":
      return "text-yellow-400";
    default:
      return "";
  }
};


const InternsCountModal = ({ setIcModal }) => {
  const handleCancelClick4 = () => {
    setIcModal(false);
  };
  const [isloading, setLoading] = useState(true);
const StudentCountModal = ({ setScModal, type }) => {
  const [departments, setDepartment] = useState([]);
  const token = cookie.get("token");  
  const [open, setOpen] = useState(false);

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
          `/api/department`,
          { params: { token: token } },
          config
        );
        setDepartment(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);

  // useEffect(() => {
  //   fetch("/api/department")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDepartment(data);
  //     });
  // });
        setOpen(false);
      });
  });

  return (

    <div className=" opacity-90  bg-zinc-300 fixed inset-0 z-50   ">
      {open && <LoadingState open={open} />}
      <div className="flex h-screen justify-center items-center  ">
        <div className="flex-col bg-white border-4 m-4 rounded-xl px-10 p-0 ">
          <button
            onClick={(e) => setScModal(false)}
            className=" rounded px-4 py-2  text-black text-2xl"
          >
            <MdOutlineCancel />
          </button>
          <div className="flex flex-row gap-16 text-5xl  bg-white  mb-8 ml-4 mr-4">
            {departments.map((department) => (
              <div className="flex flex-row ml-5">
                <div className="text-red-400 ">
                  <BsPeopleFill
                    className={`text-2xl ${departmanColor(
                      department.department
                    )}`}
                  />
                </div>
                <div className="flex flex-col text-sm font-bold ">
                  <div>{department.department}</div>
                  <div className="text-xl ml-3 ">{department[type].length}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCountModal;

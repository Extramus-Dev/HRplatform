import {
  ArrowRightAlt,
  AssignmentTurnedInOutlined,
  CheckCircleOutline,
  MoreHoriz,
  WorkOutline,
} from "@mui/icons-material";
import { Circle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Link from "next/link";

const DocumentListContent = ({ title, status }) => {

  const Border = () => {
    let isRounded;
    let statusColor;

    status === "Correct"
      ? (statusColor = " bg-green-400 ")
      : status === "Incorrect"
        ? (statusColor = " bg-red-400 ")
        : status === "Needs Review"
          ? (statusColor = " bg-blue-400 ")
          : (statusColor = " bg-gray-400 ");

    let result =
      "flex flex-col items-center px-2 py-1 w-full gap-1 text-white " +
      isRounded +
      statusColor;
    return result;
  };

  return (
    <div className={Border()}>
      <div className="text-[10px] ">{title}</div>
      <CheckCircleOutline className="text-sm" />
    </div>
  );
};

const DocumentList = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/applicant")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false)
      });
  }, []);

  return (
    <div className="flex flex-col w-full gap-2">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {data.length == 0 ?
        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap 
                  p-4 flex items-center">
          The Applicants list is empty at the moment!
          <div className="text-blue-600/75 pl-1"><Link href="/applicants/new"> Add a new applicant</Link></div></div>
        :
        data.map((student, index) => (
          <div
            className="flex flex-col w-full py-2 px-6 gap-2 bg-white border rounded-md"
            key={student.id}
          >
            {/* Top */}
            <div className="flex justify-between">
              {/* Top Left */}
              <div className="flex gap-4 items-center">
                <div className="flex font-semibold">
                  <p>
                    {student.student.firstName} {student.student.lastName}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                  <WorkOutline className="text-sm" />
                  <p>{student.department}</p>
                </div>
              </div>
              {/* Top Right */}
              <div className="flex gap-2">
                <div className="py-1 px-2 text-xs rounded bg-sky-200 text-blue-900">
                  Starting the {student.startDate}
                </div>
                <MoreHoriz className="cursor-pointer" />
              </div>
            </div>

            {/* Middle */}
            <div className="flex gap-[2px]">
              {data[index].documents.map((content, index) => (
                <DocumentListContent
                  key={index}
                  title={content.name}
                  status={content.status}
                />
              ))}
            </div>
            {/* Bottom */}
            <div className="flex justify-between">
              {/* Bottom Left */}
              <div className="flex items-center gap-1 text-xs font-light text-gray-500">
                <p>Applied on {student.applicationDate}</p>
              </div>
              <div className="flex cursor-pointer">
                {/* Bottom Right */}
                <div className="py-1 px-2 text-xs text-blue-900">
                  View All Documents
                </div>
                <ArrowRightAlt />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DocumentList;
import { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";

const UpcomingViewAll = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const token = cookie.get("token");
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
          `/api/upComing`,
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
    <div>
      {data.map((upcoming) => (
        <div
          key={upcoming.id}
          className="items-center w-full border-collapse bg-white"
        >
          <div className="flex m-2 py-4">
            <div className="flex-[5] flex flex-col">
              <div className="text-sm font-semibold">{upcoming.name}</div>
              <div className="text-xs font-light ">{upcoming.department}</div>
            </div>
            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
              {upcoming.action}
            </div>
            <div className="flex-[3] flex items-center justify-start text-xs text-gray-500">
              {upcoming.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UpcomingViewAll;

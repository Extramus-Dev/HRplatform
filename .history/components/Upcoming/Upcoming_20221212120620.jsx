import { ConnectingAirportsOutlined } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";
import { useState, useEffect } from "react";

const Upcoming = () => {
  const token = cookie.get("token");
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);

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
        console.log({ data });
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    asyncRequest();
  }, []);
 console.log(data)
  const statusColor = (status) => {
    let colorText;

    status === "Arriving"
      ? (colorText = "text-green-500")
      : (colorText = "text-red-500");

    let result =
      "flex-[1] flex items-center justify-center text-xs " + colorText;
    return result;
  };



  return (
    <div>
		 {data.map((intern) => (
      <div className="flex w-full">
        <div className="flex-[1] flex flex-col">
          <div className="text-sm font-semibold">{intern.name}</div>
          <div className="text-xs font-light ">{intern.department}</div>
        </div>
		
        <div className={statusColor(intern.action)}>{intern.action}</div>
        <div className="flex-[1] flex items-center justify-center text-xs text-gray-500">
          {intern.date}
        </div>
      </div>
	  ))}
    </div>
  );
};

export default Upcoming;

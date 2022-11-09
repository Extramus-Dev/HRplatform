import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const Feed = ({ setOpen }) => {
  const token = cookie.get("token");
  const [data, setData] = useState([]);
  useEffect(() => {
    setOpen(true);
    const asyncRequest = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/whatsNew`,
        { params: { token: token } },
        config
      );
      setData(data);
      setOpen(false);
    };
    try {
      asyncRequest();
    } catch (e) {
      console.error(e);
      setOpen(false);
    }
  }, []);
  return (
    <div>
      {data
        ?.slice(-3)
        .reverse()
        .map((whatsNew) => (
          <div className="flex m-2 py-4" key={whatsNew.id}>
            <div className="flex flex-[1] flex-col gap-2 p-2">
              <div className="text-sm font-semibold">{whatsNew.date}</div>
              <div className="text-xs font-light">
                <div>posted by</div>
                <div>{whatsNew.postedBy}</div>
              </div>
            </div>
            <div className="flex flex-[3] flex-col gap-2 p-2">
              <div className="text-sm font-semibold">{whatsNew.title}</div>
              <div className="text-xs font-light">{whatsNew.paragraph}</div>
            </div>
            {/*<div className="flex flex-[1] p-2">
            <div className="flex h-fit text-sm font-semibold underline cursor-pointer">
              Read More
            </div>
      </div>*/}
          </div>
        ))}
    </div>
  );
};

export default Feed;

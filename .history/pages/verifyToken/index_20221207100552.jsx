import { parseCookies } from "nookies";
import axios from "axios";
import { useState } from "react";

export default function VerifyToken({ value }) {
  const [data, setData] = useState(false);
  const [isloading, setLoading] = useState(true);

  app(value).then((res) => {
    setData(res);
    setLoading(false);
  });

  return <div>{data}</div>;
}


export async function app(value) {
  const cookies = parseCookies();
  var token;
  token = cookies?.token;
  if (value === "ConfirmByAdminToken") {
    token = cookies?.ConfirmByAdminToken;
  }
  if (value === "resetPassword") {
    token = cookies?.PasswordChangeToken;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (token !== undefined) {
      var data = await axios.post(`/api/auth/tokenCheck`, { token }, config);
    }
  } catch (e) {
    console.error(e);
  }

  if (data?.data?.message === "true") {
    return true;
  } else {
    return false;
  }
}

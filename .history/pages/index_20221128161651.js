import Head from "next/head";
import { Feed } from "../components/Feed";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const route = useRouter();
  useEffect(() => {
    route.push("/dashboard");
  }, []);
  return (
    <>
      {/* <h1>Hello world!</h1> */}
      {/* <div className="flex w-full items-center justify-between">
				<div>Testing</div>
				<div>Testing</div>
			</div> */}

      <Head>
        <div className="flex items-center justify-center w-full">
          {/* <Reminder /> */}
          <Feed />
        </div>
      </Head>
    </>
  );
}

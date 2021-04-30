import axios from "axios";
import React from "react";
import { HeadingSecondary } from "../components/About/About.styled";

function about() {
  const testSendCookie = () => {
    async function send() {
      await axios
        .get(`/v1/testCookie`, {
          withCredentials: true,
        })
        .then((res) => console.log(res));
    }

    send();
  };
  return (
    <div className="lg:px-20 py-36">
      <div className="grid grid-cols-2 mt-4">
        <div>
          <HeadingSecondary className="text-blue-100">
            Apa Itu Karya Nusantara ?
          </HeadingSecondary>
          <span className="mt-5 text-blue-100 text-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
            accusantium asperiores non. Ut ad, deserunt omnis, soluta tempore
            eligendi debitis laboriosam possimus explicabo ipsa quasi, pariatur
            nihil maiores nam veniam!
          </span>
          <button onClick={testSendCookie}>tes</button>
        </div>
      </div>
    </div>
  );
}

export default about;

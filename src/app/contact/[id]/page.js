"use client";
// abc 

import axios from "axios";
import html2canvas from "html2canvas";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Contact({ params: { id } }) {
  const ref = useRef(null);
  const [user, setUser] = useState(null);

  const obj = useSearchParams();
  const darkMode = obj.get("darkmode") == 'false' ? false : true;

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((res) => setUser(res.data));
  }, []);

  const generateCard = () => {
    html2canvas(ref.current, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${user.email}.png`;
      link.click();
    });
  };

  return (
    <div className="flex justify-center items-center flex-col py-28">
      <h1 className="font-bold mb-4">User Card</h1>

      <div
        ref={ref}
        key={user?.id}
        className={`flex flex-col text-center items-center gap-4 p-12 border shadow-lg shadow-gray-500 border-black cursor-pointer rounded-lg ${darkMode && 'bg-slate-700'}`}
      >
        <img
          src={user?.image}
          alt={user?.firstName}
          className="w-36 h-36 rounded-full"
        />
        <div className={darkMode && 'text-white'}>
          <h1 className="font-semibold text-2xl">
            {user?.firstName} {user?.lastName}
          </h1>
          <h2>{user?.email}</h2>
        </div>
      </div>

      <button
        onClick={generateCard}
        className="mt-8 bg-green-500 py-3 px-5 rounded-md text-white"
      >
        Download Card
      </button>
    </div>
  );
}

"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contact() {
  const [users, setUsers] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get("https://dummyjson.com/users");
    setUsers(res.data.users);
  };

  return (
    <div className={`p-6 pb-20 gap-6 
      ${isDark ? "bg-slate-800" : "bg-slate-100"}
      `} 
    >
      <div className="flex justify-between mb-6 ">
        <h1 className={`font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>Users List</h1>
        <div className="flex justify-between gap-3 text-white">
          <button
            onClick={() => setIsDark(false)}
            className={`px-10 py2 rounded-md ${
              !isDark ? "bg-black text-white" : "bg-slate-200 text-black"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setIsDark(true)}
            className={`px-10 py2 rounded-md ${
              isDark ? "bg-black text-white" : "bg-slate-200 text-black"
            } `}
          >
            Dark
          </button>
        </div>
      </div>

      {users.map((user) => (
        <Link key={user.id} href={`contact/${user.id}?darkmode=${isDark}`}>
          <div
            key={user.id}
            className={`flex items-center gap-4 py-4 border-b border-black cursor-pointer hover:bg-slate-200 hover:text-black ${isDark ? "text-white" : "text-black"}`}
          >
            <img
              src={user.image}
              alt={user.firstName}
              className="w-12 h-12 ml-3 rounded-full shadow-md shadow-gray-600"
            />
            <div>
              <h2 className="font-semibold text-sm">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

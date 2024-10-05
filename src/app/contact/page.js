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
    <div className="p-6 pb-20 gap-6">
      <div className="flex justify-between">
        <h1 className="font-bold mb-4">Users List</h1>
        <div className="flex justify-between gap-3 text-white">
          <button
            onClick={() => setIsDark(false)}
            className={`px-10 py2 rounded-md ${
              !isDark ? "bg-slate-600" : "bg-slate-200"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setIsDark(true)}
            className={`px-10 py2 rounded-md ${
              isDark ? "bg-slate-600" : "bg-slate-200"
            } `}
          >
            Dark
          </button>
        </div>
      </div>

      {users.map((user) => (
        <Link href={`contact/${user.id}?darkmode=${isDark}`}>
          <div
            key={user.id}
            className="flex items-center gap-4 py-2 border-b border-black cursor-pointer hover:bg-slate-200"
          >
            <img
              src={user.image}
              alt={user.firstName}
              className="w-16 h-16 rounded-full shadow-md shadow-gray-600"
            />
            <div>
              <h2 className="font-semibold">
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

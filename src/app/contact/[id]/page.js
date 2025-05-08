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
    html2canvas(ref.current, { 
      useCORS: true,
      scale: 2, // Higher quality
      backgroundColor: null
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${user.email}.png`;
      link.click();
    });
  };

  return (
    <div className="flex justify-center items-center flex-col py-28">
      <h1 className="font-bold text-[30px] mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Digital Business Card
      </h1>

      <div
        ref={ref}
        key={user?.id}
        className={`relative w-1/2 h-[300px] flex items-center p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
            : 'bg-gradient-to-br from-white to-gray-100 text-gray-800'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-tr-full" />
        
        {/* Card content */}
        <div className="flex items-center gap-6 w-full pl-20">
          <div className="relative">
            <img
              src={user?.image}
              alt={user?.firstName}
              className="w-70 h-70 rounded-full border-4 border-purple-500/30 shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white" />
          </div>
          
          <div className="flex-1">
            <h1 className="font-bold text-2xl mb-1">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm text-purple-500 font-medium mb-2">
              {user?.company?.title || 'Professional'}
            </p>
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user?.email}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {user?.phone}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {user?.address?.city}, {user?.address?.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={generateCard}
        className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
      >
        Download Card
      </button>
    </div>
  );
}

"use client";

import React from "react";
import ButtonHome from "./Button-Home";

export interface WindowProps {
  label?: string;
  title?: string;
  children: React.ReactNode;
  showHead?: boolean;
}

export default function Window({
  label,
  title,
  children,
  showHead = true,
}: WindowProps) {
  // const [showHead, setShowHead] = useState(true);

  return (
    <div className="bg-purple-700/90 rounded-xl shadow shadow-black max-w-xl mx-auto xs:ml-5 sm:ml-auto xs:mr-5 sm:mr-auto -mt-24">
      {showHead && (
        <div className="flex flex-row justify-between gap-7 p-6 items-center bg-purple-400/60 rounded-xl shadow shadow-black">
          <div className="select-none flex-1 min-w-0">
            <div className="text-lg sm:text-lg font-extrabold truncate text-purple-900">
              {title}
            </div>
            <div title={label} className="text-sm text-purple-200 truncate">
              {label}
            </div>
          </div>
          <div>
            <ButtonHome />
          </div>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

"use client";

import React from "react";
import ButtonHome from "./Button-Home";

export interface WindowProps {
  label?: string;
  title?: string;
  children: React.ReactNode;
  showHead?: boolean;
  button?: boolean;
}

export default function Window({
  label,
  title,
  children,
  showHead = true,
  button = true,
}: WindowProps) {
  // const [showHead, setShowHead] = useState(true);

  return (
    <div
      className="
			bg-purple-600 rounded-xl shadow 
			shadow-black max-w-md mx-auto 
			-mt-32"
    >
      {showHead && (
        <div
          className="
						flex flex-row justify-between gap-7 p-6
						items-center bg-purple-400/60 rounded-xl
						shadow shadow-black"
        >
          <div className="select-none flex-1 min-w-0">
            <div className="text-lg font-extrabold truncate text-purple-900">
              {title?.toUpperCase()}
            </div>
            <div title={label} className="text-sm text-purple-200 truncate">
              {label}
            </div>
          </div>
          {button && (
            <div>
              <ButtonHome />
            </div>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

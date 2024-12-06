import React from "react";
import ButtonHome from "./Button-Home";

export interface WindowProps {
  label?: string;
  title?: string;
  children: React.ReactNode;
}

export default function Window(props: WindowProps) {
  return (
    <div className="bg-zinc-700 rounded-xl shadow shadow-black max-w-xl mx-auto">
      <div className="flex flex-row justify-between gap-7 p-6 items-center bg-zinc-400/60 rounded-xl shadow shadow-black">
        <div className="select-none flex-1 min-w-0">
          <div className="text-lg sm:text-lg font-bold truncate">
            {props.title}
          </div>
          <div title={props.label} className="text-sm text-zinc-300 truncate">
            {props.label}
          </div>
        </div>
        <div>
          <ButtonHome />
        </div>
      </div>
      <div className="p-5">{props.children}</div>
    </div>
  );
}

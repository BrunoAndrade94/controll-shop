import React from "react";
import ButtonHome from "./Button-Home";

export interface WindowProps {
  label?: string;
  title?: string;
  children: React.ReactNode;
}

export default function Window(props: WindowProps) {
  return (
    <div className="bg-zinc-700 rounded-xl shadow shadow-black">
      <div className="flex gap-7 p-6 items-center bg-zinc-400/60 rounded-xl shadow shadow-black">
        <div className="flex flex-col select-none">
          <div className="text-xl font-bold">{props.title}</div>
          <div className="text-sm text-zinc-300">{props.label}</div>
        </div>
        <ButtonHome />
      </div>
      <div className="p-5">{props.children}</div>
    </div>
  );
}

"use client";

import MyList from "@/components/lists/my-list";
import useMark from "@/data/hooks/use-mark";

export default function PageMarksList() {
  const { mark, loadingMark, marksLocal } = useMark();
  const headers: (keyof { id: string; description: string })[] = [
    "description",
  ];

  return (
    <div>
      <div>
        <MyList headers={headers} data={marksLocal as any}></MyList>
      </div>
    </div>
  );
}

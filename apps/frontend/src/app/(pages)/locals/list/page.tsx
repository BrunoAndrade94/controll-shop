"use client";

import MyList from "@/components/lists/my-list";
import useLocal from "@/data/hooks/use-local";

export default function PageLocalsList() {
  const { local, loadingLocal, localsLocal } = useLocal();
  const headers: (keyof { id: string; description: string })[] = [
    "description",
  ];

  return (
    <div>
      <div>
        <MyList headers={headers} data={localsLocal as any}></MyList>
      </div>
    </div>
  );
}

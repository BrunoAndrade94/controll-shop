"use client";

import MyList from "@/components/lists/my-list";
import useLocal from "@/data/hooks/use-local";

export default function PageLocalsList() {
  const { localsData } = useLocal();

  const columns = [
    {
      key: "description",
      label: "Descrição",
    },
  ];

  const columnsModal = columns;

  return (
    <div>
      <div>
        <MyList
          windowTitle="Locais"
          windowLabel="consultas e modicações"
          columns={columns}
          columnsModal={columnsModal}
          data={localsData as any}
        ></MyList>
      </div>
    </div>
  );
}

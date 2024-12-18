"use client";

import MyList from "@/components/lists/my-list";
import useMark from "@/data/hooks/use-mark";

export default function PageMarksList() {
  const { marksData } = useMark();

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
          dataModal={marksData}
          windowTitle="Marcas"
          windowLabel="consultas e modificações"
          columns={columns}
          columnsModal={columnsModal}
          data={marksData}
        ></MyList>
      </div>
    </div>
  );
}

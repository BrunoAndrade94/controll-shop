"use client";

import useMark from "@/data/hooks/use-mark";
import useMessage from "@/data/hooks/use-message";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormMark() {
  const {
    mark,
    saveMark,
    marksData,
    queryMarks,
    updateMark,
    setQueryMarks,
    descriptionInUse,
    setDescriptionInUse,
  } = useMark();

  const { msgSucess } = useMessage();

  const authNextStep: boolean[] = [
    (mark.description?.length || 0) > 2 && !descriptionInUse,
  ];

  const labels = ["Descrição"];

  const observation = `${
    descriptionInUse
      ? "Marca já cadastrada. Informe outra."
      : queryMarks
        ? "Marca liberada para uso."
        : "Informe para verificar."
  }`;

  const onChange = (markUser: string) => {
    setQueryMarks(markUser);
    if (
      marksData.some(
        (markData) =>
          markData.description?.toUpperCase() === markUser.toUpperCase()
      )
    ) {
      if (markUser.length > 0) {
        setDescriptionInUse(true); // Define como existente
        updateMark({ ...mark, description: "" }); // Limpa a marca atual
      }
    } else {
      if (markUser.length > 0) {
        setDescriptionInUse(false); // Marca liberada para uso
        updateMark({ ...mark, description: markUser }); // Atualiza com o valor digitado
      }
    }
  };

  // useEffect(() => {
  //   if (queryMarks) {
  //     const filtered = marksData.filter((markData: any) =>
  //       markData.description?.toUpperCase().includes(queryMarks.toUpperCase())
  //     );
  //     if (!filtered) {
  //       mark.description = queryMarks;
  //     }
  //   } else {
  //     setFilteredMarks([]);
  //   }
  // }, [queryMarks, marksData, setFilteredMarks, mark, mark.description]);

  return (
    <div>
      <Steps
        labels={labels}
        labelAction="Salvar"
        actionExec={saveMark}
        authNextStep={authNextStep}
      >
        <div className="flex flex-col gap-5">
          <MyInput
            label="Marca"
            observation={observation}
            value={queryMarks ?? ""}
            onChange={(event) => onChange(event.target.value)}
            error={descriptionInUse ? "Marca já está em uso." : ""}
          />
        </div>
        {/* {(mark.description?.length || 0) > 0 && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto"
          >
            {filteredMarks.map((mark) => (
              <div
                key={mark.id}
                className="p-2 cursor-pointer hover:bg-gray-200 select-none"
              >
                {mark.description}
              </div>
            ))}
          </div>
        )} */}
        <div></div>
      </Steps>
    </div>
  );
}

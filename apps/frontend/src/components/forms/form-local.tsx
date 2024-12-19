import useLocal from "@/data/hooks/use-local";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormLocal() {
  const {
    local,
    saveLocal,
    localsData,
    queryLocals,
    updateLocal,
    loadingLocal,
    setQueryLocals,
    descriptionInUse,
    setDescriptionInUse,
  } = useLocal();

  const authNextStep: boolean[] = [
    (local.description?.length || 0) > 2 && !descriptionInUse,
  ];

  const labels = ["Descrição"];

  const observation = `${
    descriptionInUse
      ? "Local já cadastrado. Informe outro."
      : queryLocals
        ? "Local liberado para uso."
        : "Informe para verificar."
  }`;

  const onChange = (localUser: string) => {
    setQueryLocals(localUser);
    if (
      localsData.some(
        (localData) =>
          localData.description?.toUpperCase() === localUser.toUpperCase()
      )
    ) {
      if (localUser.length > 0) {
        setDescriptionInUse(true); // Define como existente
      }
      updateLocal({ ...local, description: "" }); // Limpa a marca atual
    } else {
      setDescriptionInUse(false); // Marca liberada para uso
      updateLocal({ ...local, description: localUser }); // Atualiza com o valor digitado
    }
  };

  return (
    <div>
      <Steps
        labels={labels}
        labelAction="Salvar"
        actionExec={saveLocal}
        authNextStep={authNextStep}
      >
        <div className="flex flex-col gap-5">
          <MyInput
            label="Local"
            observation={observation}
            value={queryLocals ?? ""}
            onFocus={loadingLocal}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            error={descriptionInUse ? "Local já está em uso." : ""}
          />
        </div>
        <div></div>
      </Steps>
    </div>
  );
}

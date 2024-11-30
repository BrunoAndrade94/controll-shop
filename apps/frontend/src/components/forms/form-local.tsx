import useLocal from "@/data/hooks/use-local";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormLocal() {
  const { local, saveLocal, updateLocal, descriptionInUse } = useLocal();
  const labels = ["Descrição"];

  const authNextStep: boolean[] = [!!local.description && !descriptionInUse];

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
            label="Descrição"
            description="Informe a Local"
            observation={`${(local.description?.length || 0) > 0 ? "Local liberado para uso." : "Informe o local para verificar se já existe."}`}
            value={local.description ?? ""}
            onChange={(event) =>
              updateLocal({ ...local, description: event.target.value })
            }
            error={descriptionInUse ? "Local já está em uso." : ""}
          />
        </div>
        <div></div>
      </Steps>
    </div>
  );
}

import useMark from "@/data/hooks/use-mark";
import useMessage from "@/data/hooks/use-message";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormMark() {
  const { msgSucess } = useMessage();
  const { mark, saveMark, updateMark, descriptionInUse } = useMark();
  const labels = ["Descrição"];

  const authNextStep: boolean[] = [!!mark.description && !descriptionInUse];

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
            label="Descrição"
            description="Informe a Marca"
            observation={`${(mark.description?.length || 0) > 0 ? "Marca liberada para uso." : "Informe a marca para verificar se já existe."}`}
            value={mark.description ?? ""}
            onChange={(event) =>
              updateMark({ ...mark, description: event.target.value })
            }
            error={descriptionInUse ? "Marca já está em uso." : ""}
          />
        </div>
        <div></div>
      </Steps>
    </div>
  );
}

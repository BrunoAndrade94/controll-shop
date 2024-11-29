import useMark from "@/data/contexts/use-mark";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormMark() {
  const { mark, saveMark, updateMark, descriptionInUse } = useMark();
  const labels = ["Descrição"];

  const authNextStep: boolean[] = [!!mark.description && !descriptionInUse];

  return (
    <div>
      <Steps
        labels={labels}
        labelAction="Salvar"
        actionExec={saveMark}
        authNextStep={[]}
      >
        <div className="flex flex-col gap-5">
          <MyInput
            label="Descrição"
            description="Informe a descrição do produto"
            value={""}
            onChange={(event) =>
              updateMark({ ...mark, description: event.target.value })
            }
            error={
              descriptionInUse ? "A descrição informada já está em uso." : ""
            }
          />
        </div>
      </Steps>
    </div>
  );
}

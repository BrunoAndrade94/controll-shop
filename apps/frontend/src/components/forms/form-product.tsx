import Steps from "../shared/Steps";

export default function FormProduct() {
  const labels = ["Descrição", "Valor Inicial", "Código de Barras"];
  return (
    <div>
      <Steps labels={labels}>
        <div>Passo 1</div>
        <div>Passo 2</div>
        <div>Passo 3</div>
      </Steps>
    </div>
  );
}

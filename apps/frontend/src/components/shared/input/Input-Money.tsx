import { FormatMoney, FormatStringMoney } from "core";
import MyInput from "../My-Input";

interface InputMoneyProps {
  label?: string; // Label do input
  value: number; // Valor atual do input
  onChange: (value: number) => void; // Função para alterar o valor
}

const InputMoney: React.FC<InputMoneyProps> = ({
  label = "Valor",
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(FormatStringMoney(event.target.value));
  };

  const valueEnd = () => {
    return value > 0 ? `R$ ${FormatMoney(value!)}` : "R$ 0,00";
  };

  return (
    <div>
      <MyInput label={label} value={valueEnd()} onChange={handleChange} />
    </div>
  );
};

export default InputMoney;

import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
export interface MyInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  value: string | number;
  onChange: (event: any) => void;
  description?: string;
  descriptionFixed?: string;
  observation?: string;
  error?: string;
}

export default function MyInput(props: MyInputProps) {
  const handleClear = () => {
    props.onChange({ target: { value: "" } }); // Também atualiza o estado pai, caso necessário
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event); // Passa a alteração para o método onChange passado
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col text-center">
        {<p>{props.description}</p>}
      </div>
      <div className="relative">
        <div className="-mb-4 pl-2">{props.descriptionFixed}</div>
        <div className="mt-4">
          <input
            title={props.title}
            placeholder={props.label}
            onKeyDown={props.onKeyDown}
            {...props}
            type={props.type ?? "text"}
            className={`w-full px-3 py-2 mt-3 rounded-lg bg-purple-300 text-black placeholder:text-black placeholder:focus:text-purple-500 ${props.className}`}
          />
        </div>
        {/* Ícone de "x" para limpar */}
        {props.value && (
          <button
            title="Limpar"
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black pt-3"
          >
            <CleaningServicesIcon />
          </button>
        )}
      </div>
      {props.error && (
        <span className="pl-2 text-sm text-red-500">{props.error}</span>
      )}
      {!props.error && props.observation && (
        <span className="pl-2 text-sm text-yellow-700">
          {props.observation}
        </span>
      )}
    </div>
  );
}

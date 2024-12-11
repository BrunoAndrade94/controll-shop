export interface MyInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  value: string | number;
  onChange: (event: any) => void;
  description?: string;
  observation?: string;
  error?: string;
}

export default function MyInput(props: MyInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col text-center">
        {/* {props.label && <label>{props.label}</label>} */}
        {<p>{props.description}</p>}
      </div>
      <input
        title={props.title}
        onKeyDown={props.onKeyDown}
        placeholder={props.label}
        {...props}
        type={props.type ?? "text"}
        className={`w-full px-3 py-2 mt-3 rounded-lg bg-zinc-300 text-black placeholder:text-black placeholder:focus:text-zinc-500 ${props.className}`}
      />
      {props.error && (
        <span className="pl-2 text-sm text-red-500">{props.error}</span>
      )}
      {!props.error && props.observation && (
        <span className="pl-2 text-sm text-yellow-500">
          {props.observation}
        </span>
      )}
    </div>
  );
}

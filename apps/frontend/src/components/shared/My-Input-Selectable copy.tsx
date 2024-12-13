"use client";

import { useEffect, useState } from "react";
import MyInput from "./My-Input";

export interface ItemSelector {
  id: string;
  description?: string;
}

// TODO: COLOCAR ONFOCUS E OUTRAS PROPS

export interface MyInputSelectableProps {
  label: string;
  description?: string;
  value: string;

  options: any[];

  onSelect: (id: string, description: string) => void;
  onChange: (value: string) => void;
  onFocus?: () => void; // Adicionado onFocus opcional
  onBlur?: () => void; // Adicionado onBlur opcional
}

export default function MyInputSelectable(props: MyInputSelectableProps) {
  const [showList, setShowList] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<any[]>(props.options);

  const handleFilter = (query: string) => {
    setFilteredOptions(
      props.options.filter((option) =>
        option.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Atualiza as opções filtradas sempre que as opções iniciais mudam
  useEffect(() => {
    setFilteredOptions(props.options);
  }, [props.options]);

  return (
    <div className="flex flex-col gap-5">
      <MyInput
        label={props.label}
        value={props.value}
        onBlur={() => {
          setTimeout(() => {
            setShowList(false); // Fecha a lista com atraso para evitar conflitos com cliques
          }, 150);
          props.onBlur?.(); // Chama onBlur se fornecido
        }}
        onChange={(event) => {
          const newValue = event.target.value;
          props.onChange(newValue);
          handleFilter(newValue);
        }}
        description={props.description}
      />
      {showList && filteredOptions.length > 0 && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto"
        >
          {filteredOptions.map((option) => {
            return (
              <div
                key={option.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  props.onSelect(option.id, option.description);
                  setShowList(false);
                }}
              >
                {option.description}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

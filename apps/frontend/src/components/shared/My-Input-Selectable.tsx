import { useState } from "react";
import MyInput from "./My-Input";

interface Marca {
  id: string;
  description: string;
}

interface InputComListaProps {
  label: string;
  value: string;
  descriptionFixed?: string;
  disabled?: boolean;
  items: any[]; // Lista de marcas
  onChange: (value: string) => void; // Função chamada ao alterar o valor do input
  onSelect: (id: string, description: string) => void; // Função chamada ao selecionar um item
}

export default function InputComLista({
  label,
  value,
  items,
  descriptionFixed = "",
  disabled = false,
  onChange,
  onSelect,
}: InputComListaProps) {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue); // Atualiza o valor do input
    setFilteredItems(
      items.filter((item) =>
        item.description.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
    setShowList(true);
  };

  const handleSelectItem = (id: string, description: string) => {
    onChange(description); // Atualiza o input com o valor selecionado
    onSelect(id, description); // Chama a função de callback para a seleção
    setShowList(false); // Esconde a lista
  };

  return (
    <div className="flex flex-col gap-5">
      <MyInput
        descriptionFixed={descriptionFixed}
        value={value}
        disabled={disabled}
        label={items.length === 0 ? "Procurando..." : label}
        onChange={(event) => handleInputChange(event.target.value)}
        onFocus={() => {
          setShowList(true);
          setFilteredItems(items);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowList(false);
            items = [];
          }, 150); // Delay para permitir o clique na lista
        }}
      />

      {showList && filteredItems.length > 0 && (
        <div
          onMouseDown={(e) => e.preventDefault()} // Evita fechamento ao clicar
          className="relative top-full left-0 w-full bg-purple-200 border rounded-xl border-purple-600 shadow-lg max-h-52 overflow-auto z-10 -mt-3 -mb-8"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-2 cursor-pointer hover:bg-purple-400"
              onClick={() => handleSelectItem(item.id, item.description)}
            >
              {item.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

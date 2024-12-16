"use client";

// Importações
import useProduct from "@/data/hooks/use-product";
import { useState } from "react";
import Window from "../shared/Window";
import "./ListaProdutos.css"; // Arquivo CSS para estilos adicionais

// Componente de Lista de Produtos
const ListaProdutos = () => {
  const { productsData } = useProduct();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ type: "", product: null });

  // Filtra os produtos com base na pesquisa
  const filteredProducts = productsData.filter((product) =>
    product.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Função para abrir o modal
  const openModal = (type: any, product: any) => {
    setModal({ type, product });
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModal({ type: "", product: null });
  };

  return (
    <Window>
      <div className="lista-produtos">
        <h1>Lista de Produtos</h1>

        {/* Campo de Pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pesquisa"
        />

        {/* Tabela de Produtos */}
        <div className="tabela-container">
          <table className="tabela-produtos">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.description}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => openModal("ver", product)}
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      onClick={() => openModal("editar", product)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => openModal("excluir", product)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modal.type && (
          <Modal
            type={modal.type}
            product={modal.product}
            closeModal={closeModal}
          />
        )}
      </div>
    </Window>
  );
};

// Componente Modal
const Modal = ({ type, product, closeModal }: any) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    // console.log(`${type} produto:`, product);
    // console.log("Valor:", value);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Produto</h2>
        {product && (
          <div>
            <p>ID: {product.id}</p>
            <p>Descrição: {product.description}</p>
          </div>
        )}
        {type !== "ver" && (
          <input
            type="text"
            placeholder={`Digite o valor para ${type}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <button onClick={handleSubmit}>Confirmar</button>
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default ListaProdutos;

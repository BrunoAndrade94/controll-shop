import { useContext } from "react";
import ContextProduct from "./context-product";

const useProducts = () => useContext(ContextProduct);

export default useProducts;

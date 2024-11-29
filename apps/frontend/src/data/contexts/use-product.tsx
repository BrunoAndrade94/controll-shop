import { useContext } from "react";
import ContextProduct from "./context-product";

const useProduct = () => useContext(ContextProduct);

export default useProduct;

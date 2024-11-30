import { useContext } from "react";
import ContextProduct from "../contexts/product/context-product";

const useProduct = () => useContext(ContextProduct);

export default useProduct;

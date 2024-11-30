import { useContext } from "react";
import ContextLocal from "../contexts/local/context-local";

const useLocal = () => useContext(ContextLocal);

export default useLocal;

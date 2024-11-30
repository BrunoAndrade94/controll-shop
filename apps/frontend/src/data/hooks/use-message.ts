import { useContext } from "react";
import ContextMessage from "../contexts/message/context-message";

const useMessage = () => useContext(ContextMessage);

export default useMessage;

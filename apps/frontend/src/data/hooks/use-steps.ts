import { useContext } from "react";
import ContextSteps from "../contexts/shared/context-steps";

const useSteps = () => useContext(ContextSteps);

export default useSteps;

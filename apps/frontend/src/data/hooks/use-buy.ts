import { useContext } from "react";
import ContextBuy from "../contexts/buy/context-buy";

const useBuy = () => useContext(ContextBuy);

export default useBuy;

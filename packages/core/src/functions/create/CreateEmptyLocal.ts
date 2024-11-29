import { Local } from "../../models";
import { Id } from "../../shared";

export default function CreateEmptyLocal(): Partial<Local> {
  return {
    id: Id.new(),
    createDate: new Date(),
    description: "",
    active: true,
  };
}

import { Local } from "../../models";
import { Id } from "../../shared";

export default function CreateEmptyLocal(): Partial<Local> {
  return {
    id: Id.new(),
    description: "",
    createDate: new Date(),
    active: true,
  };
}

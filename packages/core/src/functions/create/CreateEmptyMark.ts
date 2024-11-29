import { Mark } from "../../models";
import { Id } from "../../shared";
export default function CreateEmptyMark(): Partial<Mark> {
  return {
    id: Id.new(),
    createDate: new Date(),
    description: "",
    active: true,
  };
}

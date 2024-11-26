import { Local } from "../../models";
import { Id } from "../../shared";

export default function ComplementLocal(partialLocal: Partial<Local>): Local {
  // const errors = ValidateLocal(partialLocal);

  // if (errors.length) {
  //   throw new Error(errors.join("\n"));
  // }

  const Local: Local = {
    // pode vazio
    id: partialLocal.id ?? Id.new(),
    createDate: partialLocal.createDate ?? new Date(),
    active: true,

    // nao pode vazio
    description: partialLocal.description.toUpperCase(),
  } as Local;

  return Local;
}

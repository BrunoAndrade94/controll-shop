import { Id, Local } from "core";

export default function ComplementLocal(partialLocal: Partial<Local>): Local {
  // const errors = ValidateLocal(partialLocal);

  // if (errors.length) {
  //   throw new Error(errors.join("\n"));
  // }

  const local: Local = {
    id: partialLocal.id || Id.new(),
    createDate: partialLocal.createDate || new Date(),
    description: partialLocal.description.toUpperCase(),
    active: true,
  } as Local;

  return local;
}

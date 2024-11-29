import { Local } from "core";

export default function ComplementLocal(partialLocal: Partial<Local>): Local {
  // const errors = ValidateLocal(partialLocal);

  // if (errors.length) {
  //   throw new Error(errors.join("\n"));
  // }

  const Local: Local = {
    id: partialLocal.id,
    createDate: partialLocal.createDate,
    description: partialLocal.description.toUpperCase(),
    active: true,
  } as Local;

  return Local;
}

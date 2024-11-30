import { Id, Mark } from "core";

export default function ComplementMark(partialMark: Partial<Mark>): Mark {
  // const errors = ValidateMark(partialMark);

  // if (errors.length) {
  //   throw new Error(errors.join("\n"));
  // }

  const mark: Mark = {
    id: partialMark.id || Id.new(),
    createDate: partialMark.createDate || new Date(),
    description: partialMark.description.toUpperCase(),
    active: true,
  } as Mark;

  return mark;
}

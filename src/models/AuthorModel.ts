import { t } from "mobx-state-tree";

export const AuthorModel = t.model("AuthorModel", {
  id: t.identifierNumber,
  fullName: t.string,
  numberOfBooks: t.number,
});

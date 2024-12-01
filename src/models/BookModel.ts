import { t } from "mobx-state-tree";
import { AuthorModel } from "./AuthorModel";

export const BookModel = t.model("BookModel", {
  id: t.identifierNumber,
  title: t.string,
  authors: t.array(t.reference(AuthorModel)),
  yearOfIssue: t.number,
});

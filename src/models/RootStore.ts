import { Instance, t } from "mobx-state-tree";
import { BookModel } from "./BookModel";
import { AuthorModel } from "./AuthorModel";

export const RootStore = t
  .model("RootStore", {
    books: t.array(BookModel),
    authors: t.array(AuthorModel),
  })
  .actions((store) => ({
    addBook(title: string, authors: number[], yearOfIssue: number) {
      authors.forEach((authorId) => {
        const author = store.authors.find((author) => author.id === authorId);
        if (author) {
          author.numberOfBooks += 1;
        }
      });
      store.books.push({
        id: Date.now(),
        title,
        authors,
        yearOfIssue,
      });
    },
    upsertBook(
      id: number | null,
      title: string,
      authors: number[],
      yearOfIssue: number
    ) {
      if (id === null) {
        this.addBook(title, authors, yearOfIssue);
      } else {
        const bookToUpdate = store.books.find((book) => book.id === id);
        if (bookToUpdate) {
          const currentAuthors = bookToUpdate.authors.map(
            (author) => author.id
          );
          
          currentAuthors.forEach((authorId) => {
            const author = store.authors.find((a) => a.id === authorId);
            if (author && !authors.includes(authorId)) {
              author.numberOfBooks -= 1;
            }
          });

          authors.forEach((authorId) => {
            if (!currentAuthors.includes(authorId)) {
              const author = store.authors.find((a) => a.id === authorId);
              if (author) {
                author.numberOfBooks += 1;
              }
            }
          });

          bookToUpdate.title = title;
          bookToUpdate.yearOfIssue = yearOfIssue;
          bookToUpdate.authors.replace(
            authors
              .map((authorId) => store.authors.find((a) => a.id === authorId))
              .filter(
                (author): author is Instance<typeof AuthorModel> =>
                  author !== undefined
              )
          );
        }
      }
    },
    deleteBook(id: number) {
      const bookToRemove = store.books.find((book) => book.id === id);
      if (bookToRemove) {
        const authorIds = bookToRemove.authors.map((author) => author.id);
        authorIds.forEach((authorId) => {
          const author = store.authors.find((author) => author.id === authorId);
          if (author) {
            author.numberOfBooks -= 1;
          }
        });
        store.books.remove(bookToRemove);
      }
    },
    addUpdateAuthor(id: number | null, fullName: string) {
      if (id === null) {
        store.authors.push({
          id: Date.now(),
          fullName,
          numberOfBooks: 0,
        });
      } else {
        const autorForUpdate = store.authors.find((author) => author.id === id);
        if (autorForUpdate) {
          autorForUpdate.fullName = fullName;
        }
      }
    },
    deleteAuthor(id: number) {
      const authorToRemove = store.authors.find((author) => author.id === id);
      if (authorToRemove) {
        store.books.forEach((book) => {
          const index = book.authors.indexOf(authorToRemove);
          if (index !== -1) {
            book.authors.splice(index, 1);
          }
        });
        store.authors.remove(authorToRemove);
      }
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({ books: [], authors: [] });
  }

  return rootStore;
}

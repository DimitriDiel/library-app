import { useNavigate } from "react-router-dom";
import { useStore } from "../models/RootStore";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  AuthorsAndBooksWrapper,
  ButtonControl,
  FilterWrapper,
  StyledFormContainer,
} from "./styles";

const Books = observer(() => {
  const rootStore = useStore();
  const navigate = useNavigate();

  const [selectedAuthorId, setSelectedAuthorId] = useState<number | "">("");

  const editBook = (bookId: number | null) => {
    navigate("/add-book", { state: { bookId } });
  };

  const handleDeleteBook = (id: number) => {
    rootStore.deleteBook(id);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthorId(Number(event.target.value) || "");
  };

  const filteredBooks = selectedAuthorId
    ? rootStore.books.filter((book) =>
        book.authors.some((author) => author.id === selectedAuthorId)
      )
    : rootStore.books;

  return (
    <AuthorsAndBooksWrapper>
      <ButtonControl>
        <button name="add-book" onClick={() => editBook(null)}>
          Add new book
        </button>
      </ButtonControl>
      <StyledFormContainer
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FilterWrapper>
          <select
            name="author"
            value={selectedAuthorId}
            onChange={handleAuthorChange}
          >
            <option value="" label="Select an author" />
            {rootStore.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.fullName}
              </option>
            ))}
          </select>
          <ButtonControl>
            <button name="submit-author" type="submit">
              Submit
            </button>
          </ButtonControl>
        </FilterWrapper>
      </StyledFormContainer>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Year Of Issue</th>
            <th>Edit book</th>
            <th>Delete book</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>
                  {book.authors.map((author) => author.fullName).join(", ")}
                </td>
                <td>{book.yearOfIssue}</td>
                <td>
                  <button name="edit-book" onClick={() => editBook(book.id)}>
                    Edit book
                  </button>
                </td>
                <td>
                  <button
                    name="delete-book"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete Book
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </AuthorsAndBooksWrapper>
  );
});

export default Books;

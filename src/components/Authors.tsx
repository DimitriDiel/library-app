import { useNavigate } from "react-router-dom";
import { useStore } from "../models/RootStore";
import { observer } from "mobx-react-lite";
import { AuthorsAndBooksWrapper, ButtonControl } from "./styles";

const Authors = observer(() => {
  const rootStore = useStore();
  const navigate = useNavigate();

  const editAuthor = (authorId: number | null) => {
    navigate("/add-author", { state: { authorId } });
  };

  const handleDeleteAuthor = (id: number) => {
    rootStore.deleteAuthor(id);
  };

  return (
    <AuthorsAndBooksWrapper>
      <ButtonControl>
        <button name="add-author" onClick={() => editAuthor(null)}>
          Add new author
        </button>
      </ButtonControl>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>FullName</th>
            <th>Number Of Books</th>
            <th>Edit author</th>
            <th>Delete author</th>
          </tr>
        </thead>
        <tbody>
          {rootStore.authors
            .slice()
            .sort((a, b) => a.fullName.localeCompare(b.fullName))
            .map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.fullName}</td>
                <td>{author.numberOfBooks}</td>
                <td>
                  <button
                    name="edit-author"
                    onClick={() => editAuthor(author.id)}
                  >
                    Edit author
                  </button>
                </td>
                <td>
                  <button
                    name="delete-author"
                    onClick={() => handleDeleteAuthor(author.id)}
                  >
                    Delete author
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </AuthorsAndBooksWrapper>
  );
});

export default Authors;


import { Route, Routes } from "react-router-dom";
import AddAuthors from "./components/AddAuthor";
import AddBooks from "./components/AddBook";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add-book" element={<AddBooks />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/add-author" element={<AddAuthors />} />
        <Route path="*" element="Page Not Found!!!" />
      </Routes>
    </Layout>
  );
}

export default App;

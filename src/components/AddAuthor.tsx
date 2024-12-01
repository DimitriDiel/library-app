import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "../models/RootStore";
import {
  AuthorsAndBooksWrapper,
  StyledFormContainer,
  StyledInput,
} from "./styles";
import { useLocation } from "react-router-dom";

function AddAuthors() {
  const rootStore = useStore();
  const location = useLocation();
  const { authorId } = location.state || {};

  const authorForUpdate =
    authorId !== undefined
      ? rootStore.authors.find((a) => a.id === authorId)
      : null;

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
  });
  const formik = useFormik({
    initialValues: {
      id: authorId,
      fullName: authorForUpdate ? authorForUpdate.fullName : "",
    },
    validationSchema: validationSchema,
    validateOnMount: false,
    validateOnChange: false,

    onSubmit: (values, helpers) => {
      rootStore.addUpdateAuthor(values.id, values.fullName);

      if (!values.id) {
        helpers.resetForm();
      }
    },
  });

  return (
    <AuthorsAndBooksWrapper>
      <StyledFormContainer onSubmit={formik.handleSubmit}>
        <label>Author name</label>
        <StyledInput
          name="fullName"
          type="text"
          placeholder="Insert Author name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
        ></StyledInput>
        {formik.errors.fullName && <p>{formik.errors.fullName}</p>}
        <button type="submit">Add/Save</button>
      </StyledFormContainer>
    </AuthorsAndBooksWrapper>
  );
}

export default AddAuthors;

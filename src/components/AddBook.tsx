import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "../models/RootStore";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import {
  AuthorsAndBooksWrapper,
  InputWrapper,
  StyledFormContainer,
  StyledInput,
} from "./styles";
import { useLocation } from "react-router-dom";

function AddBooks() {
  const rootStore = useStore();
  const location = useLocation();
  const { bookId } = location.state || {};

  const bookForUpdate =
    bookId !== undefined ? rootStore.books.find((b) => b.id === bookId) : null;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const formik = useFormik({
    initialValues: {
      id: bookId,
      title: bookForUpdate ? bookForUpdate.title : "",
      authors: bookForUpdate
        ? bookForUpdate.authors.map((author) => author.id)
        : [],
      yearOfIssue: bookForUpdate ? bookForUpdate.yearOfIssue : 0,
    },
    validateOnMount: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      authors: Yup.array()
        .of(Yup.number())
        .required("Author is required")
        .min(1),
      yearOfIssue: Yup.number()
        .required("Year of issue is required")
        .min(1, "must be greater then 1"),
    }),
    onSubmit: (values, helpers) => {
      rootStore.upsertBook(
        values.id,
        values.title,
        values.authors,
        values.yearOfIssue
      );

      if (!values.id) {
        helpers.resetForm();
      }
    },
  });

  const handleAuthorChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const valueIds =
      typeof value === "string" ? value.split(",").map(Number) : value;

    formik.setFieldValue("authors", valueIds);
  };

  useEffect(() => {
    if (bookForUpdate) {
      const authorIds = bookForUpdate.authors.map((author) => author.id);
      formik.setFieldValue("authors", authorIds);
      formik.setFieldValue("title", bookForUpdate.title);
      formik.setFieldValue("yearOfIssue", bookForUpdate.yearOfIssue);
    }
  }, [bookForUpdate]);

  return (
    <AuthorsAndBooksWrapper>
      <StyledFormContainer onSubmit={formik.handleSubmit}>
        <InputWrapper>
          <label>Book title</label>
          <StyledInput
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
          ></StyledInput>
          {formik.errors.title && <p>{formik.errors.title}</p>}
        </InputWrapper>
        <InputWrapper>
          <label>Year of Issue</label>
          <StyledInput
            type="number"
            name="yearOfIssue"
            value={formik.values.yearOfIssue}
            onChange={formik.handleChange}
          ></StyledInput>
          {formik.errors.yearOfIssue && <p>{formik.errors.yearOfIssue}</p>}
        </InputWrapper>
        <InputWrapper>
          <label>Authors</label>
          <Select
            multiple
            name="authors"
            value={formik.values.authors}
            renderValue={(selected) =>
              selected
                .map(
                  (id) =>
                    rootStore.authors.find((author) => author.id === id)
                      ?.fullName
                )
                .join(", ")
            }
            MenuProps={MenuProps}
            onChange={handleAuthorChange}
          >
            {rootStore.authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                <Checkbox checked={formik.values.authors.includes(author.id)} />
                <ListItemText primary={author.fullName} />
              </MenuItem>
            ))}
          </Select>
          {formik.errors.authors && <p>{formik.errors.authors}</p>}
        </InputWrapper>

        <button type="submit">Add/Save</button>
      </StyledFormContainer>
    </AuthorsAndBooksWrapper>
  );
}

export default AddBooks;

import styled from "@emotion/styled";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px;
  height: fit-content;
  background-size: cover;
  height: 20px;
  border-bottom: 1px solid black;
`;

export const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const AuthorsAndBooksWrapper = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin-top: 10px;
  gap: 14px;
`;
export const ButtonControl = styled.div`
  padding: 20px;
`;

export const StyledInput = styled.input`
  width: 150px;
  height: 50px;
  border: 1px solid black;
  padding: 12px 12px 12px 20px;
  outline: none;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  &::placeholder {
    color: #ffffff;
    font-size: 16px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
`;



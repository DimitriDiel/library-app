import { NavLink } from "react-router-dom";
import { LayoutProps } from "./types";
import { Header, LayoutWrapper, Main, NavigationContainer } from "./styles";

function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header>
        <NavigationContainer>
          <NavLink to="/">Books</NavLink>
          <NavLink to="/authors">Authors</NavLink>
        </NavigationContainer>
      </Header>
      <Main>{children}</Main>
    </LayoutWrapper>
  );
}

export default Layout;

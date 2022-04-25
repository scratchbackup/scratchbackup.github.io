import React from "react";
import { Container } from "../Container/index.jsx";
import "./index.scss";

const Header = ({ children }) => (
  <header className="header">
    <Container>{children}</Container>
  </header>
);

export { Header };

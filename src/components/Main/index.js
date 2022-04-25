import React from "react";
import { Container } from "../Container/index.jsx";
import "./index.scss";

const Main = ({ children }) => (
  <main className="main">
    <Container>{children}</Container>
  </main>
);

export { Main };

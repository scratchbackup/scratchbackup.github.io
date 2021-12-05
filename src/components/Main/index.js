import React from "react";
import { Container } from "../Container";
import "./index.scss";

const Main = ({ children }) => (
  <main className="main">
    <Container>{children}</Container>
  </main>
);

export { Main };

import React from "react";
import { Container } from "../Container";
import "./index.scss";

const Footer = ({ children }) => (
  <footer className="footer">
    <Container>{children}</Container>
  </footer>
);

export { Footer };

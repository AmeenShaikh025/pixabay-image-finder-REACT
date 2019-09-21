import React from "react";
import "./App.css";

import NavBar from "./components/navbar/NavBar";
import Search from "./components/search/Search";

import Container from "@material-ui/core/Container";

function App() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Search />
      </Container>
    </div>
  );
}

export default App;

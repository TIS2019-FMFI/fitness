import React from "react";
import snakeoil from "./images/snakeoil.jpg";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={snakeoil} className="App-logo" alt="logo" />
      </header>
    </div>
  );
};

export default App;

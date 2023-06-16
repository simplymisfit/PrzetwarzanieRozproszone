import React, { useContext } from "react";
import "./app.css";
import { PokemonContext } from "./providers/PokemonProvider";
import Authorized from "./components/Authorized/Authorized";
import Unauthorized from "./components/Unauthorized/Unauthorized";

function App() {
  const { user } = useContext(PokemonContext);

  return <div className="App">{user?.username ? <Authorized /> : <Unauthorized />}</div>;
}

export default App;

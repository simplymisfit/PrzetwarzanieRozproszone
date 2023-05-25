import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import PokemonProvider from "./providers/PokemonProvider";
import Authorized from "./components/Authorized/Authorized";
import Unauthorized from "./components/Unauthorized/Unauthorized";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PokemonProvider>
        <div className="App">
          {/* <Unauthorized /> */}
          <Authorized />
        </div>
      </PokemonProvider>
    </ThemeProvider>
  );
}

export default App;

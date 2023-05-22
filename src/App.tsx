import "./App.css";
import Home from "./views/Home";
import { GlobalProvider } from "./contexts/MainContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </>
  );
}

export default App;

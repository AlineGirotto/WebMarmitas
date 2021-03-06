import './App.css';
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
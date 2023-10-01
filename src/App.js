import "./App.css";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import CredsFunction from "./context/notes/credsFunction.js";

function App() {
  return (
    <>
      <CredsFunction>
        <Router>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="*" element={<Welcome />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/todo" element={<Home />} />
          </Routes>
        </Router>
      </CredsFunction>
    </>
  );
}

export default App;

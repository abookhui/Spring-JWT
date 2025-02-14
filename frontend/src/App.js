import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./LoginPage";
import Home from "./Home";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Home/> }/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import MyPage from "./pages/MyPage";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/join" element={<Join />} />
                <Route path="/mypage" element={token ? <MyPage token={token} /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
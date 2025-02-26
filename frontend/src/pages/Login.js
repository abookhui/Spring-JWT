import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const token = response.headers.get("access");  // 토큰 가져오기
      console.log("받은 토큰:", token); // 토큰 확인용 로그
      if (token) {
        setToken(token);
        navigate("/mypage");
      } else {
        alert("토큰이 없습니다.");
      }
    } else {
      alert("로그인 실패");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">로그인</h1>
      <form onSubmit={handleLogin} className="flex flex-col mt-4">
        <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-2"/>
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2"/>
        <button type="submit" className="bg-blue-500 text-white p-2">로그인</button>
      </form>
    </div>
  );
}

export default Login;

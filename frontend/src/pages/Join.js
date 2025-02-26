import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/login");
    } else {
      alert("회원가입 실패!");
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <form onSubmit={handleJoin} className="flex flex-col mt-4">
        <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-2"/>
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2"/>
        <button type="submit" className="bg-blue-500 text-white p-2">가입하기</button>
      </form>
    </div>
  );
}

export default Join;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPage({ token }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/mypage", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },

      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        alert("인증 정보가 유효하지 않습니다.");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">마이페이지</h1>
      <p className="mt-4">안녕하세요, <span className="font-semibold">{username}</span>님!</p>
    </div>
  );
}

export default MyPage;

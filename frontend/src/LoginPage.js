import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleLogin = async (event) => {
        event.preventDefault(); // 폼 제출 시 새로고침 방지

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        //const response = await fetch("http://backend:8080/api/login", {
        const response = await fetch("/api/login", {
            method: "POST",
            body: formData, // FormData 객체 사용
            credentials: "include", // 쿠키 포함
        });

        if (response.ok) {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                alert("로그인 성공: " + data.message);
                navigate("/"); // 로그인 성공 시 /로 이동
            } catch (error) {
                console.error("JSON 파싱 오류:", error);
                alert("로그인은 성공했지만 응답 데이터가 올바르지 않습니다.");
                navigate("/"); // 로그인 성공 시 /로 이동
            }
        } else {
            alert("로그인 실패");
        }
    };

    return (
        <div>
            <h2>로그인 페이지</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default LoginPage;

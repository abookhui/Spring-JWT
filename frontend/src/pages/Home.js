import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">홈 페이지</h1>
      <nav className="mt-4">
        <Link to="/login" className="mr-4 text-blue-500">로그인</Link>
        <br />
        <Link to="/join" className="text-blue-500">회원가입</Link>
      </nav>
    </div>
  );
}

export default Home;
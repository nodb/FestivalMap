import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Festival from "./routes/Festival";
import FestivalDetail from "./routes/FestivalDetail";
import Show from "./routes/Show";
import ShowDetail from "./routes/ShowDetail";
import CreateAccount from "./routes/create-account";
import Login from "./routes/Login";
import { Access } from "./components/Access";

function App() {
  const { userLogin } = Access();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        {userLogin ? (
          <>
            <Route path="/festival/" element={<Festival />} />
            <Route path="/festival/search/:id" element={<Festival />} />
            <Route path="/festival/:id" element={<FestivalDetail />} />
            <Route path="/show/" element={<Show />} />
            <Route path="/show/search/:id" element={<Show />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </>
        ) : (
          <>
            <Route path="/festival/" element={<Login />} />
            <Route path="/festival/search/:id" element={<Login />} />
            <Route path="/festival/:id" element={<Login />} />
            <Route path="/show/" element={<Login />} />
            <Route path="/show/search/:id" element={<Login />} />
            <Route path="/show/:id" element={<Login />} />
          </>
        )}
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

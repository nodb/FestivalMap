import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Festival from "./routes/Festival";
import FestivalDetail from "./routes/FestivalDetail";
import Show from "./routes/Show";
import ShowDetail from "./routes/ShowDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route path="/festival/" element={<Festival num="0" type="A" />} />
        <Route path="/festival/search/:id" element={<Festival />} />
        <Route path="/festival/:id" element={<FestivalDetail />} />
        <Route path="/show/" element={<Show num="1" type="01" />} />
        <Route path="/show/search/:id" element={<Show />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

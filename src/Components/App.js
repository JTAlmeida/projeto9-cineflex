import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/reset.css";
import "../css/style.css";
import Header from "./Header";
import Movielist from "./Movielist";
import Sessions from "./Sessions";
import Seats from "./Seats";
import Sucess from "./Sucess";

export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movielist />}></Route>
          <Route path="/sessoes/:idFilme" element={<Sessions />}></Route>
          <Route path="/assentos/:idSessao" element={<Seats />}></Route>
          <Route path="/sucesso" element={<Sucess />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

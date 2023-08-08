import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Table from "../src/components/table"


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>CRUD JB</h1>
        <Link to="/">LISTAR</Link>
        <Link to="/create">CRIAR</Link>
        <Link to="/Table">TABELA</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/Table" element={<Table />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

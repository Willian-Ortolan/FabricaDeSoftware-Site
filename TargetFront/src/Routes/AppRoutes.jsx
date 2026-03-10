import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Servicos from "../Pages/Servicos";
import SobreNos from "../Pages/SobreNos";
import Mapeamento from "../Pages/Mapeamento";
import Pulverizacao from "../Pages/Pulverizacao";
import Contratar from "../Pages/Contratar";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin/Admin";
import Cliente from "../Pages/Cliente/Cliente";
import NotFound from "../Pages/NotFound";
import MainLayout from "../Layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/SobreNos" element={<SobreNos />} />
          <Route path="/mapeamento" element={<Mapeamento />} />
          <Route path="/pulverizacao" element={<Pulverizacao />} />
          <Route path="/contratar" element={<Contratar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Cliente" element={<Cliente />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

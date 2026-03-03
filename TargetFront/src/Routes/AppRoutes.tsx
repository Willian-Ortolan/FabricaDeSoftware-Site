import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Servicos from "../Pages/Servicos";
import Tecnologia from "../Pages/Tecnologia";
import Mapeamento from "../Pages/Mapeamento";
import Pulverizacao from "../Pages/Pulverizacao";
import Contratar from "../Pages/Contratar";
import Cliente from "../Pages/Cliente";
import ClienteSolicitacoes from "../Pages/Cliente/ClienteSolicitacoes";
import ClientePropriedades from "../Pages/Cliente/ClientePropriedades";
import ClienteMapas from "../Pages/Cliente/ClienteMapas";
import ClienteRelatorios from "../Pages/Cliente/ClienteRelatorios";
import ClienteConfiguracoes from "../Pages/Cliente/ClienteConfiguracoes";
import Admin from "../Pages/Admin";
import NotFound from "../Pages/NotFound";
import MainLayout from "../Layouts/MainLayout";
import ClientLayout from "../Layouts/ClientLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="tecnologia" element={<Tecnologia />} />
          <Route path="mapeamento" element={<Mapeamento />} />
          <Route path="pulverizacao" element={<Pulverizacao />} />
          <Route path="contratar" element={<Contratar />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/cliente" element={<ClientLayout />}>
          <Route index element={<Cliente />} />
          <Route path="solicitacoes" element={<ClienteSolicitacoes />} />
          <Route path="propriedades" element={<ClientePropriedades />} />
          <Route path="mapas" element={<ClienteMapas />} />
          <Route path="relatorios" element={<ClienteRelatorios />} />
          <Route path="configuracoes" element={<ClienteConfiguracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

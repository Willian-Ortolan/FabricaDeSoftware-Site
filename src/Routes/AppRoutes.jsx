import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Servicos from "../Pages/Servicos";
import SobreNos from "../Pages/SobreNos";
import Mapeamento from "../Pages/Mapeamento";
import Pulverizacao from "../Pages/Pulverizacao";
import Contratar from "../Pages/Contratar";
import NotFound from "../Pages/NotFound";
import TenantLayout from "../Layouts/TenantLayout";
import ExternalRedirect from "../Components/ExternalRedirect";
import { PUBLIC_ROUTE_PATHS, publicConfig } from "../config";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/e/:slug/login"
          element={<ExternalRedirect to={publicConfig.erpLoginUrl} />}
        />
        <Route
          path="/e/:slug/admin"
          element={<ExternalRedirect to={`${publicConfig.erpUrl}/admin`} />}
        />
        <Route
          path="/e/:slug/cliente"
          element={<ExternalRedirect to={`${publicConfig.erpUrl}/cliente`} />}
        />
        <Route path="/e/:slug/*" element={<Navigate to="/" replace />} />
        <Route path="/e/:slug" element={<Navigate to="/" replace />} />

        <Route element={<TenantLayout />}>
          <Route index element={<Home />} />
          <Route path={PUBLIC_ROUTE_PATHS.servicos.slice(1)} element={<Servicos />} />
          <Route path={PUBLIC_ROUTE_PATHS.sobreNos.slice(1)} element={<SobreNos />} />
          <Route
            path="sobre-nos"
            element={<Navigate to={PUBLIC_ROUTE_PATHS.sobreNos} replace />}
          />
          <Route path={PUBLIC_ROUTE_PATHS.mapeamento.slice(1)} element={<Mapeamento />} />
          <Route path={PUBLIC_ROUTE_PATHS.pulverizacao.slice(1)} element={<Pulverizacao />} />
          <Route path={PUBLIC_ROUTE_PATHS.contratar.slice(1)} element={<Contratar />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

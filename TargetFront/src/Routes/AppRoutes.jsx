import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

import TenantLayout from "../Layouts/TenantLayout";

import SuperAdminLayout from "../Layouts/SuperAdminLayout";

import PrivateRoute from "./PrivateRoute";

import LegacyRouteNotice from "../Pages/LegacyRouteNotice";

import SuperAdminLogin from "../Pages/SuperAdmin/SuperAdminLogin";

import SuperAdminPanel from "../Pages/SuperAdmin/SuperAdminPanel";

import { ROLES } from "../utils/auth";



export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Super Admin — login na raiz */}

        <Route path="/" element={<SuperAdminLogin />} />

        <Route path="/super-admin/login" element={<Navigate to="/" replace />} />

        <Route

          path="/super-admin"

          element={

            <PrivateRoute roles={[ROLES.SUPER_ADMIN]}>

              <SuperAdminLayout />

            </PrivateRoute>

          }

        >

          <Route index element={<SuperAdminPanel />} />

        </Route>



        {/* Multi-tenant público + login */}

        <Route path="/e/:slug" element={<TenantLayout />}>

          <Route index element={<Home />} />

          <Route path="servicos" element={<Servicos />} />

          <Route path="SobreNos" element={<SobreNos />} />

          <Route path="contratar" element={<Contratar />} />

          <Route path="login" element={<Login />} />

          <Route

            path="admin"

            element={

              <PrivateRoute

                roles={[ROLES.ADMIN_EMPRESA]}

                requireSlugMatch

              >

                <Admin />

              </PrivateRoute>

            }

          />

          <Route

            path="cliente"

            element={

              <PrivateRoute roles={[ROLES.CLIENTE]} requireSlugMatch>

                <Cliente />

              </PrivateRoute>

            }

          />

        </Route>



        {/* Rotas legadas (sem página inicial global) */}

        <Route element={<MainLayout />}>

          <Route path="/servicos" element={<Navigate to="/" replace />} />

          <Route path="/SobreNos" element={<Navigate to="/" replace />} />

          <Route path="/contratar" element={<Navigate to="/" replace />} />

          <Route path="/login" element={<Navigate to="/" replace />} />

          <Route

            path="/admin"

            element={<LegacyRouteNotice titulo="Admin" descricao="Use /e/sua-empresa/login e depois o painel admin da empresa." />}

          />

          <Route

            path="/cliente"

            element={<LegacyRouteNotice titulo="Área do cliente" descricao="Use /e/sua-empresa/login para acessar a área do cliente." />}

          />

          <Route path="/mapeamento" element={<Mapeamento />} />

          <Route path="/pulverizacao" element={<Pulverizacao />} />

          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}


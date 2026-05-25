# Análise Arquitetural — TargetFront (AgroDrones / Target Pulverização)

> Documento gerado a partir da análise do código-fonte do frontend.  
> Perspectiva: arquiteto sênior React.

---

## 1. Visão Geral

O **TargetFront** é uma Single Page Application (SPA) voltada ao agronegócio, com foco em **pulverização agrícola com drones**, **mapeamento aéreo** e **monitoramento de lavouras**. A aplicação atende três perfis de uso:

| Perfil | Descrição |
|--------|-----------|
| **Visitante** | Navega pelo site institucional, conhece serviços e solicita orçamento |
| **Cliente** | Acessa área logada para gerenciar propriedades, solicitações e histórico |
| **Administrador** | Gerencia orçamentos pendentes, aprovações e agenda de operações |

A aplicação está em estágio **MVP / protótipo avançado**: a UI está estruturada e funcional, porém a maior parte dos dados ainda é **mockada localmente**, com integração real apenas no fluxo de **login**.

---

## 2. Stack Tecnológica

### 2.1 Core

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **React** | 19.2.x | Biblioteca de UI e renderização declarativa |
| **React DOM** | 19.2.x | Renderização no browser |
| **Vite** | 7.3.x | Bundler e dev server (HMR rápido) |
| **@vitejs/plugin-react-swc** | 4.2.x | Compilação JSX via SWC (mais rápido que Babel) |

### 2.2 Roteamento

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **react-router-dom** | 7.15.x | Roteamento SPA com `BrowserRouter`, rotas aninhadas e `Outlet` |

### 2.3 UI e Design System

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **Ant Design (antd)** | 6.3.x | Component library principal (Layout, Form, Table, Modal, Card, etc.) |
| **@ant-design/icons** | (via antd) | Ícones do Ant Design |
| **@ant-design/plots** | 2.6.x | Gráficos de área (`Area`) no dashboard do cliente |
| **react-icons** | 5.5.x | Ícones complementares (Home, serviços, steps) |
| **@react-icons/all-files** | 4.1.x | Pacote alternativo de ícones (instalado, uso parcial) |

### 2.4 HTTP e Autenticação

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **Axios** | 1.16.x | Cliente HTTP com instância configurada e interceptor de JWT |
| **localStorage** | nativo | Persistência do token JWT após login |
| **atob + JSON.parse** | nativo | Decodificação manual do payload JWT para extrair role |

### 2.5 Utilitários (transitivos)

| Tecnologia | Origem | Função |
|------------|--------|--------|
| **dayjs** | dependência do antd | Manipulação de datas no calendário de orçamentos |

### 2.6 Qualidade de Código

| Tecnologia | Versão | Função |
|------------|--------|--------|
| **TypeScript** | 5.9.x | Tipagem (config presente, mas código-fonte é majoritariamente `.jsx`) |
| **ESLint** | 9.39.x | Linting (configurado para `.ts/.tsx`, não cobre `.jsx` atualmente) |

### 2.7 Observação sobre linguagem

O projeto possui `tsconfig.json` e script `build` com `tsc -b`, porém **100% dos componentes de negócio estão em JavaScript (`.jsx`)**. O TypeScript está preparado, mas ainda não adotado na camada de aplicação.

---

## 3. Arquitetura da Aplicação

### 3.1 Padrão arquitetural

```
┌─────────────────────────────────────────────────────────┐
│                      main.jsx                           │
│                   (StrictMode + App)                    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                     AppRoutes.jsx                       │
│              BrowserRouter + Routes                     │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                   MainLayout.jsx                        │
│         Layout (antd) + Sidebar + Outlet                │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    Páginas         PrivateRoute      NotFound
   Públicas         (Cliente)         (404)
         │               │
    Admin/Login    Cliente Dashboard
```

### 3.2 Camadas identificadas

| Camada | Localização | Responsabilidade |
|--------|-------------|------------------|
| **Entry Point** | `src/main.jsx`, `src/App.jsx` | Bootstrap da aplicação |
| **Rotas** | `src/Routes/` | Definição de rotas e guarda de autenticação |
| **Layouts** | `src/Layouts/` | Shell visual com sidebar e área de conteúdo |
| **Pages** | `src/Pages/` | Telas completas (views) |
| **Components** | `src/Components/` | Componentes reutilizáveis cross-page |
| **Page Components** | `src/Pages/*/Components/` | Componentes específicos de cada domínio |
| **Services** | `src/Pages/LoginServices.jsx` | Cliente HTTP Axios (único service existente) |
| **Mock** | `src/Mock/` | Dados estáticos para protótipo |

### 3.3 Padrões de composição

- **PageShell**: wrapper padrão para páginas institucionais (título, subtítulo, ações, conteúdo).
- **GridPadrao**: wrapper genérico sobre `Table` do Ant Design.
- **ModalPadrao**: wrapper genérico sobre `Modal` com footer customizado.
- **Composição por feature**: componentes do Cliente e Admin ficam dentro de suas respectivas pastas.

---

## 4. Estrutura de Pastas

```
TargetFront/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── src/
    ├── main.jsx                 # Entry point
    ├── App.jsx                  # Root component
    ├── index.css                # Estilos globais
    ├── assets/                  # Imagens (banner, drones, etc.)
    ├── Layouts/
    │   └── MainLayout.jsx       # Layout com sidebar
    ├── Routes/
    │   ├── AppRoutes.jsx        # Definição de rotas
    │   └── PrivateRoute.jsx     # Guard de autenticação
    ├── Components/              # Compartilhados
    │   ├── HeroSection.jsx
    │   ├── PageShell.jsx
    │   ├── ComoFuncionaStep.jsx
    │   ├── ModalPadrao/
    │   ├── GridPadrao/
    │   ├── Calendario/
    │   ├── Cards/
    │   ├── SideBar/
    │   ├── Servicos/
    │   └── ConhecaServicosButton/
    ├── Pages/
    │   ├── Home.jsx
    │   ├── Servicos.jsx
    │   ├── SobreNos.jsx
    │   ├── Mapeamento.jsx
    │   ├── Pulverizacao.jsx
    │   ├── Contratar.jsx
    │   ├── Login.jsx
    │   ├── LoginServices.jsx    # Axios instance
    │   ├── NotFound.jsx
    │   ├── teste.jsx            # Arquivo de teste (não roteado)
    │   ├── Admin/
    │   │   ├── Admin.jsx
    │   │   └── Components/Grid/
    │   └── Cliente/
    │       ├── Cliente.jsx
    │       └── Components/
    │           ├── CardsResumo.jsx
    │           ├── MinhasPropriedades.jsx
    │           ├── HistoricoOperacoes.jsx
    │           ├── ProximasOperacoes.jsx
    │           ├── Grid/
    │           └── Modal/
    └── Mock/
        └── OrcamentosCalendario.jsx
```

---

## 5. Rotas e Navegação

| Rota | Componente | Protegida | Visível no Menu |
|------|------------|-----------|-----------------|
| `/` | Home | Não | Sim |
| `/servicos` | Servicos | Não | Sim |
| `/SobreNos` | SobreNos | Não | Sim |
| `/mapeamento` | Mapeamento | Não | Não (comentada) |
| `/pulverizacao` | Pulverizacao | Não | Não (comentada) |
| `/contratar` | Contratar | Não | Sim |
| `/login` | Login | Não | Sim |
| `/admin` | Admin | **Não** | Não (comentada) |
| `/cliente` | Cliente | **Sim** (`PrivateRoute`) | Não |
| `*` | NotFound | Não | — |

### Sidebar (`Sidebar.jsx`)

Menu lateral fixo com identidade visual **AgroDrones** (gradiente azul escuro). Controla navegação via `useNavigate` e destaca rota ativa com `selectedKeys={[pathname]}`.

---

## 6. Autenticação e Autorização

### 6.1 Fluxo de Login

1. Usuário submete e-mail e senha em `/login`.
2. `POST https://localhost:7289/api/auth/login` via Axios.
3. Token JWT é salvo em `localStorage.setItem("token", token)`.
4. Payload JWT é decodificado manualmente (`atob` + `JSON.parse`).
5. Role é extraída da claim Microsoft: `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`.
6. Redirecionamento:
   - `AdminSystem` → `/admin`
   - `Cliente` → `/cliente`

### 6.2 Interceptor Axios (`LoginServices.jsx`)

Todas as requisições futuras incluem automaticamente `Authorization: Bearer {token}` se o token existir no localStorage.

### 6.3 PrivateRoute

Verifica apenas a **existência** do token. Não valida expiração, role ou integridade do JWT. Redireciona para `/` se ausente.

### 6.4 Lacunas de segurança identificadas

| Problema | Impacto |
|----------|---------|
| Rota `/admin` **não protegida** | Qualquer visitante pode acessar o painel admin |
| `PrivateRoute` não verifica role | Cliente autenticado não é bloqueado de rotas admin (se protegidas) |
| Token decodificado sem validação de assinatura | Role pode ser manipulada no client (backend deve validar) |
| Logout apenas remove token e navega para `/` | Sem invalidação server-side |
| URL da API hardcoded (`localhost:7289`) | Dificulta deploy em ambientes diferentes |

---

## 7. Integração com Backend

| Endpoint | Método | Status | Descrição |
|----------|--------|--------|-----------|
| `/api/auth/login` | POST | **Integrado** | Autenticação com e-mail e senha |
| Demais endpoints | — | **Não integrado** | Dados mockados no frontend |

**Base URL configurada:** `https://localhost:7289/api`

---

## 8. Páginas — Função Detalhada

### 8.1 Home (`/`)

**Arquivo:** `src/Pages/Home.jsx`

**Função:** Landing page institucional da aplicação.

**Seções:**
1. **HeroSection** — Banner principal com CTA "Solicitar Orçamento" e botão "Nossos Serviços".
2. **Cards de Serviços** — Três cards: Mapeamento Aéreo, Pulverização de Precisão, Monitoramento Agrícola.
3. **Como Funciona** — Fluxo em 4 etapas: Planejamento → Voo Automático → Coleta de Dados → Relatório Inteligente.
4. **Diferenciais** — Economia de água, precisão centimétrica, impacto ambiental, cobertura rápida.
5. **CTA final** — "Fale com um Consultor" redirecionando para `/contratar`.

**Componentes utilizados:** `HeroSection`, `CardServico`, `CardPadrao`, `ComoFuncionaStep`.

---

### 8.2 Serviços (`/servicos`)

**Arquivo:** `src/Pages/Servicos.jsx`

**Função:** Página detalhada dos serviços oferecidos pela empresa.

**Conteúdo:**
- Lista de 4 blocos de serviço via `BlocoServico`:
  1. Pulverização de Defensivos
  2. Dispersão de Sementes
  3. Aplicação de Fertilizantes
  4. Mapeamento de Áreas
- Cada bloco contém: título, imagem, introdução, lista de benefícios e botão "Solicitar Orçamento".
- Botão de ação no header redireciona para `/contratar`.

**Dados:** Array estático `servicosData` definido no próprio arquivo.

---

### 8.3 Sobre Nós (`/SobreNos`)

**Arquivo:** `src/Pages/SobreNos.jsx`

**Função:** Página institucional sobre a empresa **Target Pulverização** (Delfinópolis - MG).

**Seções:**
1. Apresentação da empresa e objetivo.
2. Missão, Visão e Valores (3 cards).
3. Benefícios dos drones agrícolas (produtividade, precisão, sustentabilidade, segurança).
4. Fechamento com culturas atendidas (banana, milho, soja, café).

---

### 8.4 Mapeamento (`/mapeamento`)

**Arquivo:** `src/Pages/Mapeamento.jsx`

**Função:** Landing page específica do serviço de mapeamento aéreo.

**Conteúdo:**
- Card "O que você recebe": Ortomosaico, NDVI/Índices, Relatório.
- Formulário "Simule um orçamento": cultura, área (ha), cidade/UF.
- Botão "Solicitar Mapeamento" (sem handler conectado).

**Status:** Rota existe, mas **não está no menu lateral** (comentada na Sidebar).

---

### 8.5 Pulverização (`/pulverizacao`)

**Arquivo:** `src/Pages/Pulverizacao.jsx`

**Função:** Landing page específica do serviço de pulverização.

**Conteúdo:**
- Card "Diferenciais": Economia, Segurança, Performance.
- Formulário "Solicitar atendimento": tipo de aplicação, área, localização.
- Botão "Solicitar Pulverização" (sem handler conectado).

**Status:** Rota existe, mas **não está no menu lateral**.

---

### 8.6 Contratar (`/contratar`)

**Arquivo:** `src/Pages/Contratar.jsx`

**Função:** Formulário de contato consultivo para captação de leads.

**Campos:**
- Nome (obrigatório)
- Telefone (obrigatório)
- E-mail (validação de formato)
- Mensagem (textarea)

**Status:** Formulário renderizado, **sem integração com API** (submit não envia dados).

---

### 8.7 Login (`/login`)

**Arquivo:** `src/Pages/Login.jsx`

**Função:** Autenticação de usuários (Admin e Cliente).

**Fluxo:**
1. Formulário com e-mail e senha.
2. Chamada API real para backend .NET.
3. Armazena JWT e redireciona conforme role.

**Única página com integração backend funcional.**

---

### 8.8 Admin (`/admin`)

**Arquivo:** `src/Pages/Admin/Admin.jsx`

**Função:** Painel administrativo para gestão de orçamentos.

**Estrutura:**
- **Cards de navegação** (`CardAdmin`):
  - Dashboard (visão geral)
  - Orçamentos Pendentes (contador: 45)
  - Orçamentos Agendados (contador: 12)
- **Área de conteúdo dinâmica** (controlada por `useState view`):
  - `Dashboard` → `GridAprovacao` (todos os orçamentos)
  - `Pendentes` → `GridAprovacao` filtrado por status "Pendente"
  - `Agendados` → `CalendarioOrcamentos` com dados mockados

**Ações disponíveis no grid:**
- Aprovar / Rejeitar (orçamentos pendentes)
- Ajustar orçamento
- Reagendar (orçamentos aprovados)

**Status:** Dados mockados; ações apenas fazem `console.log`.

---

### 8.9 Cliente (`/cliente`)

**Arquivo:** `src/Pages/Cliente/Cliente.jsx`

**Função:** Dashboard do cliente autenticado.

**Seções:**
1. **Header** — Título "Área do Cliente" + botão Logout.
2. **Boas-vindas** — Mensagem personalizada (hardcoded "João Silva").
3. **CardsResumo** — KPIs: Solicitações Pendentes (4), Minhas Áreas (3), Histórico (15).
4. **GridSolicitacoes** — Exibido ao clicar em "Solicitações Pendentes".
5. **MinhasPropriedades** — Carrossel horizontal de propriedades + card "Adicionar".
6. **HistoricoOperacoes** — 3 gráficos de área (Pulverização, Sólidos, Mapeamentos).
7. **HistoricoOrcamentos** — Tabela de evolução das operações.
8. **ProximasOperacoes** — Lista de operações agendadas.

**Status:** Protegida por `PrivateRoute`. Dados majoritariamente mockados.

> **Atenção técnica:** O componente retorna uma expressão com operador vírgula `(jsx1, jsx2)`, o que faz apenas o segundo bloco ser renderizado. O header com logout pode não aparecer conforme esperado.

---

### 8.10 NotFound (`*`)

**Arquivo:** `src/Pages/NotFound.jsx`

**Função:** Página 404 para rotas inexistentes. Exibe `Result` do Ant Design com botão para voltar à Home.

---

### 8.11 teste.jsx (não roteado)

**Arquivo:** `src/Pages/teste.jsx`

**Função:** Arquivo de teste/desenvolvimento. Contém apenas comentários. **Não está registrado nas rotas.**

---

## 9. Modais — Função Detalhada

### 9.1 ModalPadrao (Componente Base)

**Arquivo:** `src/Components/ModalPadrao/ModalPadrao.jsx`

**Função:** Wrapper reutilizável sobre `Modal` do Ant Design.

**Props:**
| Prop | Tipo | Descrição |
|------|------|-----------|
| `open` | boolean | Controla visibilidade |
| `onClose` | function | Callback ao cancelar |
| `onConfirm` | function | Callback ao confirmar |
| `title` | string | Título do modal |
| `children` | ReactNode | Conteúdo (geralmente um Form) |
| `width` | number | Largura (default: 600) |
| `confirmText` | string | Texto do botão confirmar (default: "Salvar") |
| `cancelText` | string | Texto do botão cancelar (default: "Cancelar") |
| `loading` | boolean | Estado de loading no botão confirmar |

**Comportamento:** Footer customizado (sem footer nativo do Modal). Botões Cancelar e Confirmar alinhados à direita.

---

### 9.2 ModalNovaSolicitacao

**Arquivo:** `src/Pages/Cliente/Components/Modal/ModalNovaSolicitacao.jsx`

**Função:** Formulário para o cliente criar uma nova solicitação de serviço com pré-orçamento automático.

**Campos:**
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Fazenda | Input | Sim |
| Nome para contato | Input | Sim |
| Telefone | Input | Não |
| Serviços (lista dinâmica) | Form.List | Sim |
| → Tipo de serviço | Select (Mapeamento, Pulverização, Sólidos) | Sim |
| → Área (ha) | InputNumber | Sim |
| → Data de execução | DatePicker | Sim |

**Lógica de negócio:**
- Tabela de preços por hectare:
  - Mapeamento: R$ 100/ha
  - Pulverização: R$ 150/ha
  - Sólidos: R$ 200/ha
- Cálculo automático de valor por serviço e total geral.
- Botão "+" para adicionar mais serviços (aparece quando o último item está completo).

**Acionado por:** Botão "Nova Solicitação" em `GridSolicitacoes`.

**Status:** Salva via `console.log`; sem integração API.

---

### 9.3 ModalCadastroArea (ModalPropriedade)

**Arquivo:** `src/Pages/Cliente/Components/Modal/ModalCadastroArea.jsx`

**Função:** Cadastro de nova propriedade rural do cliente.

**Campos:**
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome da Propriedade | Input | Sim |
| Cidade | Input | Sim |
| Área (hectares) | InputNumber | Sim |
| Tipo de Cultura | Select (Soja, Milho, Café, Cana) | Não |
| Observações | TextArea | Não |

**Comportamento:**
- Usa `ModalPadrao` como base.
- Valida campos com `form.validateFields()`.
- Simula delay de 800ms (`setTimeout`) antes de fechar.
- Reseta formulário após sucesso.

**Acionado por:** Card "Adicionar propriedade" em `MinhasPropriedades`.

**Status:** Dados apenas logados no console; sem integração API.

---

### 9.4 Modal Detalhes do Orçamento (inline)

**Arquivo:** `src/Components/Calendario/CalendarioPAdrao.jsx` (linhas 122–152)

**Função:** Exibe detalhes de um orçamento ao clicar em um card no calendário admin.

**Informações exibidas:**
- Cliente
- Número do orçamento
- Endereço (fazenda)
- Tipo de serviço
- Data formatada (DD/MM/YYYY)

**Acionado por:** Clique em card de orçamento no calendário mensal.

**Status:** Somente leitura; sem ações de edição.

---

## 10. Componentes Compartilhados Relevantes

| Componente | Função |
|------------|--------|
| **PageShell** | Layout padrão de páginas (Card + título + subtítulo + slot de ações) |
| **HeroSection** | Banner hero da Home com imagem de fundo e CTAs |
| **Sidebar** | Menu lateral de navegação global |
| **GridPadrao** | Tabela Ant Design configurada (paginação, bordas, loading) |
| **CardPadrao** | Card com ícone, título e texto descritivo |
| **CardServico** | Card compacto de serviço (ícone + título + descrição) |
| **CardAdmin** | Card clicável com estatística para navegação no admin |
| **BlocoServico** | Bloco expandido de serviço com imagem, lista e CTA |
| **ComoFuncionaStep** | Step individual do fluxo "Como Funciona" |
| **CalendarioOrcamentos** | Calendário mensal customizado com cards de orçamento |
| **ButtonNossosServicos** | Botão secundário que navega para `/servicos` |

---

## 11. Gestão de Estado

| Abordagem | Onde é usado |
|-----------|--------------|
| **useState local** | Controle de modais, views do admin, toggle de solicitações |
| **localStorage** | Persistência do token JWT |
| **Props drilling** | Comunicação pai → filho (callbacks, dados) |
| **Dados estáticos / mock** | Grids, cards, gráficos, calendário |

**Não utilizado:** Context API, Redux, Zustand, React Query, SWR ou qualquer gerenciador de estado global.

---

## 12. Mapa de Dependências entre Componentes

```
Cliente.jsx
├── CardsResumo ────────────── onClick → GridSolicitacoes
├── GridSolicitacoes
│   └── ModalNovaSolicitacao
├── MinhasPropriedades
│   └── ModalCadastroArea
│       └── ModalPadrao
├── HistoricoOperacoes ─────── @ant-design/plots (Area)
├── HistoricoOrcamentos
└── ProximasOperacoes

Admin.jsx
├── CardAdmin (×3)
├── GridAprovacao
│   └── GridPadrao
└── CalendarioOrcamentos
    └── Modal (detalhes inline)
```

---

## 13. Observações Arquiteturais

### 13.1 Pontos fortes

- **Estrutura de pastas clara** com separação entre pages, components compartilhados e components por feature.
- **Componentização reutilizável** (`PageShell`, `ModalPadrao`, `GridPadrao`) reduz duplicação.
- **Ant Design** garante consistência visual e acessibilidade básica.
- **Vite + React 19** stack moderna e performática.
- **Interceptor Axios** preparado para autenticação em todas as requisições.
- **PrivateRoute** implementado (mesmo que incompleto).

### 13.2 Pontos de melhoria (priorizados)

| Prioridade | Item | Recomendação |
|------------|------|--------------|
| 🔴 Alta | Rota `/admin` desprotegida | Envolver com `PrivateRoute` + verificação de role `AdminSystem` |
| 🔴 Alta | Bug no `Cliente.jsx` | Corrigir return — usar Fragment (`<>...</>`) em vez de operador vírgula |
| 🔴 Alta | URL da API hardcoded | Usar variável de ambiente (`VITE_API_URL`) |
| 🟡 Média | Código 100% JSX sem tipagem | Migrar gradualmente para TypeScript |
| 🟡 Média | Dados mockados | Criar camada de services por domínio (orcamentos, propriedades, solicitações) |
| 🟡 Média | ESLint não cobre `.jsx` | Estender config do ESLint para arquivos JSX |
| 🟡 Média | Inconsistência de branding | Unificar "AgroDrones" vs "Target Pulverização" |
| 🟡 Média | Formulários sem submit | Conectar Contratar, Mapeamento e Pulverizacao à API |
| 🟢 Baixa | Estado global ausente | Considerar Context ou React Query quando integrar API |
| 🟢 Baixa | Rotas comentadas no menu | Decidir se Mapeamento/Pulverizacao/Admin entram no menu |
| 🟢 Baixa | `teste.jsx` | Remover arquivo de teste do repositório |
| 🟢 Baixa | Admin view state bug | `useState("dashboard")` vs comparação `"Dashboard"` (case mismatch) |

### 13.3 Evolução arquitetural sugerida

```
Fase 1 — Correções críticas
  ├── Proteger rota admin
  ├── Corrigir Cliente.jsx
  └── Variáveis de ambiente

Fase 2 — Camada de serviços
  ├── src/services/auth.service.js
  ├── src/services/orcamento.service.js
  ├── src/services/propriedade.service.js
  └── src/services/solicitacao.service.js

Fase 3 — Estado e UX
  ├── AuthContext (user, role, logout)
  ├── React Query (cache, loading, error states)
  └── Feedback visual (message/notification do antd)

Fase 4 — Qualidade
  ├── Migração TypeScript
  ├── Testes (Vitest + Testing Library)
  └── CI/CD pipeline
```

---

## 14. Resumo Executivo

O **TargetFront** é uma SPA React moderna, bem estruturada visualmente, voltada ao agronegócio com drones. A arquitetura segue um padrão **page-based com composição de componentes**, usando Ant Design como design system e Vite como bundler.

A aplicação possui **10 rotas funcionais** (8 públicas + 1 protegida + 404), **4 modais** (1 base reutilizável + 2 de negócio + 1 inline) e integração real apenas no **login**. O próximo passo natural é conectar os formulários e grids à API backend, proteger rotas administrativas e introduzir uma camada de serviços tipada.

---

*Documento gerado em maio/2026 com base na análise estática do código-fonte.*

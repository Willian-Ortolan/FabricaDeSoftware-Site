# Desmembramento do Site Institucional e ERP

## Objetivo

Separar o frontend atual em duas aplicações independentes:

- o site institucional em `https://www.targetpulverizacao.com.br`;
- o ERP multiempresa em `https://erp.targetpulverizacao.com.br`.

O repositório atual `FabricaDeSoftware` passa a conter somente o ERP. O novo
repositório `FabricaDeSoftware-Site` conterá somente o site institucional. A
API do repositório `FabricaDeSoftware-Back` continuará compartilhada.

## Site institucional

O site institucional terá Home, Serviços, Sobre nós, Mapeamento, Pulverização
e Contratação. A Home responderá diretamente em `/`, sem o prefixo
`/e/target`.

O site usará `VITE_EMPRESA_SLUG=target` para consultar a configuração pública
e enviar solicitações de orçamento para a empresa correta. O botão de acesso
ao sistema abrirá `${VITE_ERP_URL}/login`, cujo valor de produção será
`https://erp.targetpulverizacao.com.br`.

O build será independente do ERP e terá fallback SPA para Apache/Hostinger.

## ERP

O ERP manterá somente autenticação e áreas protegidas:

- `/login`;
- `/cliente`;
- `/admin`;
- `/super-admin`.

O login de Cliente e Admin solicitará código da empresa, e-mail e senha. O
código será enviado no campo `EmpresaSlug`, já suportado pela API. O Super
Admin continuará autenticando sem código de empresa.

Depois do login, o perfil define o destino. A empresa será obtida de
`/auth/me` e dos claims `empresaId` e `empresaSlug` do JWT, nunca da URL.

## Backend e isolamento

O backend continuará validando `EmpresaSlug`, e-mail e senha. Os endpoints
autenticados devem determinar a empresa exclusivamente pelo `EmpresaId` dos
claims. Empresa inexistente ou inativa e credenciais inválidas devem produzir
respostas controladas que não exponham a existência de um e-mail.

Em produção, CORS aceitará somente:

- `https://www.targetpulverizacao.com.br`;
- `https://targetpulverizacao.com.br`;
- `https://erp.targetpulverizacao.com.br`.

Origens locais serão permitidas apenas em desenvolvimento.

## Compatibilidade e publicação

URLs antigas em `www.targetpulverizacao.com.br/e/target` serão redirecionadas
para os destinos equivalentes no ERP. O domínio principal e `www` servirão o
site; o subdomínio `erp` terá raiz de publicação e certificado SSL próprios.

Os dois frontends terão `VITE_API_URL` independente. A publicação será validada
primeiro em homologação, seguida de smoke tests e, por último, da virada de
DNS.

## Critérios de aceitação

1. A Home abre em `www.targetpulverizacao.com.br` sem `/e/target`.
2. O site não entrega páginas nem código do ERP.
3. O botão “Acessar ERP” abre `erp.targetpulverizacao.com.br/login`.
4. Cliente e Admin autenticam com código da empresa, e-mail e senha.
5. As rotas internas do ERP não contêm `/e/:slug`.
6. O JWT determina empresa e perfil em todas as operações protegidas.
7. Um usuário não acessa dados de outra empresa.
8. Site e ERP possuem builds, repositórios e deploys independentes.

# Site institucional Target Pulverização

Aplicação Vite/React pública e independente do ERP da Target Pulverização.

## URLs de produção

- Site institucional: https://www.targetpulverizacao.com.br
- ERP: https://erp.targetpulverizacao.com.br

## Desenvolvimento

```bash
cp .env.example .env
npm install
npm run dev
```

Variáveis:

- `VITE_API_URL`: URL base da API compartilhada.
- `VITE_EMPRESA_SLUG`: empresa usada para carregar dados públicos (padrão: `target`).
- `VITE_ERP_URL`: URL base do ERP para o botão de acesso.

## Verificação e build

```bash
npm test
npm run lint
npm run build
```

O conteúdo de `dist/` pode ser publicado na raiz do domínio. O arquivo
`public/.htaccess` fornece fallback de SPA e redireciona URLs privadas antigas
para o ERP em hospedagens Apache/Hostinger. `public/web.config` mantém o fallback
equivalente para IIS.

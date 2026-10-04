# Publicação do site institucional

## Domínios

- Site: `https://www.targetpulverizacao.com.br`
- ERP: `https://erp.targetpulverizacao.com.br`

O domínio raiz e o `www` devem apontar para este build. O subdomínio `erp` tem publicação própria no repositório do ERP.

## Variáveis de build

```
VITE_API_URL=https://api.targetpulverizacao.com.br/api
VITE_EMPRESA_SLUG=target
VITE_ERP_URL=https://erp.targetpulverizacao.com.br
```

## Hostinger

1. Em **Domínios**, confirme `targetpulverizacao.com.br`.
2. Crie o subdomínio `erp` com pasta própria, por exemplo `public_html/erp`.
3. Publique o conteúdo de `dist/` deste repositório na raiz do domínio/`www`.
4. Mantenha `public/.htaccess` no build para fallback SPA e redirecionamento de `/e/target/login|admin|cliente`.
5. Ative SSL no domínio principal e no subdomínio `erp`.
6. Só altere o DNS depois do smoke test em homologação.

## Smoke test

- `/` abre a Home sem `/e/target`.
- **Acessar ERP** abre `https://erp.targetpulverizacao.com.br/login`.
- `/contratar` envia orçamento público.
- `/e/target/login` redireciona para o ERP.
- Refresh em `/servicos` e `/SobreNos` continua na mesma rota.

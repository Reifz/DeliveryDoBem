# Delivery do Bem

Site institucional em React, Vite e TypeScript.

Versão publicada: https://reifz.github.io/DeliveryDoBem/

## Executar

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Verificações disponíveis:

```bash
npm run typecheck
npm run build
```

## Publicação

O GitHub Actions compila e publica o conteúdo de `dist/` no GitHub Pages a cada push na branch `main`. Também é possível iniciar o workflow manualmente pela aba **Actions** do repositório.

O endereço `deliverydobem.org` e sua hospedagem atual não fazem parte desta publicação.

## Conteúdo e aprovações

O conteúdo público fica centralizado em `src/content/siteContent.ts`. Informações sensíveis usam estado `pending` ou `confirmed`. Valores provisórios não devem ser copiados para esse arquivo: eles permanecem registrados apenas em `tarefa.md` até aprovação.

- Pix só aparece quando chave, beneficiário e cidade estão confirmados e preenchidos.
- O formulário de voluntariado é incorporado do Google Forms e só aparece quando sua URL está confirmada no conteúdo do site.
- Galeria, carrossel e vídeos desaparecem quando suas listas estão vazias.
- Data, horário, endereço, contatos e links pendentes não entram na interface pública.

URLs públicas e estados de aprovação são centralizados em `src/content/siteContent.ts`; métodos pendentes não aparecem na interface.

# Sabor Nordeste

Protótipo front-end de um cardápio digital para uma lanchonete fictícia. A página reúne pratos inspirados na culinária nordestina e uma interface para navegar pelo menu.

## O que dá para testar

- Filtrar produtos por categoria ou pela lista de favoritos.
- Buscar pelo nome ou pela descrição de um produto.
- Adicionar itens à sacola, alterar quantidades e ver o subtotal.
- Alternar entre as unidades de Boa Viagem e Casa Forte.
- Abrir telas de perfil, clube de pontos e acompanhamento de pedido.

**Os dados e fluxos são demonstrativos.** Não há servidor ou integração com serviços: perfil, pontos, unidades e pedidos são exemplos; nenhum pagamento ou pedido real é feito. As alterações de estado não são salvas e voltam ao padrão ao recarregar a página.

## Tecnologias

- React 18 e TypeScript
- Vite
- Lucide React para ícones

## Rodar no computador

Instale o Node.js 20 ou superior e, na pasta do projeto, execute:

```bash
npm install
npm run dev
```

O endereço local será exibido no terminal.

| Comando | Para que serve |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera os arquivos de produção em `dist/` |
| `npm run preview` | Abre localmente uma prévia do build |

## Publicar no GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica o site após um push para `main`.

1. Crie um repositório vazio no GitHub.
2. No terminal, dentro da pasta do projeto, envie os arquivos. Troque o usuário e o nome do repositório no endereço:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial project setup"
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   git push -u origin main
   ```

3. No repositório, acesse **Settings → Pages** e selecione **GitHub Actions** como origem.
4. Aguarde o workflow na aba **Actions** terminar. O endereço publicado aparece em **Settings → Pages**.

O caminho dos arquivos é ajustado automaticamente para repositórios de projeto e para sites pessoais ou organizacionais `*.github.io`.

Se o site abrir em branco, confirme em **Settings → Pages → Build and deployment** que a origem está como **GitHub Actions**, não **Deploy from a branch**. A publicação pela branch serve o HTML fonte sem compilar React e TypeScript. Depois de alterar a origem, execute novamente **Deploy to GitHub Pages** na aba **Actions** (ou faça um novo push para `main`) e confirme que os jobs de build e deploy terminaram com sucesso.

## Arquivos principais

- `src/App.tsx`: conteúdo, dados de exemplo e interações da página.
- `src/styles.css`: layout e estilos responsivos.
- `src/main.tsx`: inicialização do React.
- `index.html`: documento HTML carregado pelo Vite.

# pilatesheritagecongress

Site estático do **International Pilates Heritage Congress** (pilatesheritagecongress.com), reescrito em HTML, CSS e JavaScript puros a partir do site original em WordPress/Divi. Não há etapa de build: os arquivos do repositório são exatamente o que vai ao ar.

## Estrutura

```
index.html                 Home
404.html                   Página de erro (servida automaticamente pela Vercel)
pages/                     Páginas internas (uma por arquivo)
  <slug>.html              16 perfis (board, presenters, founders)
  heritage-equipment.html  Equipamentos Equipilates
assets/
  css/
    base.css               Variáveis (cores, fonte), reset, tipografia, botões
    layout.css             Cabeçalho, menu (desktop e mobile), rodapé, voltar ao topo
    sections.css           Seções compartilhadas: inscrição, patrocinadores, embaixador, popup
    home.css               Seções da home (hero, pessoas, local, carrossel, agenda)
    profile.css            Páginas de perfil
    equipment.css          Página de equipamentos
  js/
    main.js                Menu mobile, submenus, voltar ao topo, animação de entrada
    carousel.js            Carrossel de fotos do local
    forms.js               Formulários RD Station e popup
  images/                  backgrounds/ equipment/ hero/ location/ logo/ people/ sponsors/
vercel.json                Rotas, redirecionamentos e cache
robots.txt, sitemap.xml
```

Todos os caminhos de CSS, JS e imagens são absolutos (`/assets/...`), então funcionam igual na home e nas páginas dentro de `pages/`.

## URLs

As URLs do site original foram mantidas. O `vercel.json` reescreve `/<slug>/` para `pages/<slug>.html`:

| URL pública            | Arquivo                         |
| ---------------------- | ------------------------------- |
| `/`                    | `index.html`                    |
| `/kathy-corey/`        | `pages/kathy-corey.html`        |
| `/heritage-equipment/` | `pages/heritage-equipment.html` |

Acessos diretos a `/pages/<slug>` são redirecionados para `/<slug>/`.

Para criar uma página nova, copie um arquivo de `pages/`, ajuste o conteúdo, o `<title>`, a descrição e o `canonical`, e inclua a URL no `sitemap.xml` e no menu (o menu está repetido em cada HTML).

## Integrações

Presentes em todas as páginas, com as mesmas contas do site original:

- **Google Tag Manager** `GTM-KB88R67` (carrega GA4, Google Ads, Meta Pixel e Clarity) e a tag `G-88DXSDNVWM`.
- **RD Station**: formulário de embaixador (`#ambassador`) e formulário do jantar dentro do popup `#popup-dinner`. Para abrir o popup, basta um elemento com `data-popup-open="dinner"`.

## Rodar localmente

Como as rotas dependem do `vercel.json`, use a CLI da Vercel:

```bash
npx vercel dev
```

## Publicar

Importe o repositório na Vercel com **Framework Preset: Other**, sem comando de build e com o diretório de saída na raiz. Cada push na branch `main` publica uma nova versão.

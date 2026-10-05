# pilatesheritagecongress

Site estático do **International Pilates Heritage Congress** (pilatesheritagecongress.com), reescrito em HTML, CSS e JavaScript puros a partir do site original em WordPress/Divi. Não há etapa de build: os arquivos do repositório são exatamente o que vai ao ar.

## Estrutura

```
index.html                 Home
404.html                   Página de erro
<slug>/index.html          Uma pasta por página interna (16 perfis + heritage-equipment)
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
vercel.json                Barra final nas URLs e cache
robots.txt, sitemap.xml
```

## URLs e caminhos

Cada página interna é uma pasta com um `index.html`, então as URLs do site original (`/kathy-corey/`) funcionam em qualquer servidor de arquivos estáticos, sem regra de reescrita: Vercel, GitHub Pages ou Live Server.

Todos os caminhos são relativos (`assets/...` na home, `../assets/...` nas páginas internas), o que permite publicar o site também dentro de uma subpasta, como `usuario.github.io/pilatesheritagecongress/`. A exceção é a `404.html`, que usa caminhos a partir da raiz porque pode ser servida em qualquer profundidade; ela só aparece com estilo quando o site está na raiz do domínio.

Para criar uma página nova, copie uma das pastas, ajuste o conteúdo, o `<title>`, a descrição e o `canonical`, e inclua a URL no `sitemap.xml` e no menu (o menu está repetido em cada HTML).

## Integrações

Presentes em todas as páginas, com as mesmas contas do site original:

- **Google Tag Manager** `GTM-KB88R67` (carrega GA4, Google Ads, Meta Pixel e Clarity) e a tag `G-88DXSDNVWM`.
- **RD Station**: formulário de embaixador (`#ambassador`) e formulário do jantar dentro do popup `#popup-dinner`. Para abrir o popup, basta um elemento com `data-popup-open="dinner"`.

## Rodar localmente

Qualquer servidor estático serve, por exemplo o Live Server do VS Code ou:

```bash
npx serve
```

## Publicar

Importe o repositório na Vercel com **Framework Preset: Other**, sem comando de build e com o diretório de saída na raiz. Cada push na branch `main` publica uma nova versão.

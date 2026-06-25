# Eclesiastes — Reflexão Diária

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen?logo=github)](https://danhpaiva.github.io/EclesiastesDailyReflection-html-css-js)
[![CI](https://github.com/danhpaiva/EclesiastesDailyReflection-html-css-js/actions/workflows/ci.yml/badge.svg)](https://github.com/danhpaiva/EclesiastesDailyReflection-html-css-js/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

> Uma *Single Page Application* minimalista para leitura devocional diária do livro de Eclesiastes, com comentários de teologia reformada.

---

## Visão Geral

**Eclesiastes Daily Reflection** exibe um versículo diferente a cada dia do ano, selecionado automaticamente com base na data atual — garantindo que todos os usuários vejam o mesmo conteúdo no mesmo dia. Os 202 devocionais cobrem todos os capítulos de Eclesiastes (1–12) e incluem comentários teológicos com referências a João Calvino, Agostinho, Matthew Henry, Derek Kidner, os Puritanos, o Catecismo de Heidelberg e a Confissão de Westminster.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Devocional diário** | Conteúdo sincronizado por data — mesmo versículo para todos os usuários no mesmo dia |
| **202 devocionais** | Cobertura completa de Eclesiastes 1–12 com comentários reformados |
| **Navegação entre dias** | Botões para avançar ou retroceder no calendário, com botão "Hoje" para voltar ao dia atual |
| **Modo foco** | Expande o card para tela cheia, ocultando header e footer; suporta Fullscreen API e tecla `Esc` |
| **Tema claro / escuro** | Alternância manual com persistência via `localStorage`; respeita `prefers-color-scheme` |
| **Efeito typewriter** | O versículo é digitado palavra a palavra; respeita `prefers-reduced-motion` |
| **Compartilhar** | Web Share API com fallback para clipboard |
| **Barra de progresso** | Linha superior indicando o progresso no ano |
| **Grain animado** | Textura de ruído em canvas para profundidade visual |
| **Glassmorphism** | Card com `backdrop-filter` e gradientes em mesh no fundo |
| **Tilt interativo** | O card reage ao movimento do mouse com perspectiva 3D suave |

---

## Estrutura do Projeto

```
├── index.html                  # Markup semântico, ponto de entrada
├── assets/
│   ├── css/
│   │   └── style.css           # Design system, tokens de cor, dark/light theme
│   └── js/
│       ├── app.js              # Orquestração, lógica de data e navegação
│       ├── data.js             # 202 devocionais estruturados
│       ├── render.js           # Manipulação de DOM e efeito typewriter
│       ├── animations.js       # Grain canvas, progress bar, card glow/tilt
│       ├── theme.js            # Toggle dark/light com persistência
│       └── focus.js            # Modo foco e Fullscreen API
└── .github/
    └── workflows/
        └── ci.yml              # Pipeline de validação no GitHub Actions
```

---

## Design System

As variáveis CSS seguem uma paleta de azuis profundos inspirada em oceano e espaço:

| Token | Valor | Uso |
|---|---|---|
| `--deep-space-blue` | `#012a4a` | Base do fundo escuro |
| `--yale-blue` | `#013a63` | Superfície do card |
| `--rich-cerulean` | `#2a6f97` | Bordas em hover |
| `--steel-blue` | `#61a5c2` | Acento principal |
| `--light-blue` | `#a9d6e5` | Texto de destaque, gradientes |

O tema claro inverte a paleta para tons claros com tipografia em `--deep-space-blue`.

---

## Tecnologias

- **HTML5** semântico (`<main>`, `<blockquote>`, `<nav>`, `aria-*`)
- **CSS3** com custom properties, `backdrop-filter`, `clamp()`, `border-image` gradient, `@keyframes`
- **JavaScript ES6+** modular nativo (`type="module"`, `import/export`) — zero dependências, zero bundler
- **APIs Web** — Web Share API, Clipboard API, Fullscreen API, IntersectionObserver, Canvas 2D

---

## Conteúdo Teológico

Os comentários seguem a tradição da **teologia reformada**, com referências a:

- **João Calvino** — *Institutio Christianae Religionis* e comentários a Eclesiastes
- **Agostinho de Hipona** — *Confissões*
- **Matthew Henry** — *Commentary on the Whole Bible*
- **Derek Kidner** — *A Time to Mourn and a Time to Dance* (Tyndale OT Commentary)
- **Catecismo de Heidelberg** e **Confissão de Westminster**
- Tradição Puritana e teologia kuyperiana

---

## Como Executar Localmente

Nenhuma instalação necessária. Por ser uma SPA estática com módulos ES6, basta servir o diretório raiz com qualquer servidor HTTP local:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

Depois acesse `http://localhost:8080`.

> **Atenção:** módulos ES6 (`type="module"`) não funcionam via protocolo `file://` — é necessário um servidor HTTP.

---

## CI/CD

O workflow `.github/workflows/ci.yml` é disparado em todo `push` e `pull_request` para a branch `main` e executa:

1. **Verificação de arquivos obrigatórios** — garante que `index.html`, `style.css` e todos os módulos JS existem
2. **HTMLHint** — lint do HTML
3. **Checagem de sintaxe JS** — `node --check` em todos os módulos

---

## Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](LICENSE) para detalhes.

---

<p align="center">
  <em>"Para tudo há uma ocasião certa; há um tempo certo para cada propósito debaixo do céu." — Eclesiastes 3.1</em>
</p>

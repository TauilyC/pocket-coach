# Rumo

**Rumo** é uma página única que reúne dois instrumentos de autoconhecimento e autodesenvolvimento:

| Arquivo | O que é |
|---|---|
| `index.html` | Página inicial: apresentação, trilha de progresso e links para os dois instrumentos |
| `rumo-bar.js` | Barra do Rumo (Início, Mapa, Coach) compartilhada pelas três páginas |
| `mapa.html` | Mapa de autoconhecimento (protótipo, itens ilustrativos não validados) |
| `coach.html` | Pocket Coach: Roda da Vida, metas, tarefas, humor |

As três páginas são documentos independentes (sem `iframe`, que algumas hospedagens bloqueiam) e compartilham a barra do Rumo por meio de `rumo-bar.js`. Tudo é estático e os dados ficam no `localStorage` do aparelho. A trilha da página inicial só **lê** o que os apps já guardam.

Ao publicar uma nova versão, troque o número de `CACHE` em `sw.js`.

## Ponte entre os dois instrumentos

- O Mapa publica em `localStorage` (`rumo.handoff.v1`) **apenas as práticas que a pessoa escolheu** no plano. Sem escolhas, nada é publicado; "Apagar meus dados" remove a publicação.
- O Coach mostra essas práticas no Início; "Criar meta" abre o fluxo de meta já preenchido (pilar, medida e primeira prática). O controle do que já foi importado fica em `rumo.handoff.done`.
- A página inicial sugere rever o mapa e a Roda da Vida entre 8 e 12 semanas depois da última avaliação, com opção de adiar (`rumo.snooze`) e de baixar um evento `.ics` para o calendário.

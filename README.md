# Pocket Coach

Página única que reúne dois instrumentos de autoconhecimento e autodesenvolvimento:

| Arquivo | O que é |
|---|---|
| `index.html` | Página inicial (hub): apresentação, trilha de progresso e abas que abrem os dois instrumentos |
| `mapa.html` | Mapa de autoconhecimento (protótipo, itens ilustrativos não validados) |
| `coach.html` | Pocket Coach: Roda da Vida, metas, tarefas, humor |

Cada instrumento roda em seu próprio `iframe`, então CSS e JS não se misturam. Tudo é estático e os dados ficam no `localStorage` do aparelho. A trilha da página inicial só **lê** o que os apps já guardam.

Ao publicar uma nova versão, troque o número de `CACHE` em `sw.js`.

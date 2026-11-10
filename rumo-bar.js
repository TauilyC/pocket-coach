/* Barra do Rumo, compartilhada por index.html, mapa.html e coach.html.
   Cada página é um documento próprio (sem quadros), então funciona em qualquer hospedagem. */
(function () {
  'use strict';
  var path = location.pathname;
  var page = /mapa\.html$/.test(path) ? 'mapa' : /coach\.html$/.test(path) ? 'coach' : 'index';
  var root = document.documentElement;
  root.classList.add('rumo');
  root.setAttribute('data-rumo', page);

  /* A barra usa as fontes do Rumo, que as páginas do Mapa não carregam por conta própria. */
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'fonts/fonts.css';
  document.head.appendChild(link);

  var css = [
    ':root{--rumo-bar:calc(64px + env(safe-area-inset-top))}',
    'html.rumo body{box-sizing:border-box;padding-top:var(--rumo-bar)}',
    '.rumo-bar{position:fixed;inset:0 0 auto 0;z-index:50;box-sizing:border-box;height:var(--rumo-bar);padding-top:env(safe-area-inset-top);background:#13172B;border-bottom:1px solid #2F3664;font-family:"Figtree",system-ui,-apple-system,"Segoe UI",sans-serif}',
    '.rumo-bar .rb-in{box-sizing:border-box;max-width:1000px;height:64px;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:12px}',
    '.rumo-bar .rb-brand{min-height:44px;display:flex;align-items:center;gap:10px;color:#EEF0FA;text-decoration:none;font-family:"Bricolage Grotesque",system-ui,sans-serif;font-weight:700;font-size:19px}',
    '.rumo-bar .rb-brand img{width:28px;height:28px;border-radius:8px}',
    '.rumo-bar .rb-tabs{display:flex;gap:4px;margin-left:auto;background:#1B2042;border:1px solid #2F3664;border-radius:14px;padding:2px}',
    '.rumo-bar .rb-tabs a{min-height:44px;display:flex;align-items:center;justify-content:center;padding:0 16px;border-radius:11px;text-decoration:none;font-weight:600;font-size:.95rem;color:#98A1C8;white-space:nowrap}',
    '.rumo-bar .rb-tabs a[aria-current="page"]{background:#F4B860;color:#241803}',
    '.rumo-bar a:focus-visible{outline:2px solid #F4B860;outline-offset:2px}',
    '@media (max-width:560px){.rumo-bar .rb-tabs{flex:1;margin-left:0}.rumo-bar .rb-tabs a{flex:1;padding:0 6px}html:not([data-rumo="index"]) .rumo-bar .rb-brand span{display:none}}',
    /* ajustes de cada página para conviver com a barra fixa */
    'html.rumo #app{padding-top:0}',
    'html.rumo[data-rumo="mapa"] .top{top:var(--rumo-bar)}',
    'html.rumo[data-rumo="mapa"] .tabs{top:calc(var(--rumo-bar) + 50px)}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function tab(href, id, label) {
    return '<a href="' + href + '"' + (page === id ? ' aria-current="page"' : '') + '>' + label + '</a>';
  }
  function build() {
    var h = document.createElement('header');
    h.className = 'rumo-bar';
    h.innerHTML = '<div class="rb-in">' +
      '<a class="rb-brand" href="./" aria-label="Rumo, página inicial"><img src="icons/icon-192.png" alt="" width="28" height="28"><span>Rumo</span></a>' +
      '<div class="rb-tabs" role="navigation" aria-label="Seções do Rumo">' +
      tab('./', 'index', 'Início') + tab('mapa.html', 'mapa', 'Mapa') + tab('coach.html', 'coach', 'Coach') +
      '</div></div>';
    document.body.insertBefore(h, document.body.firstChild);
  }
  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();

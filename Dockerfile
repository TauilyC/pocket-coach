# Site estático servido por nginx, porta 80.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html mapa.html coach.html sw.js manifest.webmanifest /usr/share/nginx/html/
COPY icons /usr/share/nginx/html/icons
COPY fonts /usr/share/nginx/html/fonts
EXPOSE 80

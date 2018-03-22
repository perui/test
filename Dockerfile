FROM nginx
COPY dist /usr/share/nginx/html
COPY src/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443

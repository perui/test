FROM nginx:stable

COPY dist /var/www/htdocs
COPY src/nginx/nginx.conf /etc/nginx/nginx.conf
COPY src/nginx/site.conf /etc/nginx/conf.d/default.conf

RUN touch /var/run/nginx.pid && \
  chown -R www-data:www-data /var/run/nginx.pid && \
  chown -R www-data:www-data /var/cache/nginx && \
  chown -R www-data:www-data /var/log/nginx

USER www-data

VOLUME /var/www

EXPOSE 8080

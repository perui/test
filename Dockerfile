FROM nginx:stable

COPY dist /usr/share/nginx/html
COPY src/nginx/nginx.conf /etc/nginx/nginx.conf
COPY src/nginx/site.conf /etc/nginx/conf.d/default.conf

#RUN touch /var/run/nginx.pid && \
#  chown -R nginx:nginx /var/run/nginx.pid && \
#  chown -R nginx:nginx /var/cache/nginx && \
#  chown -R nginx:nginx /var/log/nginx && \
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
#chown -R www-data:www-data /var/run/nginx.pid && \
#  chown -R www-data:www-data /var/cache/nginx && \
#  chown -R www-data:www-data /var/log/nginx

#USER www-data
#USER nginx

#VOLUME /var/www

EXPOSE 8080

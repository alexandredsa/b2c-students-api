FROM linuxserver/letsencrypt

RUN adduser --disabled-password --gecos ""  www \
    && mkdir /www \
    && mkdir -p /run/nginx \
    && touch /run/nginx/nginx.pid \
    && chown -R www:www /run/nginx \
    && chown -R www:www /www 

COPY nginx.conf /config/nginx/site-confs/default

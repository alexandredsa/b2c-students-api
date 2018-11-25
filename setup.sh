docker build -t b2c-api .
docker build -t proxy ./nginx
docker-compose up -d
echo "Everything is setup! =)"
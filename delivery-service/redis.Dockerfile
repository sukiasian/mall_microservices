FROM redis:7.0.11-alpine
WORKDIR /usr/app
ENTRYPOINT ["redis-server"]
EXPOSE 6379
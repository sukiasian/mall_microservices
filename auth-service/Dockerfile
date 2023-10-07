FROM node:20-alpine3.16
WORKDIR /usr/app
COPY package.json .
RUN npm install -f
COPY . .

ENTRYPOINT ["npm", "run", "start"]

EXPOSE 9000




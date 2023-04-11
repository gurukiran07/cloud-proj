FROM --platform=amd64 node:alpine3.17

WORKDIR /app/
COPY . /app/
RUN npm install

CMD ["npm", "start"]
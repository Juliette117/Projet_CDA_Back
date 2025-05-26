FROM node:22-bookworm-slim

WORKDIR /app

COPY ./package*.json /app/media/
COPY ./src /app/media/src
COPY ./tsconfig.json /app/media
COPY ../shared-lib /app/shared-lib

WORKDIR /app/media
RUN npm install

RUN npm run build
EXPOSE 3003

CMD ["npm", "run", "start:prod"]


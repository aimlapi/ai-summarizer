FROM node:20

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./nest-cli.json ./
COPY ./src ./src
RUN npm run build

CMD ["node", "./dist/main.js"]
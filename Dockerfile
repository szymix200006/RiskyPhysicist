FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN npm run build  

FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package*.json ./

RUN npm install --production

EXPOSE 4000

CMD ["npm", "run", "serve:ssr:ryzyk-fizyk"]

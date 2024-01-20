FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
# npm run db:migrate && \
# npm run db:seed


CMD ["npm", "run", "start:prod"]

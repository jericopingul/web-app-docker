FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install

RUN file="$(ls -al)" && echo $file
RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
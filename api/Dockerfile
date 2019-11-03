# stage 1 - building the src
FROM node:12 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN file="$(ls -al)" && echo $file
RUN file="$(ls dist/ -al)" && echo $file

# stage 2 - install again to reduce image size by
# by not installing dev dependencies
FROM node:12
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
RUN file="$(ls -al)" && echo $file

# copy compiled code from stage 1
COPY --from=builder /usr/app/dist ./dist
RUN file="$(ls dist -al)" && echo $file

EXPOSE 3000

CMD node dist/server.js
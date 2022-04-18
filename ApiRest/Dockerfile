FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install pm2 -g

# RUN npm run build

RUN apt-get update
RUN apt-get -y install nano

EXPOSE 3001

# RUN npm run dev
CMD ["pm2-runtime","./dist/index.js"]
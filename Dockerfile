FROM node:14.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN mkdir -p /usr/src/app/logs
WORKDIR /usr/src/app/logs
RUN touch mercury-logs.txt
RUN ls
WORKDIR /usr/src/app
COPY ./src .
CMD ["npm","start"]
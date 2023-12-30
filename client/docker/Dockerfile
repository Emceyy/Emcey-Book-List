
FROM node:16-alpine


WORKDIR /client


COPY . /client/


RUN npm install


RUN npm run build


EXPOSE 5737


CMD npm run serve --port 5737

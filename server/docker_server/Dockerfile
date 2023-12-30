
FROM node:16-alpine


WORKDIR /server


COPY . /server/


RUN npm install


EXPOSE 3636


CMD node -e "process.env.PORT = 3636; require ('./index')"

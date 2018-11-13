FROM node:11.1.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production --quiet && \
       npm cache clean --force

COPY . /usr/src/app

# set port
ENV PORT 3000

# expose the port to outside
EXPOSE  3000

CMD [ "npm", "start" ]
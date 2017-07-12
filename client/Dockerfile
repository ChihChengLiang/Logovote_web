FROM node:7.8.0-alpine

ARG ROOT_URL

RUN npm install -g serve

COPY . .

ENV REACT_APP_ROOT $ROOT_URL

RUN yarn install --production --ignore-optional

RUN npm run build --production

CMD serve -s build